// HandPiano Kids SDD validation adapted from dbv-specs-ops v2.9.0.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(repositoryRoot, 'frontend', 'public');
const pluginRoot = path.join(publicRoot, '.well-known', 'agent-plugin');
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(pluginRoot, relativePath), 'utf8'));

const plugin = await readJson('plugin.json');
const mcp = await readJson('mcp.json');
const catalog = JSON.parse(await readFile(path.join(publicRoot, '.well-known', 'api-catalog'), 'utf8'));
const allowedPluginFields = new Set([
  '$schema',
  'name',
  'version',
  'description',
  'author',
  'homepage',
  'repository',
  'license',
  'keywords',
  'extensions',
]);

assert.deepEqual(Object.keys(plugin).filter((key) => !allowedPluginFields.has(key)), []);
assert.equal(plugin.$schema, 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');
assert.match(plugin.name, /^(?!.*(?:--|\.\.))[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/);
assert.equal(typeof plugin.version, 'string');
assert.equal(typeof plugin.description, 'string');
assert.ok(Array.isArray(plugin.keywords));
assert.ok(plugin.keywords.every((keyword) => typeof keyword === 'string'));
assert.equal(mcp.$schema, 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json');
assert.deepEqual(Object.keys(mcp), ['$schema', 'mcpServers']);
assert.deepEqual(Object.keys(mcp.mcpServers), [], 'No MCP server is approved for this informational plugin.');
assert.deepEqual(catalog, { linkset: [] }, 'The frontend origin does not advertise the separate backend API.');

const skill = await readFile(path.join(pluginRoot, 'skills', 'handpiano-kids', 'SKILL.md'), 'utf8');
assert.match(skill, /^---\r?\nname: handpiano-kids/m);
assert.match(skill, /HandPiano Kids/);
assert.match(skill, /Do not request, infer, store, or transmit camera images/);

for (const relativePath of ['robots.txt', 'llms.txt', 'auth.md']) {
  await readFile(path.join(publicRoot, relativePath), 'utf8');
}

const promptDirectory = path.join(repositoryRoot, '.github', 'prompts');
for (const promptName of ['spec', 'plan', 'build', 'test', 'code-simplify', 'ship', 'maintain']) {
  const prompt = await readFile(path.join(promptDirectory, `${promptName}.prompt.md`), 'utf8');
  assert.match(prompt, new RegExp(`^---\\r?\\nname: ${promptName}\\r?$`, 'm'));
}

console.log('Agent Plugin and static discovery files are valid.');
