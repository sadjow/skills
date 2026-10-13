import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const SECRET_PARAM =
  /token|secret|key|code|sig|session|auth|state|nonce|ticket|cap|resume|draft|continuation|challenge|password|otp|^(?:lat|lng|lon|latitude|longitude)$/i;
const NESTED_URL = /^(?:\/|https?:)|[?#]/i;
const UUID = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const TOKEN_CHARS = /^[\w.~=-]{16,}$/;
const URL_IN_TEXT = /https?:\/\/[^\s"'<>`]+/g;
const RELATIVE_BASE = "http://relative.invalid";

const isWordSlug = (value) =>
  value === value.toLowerCase() && value.split(/[-_.~]/).every((word) => word.length <= 12);

export const looksSecret = (value) =>
  UUID.test(value) || (TOKEN_CHARS.test(value) && !isWordSlug(value));

const redactSegment = (segment) => {
  try {
    return looksSecret(decodeURIComponent(segment)) ? "REDACTED" : segment;
  } catch {
    return "REDACTED";
  }
};

/**
 * Redacts bearer values from a URL before it is printed or saved.
 * `secretParams` names extra parameters; `secretPaths` are patterns whose
 * first capture group is kept and whose remainder becomes REDACTED, for short
 * route-specific secrets that do not look random.
 */
export const safeUrl = (raw, options = {}) => {
  const { secretParams = [], secretPaths = [] } = options;
  const url = new URL(raw, RELATIVE_BASE);
  if (url.username || url.password) {
    url.username = "REDACTED";
    url.password = "";
  }
  if (url.hash) url.hash = "REDACTED";
  for (const [name, value] of [...url.searchParams]) {
    const redacted =
      SECRET_PARAM.test(name) || secretParams.includes(name)
        ? "REDACTED"
        : NESTED_URL.test(value)
          ? safeUrl(value, options)
          : looksSecret(value)
            ? "REDACTED"
            : value;
    if (redacted !== value) url.searchParams.set(name, redacted);
  }
  url.pathname = secretPaths.reduce(
    (path, pattern) => path.replace(pattern, "$1REDACTED"),
    url.pathname.split("/").map(redactSegment).join("/"),
  );
  return url.origin === RELATIVE_BASE ? url.href.slice(RELATIVE_BASE.length) : url.href;
};

export const redactText = (text, options) =>
  text.replace(URL_IN_TEXT, (raw) => {
    try {
      return safeUrl(raw, options);
    } catch {
      return "[unparsable URL withheld]";
    }
  });

export const countUnredacted = (text, options) =>
  (text.match(URL_IN_TEXT) ?? []).filter((raw) => {
    try {
      return safeUrl(raw, options) !== new URL(raw).href;
    } catch {
      return true;
    }
  }).length;

// Reports only file names and counts so the scan never reprints a secret.
const scanFiles = (paths) => {
  const leaking = paths
    .map((path) => ({ path, count: countUnredacted(readFileSync(path, "utf8")) }))
    .filter(({ count }) => count > 0);
  for (const { path, count } of leaking) console.error(`${path}: ${count} unredacted URL(s)`);
  process.exitCode = leaking.length > 0 ? 1 : 0;
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  scanFiles(process.argv.slice(2));
}
