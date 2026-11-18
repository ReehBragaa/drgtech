const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT_DIR, 'artigos');
const SITE = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'data', 'site.json'), 'utf-8'));
const approvedSet = new Set(SITE.staticAprovados);

const staticFiles = [
  'bateria-celular-acaba-rapido.html',
  'celular-travando-lento-android.html',
  'impressora-offline-windows.html',
  'pendrive-boot-recuperacao-windows.html',
  'remover-virus-computador-gratis.html',
  'wifi-caindo-como-resolver.html',
  'consumo-oculto-bateria-segundo-plano-celular.html',
  'detectar-spywares-ocultos-keyloggers-rats.html',
  'diagnosticar-perda-pacotes-rede-local-cmd.html',
  'dns-spoofing-envenenamento-cache-como-proteger.html',
  'hd-ssd-100-disco-uso-como-resolver.html',
  'kernel-security-check-failure-como-resolver.html',
  'recuperar-celular-bootloop-loop-infinito.html',
  'vazamento-dados-webview-aplicativos-bancarios.html',
  'windows-11-bug-desligamento-hibernacao.html',
  'wmiprvse-alto-uso-cpu-como-resolver.html'
];

const policyFooter = '      <!-- policy-links -->\n      <p class="footer-legal"><a href="../sobre.html">Sobre</a> · <a href="../politica-editorial.html">Política editorial</a> · <a href="../contato.html">Contato</a> · <a href="../privacidade.html">Privacidade</a> · <a href="../termos.html">Termos de uso</a></p>';

staticFiles.forEach(file => {
  const filePath = path.join(ARTICLES_DIR, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  const slug = file.replace(/\.html$/, '');
  const isApproved = approvedSet.has(slug);

  // Common sanitization of fake claims
  content = content.replace(/testados por especialistas em TI/gi, 'baseados em documentações técnicas oficiais');
  content = content.replace(/testados por especialistas/gi, 'práticos e objetivos');
  content = content.replace(/testados e resolva o problema/gi, 'diretos para resolver o problema');
  content = content.replace(/testados para resolver o Wi-Fi/gi, 'diretos para resolver o Wi-Fi');
  content = content.replace(/BitDrive/g, 'BitLocker To Go');

  // Footer policy links
  if (!content.includes('<!-- policy-links -->')) {
    content = content.replace(
      /(<div class="footer-bottom"[^>]*>[\s\S]*?<p>[^<]*<\/p>)/,
      '$1\n' + policyFooter
    );
  }

  if (isApproved) {
    // Approved static article: ensure index and AdSense script
    content = content.replace(/<meta name="robots" content="[^"]*"/, '<meta name="robots" content="index, follow"');
    if (!content.includes('adsbygoogle.js')) {
      content = content.replace(
        /<\/head>/,
        '  <!-- Google AdSense -->\n  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + SITE.adsenseClient + '" crossorigin="anonymous"></script>\n</head>'
      );
    }
    console.log('[APROVADO] ' + file + ' atualizado (index, ads ativado)');
  } else {
    // Draft static article: NOINDEX and NO ADS (meta only)
    if (content.includes('<meta name="robots"')) {
      content = content.replace(/<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex, follow"');
    } else {
      content = content.replace(/<head>/, '<head>\n  <meta name="robots" content="noindex, follow" />');
    }

    // Remove AdSense script
    content = content.replace(/<!-- Google AdSense -->\s*<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=[^"]*" crossorigin="anonymous"><\/script>/gi, '');
    content = content.replace(/<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=[^"]*" crossorigin="anonymous"><\/script>/gi, '');

    // Ensure meta verification tag
    if (!content.includes('name="google-adsense-account"')) {
      content = content.replace(/<\/head>/, '  <!-- Sem anúncios; meta de verificação -->\n  <meta name="google-adsense-account" content="' + SITE.adsenseClient + '" />\n</head>');
    }

    // Add draft warning banner if not present
    if (!content.includes('guia em revisão')) {
      const banner = '\n    <div class="warning-box" style="margin: 16px 0 24px;">\n      <div class="box-content"><p><strong>Guia em revisão editorial:</strong> Este conteúdo está em processo de validação técnica aprofundada conforme nossos padrões editoriais de 2026.</p></div>\n    </div>\n';
      content = content.replace(/(<div class="article-body">)/, '$1' + banner);
    }

    console.log('[RASCUNHO] ' + file + ' ajustado para noindex e sem anúncios');
  }

  fs.writeFileSync(filePath, content, 'utf-8');
});
console.log('Sanitização de artigos estáticos concluída com sucesso!');
