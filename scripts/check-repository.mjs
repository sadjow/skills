import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ignored = new Set([
  "node_modules", ".git", "playwright-report", "test-results", "artifacts", "__pycache__"
]);
const textExtensions = new Set([".md", ".yaml", ".yml", ".json", ".mjs", ".ts", ".py", ".sh", ""]);
const skillNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validSkillName = name => typeof name === "string" && name.length <= 64 && skillNamePattern.test(name);
const publicationPatterns = [
  [/\/Users\/[^/\s]+\//, "absolute personal path"],
  [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, "private key"],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}\b/, "GitHub credential"],
  [/\bAKIA[A-Z0-9]{16}\b/, "AWS access key"],
];

export function validateRepository(root) {
  const errors = [];
  const files = [];
  function walk(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (ignored.has(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        errors.push(`${relative(root, path)}: symlinks are not distributable skill resources`);
      } else if (entry.isDirectory()) {
        walk(path);
      } else {
        files.push(path);
      }
    }
  }
  walk(root);

  for (const path of files) {
    if (!textExtensions.has(extname(path))) continue;
    const content = readFileSync(path, "utf8");
    const displayPath = relative(root, path);
    for (const [pattern, label] of publicationPatterns) {
      if (pattern.test(content)) errors.push(`${displayPath}: contains ${label}`);
    }
    if (extname(path) !== ".md") continue;
    const prose = content.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, "");
    for (const [, rawTarget] of prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^(?:[a-z]+:|#)/i.test(rawTarget) || rawTarget.includes("<")) continue;
      const target = resolve(dirname(path), decodeURIComponent(rawTarget.split("#")[0]));
      const localPath = relative(root, target);
      if (localPath.startsWith("..") || !existsSync(target)) {
        errors.push(`${displayPath}: missing or external relative resource ${rawTarget}`);
      }
      if (displayPath.startsWith(`skills/`)) {
        const skillPath = displayPath.split("/").slice(0, 2).join("/");
        if (!localPath.startsWith(`${skillPath}/`)) {
          errors.push(`${displayPath}: local resource is outside its installable skill`);
        }
      }
    }
  }

  const skillsRoot = join(root, "skills");
  if (!existsSync(skillsRoot)) return [...errors, "missing skills directory"];
  const skillEntries = readdirSync(skillsRoot, { withFileTypes: true }).filter(entry => entry.isDirectory());
  const skillNames = new Set(skillEntries.map(entry => entry.name));
  const renamesPath = join(root, "skill-renames.json");
  if (files.includes(renamesPath)) {
    try {
      const renames = JSON.parse(readFileSync(renamesPath, "utf8"));
      if (!renames || typeof renames !== "object" || Array.isArray(renames)) {
        errors.push("skill-renames.json: expected a name mapping");
      } else {
        for (const [previous, replacement] of Object.entries(renames)) {
          if (!validSkillName(previous) || !validSkillName(replacement)) {
            errors.push("skill-renames.json: invalid skill identifier");
          }
          if (skillNames.has(previous)) errors.push(`${previous}: retired skill is still discoverable`);
          if (!skillNames.has(replacement)) errors.push(`${previous}: rename replacement is not installable`);
        }
      }
    } catch {
      errors.push("skill-renames.json: invalid JSON");
    }
  }
  for (const entry of skillEntries) {
    if (!entry.isDirectory()) continue;
    const skillPath = join(skillsRoot, entry.name, "SKILL.md");
    if (!existsSync(skillPath)) {
      errors.push(`${entry.name}: missing SKILL.md`);
      continue;
    }
    const content = readFileSync(skillPath, "utf8");
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    try {
      const metadata = frontmatter && parse(frontmatter[1], { uniqueKeys: true });
      if (!metadata || metadata.name !== entry.name ||
          !validSkillName(metadata.name)) {
        errors.push(`${entry.name}: invalid frontmatter name`);
      }
      if (typeof metadata?.description !== "string" || !metadata.description.trim() ||
          metadata.description.trim().startsWith("[TODO:")) {
        errors.push(`${entry.name}: missing or unfinished description`);
      }
      if (typeof metadata?.description === "string" && metadata.description.length > 1024) {
        errors.push(`${entry.name}: description exceeds 1024 characters`);
      }
    } catch {
      errors.push(`${entry.name}: invalid YAML frontmatter`);
    }
    const agentPath = join(skillsRoot, entry.name, "agents/openai.yaml");
    if (existsSync(agentPath)) {
      try {
        const agent = parse(readFileSync(agentPath, "utf8"));
        if (!agent || typeof agent !== "object") errors.push(`${entry.name}: invalid agent metadata`);
        const prompt = agent?.interface?.default_prompt;
        if (prompt !== undefined && (typeof prompt !== "string" ||
            !(prompt.match(/\$[a-z0-9]+(?:-[a-z0-9]+)*/g) ?? []).includes(`$${entry.name}`))) {
          errors.push(`${entry.name}: default prompt must invoke its current skill name`);
        }
      } catch {
        errors.push(`${entry.name}: invalid agent metadata YAML`);
      }
    }
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const errors = validateRepository(root);
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
  } else {
    console.log("Skill metadata, resources, and publication checks passed.");
  }
}
