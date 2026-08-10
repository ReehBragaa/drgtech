const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(ROOT_DIR, 'data', 'dataset.json');
const INDEX_PATH = path.join(ROOT_DIR, 'index.html');

console.log('🔍 Executando Verificação de Duplicatas no DRGTech...\n');

if (!fs.existsSync(DATASET_PATH)) {
  console.error('❌ Erro: dataset.json não encontrado!');
  process.exit(1);
}

const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf-8'));

// Check duplicate IDs
const idsSeen = new Set();
const duplicateIds = [];
dataset.forEach(item => {
  if (idsSeen.has(item.id)) duplicateIds.push(item.id);
  idsSeen.add(item.id);
});

// Check duplicate Slugs
const slugsSeen = new Map();
const duplicateSlugs = [];
dataset.forEach(item => {
  if (slugsSeen.has(item.slug)) {
    duplicateSlugs.push({ slug: item.slug, id1: slugsSeen.get(item.slug), id2: item.id });
  } else {
    slugsSeen.set(item.slug, item.id);
  }
});

// Check duplicate Titles (Exact & Normalized)
const titlesSeen = new Map();
const duplicateTitles = [];
dataset.forEach(item => {
  const normTitle = item.keyword_principal.toLowerCase().trim();
  if (titlesSeen.has(normTitle)) {
    duplicateTitles.push({ title: item.keyword_principal, id1: titlesSeen.get(normTitle), id2: item.id });
  } else {
    titlesSeen.set(normTitle, item.id);
  }
});

// Check similarity in short answers (resposta_curta)
const answersSeen = new Map();
const duplicateAnswers = [];
dataset.forEach(item => {
  const normAnswer = item.resposta_curta.toLowerCase().slice(0, 50);
  if (answersSeen.has(normAnswer)) {
    duplicateAnswers.push({ answerPrefix: normAnswer, id1: answersSeen.get(normAnswer), id2: item.id });
  } else {
    answersSeen.set(normAnswer, item.id);
  }
});

// Check duplicates in index.html hrefs
const indexHTML = fs.readFileSync(INDEX_PATH, 'utf-8');
const cardHrefs = [...indexHTML.matchAll(/href="(artigos\/[^"]+)"/g)].map(m => m[1]);
const hrefCounts = {};
cardHrefs.forEach(h => hrefCounts[h] = (hrefCounts[h] || 0) + 1);
const duplicateIndexCards = Object.entries(hrefCounts).filter(([h, count]) => count > 1);

console.log(`📊 Estatísticas do Dataset: ${dataset.length} itens cadastrados.`);
console.log('───────────────────────────────────────────────────────');
console.log(`1. IDs Duplicados: ${duplicateIds.length === 0 ? '✅ Nenhum' : '❌ ' + JSON.stringify(duplicateIds)}`);
console.log(`2. Slugs Duplicados: ${duplicateSlugs.length === 0 ? '✅ Nenhum' : '❌ ' + JSON.stringify(duplicateSlugs)}`);
console.log(`3. Títulos Duplicados: ${duplicateTitles.length === 0 ? '✅ Nenhum' : '❌ ' + JSON.stringify(duplicateTitles)}`);
console.log(`4. Respostas Curte Duplicadas: ${duplicateAnswers.length === 0 ? '✅ Nenhum' : '❌ ' + JSON.stringify(duplicateAnswers)}`);
console.log(`5. Cards Duplicados na Home (index.html): ${duplicateIndexCards.length === 0 ? '✅ Nenhum' : '❌ ' + JSON.stringify(duplicateIndexCards)}`);
console.log('───────────────────────────────────────────────────────\n');
