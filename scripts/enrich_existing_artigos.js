const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'artigos');
const SITE_URL = 'https://drgtech.com.br';
const OG_IMAGE = `${SITE_URL}/img/og-preview.png`;

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));

console.log(`🚀 Otimizando ${files.length} artigos para o Google Discover e SEO de Cauda Longa...\n`);

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(ARTICLES_DIR, file);
  let html = fs.readFileSync(filePath, 'utf-8');
  const canonicalUrl = `${SITE_URL}/artigos/${file}`;

  // Extract Title
  let titleMatch = html.match(/<title>(.*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(' — DRGTech', '').trim() : file.replace('.html', '').replace(/-/g, ' ');

  // Extract Description
  let descMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
  let description = descMatch ? descMatch[1].trim() : `${title} - Confira o passo a passo completo no DRGTech.`;

  // Build missing OpenGraph / Discover meta tags
  const discoverMeta = `  <meta property="og:title" content="${title} — DRGTech" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:site_name" content="DRGTech" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title} — DRGTech" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />
  <meta property="article:publisher" content="https://drgtech.com.br" />`;

  // Remove existing OG tags to avoid duplicate blocks
  html = html.replace(/<meta\s+property="og:[^"]+"\s+content="[^"]*"\s*\/?>\n?/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]+"\s+content="[^"]*"\s*\/?>\n?/gi, '');
  html = html.replace(/<meta\s+property="article:[^"]+"\s+content="[^"]*"\s*\/?>\n?/gi, '');
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\n?/gi, '');

  // Inject Discover meta right after robots or keywords
  if (html.includes('<meta name="robots"')) {
    html = html.replace('<meta name="robots" content="index, follow" />', `<meta name="robots" content="index, follow" />\n${discoverMeta}\n  <link rel="canonical" href="${canonicalUrl}" />`);
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', `${discoverMeta}\n  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  fs.writeFileSync(filePath, html, 'utf-8');
  updatedCount++;
});

console.log(`✅ ${updatedCount} artigos atualizados e padronizados para o Google Discover e SEO de Cauda Longa!`);
