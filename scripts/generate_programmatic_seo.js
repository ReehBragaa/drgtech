/* ============================================
   DRGTech — Programmatic SEO Generator Engine
   Generates static HTML, Schema.org FAQPage, 
   internal interlinking widgets & sitemap index.
   ============================================ */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(ROOT_DIR, 'data', 'dataset.json');
const ARTICLES_DIR = path.join(ROOT_DIR, 'artigos');

const SITE_URL = 'https://drgtech.com.br';
const ADSENSE_CLIENT = 'ca-pub-6942071950167193';

// Helper category badge mappings
const CAT_LABELS = {
  windows: { name: 'Windows', badgeClass: 'badge-blue', cardCatClass: 'cat-windows', icon: '💻' },
  celular: { name: 'Celular', badgeClass: 'badge-green', cardCatClass: 'cat-android', icon: '📱' },
  internet: { name: 'Internet', badgeClass: 'badge-purple', cardCatClass: 'cat-wifi', icon: '🌐' },
  seguranca: { name: 'Segurança', badgeClass: 'badge-red', cardCatClass: 'cat-seguranca', icon: '🛡️' }
};

function generateHTML(item, datasetMap) {
  const catInfo = CAT_LABELS[item.categoria] || CAT_LABELS.windows;
  const canonicalUrl = `${SITE_URL}/artigos/${item.slug}.html`;

  // Build Schema.org FAQPage JSON-LD
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": item.keyword_principal,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.resposta_curta
      }
    }]
  };

  // Build steps list
  const stepsListHTML = item.passo_a_passo.map((step, idx) => `
          <li>
            <div class="step-num">${idx + 1}</div>
            <div class="step-text">${step}</div>
          </li>`).join('');

  // Build Related Articles ("Teia de Aranha" Internal Linking)
  const relatedIDs = item.duvidas_relacionadas || [];
  const relatedCardsHTML = relatedIDs.map(relId => {
    const relItem = datasetMap.get(relId);
    if (!relItem) return '';
    return `
            <a href="${relItem.slug}.html" class="related-card">
              <span class="related-card-title">${relItem.keyword_principal}</span>
            </a>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${item.keyword_principal} — DRGTech</title>
  <meta name="description" content="${item.resposta_curta.slice(0, 155)}..." />
  <meta name="keywords" content="${item.keyword_principal.toLowerCase()}, tutorial ${catInfo.name.toLowerCase()}, suporte tecnico" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="${item.keyword_principal}" />
  <meta property="og:description" content="${item.resposta_curta}" />
  <meta property="og:type" content="article" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/png" href="../img/favicon.png" />
  <link rel="shortcut icon" href="../favicon.ico" />
  <link rel="stylesheet" href="../css/style.css" />
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>
  <!-- Schema.org FAQPage -->
  <script type="application/ld+json">
${JSON.stringify(schemaFAQ, null, 2)}
  </script>
</head>
<body>
  <div id="progress-bar"></div>

  <header class="site-header">
    <div class="header-inner">
      <a href="../index.html" class="logo">
        <img src="../img/logo.png" alt="DRGTech — Tecnologia do jeito simples" class="logo-img" />
      </a>
      <nav class="header-nav">
        <a href="../index.html" class="nav-link">← Voltar</a>
        <a href="../index.html#${item.categoria}" class="nav-link">${catInfo.name}</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
    <nav class="mobile-nav" id="mobile-nav">
      <a href="../index.html" class="nav-link">← Voltar ao início</a>
    </nav>
  </header>

  <div class="article-page-wrapper">
    <main>

      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="../index.html">Início</a>
        <span class="breadcrumb-sep">›</span>
        <a href="../index.html#${item.categoria}">${catInfo.name}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${item.keyword_principal.slice(0, 35)}...</span>
      </nav>

      <header class="article-header">
        <span class="article-badge ${catInfo.badgeClass}">${catInfo.name}</span>
        <h1 class="article-h1">${item.keyword_principal}</h1>
        <div class="article-intro-meta">
          <span class="meta-item">${item.read_time || '5 min de leitura'}</span>
          <span class="meta-item">Atualizado em ${item.updated_at || 'julho de 2026'}</span>
          <span class="meta-item">Equipe DRGTech</span>
          <span class="difficulty diff-easy">Nível: Prático</span>
        </div>
      </header>

      <!-- Featured Snippet Box -->
      <div class="article-intro">
        <strong>Resposta Rápida:</strong> ${item.resposta_curta}
      </div>

      <article class="article-body" id="article-body">

        <h2 id="passo-a-passo">Passo a Passo Completo</h2>
        <ol class="steps-list">
${stepsListHTML}
        </ol>

        <div class="success-box">
          <div class="box-content">
            <p><strong>Dica DRGTech:</strong> Siga as etapas na ordem listada acima. Caso tenha dúvidas adicionais, consulte os tópicos e perguntas relacionadas ao final deste guia.</p>
          </div>
        </div>

        <div class="divider"></div>

        <!-- Internal Interlinking Widget ("Teia de Aranha") -->
        <div class="related-articles">
          <h2>Dúvidas Relacionadas</h2>
          <div class="related-grid">
${relatedCardsHTML}
          </div>
        </div>

      </article>
    </main>

    <aside class="toc-sidebar">
      <div class="toc-card">
        <div class="toc-title">Neste Artigo</div>
        <ul class="toc-list">
          <li><a href="#passo-a-passo">Passo a Passo</a></li>
          <li><a href="#article-body">Dúvidas Relacionadas</a></li>
        </ul>
      </div>
    </aside>
  </div>

  <footer class="site-footer">
    <div class="footer-bottom" style="max-width: var(--max-width); margin: 0 auto;">
      <p>© 2026 <strong>DRGTech</strong> — Todos os direitos reservados.</p>
      <p><a href="../index.html">← Voltar ao início</a></p>
    </div>
  </footer>

  <button id="scroll-top" aria-label="Voltar ao topo">↑</button>
  <script src="../js/main.js"></script>
</body>
</html>`;
}

function run() {
  console.log('🚀 Starting Programmatic SEO Generator...');

  if (!fs.existsSync(DATASET_PATH)) {
    console.error('❌ Error: dataset.json not found at ' + DATASET_PATH);
    return;
  }

  const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf-8'));
  const datasetMap = new Map(dataset.map(item => [item.id, item]));

  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  let generatedCount = 0;
  dataset.forEach(item => {
    const htmlContent = generateHTML(item, datasetMap);
    const filePath = path.join(ARTICLES_DIR, `${item.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
    generatedCount++;
  });

  console.log(`✅ Generated ${generatedCount} programmatic HTML articles with Schema.org & Internal Linking!`);

  // Build Sitemaps (Sitemap Index + Chunked Sitemaps)
  const CHUNK_SIZE = 2000;
  const sitemapFiles = [];

  for (let i = 0; i < dataset.length; i += CHUNK_SIZE) {
    const chunk = dataset.slice(i, i + CHUNK_SIZE);
    const chunkNumber = Math.floor(i / CHUNK_SIZE) + 1;
    const sitemapName = `sitemap-${chunkNumber}.xml`;

    const urlElements = chunk.map(item => `  <url>
    <loc>${SITE_URL}/artigos/${item.slug}.html</loc>
    <priority>0.90</priority>
  </url>`).join('\n');

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

    fs.writeFileSync(path.join(ROOT_DIR, sitemapName), sitemapXML, 'utf-8');
    sitemapFiles.push(sitemapName);
  }

  // Create sitemap-index.xml
  const sitemapIndexEntries = sitemapFiles.map(file => `  <sitemap>
    <loc>${SITE_URL}/${file}</loc>
  </sitemap>`).join('\n');

  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexEntries}
</sitemapindex>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap-index.xml'), sitemapIndexXML, 'utf-8');
  console.log(`🗺️ Generated sitemap-index.xml with ${sitemapFiles.length} chunked sitemap files!`);

  // Update robots.txt to point to sitemap-index.xml
  const robotsTXT = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`;
  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robotsTXT, 'utf-8');
  console.log('🤖 Updated robots.txt pointing to sitemap-index.xml!');
}

run();
