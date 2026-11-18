# Adequação do DRGTech às Políticas para Editores do Google (AdSense)

Este documento registra a análise, as correções implementadas e os padrões contínuos do **DRGTech** (drgtech.com.br) para atender integralmente às Políticas para Editores do Google e aos Padrões de Qualidade da Pesquisa Google.

---

## 1. Motivação e Diagnóstico Inicial

Em análise prévia pelo programa Google AdSense, o site recebeu a notificação de **"Conteúdo de baixo valor"** (Low Value Content). Uma auditoria minuciosa em todo o ecossistema do DRGTech identificou as seguintes causas raízes:

### 1.1 Conteúdo em Escala com Baixo Texto Único
- **Problema:** O gerador anterior produzia 105 páginas a partir de um conjunto de dados onde cada artigo continha em média **112 palavras únicas**. O restante da página (~80%) era composto por blocos repetitivos idênticos ("Diagnóstico e Contexto Técnico", "Dicas de Prevenção Padrão", FAQ genérico e caixas de autoria sem nome).
- **Violação:** Enquadramento na política contra *Spam da Pesquisa Google* (produção de conteúdo em escala com pouca ou nenhuma agregação de valor) e *Políticas de Conteúdo do AdSense* (conteúdo superficial e duplicado entre páginas internas).

### 1.2 Declarações Não Verificáveis (Representação Enganosa)
- **Problema:** Presença de expressões como "testados por especialistas em TI", "em análises laboratoriais constatou-se" e "revisado por equipe editorial" sem identificação de autor, metodologia ou comprovação empírica.
- **Violação:** *Política de Representação Enganosa* do Google AdSense ("ocultar informações sobre o editor ou fazer alegações falsas sobre credenciais e testes").

### 1.3 Recursos Enganosos no Front-End
- **Problema:** Um formulário de captura com o texto *"Ainda tem dúvidas? Envie sua pergunta que entrará na fila de produção"* gravava os dados apenas no localStorage do navegador do visitante. O leitor era induzido a acreditar que uma equipe técnica receberia seu pedido.
- **Violação:** *Práticas Enganosas* do AdSense ("interagir com o conteúdo sob pretextos falsos").

### 1.4 Anúncios em Telas Sem Conteúdo Substancial (Valor do Inventário)
- **Problema:** O script de anúncios do Google AdSense (adsbygoogle.js) estava inserido indiscriminadamente em todas as páginas do site, incluindo páginas institucionais (sobre, contato, privacidade, termos, gerador-de-senha), na home e em páginas de artigos em rascunho.
- **Violação:** *Política de Valor do Inventário* ("anúncios não podem ser veiculados em páginas de navegação, utilitárias, de saída, páginas em construção ou telas sem conteúdo exclusivo").

### 1.5 Defasagens na Política de Privacidade e Consentimento
- **Problema:** A política de privacidade anterior não detalhava o uso de web beacons e coleta de endereços IP por parceiros de anúncios, omitia o link mandatório do Google (*"Como o Google usa informações de sites ou apps que utilizam nossos serviços"*), não detalhava os direitos previstos na LGPD (Lei 13.709/2018) nem declarava a faixa etária do público (COPPA).

---

## 2. Ações Corretivas Executadas

### 2.1 Separação Rigorosa entre Artigos Publicados e Rascunhos
Adotou-se o modelo editorial v3.0:
1. **Artigos Publicados (Aprovados):**
   - Somente matérias que possuem arquivo editorial dedicado em data/editorial/<slug>.json ou que constam em staticAprovados no data/site.json.
   - **Tamanho mínimo:** >= 900 palavras de texto corrido auditadas pelo script scripts/count_words.js.
   - **Estrutura:** Introdução contextual, seções técnicas aprofundadas, comandos com sintaxe validada, advertências de segurança, FAQ exclusivo de 4 a 6 perguntas e citações a pelo menos 2 fontes oficiais de fabricantes/documentação técnica.
   - **Monetização:** Somente estas páginas contêm o script de anúncios do AdSense.
   - **Indexação:** obots: index, follow e presença ativa no sitemap.xml.

