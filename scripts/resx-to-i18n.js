#!/usr/bin/env node
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const repoRoot = path.resolve(__dirname, '..', '..');
const resxRoot = path.join(repoRoot, 'Resources', 'Views');
const outRoot = path.join(path.resolve(__dirname, '..'), 'src', 'locales');

const languages = ['en', 'es', 'it'];

function collectResxFilesForLang(lang) {
  const files = [];
  function walk(dir) {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(`.${lang}.resx`)) files.push(full);
    }
  }
  walk(resxRoot);
  return files;
}

async function parseResx(filePath) {
  const xml = readFileSync(filePath, 'utf-8');
  const obj = await parseStringPromise(xml);
  const data = obj.root?.data ?? [];
  const map = {};
  for (const item of data) {
    const name = item.$?.name;
    const value = (item.value?.[0] ?? '').toString();
    if (name) map[name] = value;
  }
  return map;
}

async function buildLang(lang) {
  const files = collectResxFilesForLang(lang);
  const merged = {};
  for (const f of files) {
    const partial = await parseResx(f);
    Object.assign(merged, partial);
  }
  const outDir = path.join(outRoot, lang);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'translation.json'), JSON.stringify(merged, null, 2));
  console.log(`Built ${lang}: ${Object.keys(merged).length} keys`);
}

(async function main() {
  mkdirSync(outRoot, { recursive: true });
  for (const lang of languages) {
    await buildLang(lang);
  }
})();

