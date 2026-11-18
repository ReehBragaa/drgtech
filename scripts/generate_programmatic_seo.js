/* ============================================
   DRGTech — Gerador de artigos v3.0 (editorial)

   Regras desta versão (ver docs/ADSENSE_COMPLIANCE.md):
   - Artigo PUBLICADO  = entrada do dataset.json que tem arquivo em
     data/editorial/<slug>.json. Indexável, com anúncios, no sitemap.
   - Artigo RASCUNHO   = entrada sem arquivo editorial. Página curta com
     noindex, SEM script de anúncios e FORA do sitemap.
   - Não existe mais texto-modelo comum a todos os artigos.
   - Não existe mais formulário/feedback que não faça nada de verdade.
   ============================================ */

const fs = require('fs');
const path = require('path');
const { countEditorial } = require('./count_words');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATASET_PATH = path.join(ROOT_DIR, 'data', 'dataset.json');
const EDITORIAL_DIR = path.join(ROOT_DIR, 'data', 'editorial');
const ARTICLES_DIR = path.join(ROOT_DIR, 'artigos');
const SITE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data', 'site.json'), 'utf-8'));

const SITE_URL = SITE.siteUrl;
const ADSENSE_CLIENT = SITE.adsenseClient;
const EDITOR = SITE.editor;
const TODAY_ISO = new Date().toISOString().slice(0, 10);

const CAT_LABELS = {
  windows: { name: 'Windows', badgeClass: 'badge-blue', cardCatClass: 'cat-windows', icon: '💻', iconClass: 'icon-blue' },
  celular: { name: 'Celular', badgeClass: 'badge-green', cardCatClass: 'cat-android', icon: '📱', iconClass: 'icon-green' },
  internet: { name: 'Internet', badgeClass: 'badge-purple', cardCatClass: 'cat-wifi', icon: '🌐', iconClass: 'icon-purple' },
  seguranca: { name: 'Segurança', badgeClass: 'badge-red', cardCatClass: 'cat-seguranca', icon: '🛡️', iconClass: 'icon-red' }
};

const BOX_CLASS = { info: 'info-box', dica: 'tip-box', atencao: 'warning-box', sucesso: 'success-box' };

/* ---------- utilitários de texto ---------- */

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Texto puro -> HTML seguro. Só converte `código` e **negrito**.
function inline(text) {
  let s = esc(text);
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return s;
}

function truncate(s, n) {
  const t = String(s || '').trim();
  if (t.length <= n) return t;
  return t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
}

/* ---------- blocos de conteúdo ---------- */