2. **Artigos em Revisão / Rascunhos:**
   - As entradas do repositório que ainda não atingiram o padrão editorial mínimo são renderizadas com cabeçalho de aviso (*"Guia resumido em revisão editorial"*).
   - **Proteção contra penalidade:** Configurados com <meta name="robots" content="noindex, follow" />.
   - **Inventário limpo:** **Sem script de anúncios** (substituído pelo meta tag passivo <meta name="google-adsense-account" content="..." /> que preserva a verificação da propriedade sem veicular anúncios).
   - **Exclusão de sitemap:** Removidos do sitemap.xml para não consumir orçamento de rastreamento do Googlebot com conteúdo raso.

### 2.2 Transparência Editorial e Autoria
- **Editor Responsável:** Renato Braga (contato@drgtech.com.br), identificado em data/site.json, na página sobre.html, na nova politica-editorial.html e nos metadados estruturados Schema.org (Person).
- **Eliminação de Alegações Falsas:** Removidas todas as menções a "equipe de 20 especialistas" e alegações de testes laboratoriais não realizados.
- **Declaração de Metodologia:** O site declara expressamente que seus tutoriais são fundamentados na documentação técnica oficial dos fabricantes (Microsoft, Google, Apple, órgãos de padrões RFC/NIST) e redigidos com assistência de ferramentas de processamento de texto sob curadoria humana.

### 2.3 Remoção de Elementos Deceptivos
- O formulário que fingia enviar perguntas para uma "fila de produção" foi completamente removido do template de artigos e do arquivo js/main.js.
- O botão de feedback foi ajustado para evitar falsas promessas de atendimento individualizado.

### 2.4 Remoção de Anúncios de Telas Utilitárias
O script do AdSense foi removido de:
- index.html (Home)
- sobre.html (Sobre Nós)
- contato.html (Contato)
- privacidade.html (Política de Privacidade)
- 	ermos.html (Termos de Uso)
- politica-editorial.html (Política Editorial)
- gerador-de-senha.html (Ferramenta utilitária)

Todas estas páginas mantêm apenas a tag de verificação da conta:
<meta name="google-adsense-account" content="ca-pub-6942071950167193" />

### 2.5 Atualização Integral da Política de Privacidade
A página privacidade.html foi reconstruída contendo:
- Identificação do controlador dos dados e canal direto de atendimento (LGPD).
- Menção expressa a cookies, web beacons e armazenamento de dados de conexão por parceiros terceiros (Google AdSense).
- Link obrigatório: https://policies.google.com/technologies/partner-sites ("Como o Google usa informações de sites ou apps que utilizam nossos serviços").
- Instruções detalhadas para desativação de anúncios personalizados (Google Ads Settings, AboutAds, NAI).
- Esclarecimento sobre o uso de localStorage estritamente local no navegador.
- Cláusula de proteção a menores (não direcionado a menores de 13 anos nos termos da COPPA).

---

## 3. Guia de Manutenção e Verificação Periódica

Para manter a conformidade contínua e garantir aprovações futuras:

1. **Antes de publicar qualquer novo artigo:**
   
ode scripts/count_words.js data/editorial/<slug>.json
   *O arquivo deve ter no mínimo 900 palavras úteis (excluindo código e fontes).*

2. **Compilar os artigos e o sitemap:**
   
ode scripts/generate_programmatic_seo.js

3. **Verificar ausência de anúncios em páginas noindex:**
   Nenhum arquivo com <meta name="robots" content="noindex" pode conter <script async src="https://pagead2.googlesyndication.com....

4. **ads.txt:**
   Manter a linha padrão no arquivo raiz /ads.txt:
   google.com, pub-6942071950167193, DIRECT, f08c47fec0942fa0
   Confirmar se a URL https://drgtech.com.br/ads.txt responde com código HTTP 200 e Content-Type: text/plain.

---

## 4. Checklist do Usuário na Conta AdSense

Antes de solicitar a revisão final na plataforma do Google AdSense:

- [ ] **Acesse o painel do Google AdSense** -> clique em **Privacidade e mensagens**.
- [ ] Ative a mensagem de **Consentimento para o Regulamento Geral sobre a Proteção de Dados (GDPR/LGPD)** fornecida gratuitamente pelo próprio Google (CMP certificada).
- [ ] Verifique em **Configurações da Conta** se o nome do beneficiário, endereço e dados fiscais correspondem a dados reais.
- [ ] Abra no navegador https://drgtech.com.br/ads.txt e certifique-se de que carrega sem redirecionamentos incorretos.
- [ ] Somente após concluir o deploy no Vercel e validar os passos acima, clique em **"Confirmo que corrigi os problemas"** e em seguida em **"Pedir revisão"**.
