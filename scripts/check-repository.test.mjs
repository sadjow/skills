import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateRepository } from "./check-repository.mjs";

function fixture(t, body = "# Example\n") {
  const root = mkdtempSync(join(tmpdir(), "skills-validation-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, "skills/example"), { recursive: true });
  writeFileSync(join(root, "skills/example/SKILL.md"),
    `---\nname: example\ndescription: |\n  An example skill.\n---\n${body}`);
  return root;
}

test("accepts block descriptions and optional agent metadata", t => {
  assert.deepEqual(validateRepository(fixture(t)), []);
});
test("rejects missing packaged references", t => {
  const root = fixture(t, "[Details](references/missing.md)\n");
  assert.ok(validateRepository(root).some(error => error.includes("missing or external")));
});
test("rejects a resource outside its skill even when it exists", t => {
  const root = fixture(t, "[Details](../../shared.md)\n");
  writeFileSync(join(root, "shared.md"), "Shared");
  assert.ok(validateRepository(root).some(error => error.includes("outside its installable skill")));
});
test("rejects symlinks without following them", t => {
  const root = fixture(t);
  symlinkSync(tmpdir(), join(root, "skills/example/external"));
  assert.ok(validateRepository(root).some(error => error.includes("symlinks")));
});
test("rejects malformed YAML", t => {
  const root = fixture(t);
  writeFileSync(join(root, "skills/example/SKILL.md"), "---\nname: [\n---\n");
  assert.ok(validateRepository(root).some(error => error.includes("invalid YAML")));
});
test("reports credential categories without echoing values", t => {
  const credential = "gh" + "p_" + "x".repeat(30);
  const root = fixture(t, credential);
  const errors = validateRepository(root);
  assert.ok(errors.some(error => error.includes("GitHub credential")));
  assert.ok(errors.every(error => !error.includes(credential)));
});

test("rejects a rename whose replacement cannot be installed", t => {
  const root = fixture(t);
  writeFileSync(join(root, "skill-renames.json"), JSON.stringify({ retired: "missing" }));
  assert.ok(validateRepository(root).some(error => error.includes("rename replacement")));
});

test("rejects a retired name that is still a discoverable skill", t => {
  const root = fixture(t);
  writeFileSync(join(root, "skill-renames.json"), JSON.stringify({ example: "example" }));
  assert.ok(validateRepository(root).some(error => error.includes("retired skill")));
});

test("accepts consolidated predecessors pointing at one installed replacement", t => {
  const root = fixture(t);
  writeFileSync(join(root, "skill-renames.json"), JSON.stringify({ first: "example", second: "example" }));
  assert.deepEqual(validateRepository(root), []);
});

test("rejects an optional default prompt that invokes the retired identifier", t => {
  const root = fixture(t);
  mkdirSync(join(root, "skills/example/agents"));
  writeFileSync(join(root, "skills/example/agents/openai.yaml"),
    'interface:\n  default_prompt: "Use $retired to do the task."\n');
  assert.ok(validateRepository(root).some(error => error.includes("default prompt")));
});

test("rejects descriptions beyond the specification maximum", t => {
  const root = fixture(t);
  writeFileSync(join(root, "skills/example/SKILL.md"),
    `---\nname: example\ndescription: ${"x".repeat(1025)}\n---\n`);
  assert.ok(validateRepository(root).some(error => error.includes("1024")));
});