function renderBlock(b) {
  switch (b.tipo) {
    case 'p':
      return `        <p>${inline(b.texto)}</p>`;
    case 'lista':
      return `        <ul>\n${(b.itens || []).map(i => `          <li>${inline(i)}</li>`).join('\n')}\n        </ul>`;
    case 'passos':
      return `        <ol class="steps-list">\n${(b.itens || []).map((i, idx) => `          <li>
            <div class="step-num">${idx + 1}</div>
            <div class="step-text">${inline(i)}</div>
          </li>`).join('\n')}\n        </ol>`;
    case 'codigo':
      return `        <pre class="code-block"${b.linguagem ? ` data-lang="${esc(b.linguagem)}"` : ''}><code>${esc(b.texto)}</code></pre>`;
    case 'aviso': {
      const cls = BOX_CLASS[b.nivel] || BOX_CLASS.info;
      return `        <div class="${cls}">
          <div class="box-content"><p>${inline(b.texto)}</p></div>
        </div>`;
    }
    case 'tabela':
      return `        <div class="table-wrap">
          <table class="data-table">
            <thead><tr>${(b.cabecalho || []).map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead>
            <tbody>
${(b.linhas || []).map(l => `              <tr>${l.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('\n')}
            </tbody>
          </table>
        </div>`;
    default:
      return '';
  }
}

/* ---------- partes comuns da página ---------- */

function headHTML({ title, description, canonicalUrl, robots, withAds, jsonLd, ogType }) {
  const adsBlock = withAds
    ? `  <!-- Google AdSense: somente em artigos editoriais aprovados -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>`
    : `  <!-- Sem anúncios nesta página; meta de verificação da conta AdSense -->
  <meta name="google-adsense-account" content="${ADSENSE_CLIENT}" />`;
  const ld = (jsonLd || []).map(o => `  <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n  </script>`).join('\n');
  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} — DRGTech</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="${robots}" />
  <meta property="og:title" content="${esc(title)} — DRGTech" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="${ogType || 'article'}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:image" content="${SITE_URL}/img/og-preview.png" />
  <meta property="og:site_name" content="DRGTech" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)} — DRGTech" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${SITE_URL}/img/og-preview.png" />
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="icon" type="image/png" href="../img/favicon.png" />
  <link rel="shortcut icon" href="../favicon.ico" />
  <link rel="stylesheet" href="../css/style.css" />
${adsBlock}
${ld}
</head>`;
}

function headerHTML(item, catInfo) {
  return `  <div id="progress-bar"></div>

  <header class="site-header">
    <div class="header-inner">
      <a href="../index.html" class="logo">
        <img src="../img/logo.png" alt="DRGTech — Tecnologia do jeito simples" class="logo-img" />
      </a>
      <div class="header-search">
        <span class="search-icon">🔍</span>
        <input type="text" id="site-search-input" placeholder="Buscar tutoriais..." aria-label="Buscar tutoriais" />
      </div>
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
  </header>`;
}

function footerHTML() {
  return `  <footer class="site-footer">
    <div class="footer-bottom" style="max-width: var(--max-width); margin: 0 auto;">
      <p>© 2026 <strong>DRGTech</strong>. Todos os direitos reservados.</p>
      <!-- policy-links -->
      <p class="footer-legal"><a href="../sobre.html">Sobre</a> · <a href="../politica-editorial.html">Política editorial</a> · <a href="../contato.html">Contato</a> · <a href="../privacidade.html">Privacidade</a> · <a href="../termos.html">Termos de uso</a></p>
      <p><a href="../index.html">← Voltar ao início</a></p>
    </div>
  </footer>

  <button id="scroll-top" aria-label="Voltar ao topo">↑</button>
  <script src="../js/main.js"></script>`;
}

/* ---------- página editorial (publicada) ---------- */

function renderEditorial(item, ed, publishedBySlugId) {
  const catInfo = CAT_LABELS[item.categoria] || CAT_LABELS.windows;
  const canonicalUrl = `${SITE_URL}/artigos/${item.slug}.html`;
  const titulo = ed.titulo || item.keyword_principal;
  const palavras = countEditorial(ed);
  const readTime = `${Math.max(3, Math.round(palavras / 200))} min de leitura`;
  const publicado = ed.publicado_iso || TODAY_ISO;
  const atualizado = ed.atualizado_iso || publicado;

  const faq = ed.faq || [];
  const fontes = ed.fontes || [];

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titulo,
    description: ed.descricao,
    inLanguage: 'pt-BR',
    datePublished: publicado,
    dateModified: atualizado,
    mainEntityOfPage: canonicalUrl,
    image: `${SITE_URL}/img/og-preview.png`,
    author: { '@type': 'Person', name: EDITOR.nome, url: `${SITE_URL}/sobre.html` },
    publisher: { '@type': 'Organization', name: SITE.siteName, url: SITE_URL }
  };
  const schemaFAQ = faq.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(f => ({ '@type': 'Question', name: f.p, acceptedAnswer: { '@type': 'Answer', text: f.r } }))
  } : null;
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: catInfo.name, item: `${SITE_URL}/#${item.categoria}` },
      { '@type': 'ListItem', position: 3, name: titulo, item: canonicalUrl }
    ]
  };

  const sectionsHTML = (ed.secoes || []).map(sec => `
        <h2 id="${esc(sec.id)}">${esc(sec.titulo)}</h2>
${(sec.blocos || []).map(renderBlock).join('\n')}`).join('\n');

  const faqHTML = faq.length ? `
        <h2 id="perguntas-frequentes">Perguntas frequentes</h2>
        <div class="faq-accordion">
${faq.map(f => `          <div class="faq-item">
            <h3>${esc(f.p)}</h3>
            <p>${inline(f.r)}</p>
          </div>`).join('\n')}
        </div>` : '';

  const fontesHTML = fontes.length ? `
        <h2 id="fontes">Fontes consultadas</h2>
        <ul class="sources-list">
${fontes.map(s => `          <li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.titulo)}</a></li>`).join('\n')}
        </ul>` : '';

  // Relacionados: apenas artigos publicados
  let relIds = (ed.relacionados || []).filter(id => publishedBySlugId.byId.has(id) && id !== item.id);
  if (relIds.length < 2) {
    publishedBySlugId.list.forEach(p => {
      if (relIds.length < 3 && p.item.id !== item.id && p.item.categoria === item.categoria && !relIds.includes(p.item.id)) relIds.push(p.item.id);
    });
  }
  const relatedHTML = relIds.length ? `
        <div class="divider"></div>
        <div class="related-articles">
          <h2>Leia também</h2>
          <div class="related-grid">
${relIds.map(id => {
    const r = publishedBySlugId.byId.get(id);
    return `            <a href="${r.item.slug}.html" class="related-card">
              <span class="related-card-title">${esc(r.ed.titulo || r.item.keyword_principal)}</span>
            </a>`;
  }).join('\n')}
          </div>
        </div>` : '';

  const toc = [
    ...(ed.secoes || []).map(s => ({ id: s.id, t: s.titulo })),
    ...(faq.length ? [{ id: 'perguntas-frequentes', t: 'Perguntas frequentes' }] : []),
    ...(fontes.length ? [{ id: 'fontes', t: 'Fontes consultadas' }] : [])
  ];

  const appliesHTML = ed.aplica_se
    ? `\n        <p class="applies-to"><strong>Aplica-se a:</strong> ${inline(ed.aplica_se)}</p>` : '';

  return `<!DOCTYPE html>
<html lang="pt-BR">
${headHTML({
    title: titulo,
    description: ed.descricao,
    canonicalUrl,
    robots: 'index, follow',
    withAds: true,
    jsonLd: [schemaArticle, schemaFAQ, schemaBreadcrumb].filter(Boolean)
  })}
<body>
${headerHTML(item, catInfo)}

  <div class="article-page-wrapper">
    <main>

      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="../index.html">Início</a>
        <span class="breadcrumb-sep">›</span>
        <a href="../index.html#${item.categoria}">${catInfo.name}</a>
        <span class="breadcrumb-sep">›</span>
        <span>${esc(truncate(titulo, 40))}</span>
      </nav>

      <header class="article-header">
        <span class="article-badge ${catInfo.badgeClass}">${catInfo.name}</span>
        <h1 class="article-h1">${esc(titulo)}</h1>
        <div class="article-intro-meta">
          <span class="meta-item">${readTime}</span>
          <span class="meta-item">Atualizado em ${esc(ed.atualizado || SITE.lastReview)}</span>
          <span class="meta-item">Por <a href="../sobre.html">${esc(EDITOR.nome)}</a></span>
        </div>
      </header>

      <div class="article-intro">
        <strong>Resposta rápida:</strong> ${inline(ed.resposta_curta)}
      </div>

      <article class="article-body" id="article-body">
${(ed.intro || []).map(p => `        <p>${inline(p)}</p>`).join('\n')}${appliesHTML}
${sectionsHTML}
${faqHTML}
${fontesHTML}

        <div class="author-box">
          <div class="author-avatar">${esc(EDITOR.nome.charAt(0))}</div>
          <div class="author-info">
            <h4>${esc(EDITOR.nome)}</h4>
            <p>${esc(EDITOR.papel)}. Veja como pesquisamos e corrigimos nossos guias na <a href="../politica-editorial.html">política editorial</a>. Encontrou um erro? Escreva para <a href="mailto:${esc(EDITOR.email)}">${esc(EDITOR.email)}</a>.</p>
          </div>
        </div>
${relatedHTML}

      </article>
    </main>

    <aside class="toc-sidebar">
      <div class="toc-card">
        <div class="toc-title">Neste artigo</div>
        <ul class="toc-list">
${toc.map(t => `          <li><a href="#${esc(t.id)}">${esc(t.t)}</a></li>`).join('\n')}
        </ul>
      </div>
    </aside>
  </div>

${footerHTML()}
</body>
</html>`;
}

