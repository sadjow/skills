import assert from "node:assert/strict";
import { test } from "node:test";
import { countUnredacted, looksSecret, redactText, safeUrl } from "./safe-url.mjs";

const origin = "http://localhost:4000";
const opaqueToken = "SFMyNTY0synthetic0000000000000000";
const uuid = "123e4567-e89b-42d3-a456-426614174000";

test("recognizes random-looking values but not word slugs", () => {
  assert.ok(looksSecret(uuid));
  assert.ok(looksSecret(opaqueToken));
  assert.ok(looksSecret("a3f9c2d1e4b5a6978877665544332211"));
  assert.equal(looksSecret("corner-bakery-downtown"), false);
  assert.equal(looksSecret("professional_services"), false);
  assert.equal(looksSecret("lunch"), false);
});

test("redacts fragments and credentials", () => {
  assert.equal(safeUrl(`${origin}/share#cap=${opaqueToken}`), `${origin}/share#REDACTED`);
  assert.equal(safeUrl("http://user:pass@localhost:4000/admin"), "http://REDACTED@localhost:4000/admin");
});

test("redacts secret-named parameters and coordinates while keeping search terms", () => {
  assert.equal(
    safeUrl(`${origin}/search?q=lunch&token=abc&resume=def&lat=12.3&lng=45.6`),
    `${origin}/search?q=lunch&token=REDACTED&resume=REDACTED&lat=REDACTED&lng=REDACTED`,
  );
  assert.equal(safeUrl(`${origin}/store?cart=abc`, { secretParams: ["cart"] }), `${origin}/store?cart=REDACTED`);
});

test("redacts secret-shaped values and path segments", () => {
  assert.equal(safeUrl(`${origin}/store?ref=${opaqueToken}`), `${origin}/store?ref=REDACTED`);
  assert.equal(safeUrl(`${origin}/orders/${uuid}/status`), `${origin}/orders/REDACTED/status`);
  assert.equal(safeUrl(`${origin}/stores/corner-bakery-downtown`), `${origin}/stores/corner-bakery-downtown`);
});

test("redacts short route-specific secrets named by the project", () => {
  const options = { secretPaths: [/(\/orders\/)[^/]+/] };
  assert.equal(safeUrl(`${origin}/orders/abc123`, options), `${origin}/orders/REDACTED`);
});

test("recurses into nested absolute and relative redirects", () => {
  const options = { secretPaths: [/(\/orders\/)[^/]+/] };
  const absolute = encodeURIComponent(`${origin}/store?token=abc`);
  const viaAbsolute = new URL(safeUrl(`${origin}/log-in?return_to=${absolute}`));
  assert.equal(viaAbsolute.searchParams.get("return_to"), `${origin}/store?token=REDACTED`);
  const viaRelative = new URL(safeUrl(`${origin}/log-in?return_to=/orders/abc123`, options));
  assert.equal(viaRelative.searchParams.get("return_to"), "/orders/REDACTED");
});

test("keeps relative input relative", () => {
  assert.equal(safeUrl(`/orders/${uuid}?tab=status`), "/orders/REDACTED?tab=status");
});

test("redacts URLs inside error text and counts what remains unredacted", () => {
  const message = `navigating to "${origin}/orders/${uuid}", waiting until "load" (from ${origin}/search?q=lunch)`;
  assert.equal(countUnredacted(message), 1);
  assert.equal(countUnredacted(redactText(message)), 0);
  assert.match(redactText(message), /\/orders\/REDACTED/);
});
