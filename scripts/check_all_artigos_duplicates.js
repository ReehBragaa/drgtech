const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'artigos');

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));

console.log(`🔍 Verificando ${files.length} arquivos estáticos na pasta /artigos...\n`);

const titles = new Map();
const canonicals = new Map();
const duplicateTitles = [];
const duplicateCanonicals = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
  
  // Title tag match
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (titleMatch) {
    const t = titleMatch[1].trim();
    if (titles.has(t)) {
      duplicateTitles.push({ title: t, file1: titles.get(t), file2: file });
    } else {
      titles.set(t, file);
    }
  }

  // Canonical tag match
  const canonicalMatch = content.match(/<link rel="canonical" href="(.*?)"/i);
  if (canonicalMatch) {
    const c = canonicalMatch[1].trim();
    if (canonicals.has(c)) {
      duplicateCanonicals.push({ canonical: c, file1: canonicals.get(c), file2: file });
    } else {
      canonicals.set(c, file);
    }
  }
});

console.log(`1. Títulos <title> Duplicados: ${duplicateTitles.length === 0 ? '✅ Nenhum' : '❌ ' + JSON.stringify(duplicateTitles, null, 2)}`);
console.log(`2. URLs Canônicas Duplicadas: ${duplicateCanonicals.length === 0 ? '✅ Nenhum' : '❌ ' + JSON.stringify(duplicateCanonicals, null, 2)}`);
