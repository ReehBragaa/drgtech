const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT_DIR, 'artigos');
const SITE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data', 'site.json'), 'utf-8'));
const EDITORIAL_DIR = path.join(ROOT_DIR, 'data', 'editorial');

let errors = 0;
let warnings = 0;

function err(msg) {
  console.error('❌ ERRO: ' + msg);
  errors++;
}

function warn(msg) {
  console.warn('⚠️ AVISO: ' + msg);
  warnings++;
}

console.log('=== AUDITORIA DE CONFORMIDADE ADSENSE DRGTECH ===\n');

// 1. Verificar páginas utilitárias / institucionais
const utilityPages = [
  'index.html',
  'sobre.html',
  'contato.html',
  'privacidade.html',
  'termos.html',
  'politica-editorial.html',
  'gerador-de-senha.html'
];

utilityPages.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  if (!fs.existsSync(filePath)) {
    err(`Arquivo obrigatório ausente: ${file}`);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf-8');
  if (html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) {
    err(`Página utilitária ${file} possui script de anúncios AdSense! Remova.`);
  }
  if (!html.includes(SITE.adsenseClient)) {
    warn(`Página ${file} não contém meta tag com ${SITE.adsenseClient}`);
  }
  if (!html.includes('politica-editorial.html')) {
    err(`Página ${file} não possui link para política editorial no rodapé`);
  }
});

// 2. Verificar artigos editoriais aprovados (28)
const editorialFiles = fs.readdirSync(EDITORIAL_DIR).filter(f => f.endsWith('.json'));
console.log(`Verificando ${editorialFiles.length} arquivos em data/editorial/...`);

if (editorialFiles.length !== 28) {
  err(`Esperava 28 arquivos editoriais, encontrou ${editorialFiles.length}`);
}

editorialFiles.forEach(f => {
  const slug = f.replace(/\.json$/, '');
  const htmlPath = path.join(ARTICLES_DIR, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) {
    err(`HTML gerado ausente para artigo editorial: artigos/${slug}.html`);
    return;
  }
  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Deve ter meta robots index
  if (!html.includes('name="robots" content="index, follow"')) {
    err(`Artigo editorial ${slug}.html NÃO está como index, follow!`);
  }

  // Deve ter script AdSense
  if (!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) {
    err(`Artigo editorial ${slug}.html não possui script AdSense`);
  }

  // Não deve ter banner de rascunho
  if (html.includes('Guia resumido, em revisão')) {
    err(`Artigo editorial ${slug}.html contém aviso de rascunho!`);
  }

  // Deve ter Schema.org Article e FAQPage
  if (!html.includes('"@type": "Article"') && !html.includes('"@type":"Article"')) {
    err(`Artigo editorial ${slug}.html não tem JSON-LD Article`);
  }
  if (!html.includes('"@type": "FAQPage"') && !html.includes('"@type":"FAQPage"')) {
    err(`Artigo editorial ${slug}.html não tem JSON-LD FAQPage`);
  }

  // Deve conter política editorial no rodapé
  if (!html.includes('politica-editorial.html')) {
    err(`Artigo editorial ${slug}.html não tem link para política editorial`);
  }
});

// 3. Verificar artigos estáticos aprovados (6)
console.log(`Verificando ${SITE.staticAprovados.length} artigos estáticos aprovados...`);
SITE.staticAprovados.forEach(slug => {
  const htmlPath = path.join(ARTICLES_DIR, `${slug}.html`);
  if (!fs.existsSync(htmlPath)) {
    err(`Artigo estático aprovado ausente: ${slug}.html`);
    return;
  }
  const html = fs.readFileSync(htmlPath, 'utf-8');
  if (!html.includes('name="robots" content="index, follow"')) {
    err(`Artigo estático aprovado ${slug}.html NÃO está index, follow`);
  }
  if (!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) {
    err(`Artigo estático aprovado ${slug}.html NÃO possui script AdSense`);
  }
  if (html.includes('guia em revisão')) {
    err(`Artigo estático aprovado ${slug}.html tem banner de rascunho`);
  }
});

// 4. Verificar todos os arquivos em artigos/ e garantir que NENHUM com noindex tenha AdSense script
const allArticleFiles = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));
let noindexCount = 0;
let indexCount = 0;

allArticleFiles.forEach(file => {
  const html = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
  const isNoindex = html.includes('noindex');
  const hasAdScript = html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');

  if (isNoindex) {
    noindexCount++;
    if (hasAdScript) {
      err(`VIOLAÇÃO CRÍTICA: Arquivo com noindex tem script de anúncios AdSense! ${file}`);
    }
  } else {
    indexCount++;
    if (!hasAdScript) {
      warn(`Arquivo indexável sem script de anúncio: ${file}`);
    }
  }
});

console.log(`Total em artigos/: ${allArticleFiles.length} arquivos (${indexCount} indexáveis com ads, ${noindexCount} rascunhos sem ads)`);

// 5. Verificar sitemap.xml
const sitemap = fs.readFileSync(path.join(ROOT_DIR, 'sitemap.xml'), 'utf-8');
const sitemapMatches = sitemap.match(/<loc>(.*?)<\/loc>/g) || [];
console.log(`Total de URLs no sitemap.xml: ${sitemapMatches.length}`);

sitemapMatches.forEach(tag => {
  const url = tag.replace(/<\/?loc>/g, '');
  if (url.includes('/artigos/')) {
    const slug = url.split('/artigos/')[1].replace('.html', '');
    const isEditorial = editorialFiles.some(f => f.replace('.json', '') === slug);
    const isStaticApproved = SITE.staticAprovados.includes(slug);
    if (!isEditorial && !isStaticApproved) {
      err(`URL não aprovada encontrada no sitemap: ${url}`);
    }
  }
});

// 6. Verificar robots.txt
const robots = fs.readFileSync(path.join(ROOT_DIR, 'robots.txt'), 'utf-8');
if (!robots.includes('Sitemap: https://drgtech.com.br/sitemap.xml')) {
  err('robots.txt não aponta corretamente para sitemap.xml');
}

console.log('\n=== RESULTADO DA AUDITORIA ===');
console.log(`Erros: ${errors} | Avisos: ${warnings}`);
if (errors === 0) {
  console.log('✅ TODAS AS REGRAS DO ADSENSE FORAM ATENDIDAS COM SUCESSO!');
} else {
  console.error('❌ Foram encontrados erros que precisam ser corrigidos.');
  process.exit(1);
}