/* ---------- página de rascunho (noindex, sem anúncios) ---------- */

function renderDraft(item) {
  const catInfo = CAT_LABELS[item.categoria] || CAT_LABELS.windows;
  const canonicalUrl = `${SITE_URL}/artigos/${item.slug}.html`;
  const steps = (item.passo_a_passo || []).map((s, i) => `          <li>
            <div class="step-num">${i + 1}</div>
            <div class="step-text">${inline(s)}</div>
          </li>`).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
${headHTML({
    title: item.keyword_principal,
    description: truncate(item.resposta_curta, 155),
    canonicalUrl,
    robots: 'noindex, follow',
    withAds: false,
    jsonLd: []
  })}
<body>
${headerHTML(item, catInfo)}

  <div class="article-page-wrapper">
    <main>
      <header class="article-header">
        <span class="article-badge ${catInfo.badgeClass}">${catInfo.name}</span>
        <h1 class="article-h1">${esc(item.keyword_principal)}</h1>
      </header>

      <div class="warning-box">
        <div class="box-content"><p><strong>Guia resumido, em revisão.</strong> Esta página é uma versão curta e ainda não passou pela nossa revisão editorial completa. As informações podem estar incompletas ou desatualizadas. Consulte a documentação oficial do fabricante antes de alterar configurações do sistema.</p></div>
      </div>

      <div class="article-intro">
        <strong>Resumo:</strong> ${inline(item.resposta_curta)}
      </div>

      <article class="article-body" id="article-body">
        <h2 id="passos">Passos resumidos</h2>
        <ol class="steps-list">
${steps}
        </ol>
        <p><a href="../index.html">← Ver os guias completos</a></p>
      </article>
    </main>
  </div>

${footerHTML()}
</body>
</html>`;
}

/* ---------- execução ---------- */

function loadEditorial() {
  const map = new Map();
  if (!fs.existsSync(EDITORIAL_DIR)) return map;
  fs.readdirSync(EDITORIAL_DIR).filter(f => f.endsWith('.json')).forEach(f => {
    try {
      const ed = JSON.parse(fs.readFileSync(path.join(EDITORIAL_DIR, f), 'utf-8'));
      map.set(f.replace(/\.json$/, ''), ed);
    } catch (e) {
      console.error(`❌ JSON inválido em data/editorial/${f}: ${e.message}`);
    }
  });
  return map;
}

function run() {
  console.log('🚀 Gerador DRGTech v3.0 (editorial)');

  const dataset = JSON.parse(fs.readFileSync(DATASET_PATH, 'utf-8'));
  const editorial = loadEditorial();
  if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });

  const published = { byId: new Map(), list: [] };
  dataset.forEach(item => {
    const ed = editorial.get(item.slug);
    if (ed) {
      const entry = { item, ed };
      published.byId.set(item.id, entry);
      published.list.push(entry);
    }
  });

  const orphan = [...editorial.keys()].filter(slug => !dataset.some(d => d.slug === slug));
  if (orphan.length) console.warn(`⚠️ Arquivos editoriais sem entrada no dataset: ${orphan.join(', ')}`);

  let drafts = 0;
  dataset.forEach(item => {
    const entry = published.byId.get(item.id);
    const html = entry ? renderEditorial(item, entry.ed, published) : renderDraft(item);
    if (!entry) drafts++;
    fs.writeFileSync(path.join(ARTICLES_DIR, `${item.slug}.html`), html, 'utf-8');
  });
  console.log(`✅ ${published.list.length} artigos editoriais publicados | ${drafts} rascunhos (noindex, sem anúncios)`);

  // Sitemap: somente o que é indexável e aprovado
  const urls = [
    { loc: `${SITE_URL}/`, p: '1.00' },
    { loc: `${SITE_URL}/gerador-de-senha.html`, p: '0.80' },
    { loc: `${SITE_URL}/sobre.html`, p: '0.50' },
    { loc: `${SITE_URL}/politica-editorial.html`, p: '0.50' },
    { loc: `${SITE_URL}/contato.html`, p: '0.40' },
    { loc: `${SITE_URL}/privacidade.html`, p: '0.40' },
    { loc: `${SITE_URL}/termos.html`, p: '0.30' },
    ...published.list.map(e => ({ loc: `${SITE_URL}/artigos/${e.item.slug}.html`, p: '0.90', lastmod: e.ed.atualizado_iso || e.ed.publicado_iso })),
    ...SITE.staticAprovados.map(s => ({ loc: `${SITE_URL}/artigos/${s}.html`, p: '0.80' }))
  ];

  const urlsetXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.p}</priority>
  </url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), urlsetXML, 'utf-8');
  console.log(`🗺️ sitemap.xml com ${urls.length} URLs (somente conteúdo aprovado)`);

  // sitemap-index aponta apenas para o sitemap principal; remove o antigo sitemap-1.xml duplicado
  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
  </sitemap>
</sitemapindex>`, 'utf-8');
  const stale = path.join(ROOT_DIR, 'sitemap-1.xml');
  if (fs.existsSync(stale)) fs.unlinkSync(stale);

  fs.writeFileSync(path.join(ROOT_DIR, 'indexnow.json'), JSON.stringify({
    host: 'drgtech.com.br',
    key: 'drgtech-indexnow-key-2026',
    keyLocation: `${SITE_URL}/drgtech-indexnow-key-2026.txt`,
    urlList: urls.map(u => u.loc)
  }, null, 2), 'utf-8');
  fs.writeFileSync(path.join(ROOT_DIR, 'drgtech-indexnow-key-2026.txt'), 'drgtech-indexnow-key-2026', 'utf-8');

  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`, 'utf-8');
  console.log('🤖 robots.txt, sitemap-index.xml e indexnow.json atualizados');
}

run();
