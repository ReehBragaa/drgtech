/* ============================================
   DRGTech — Contador de palavras editoriais
   Uso: node scripts/count_words.js data/editorial/<slug>.json [...]
        node scripts/count_words.js            (todos os arquivos)
   Conta o texto corrido (intro, parágrafos, listas, passos, avisos,
   tabelas e FAQ). Não conta blocos de código nem a lista de fontes.
   ============================================ */

const fs = require('fs');
const path = require('path');

const EDITORIAL_DIR = path.resolve(__dirname, '..', 'data', 'editorial');
const MIN_WORDS = 900;

function words(text) {
  return String(text || '').split(/\s+/).filter(Boolean).length;
}

function countEditorial(ed) {
  let n = 0;
  (ed.intro || []).forEach(p => { n += words(p); });
  (ed.secoes || []).forEach(sec => {
    (sec.blocos || []).forEach(b => {
      if (b.tipo === 'p' || b.tipo === 'aviso') n += words(b.texto);
      else if (b.tipo === 'lista' || b.tipo === 'passos') (b.itens || []).forEach(i => { n += words(i); });
      else if (b.tipo === 'tabela') {
        (b.cabecalho || []).forEach(c => { n += words(c); });
        (b.linhas || []).forEach(l => l.forEach(c => { n += words(c); }));
      }
    });
  });
  (ed.faq || []).forEach(f => { n += words(f.p) + words(f.r); });
  return n;
}

module.exports = { countEditorial, words, MIN_WORDS };

if (require.main === module) {
  let files = process.argv.slice(2);
  if (files.length === 0 && fs.existsSync(EDITORIAL_DIR)) {
    files = fs.readdirSync(EDITORIAL_DIR).filter(f => f.endsWith('.json')).map(f => path.join(EDITORIAL_DIR, f));
  }
  let bad = 0;
  files.forEach(f => {
    try {
      const ed = JSON.parse(fs.readFileSync(f, 'utf-8'));
      const n = countEditorial(ed);
      const ok = n >= MIN_WORDS;
      if (!ok) bad++;
      console.log(`${ok ? 'OK ' : 'CURTO'}  ${String(n).padStart(5)} palavras  ${path.basename(f)}`);
    } catch (e) {
      bad++;
      console.log(`ERRO   JSON inválido em ${path.basename(f)}: ${e.message}`);
    }
  });
  if (files.length) console.log(`\n${files.length - bad}/${files.length} arquivos dentro do mínimo de ${MIN_WORDS} palavras.`);
  process.exit(bad ? 1 : 0);
}
