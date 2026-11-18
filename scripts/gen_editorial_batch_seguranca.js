const fs = require('fs');
const path = require('path');
const { countEditorial, MIN_WORDS } = require('./count_words');

const EDITORIAL_DIR = path.resolve(__dirname, '..', 'data', 'editorial');
if (!fs.existsSync(EDITORIAL_DIR)) fs.mkdirSync(EDITORIAL_DIR, { recursive: true });

const segurancaArticles = [
  {
    id: 131,
    slug: "como-criar-uma-senha-segura-e-forte",
    titulo: "Como Criar uma Senha Segura e Forte: Guia Completo e Diretrizes NIST",
    descricao: "Aprenda a criar senhas fortes e inquebráveis baseadas nas diretrizes NIST: método das frases-senha (passphrases), gerenciadores e proteção contra força bruta.",
    resposta_curta: "Para criar uma senha verdadeiramente segura, adote o padrão recomendado pelo NIST (National Institute of Standards and Technology): utilize frases-senha longas com pelo menos 16 caracteres formadas por 4 ou mais palavras aleatórias fáceis de memorizar (ex: `Cavalo-Nuvem-Tijolo-Relogio!`), nunca reutilize a mesma senha entre sites diferentes e armazene suas credenciais em um gerenciador de senhas confiável protegido por autenticação de dois fatores (2FA).",
    aplica_se: "Todas as contas online, redes sociais, bancos e e-mails",
    intro: [
      "Durante décadas, a maioria dos sites e sistemas corporativos impôs aos usuários regras rígidas e antiquadas de criação de senhas: exigia-se um mínimo de 8 caracteres misturando letras maiúsculas, números e símbolos especiais, além de forçar trocas obrigatórias a cada 60 ou 90 dias. O resultado prático dessa abordagem foi desastroso: as pessoas passaram a criar variações previsíveis e fáceis de esquecer (como `Mudar@123` virando `Mudar@124`), facilitando o trabalho de softwares automatizados de ataque.",
      "Em resposta a essa realidade, o NIST (National Institute of Standards and Technology), órgão máximo de padrões tecnológicos dos Estados Unidos, reformulou integralmente suas diretrizes de identidade digital (Publicação Especial NIST SP 800-63B). A ciência criptográfica comprovou que o comprimento total da senha (entropia) é exponencialmente mais importante do que combinações confusas e curtas. Neste guia prático, ensinamos como construir frases-senha inquebráveis e como blindar sua identidade na web."
    ],
    secoes: [
      {
        id: "matematica-da-forca-bruta",
        titulo: "Entenda a Matemática da Força Bruta: Comprimento vs Complexidade",
        blocos: [
          { "tipo": "p", "texto": "A tabela abaixo ilustra o tempo médio que placas de vídeo modernas dedicadas (GPUs) com ferramentas de quebra de hash (como Hashcat) levam para quebrar diferentes padrões de senha:" },
          { "tipo": "tabela", "cabecalho": ["Padrão da Senha", "Exemplo Típico", "Número de Combinações", "Tempo para Quebra por Força Bruta"], "linhas": [
            ["8 caracteres (letras e números)", "Brasil24", "Cerca de 200 bilhões", "Menos de 5 minutos"],
            ["8 caracteres complexos", "Br@s!l24", "Cerca de 6 trilhões", "Menos de 8 horas"],
            ["12 caracteres complexos", "P@ss#w0rd!2026", "Cerca de 470 sextilhões", "Cerca de 2 a 3 anos"],
            ["18+ caracteres (Frase-senha)", "Laranja-Navio-Janela-Fogo!", "Mais de 100 octilhões", "Milhares de séculos (impossível na prática)"]
          ]},
          { "tipo": "aviso", "nivel": "sucesso", "texto": "Cada caractere adicional adiciona uma barreira exponencial de cálculo para computadores invasores. Uma senha de 16 caracteres comuns é ordens de grandeza mais resistente do que uma de 8 caracteres cheia de símbolos complexos." }
        ]
      },
      {
        id: "metodo-das-frases-senha-passphrases",
        titulo: "Passo 1: Dominar o Método das Frases-Senha (Passphrases)",
        blocos: [
          { "tipo": "p", "texto": "O método de frase-senha consiste em encadear palavras independentes da língua portuguesa ou termos memoráveis que não formem expressões óbvias ou provérbios populares conhecidos:" },
          { "tipo": "passos", "itens": [
            "Escolha de 4 a 5 palavras não correlacionadas (evite frases conhecidas de músicas, versículos ou ditados populares).",
            "Separe as palavras utilizando um caractere divisor amigável, como traço (`-`), ponto (`.`) ou espaço sublinhado (`_`).",
            "Insira uma palavra com letra maiúscula ou um número significativo apenas para atender a formulários que ainda exigem esses critérios legados.",
            "Exemplo prático de frase-senha ultra segura: `Caderno-Tigre-Nuvem-Violao.88`.",
            "Essa sequência possui mais de 28 caracteres, é facílima de digitar no teclado do celular e absolutamente impenetrável por ataques de dicionário."
          ]}
        ]
      },
      {
        id: "uso-de-gerenciador-de-senhas",
        titulo: "Passo 2: Utilizar um Gerenciador de Senhas Confiável",
        blocos: [
          { "tipo": "p", "texto": "Nenhum ser humano é capaz de memorizar 80 senhas longas e distintas para cada serviço da vida digital. Tentar memorizar tudo leva à armadilha fatal de reutilizar a mesma senha em múltiplos sites:" },
          { "tipo": "lista", "itens": [
            "**Bitwarden:** Solução de código aberto com auditorias públicas de segurança independentes, criptografia ponta a ponta (AES-256) e plano gratuito completo com sincronização ilimitada entre PC e celular.",
            "**1Password / KeePassXC:** Excelentes alternativas com armazenamento local isolado ou cofres corporativos compartilhados.",
            "**Chaves do iCloud / Google Password Manager:** Opções nativas integradas aos sistemas iOS e Android com preenchimento automático biométrico por Face ID ou impressão digital."
          ]},
          { "tipo": "p", "texto": "Com um gerenciador, você só precisa memorizar uma única **Senha Mestra** extremamente forte (sua frase-senha principal). O aplicativo cria e preenche senhas aleatórias de 20 caracteres para todos os outros sites." },
          { "tipo": "aviso", "nivel": "info", "texto": "Você pode gerar combinações aleatórias de alta entropia gratuitamente utilizando a ferramenta segura do nosso portal em nosso Gerador de Senha Online." }
        ]
      },
      {
        id: "ativar-autenticacao-dois-fatores-2fa",
        titulo: "Passo 3: Blindagem com Autenticação de Dois Fatores (2FA)",
        blocos: [
          { "tipo": "p", "texto": "Mesmo a senha mais forte do mundo pode ser vazada se o servidor de uma loja virtual onde você comprou sofrer uma invasão de banco de dados. O 2FA garante que a senha sozinha seja inútil para o invasor:" },
          { "tipo": "passos", "itens": [
            "Ative a Verificação em Duas Etapas em todas as contas prioritárias (e-mail principal, conta Google/Apple, bancos e WhatsApp).",
            "Dê preferência a aplicativos autenticadores baseados em códigos TOTP temporários de 30 segundos (como Google Authenticator, Microsoft Authenticator ou 2FAS) em vez de códigos enviados por SMS.",
            "Armazene os códigos de recuperação de emergência (códigos de backup de uso único) impressos ou guardados em local físico seguro fora do celular."
          ]}
        ]
      },
      {
        id: "o-que-nunca-fazer-ao-criar-senhas",
        titulo: "Passo 4: Armadilhas Comuns que Você Deve Evitar",
        blocos: [
          { "tipo": "lista", "itens": [
            "**Nunca use informações pessoais rastreáveis:** Datas de aniversário de filhos, nomes de animais de estimação, placas de carro ou times de futebol são as primeiras palavras testadas por criminosos usando técnicas de engenharia social (OSINT).",
            "**Evite substituições visuais óbvias:** Trocar a letra 'a' pelo número '4', 'e' por '3' ou 'o' por '0' em palavras comuns (como `P4ssw0rd`) já está mapeado em todas as tabelas de ataques de dicionário moderno.",
            "**Não anote senhas em papéis colados no monitor ou blocos de notas abertos na Área de Trabalho:** Utilize cofres criptografados."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O que a norma NIST SP 800-63B diz sobre troca periódica de senhas?",
        r: "O NIST desencoraja formalmente a obrigação de troca periódica de senhas (como forçar troca a cada 90 dias) a menos que haja evidência real de vazamento. Pesquisas empíricas comprovaram que forçar trocas frequentes faz os usuários criarem senhas mais fracas e previsíveis."
      },
      {
        p: "Por que o envio de código 2FA por SMS é considerado inseguro?",
        r: "O protocolo SMS não possui criptografia ponta a ponta e é suscetível ao golpe do SIM Swap (quando criminosos convencem a operadora de telefonia a transferir sua linha para um chip em posse deles). Aplicativos autenticadores geram os códigos localmente no processador do celular, sem depender de rede celular."
      },
      {
        p: "Gerenciadores de senhas em nuvem podem ser hackeados?",
        r: "Embora os servidores possam sofrer ataques, os gerenciadores sérios utilizam a arquitetura 'Zero-Knowledge' (Conhecimento Zero). O cofre é criptografado localmente no seu aparelho com a sua Senha Mestra antes de subir para a nuvem. Mesmo que os servidores sejam invadidos, os criminosos obtêm apenas um bloco ilegível de bytes criptografados."
      },
      {
        p: "O que é entropia de uma senha?",
        r: "Entropia é a medida matemática em bits da aleatoriedade e imprevisibilidade de uma chave criptográfica. Uma senha com 80 ou mais bits de entropia é considerada matematicamente inviolável por capacidades computacionais conhecidas na atualidade."
      },
      {
        p: "As senhas tradicionais vão acabar com a chegada das Passkeys?",
        r: "Sim, gradualmente. As Passkeys (chaves de acesso FIDO2) utilizam biometria e criptografia de chave pública, eliminando a digitação de senhas e sendo imunes ao phishing. No entanto, senhas fortes e frases-senha ainda serão necessárias por muitos anos durante o período de transição dos serviços online."
      }
    ],
    fontes: [
      {
        titulo: "NIST Special Publication 800-63B — Digital Identity Guidelines: Authentication and Lifecycle Management",
        url: "https://pages.nist.gov/800-63-3/sp800-63b.html"
      },
      {
        titulo: "CISA — Multi-Factor Authentication and Password Guidance",
        url: "https://www.cisa.gov/resources-tools/resources/multi-factor-authentication"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [132, 166, 165, 201]
  },
  {
    id: 132,
    slug: "como-saber-se-email-e-falso-ou-golpe-phishing",
    titulo: "Como Saber se um E-mail é Falso ou Golpe de Phishing",
    descricao: "Guia prático para identificar e-mails fraudulentos e phishing: inspeção de cabeçalhos SPF/DKIM/DMARC, URLs camufladas e engenharia social.",
    resposta_curta: "Para identificar se um e-mail é falso, verifique o endereço do remetente real (o domínio após a @ e não apenas o nome de exibição), desconfie de mensagens que exigem urgência imediata ou ameaçam bloqueio de conta bancária, passe o cursor do mouse sobre links sem clicar para inspecionar a URL real de destino e confira os registros de autenticação SPF, DKIM e DMARC no cabeçalho original da mensagem.",
    aplica_se: "Gmail, Outlook, Yahoo e clientes corporativos de e-mail",
    intro: [
      "O phishing por correio eletrônico continua sendo o vetor de ataque número um utilizado por cibercriminosos no mundo inteiro para invadir computadores corporativos, roubar credenciais bancárias e sequestrar dados de usuários comuns. Se antigamente os e-mails fraudulentos eram fáceis de identificar por conter erros grotescos de português e layouts deformados, hoje em dia as quadrilhas utilizam ferramentas de inteligência artificial generativa e clonam fielmente os logotipos, tipografias e templates oficiais de grandes bancos e empresas.",
      "Apesar da aparência visual convincente, a infraestrutura da internet possui assinaturas criptográficas e protocolos de transporte que golpistas não conseguem falsificar sem deixar rastros evidentes. Saber onde olhar no aplicativo de e-mail permite desmascarar a fraude em menos de trinta segundos. Neste guia completo, ensinamos os passos práticos para analisar a autenticidade de mensagens suspeitas."
    ],
    secoes: [
      {
        id: "anatomia-do-golpe-phishing",
        titulo: "Os Três Gatilhos Psicológicos Mais Usados em Golpes",
        blocos: [
          { "tipo": "p", "texto": "Criminosos digitais exploram reações emocionais imediatas para impedir que a vítima raciocine criticamente antes de clicar em links perigosos:" },
          { "tipo": "tabela", "cabecalho": ["Gatilho Emocional", "Exemplo de Assunto do E-mail", "Mecanismo de Manipulação"], "linhas": [
            ["Falsa Urgência / Medo", "'Sua conta será cancelada em 2 horas' ou 'Aviso de bloqueio judicial'", "Induz o pânico para que a vítima clique imediatamente sem analisar o remetente."],
            ["Curiosidade / Ganância", "'Você recebeu uma transferência via Pix desconhecida' ou 'Cupom de R$ 500'", "Estimula o clique rápido na expectativa de obter vantagem financeira."],
            ["Autoridade / Compliance", "'Notificação de cobrança da Receita Federal' ou 'Boleto em atraso'", "Usa símbolos oficiais e brasões governamentais para forçar o download de anexos com vírus."]
          ]}
        ]
      },
      {
        id: "inspecionar-remetente-real",
        titulo: "Passo 1: Inspecionar o Endereço de E-mail Real (Display Name Spoofing)",
        blocos: [
          { "tipo": "p", "texto": "O erro mais comum cometido por usuários é confiar apenas no nome que aparece no topo da mensagem. Qualquer pessoa pode configurar seu nome de exibição como 'Banco do Brasil', mas o endereço real após o `@` revela a fraude:" },
          { "tipo": "passos", "itens": [
            "Passe o mouse ou toque sobre o nome do remetente no topo da mensagem para expandir o endereço completo.",
            "Verifique o domínio exato: e-mails legítimos de grandes instituições utilizam estritamente seus domínios proprietários (como `@bb.com.br` ou `@mercadolivre.com.br`).",
            "Desconfie de remetentes que utilizam provedores públicos gratuitos (como `@gmail.com`, `@outlook.com` ou `@bol.com.br`) se apresentando como departamentos jurídicos ou de suporte de multinacionais.",
            "Atenção para ataques de Typosquatting (troca sutil de letras): por exemplo, `contato@bancod0brasil.com.br` (com o número zero no lugar da letra O) ou `suporte@itau-seguranca-atualizacao.com`."
          ]}
        ]
      },
      {
        id: "checagem-segura-de-links",
        titulo: "Passo 2: Inspecionar Links sem Clicar (Hovering de URL)",
        blocos: [
          { "tipo": "p", "texto": "O texto visível de um botão ou link em HTML pode dizer 'Clique aqui para acessar seu banco', enquanto o link real escondido por trás aponta para um servidor malicioso:" },
          { "tipo": "passos", "itens": [
            "No computador, posicione o cursor do mouse sobre o botão ou link suspeito **sem clicar**.",
            "Observe o canto inferior esquerdo da tela do seu navegador ou programa de e-mail: o endereço real completo de destino será exibido em uma barra flutuante cinza.",
            "No celular, toque e mantenha o dedo pressionado sobre o link por 2 segundos até surgir o menu de contexto com a URL real antes de abrir.",
            "Identifique o domínio raiz (apex domain): certifique-se de que o endereço termina exatamente com o domínio oficial antes da primeira barra de diretório (`/`)."
          ]},
          { "tipo": "aviso", "nivel": "atencao", "texto": "Se a URL utilizar encurtadores de links (como bit.ly, tinyurl ou is.gd) em mensagens bancárias, trate a comunicação como fraude imediata. Bancos oficiais nunca utilizam encurtadores gratuitos em alertas de segurança." }
        ]
      },
      {
        id: "inspecionar-cabecalhos-spf-dkim-dmarc",
        titulo: "Passo 3: Conferir os Registros Criptográficos SPF, DKIM e DMARC",
        blocos: [
          { "tipo": "p", "texto": "Para ter certeza matemática de que o e-mail não foi forjado por servidores falsos na internet, consulte o cabeçalho técnico da mensagem:" },
          { "tipo": "passos", "itens": [
            "No **Gmail Web:** Abra o e-mail, clique no menu de três pontos ao lado do botão Responder e selecione **Mostrar original**.",
            "No painel superior do relatório original, o Google exibirá o resumo das três verificações criptográficas:",
            "- **SPF (Sender Policy Framework):** Deve constar como **PASS** (indica que o IP do servidor que enviou tem autorização da empresa).",
            "- **DKIM (DomainKeys Identified Mail):** Deve constar como **PASS** (indica que a mensagem tem assinatura digital válida e não foi alterada no caminho).",
            "- **DMARC:** Deve constar como **PASS**.",
            "Se o SPF ou o DMARC constarem como **FAIL** ou **SOFTFAIL**, o e-mail foi falsificado."
          ]}
        ]
      },
      {
        id: "o-que-fazer-se-clicou-no-golpe",
        titulo: "Passo 4: Procedimento de Emergência Caso Tenha Clicado ou Dado Senha",
        blocos: [
          { "tipo": "lista", "itens": [
            "**Se digitou senhas em página falsa:** Acesse imediatamente o site oficial digitando o endereço diretamente no navegador e altere a senha da sua conta e de todas as outras contas que compartilhavam a mesma credencial.",
            "**Se abriu anexos executáveis (arquivos .exe, .zip, .bat ou documentos do Office com macros):** Desconecte o computador da internet (remova o cabo de rede ou desligue o Wi-Fi) para interromper a comunicação de trojans e execute uma varredura completa offline com o Microsoft Defender.",
            "**Se digitou dados de cartão de crédito:** Abra o aplicativo do seu banco no celular e efetue o bloqueio temporário do cartão físico e a exclusão imediata do cartão virtual."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "Um e-mail enviado de dentro do domínio oficial da empresa pode ser golpe?",
        r: "Sim. Se um funcionário da empresa tiver sua conta de e-mail corporativo invadida por criminosos (comprometimento de conta corporativa - BEC), o invasor poderá disparar e-mails maliciosos a partir da caixa de correio legítima. Suspeite sempre de alterações repentinas de contas bancárias para pagamento de fornecedores."
      },
      {
        p: "Arquivos em formato PDF podem conter vírus?",
        r: "Sim. Arquivos PDF modernos suportam scripts embutidos (JavaScript), links externos maliciosos e podem explorar falhas de corrupção de memória em leitores de PDF desatualizados para executar códigos ocultos na máquina."
      },
      {
        p: "Os filtros anti-spam das caixas de entrada pegam 100% dos golpes?",
        r: "Não. Embora filtros de inteligência artificial de serviços como Gmail e Microsoft 365 bloqueiem mais de 99% dos spams em massa, ataques direcionados e campanhas recém-lançadas de dia zero (zero-hour phishing) conseguem transitar até a caixa de entrada antes de serem catalogados."
      },
      {
        p: "O cadeado verde de HTTPS no site prova que a página não é golpe?",
        r: "Não. O cadeado HTTPS prova unicamente que a conexão entre seu navegador e aquele servidor é criptografada. Cibercriminosos registram domínios falsos com certificados SSL gratuitos emitidos automaticamente para dar falsa impressão de legitimidade às páginas de phishing."
      },
      {
        p: "Como denunciar e-mails falsos?",
        r: "No próprio cliente de e-mail, clique no menu de opções da mensagem e selecione 'Denunciar phishing' (ou Denunciar tentativa de golpe). Isso envia a amostra para a equipe de cibersegurança do provedor de e-mail para alimentar os filtros de proteção de todos os usuários da plataforma."
      }
    ],
    fontes: [
      {
        titulo: "CISA — Recognizing and Avoiding Email Scams (Phishing)",
        url: "https://www.cisa.gov/news-events/news/recognizing-and-avoiding-email-scams"
      },
      {
        titulo: "Google Workspace Admin Help — Autenticação de e-mail com SPF, DKIM e DMARC",
        url: "https://support.google.com/a/answer/33786?hl=pt-BR"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [131, 166, 165, 152]
  },
  {
    id: 166,
    slug: "como-saber-se-email-senha-foram-vazados-internet",
    titulo: "Como Saber se Seu E-mail e Senha Foram Vazados na Internet",
    descricao: "Guia completo para checar vazamentos de dados: Have I Been Pwned, monitoramento de credenciais na dark web e plano de ação imediato.",
    resposta_curta: "Para verificar gratuitamente se seus e-mails e senhas constam em vazamentos de dados públicos da dark web, consulte o portal de referência mundial Have I Been Pwned (`haveibeenpwned.com`) mantido pelo especialista Troy Hunt. Se o seu e-mail aparecer associado a incidentes de segurança, altere imediatamente a senha da conta afetada, encerre sessões ativas conectadas e habilite a autenticação em duas etapas (2FA).",
    aplica_se: "Todos os e-mails, contas online e serviços digitais",
    intro: [
      "Quase todas as semanas os noticiários anunciam grandes mega-vazamentos de bancos de dados: lojas virtuais, plataformas de jogos, redes de hotéis e aplicativos de delivery que sofreram invasões em seus servidores, expondo milhões de registros de usuários. Esses arquivos contendo pares de e-mail e senha são comercializados em fóruns da dark web e compilados em coleções gigantescas para alimentar ataques automatizados de reuso de credenciais (Credential Stuffing).",
      "O maior perigo reside no fato de que muitas pessoas passam anos utilizando uma conta sem desconfiar que suas senhas antigas já circulam abertamente entre criminosos digitais. Felizmente, existem plataformas globais de transparência de segurança e ferramentas integradas nos navegadores que permitem consultar de forma segura e anônima se a sua identidade foi exposta em incidentes de terceiros. A seguir, ensinamos o método oficial para auditar suas credenciais e como agir caso encontre seus dados vazados."
    ],
    secoes: [
      {
        id: "como-funciona-have-i-been-pwned",
        titulo: "Passo 1: Consultar o Portal Oficial 'Have I Been Pwned' (HIBP)",
        blocos: [
          { "tipo": "p", "texto": "Criado e mantido pelo diretor regional da Microsoft e especialista em segurança cibernética Troy Hunt, o **Have I Been Pwned** é a autoridade máxima mundial em indexação segura de dados expostos:" },
          { "tipo": "passos", "itens": [
            "Acesse o site oficial através do endereço `haveibeenpwned.com`.",
            "Digite seu endereço de e-mail na barra central de pesquisa e clique no botão **pwned?**.",
            "**Se a tela ficar verde ('Good news — no pwnage found!'):** Seu e-mail não foi encontrado em nenhuma das grandes brechas públicas catalogadas.",
            "**Se a tela ficar vermelha ('Oh no — pwned!'):** O sistema listará detalhadamente todas as empresas e serviços que sofreram vazamentos nos quais o seu e-mail e dados associados estavam cadastrados.",
            "Role a página para ler quais tipos exatos de dados foram expostos em cada incidente (senhas criptografadas, datas de nascimento, números de telefone, endereços IP)."
          ]},
          { "tipo": "aviso", "nivel": "info", "texto": "O Have I Been Pwned é 100% seguro: você insere apenas o endereço de e-mail (que é uma informação pública) para consulta, sem digitar sua senha." }
        ]
      },
      {
        id: "checagem-senhas-k-anonymity",
        titulo: "Passo 2: Verificar a Segurança de uma Senha com K-Anonymity (Pwned Passwords)",
        blocos: [
          { "tipo": "p", "texto": "Se você quer saber se uma senha específica já faz parte dos dicionários de ataque dos criminosos, utilize a ferramenta Pwned Passwords (`haveibeenpwned.com/passwords`):" },
          { "tipo": "lista", "itens": [
            "**Modelo Matemático de K-Anonimato:** A ferramenta não envia sua senha pela rede. O seu navegador calcula o hash SHA-1 da senha e envia para os servidores apenas os primeiros 5 caracteres do hash. O servidor devolve uma lista de todos os hashes conhecidos que começam com aqueles 5 caracteres, e o seu navegador compara localmente.",
            "Se o retorno indicar que a senha já foi vista milhares de vezes, descarte-a imediatamente: qualquer robô de força bruta quebrará essa senha em fração de segundo."
          ]}
        ]
      },
      {
        id: "verificadores-nativos-google-apple",
        titulo: "Passo 3: Usar o Monitor de Senhas Nativo do Google e da Apple",
        blocos: [
          { "tipo": "p", "texto": "Tanto o Android/Chrome quanto o iPhone/iOS possuem monitores proativos integrados aos seus gerenciadores de credenciais:" },
          { "tipo": "passos", "itens": [
            "**No Google Chrome / Android:** Acesse `passwords.google.com` ou abra Configurações > Gerenciador de Senhas > **Check-up de Senha**. O Google informará com precisão quais contas salvas utilizam senhas comprometidas em vazamentos recentes.",
            "**No iPhone (iOS):** Acesse **Ajustes** > **Senhas** > **Recomendações de Segurança**. Ative a chave 'Detectar Senhas Comprometidas' e inspecione a lista de sites com o alerta vermelho de vazamento."
          ]}
        ]
      },
      {
        id: "plano-de-acao-imediato-pos-vazamento",
        titulo: "Passo 4: Plano de Ação Imediato se Seus Dados Foram Vazados",
        blocos: [
          { "tipo": "p", "texto": "Se o seu e-mail e senha constam em relatórios de vazamento, execute o protocolo padrão de contenção em ordem de prioridade:" },
          { "tipo": "passos", "itens": [
            "**1. Mudar a Senha do E-mail Principal Imediatamente:** O e-mail é o elo central da sua vida digital. Quem tem acesso ao seu e-mail consegue redefinir a senha de bancos, redes sociais e lojas virtuais.",
            "**2. Desconectar Sessões Desconhecidas:** Nas configurações de segurança da sua conta Google ou Microsoft, acesse 'Dispositivos conectados' e clique em 'Sair de todos os outros dispositivos'.",
            "**3. Verificar Regras de Encaminhamento Ocultas:** Criminosos frequentemente criam regras secretas na sua caixa postal que encaminham cópias de todos os seus e-mails recebidos para um endereço externo. No Gmail/Outlook, abra as Configurações de Filtros e Encaminhamento e apague qualquer regra suspeita.",
            "**4. Trocar Senhas em Sites Críticos:** Se você reutilizava a mesma combinação em outros serviços, altere as senhas de todas as contas por frases-senha únicas e ative o 2FA via app autenticador."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "Se o meu e-mail apareceu no vazamento, meu celular foi hackeado?",
        r: "Não necessariamente. Quando uma empresa (como o LinkedIn, Canva ou uma rede de farmácias) sofre uma invasão, a falha ocorreu nos servidores daquela empresa, e não no seu smartphone. No entanto, se você utilizava a mesma senha daquela empresa em outros serviços, essas outras contas ficam em risco iminente de invasão por força bruta."
      },
      {
        p: "O que é um ataque de 'Credential Stuffing'?",
        r: "É uma técnica automatizada onde criminosos pegam uma lista contendo milhões de pares de e-mail e senha vazados de um site invadido e utilizam robôs para testar essas mesmas combinações em massa contra centenas de outros sites (como bancos, Mercado Livre, Netflix e Steam) aproveitando o mau hábito dos usuários de repetir senhas."
      },
      {
        p: "Por que dados antigos vazados há anos ainda são perigosos?",
        r: "Porque muitas pessoas mantêm a mesma senha ou pequenas variações previsíveis por muitos anos. Além disso, dados biográficos como CPF, data de nascimento e nome da mãe nunca mudam e são utilizados em golpes de engenharia social para transferir linhas celulares (SIM Swap)."
      },
      {
        p: "Posso remover meu nome do site Have I Been Pwned?",
        r: "O site oferece um recurso de 'Opt-out' para não exibir publicamente os resultados ao digitar seu e-mail na busca aberta. No entanto, isso não apaga seus dados das listas reais que circulam na dark web nas mãos dos invasores; apenas oculta da consulta pública."
      },
      {
        p: "Como ativar alertas automáticos para novos vazamentos?",
        r: "No Have I Been Pwned, clique no menu 'Notify me' no topo da página e cadastre seu e-mail. Se seus dados surgirem em qualquer novo banco de dados no futuro, você receberá uma notificação instantânea e gratuita para trocar suas senhas antes que os criminosos iniciem os ataques."
      }
    ],
    fontes: [
      {
        titulo: "Have I Been Pwned — Check if your email or phone is in a data breach",
        url: "https://haveibeenpwned.com/"
      },
      {
        titulo: "Troy Hunt — The Philosophy Behind Pwned Passwords and K-Anonymity",
        url: "https://www.troyhunt.com/ive-just-launched-pwned-passwords-v2/"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [131, 132, 165, 201]
  },
  {
    id: 165,
    slug: "como-proteger-conta-whatsapp-contra-golpes-clonagem-sim-swap",
    titulo: "Como Proteger Sua Conta do WhatsApp Contra Golpes e SIM Swap",
    descricao: "Guia definitivo para blindar o WhatsApp: ativação do PIN de 2 etapas, proteção contra clonagem por SMS, prevenção de SIM Swap e recuperação de conta.",
    resposta_curta: "Para blindar sua conta do WhatsApp contra invasões e clonagem, ative imediatamente a confirmação em duas etapas configurando um PIN numérico secreto de 6 dígitos em Configurações > Conta > Confirmação em duas etapas e cadastre um e-mail de recuperação. Nunca informe códigos de 6 dígitos recebidos por SMS a ninguém, ative o bloqueio do app por biometria e configure Passkeys para autenticação direta.",
    aplica_se: "WhatsApp no Android e iPhone (iOS)",
    intro: [
      "O WhatsApp tornou-se o aplicativo central da vida profissional e pessoal dos brasileiros. Justamente por concentrar comunicações de trabalho, contatos familiares e histórico financeiro, a plataforma é o alvo prioritário de quadrilhas especializadas em extorsão, golpes de falso pedido de dinheiro e sequestro de contas.",
      "Muitos usuários acreditam que a 'clonagem' de WhatsApp decorre de softwares espiões complexos instalados à distância, mas a esmagadora maioria dos incidentes ocorre através de métodos de engenharia social (como convencer a vítima a fornecer o código SMS sob pretextos falsos de atualização cadastral) ou através do golpe do **SIM Swap** (quando o golpista desvia a linha telefônica na operadora). Neste guia completo, ensinamos as configurações definitivas para tornar sua conta matematicamente imune a essas ameaças."
    ],
    secoes: [
      {
        id: "diferenca-clonagem-sms-vs-sim-swap",
        titulo: "Entenda os Dois Maiores Golpes Aplicados no WhatsApp",
        blocos: [
          { "tipo": "p", "texto": "Saber como os criminosos operam é a melhor defesa para não cair nas armadilhas comuns:" },
          { "tipo": "tabela", "cabecalho": ["Modalidade do Golpe", "Como os Golpistas Agem", "O Que Impede o Golpe"], "linhas": [
            ["Golpe do Código SMS (Engenharia Social)", "Ligam ou mandam mensagem fingindo ser de hotéis, sites de vendas ou suporte, pedindo um código de 6 dígitos enviado por SMS.", "Regra de ouro: nunca ditar ou repassar códigos SMS de verificação para terceiros."],
            ["Golpe do SIM Swap (Troca de Chip)", "O criminoso usa dados vazados da vítima para convencer um atendente da operadora de celular a transferir o número para um chip virgem.", "A Confirmação em Duas Etapas (PIN interno do WhatsApp)."],
            ["Clonagem de Perfil com Foto Falsa", "O golpista não invade o app: ele apenas cria uma conta nova com outro número, copia sua foto de perfil pública e pede dinheiro a parentes.", "Ocultar foto de perfil para contatos e avisar familiares."]
          ]}
        ]
      },
      {
        id: "ativar-confirmacao-duas-etapas",
        titulo: "Passo 1: Ativar a Confirmação em Duas Etapas (O PIN Secreto)",
        blocos: [
          { "tipo": "p", "texto": "Esta é a configuração mais importante de todo o aplicativo. Mesmo que um criminoso consiga desviar o seu chip telefônico através de um atendente da operadora, ele não conseguirá entrar no WhatsApp sem este código numérico:" },
          { "tipo": "passos", "itens": [
            "Abra o **WhatsApp** e acesse as **Configurações** (no Android, três pontos no topo direito > Configurações; no iPhone, aba Configurações no canto inferior direito).",
            "Toque na opção **Conta**.",
            "Selecione **Confirmação em duas etapas**.",
            "Toque no botão **Ativar** (ou Configurar PIN).",
            "Crie um código PIN secreto de **6 dígitos** memorável (não utilize sequências óbvias como 123456 ou seu ano de nascimento).",
            "Confirme o código digitando-o novamente.",
            "Insira obrigatoriamente um **endereço de e-mail de recuperação** confiável (caso você esqueça o PIN no futuro, este será o único meio oficial para redefini-lo sem perder suas conversas)."
          ]},
          { "tipo": "aviso", "nivel": "sucesso", "texto": "O WhatsApp solicitará a digitação desse PIN esporadicamente para garantir que você não o esqueça. Trate esse código com o mesmo segredo da senha do seu banco." }
        ]
      },
      {
        id: "configurar-passkeys-chaves-acesso",
        titulo: "Passo 2: Configurar Chaves de Acesso (Passkeys) no WhatsApp",
        blocos: [
          { "tipo": "p", "texto": "As versões recentes do WhatsApp suportam o padrão de segurança Passkeys, permitindo autenticar a conta com biometria facial ou digital, dispensando SMS:" },
          { "tipo": "passos", "itens": [
            "Em **Configurações** > **Conta**, toque em **Chaves de acesso** (Passkeys).",
            "Toque em **Criar uma chave de acesso**.",
            "Confirme o vínculo da sua chave com o Gerenciador de Credenciais do Google ou Chaves do iCloud usando sua impressão digital ou Face ID.",
            "Com a Passkey ativada, mesmo que a rede celular sofra instabilidade, o seu aparelho valida a titularidade por criptografia local de hardware."
          ]}
        ]
      },
      {
        id: "bloqueio-por-biometria-e-privacidade",
        titulo: "Passo 3: Ativar o Bloqueio por Biometria e Blindar a Foto de Perfil",
        blocos: [
          { "tipo": "p", "texto": "Evite que pessoas que peguem seu celular desbloqueado acessem suas mensagens e impeça criminosos de usarem sua foto em perfis falsos:" },
          { "tipo": "lista", "itens": [
            "**Bloqueio por Impressão Digital / Face ID:** Acesse Configurações > Privacidade > Bloqueio por biometria (ou Bloqueio de tela no iPhone) e ative a opção para exigir autenticação 'Imediatamente'.",
            "**Ocultar Foto de Perfil de Desconhecidos:** Acesse Configurações > Privacidade > **Foto do perfil** e altere para **Meus contatos** (ou 'Meus contatos, exceto...'). Isso impede que golpistas baixem sua foto em alta resolução para criar contas falsas com outros números."
          ]}
        ]
      },
      {
        id: "procedimento-de-emergencia-conta-invadida",
        titulo: "Passo 4: O Que Fazer se a Sua Conta Já Foi Invadida",
        blocos: [
          { "tipo": "p", "texto": "Se um golpista conseguiu assumir o controle do seu WhatsApp, aja rapidamente para derrubar o acesso dele:" },
          { "tipo": "passos", "itens": [
            "Tente fazer login novamente no WhatsApp no seu celular digitando seu número de telefone e solicitando o código SMS. Assim que você entra com o código SMS, o criminoso é desconectado instantaneamente da sessão dele.",
            "Se o criminoso tiver cadastrado um PIN de confirmação em duas etapas que você não sabe, o app pedirá esse PIN. Você precisará aguardar 7 dias para redefinir o PIN, mas durante esse período de espera o criminoso também fica totalmente bloqueado de enviar mensagens.",
            "Envie um e-mail urgente para o suporte oficial do WhatsApp no endereço `support@whatsapp.com` com o assunto: **'Perdido/Roubado: Desative minha conta'** e no corpo do e-mail insira seu número em formato internacional (ex: `+55 11 99999-9999`). Isso desativa a conta imediatamente nos servidores da empresa."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O WhatsApp Web pode ser usado para espionar conversas?",
        r: "Sim, se alguém teve acesso físico ao seu celular desbloqueado por alguns segundos para escanear o QR Code. Para verificar e expulsar invasores, abra o WhatsApp, acesse 'Aparelhos conectados', examine a lista de navegadores ativos e toque em 'Desconectar' em qualquer sessão suspeita."
      },
      {
        p: "Como se proteger contra o golpe do SIM Swap na operadora?",
        r: "Ligue para a central de atendimento da sua operadora móvel (Claro, Vivo, TIM) e solicite a criação de uma senha verbal de segurança adicional para atendimento humano e exija que qualquer troca de chip presencial seja feita exclusivamente com biometria facial em loja oficial."
      },
      {
        p: "O que fazer se um parente cair no golpe da foto falsa e fizer um Pix?",
        r: "A vítima que realizou o pagamento deve acionar imediatamente o Mecanismo Especial de Devolução (MED) pelo aplicativo do próprio banco por onde enviou o Pix, informando que foi vítima de golpe de falsidade ideológica. O banco receptor efetuará o bloqueio cautelar dos fundos se a comunicação for rápida."
      },
      {
        p: "O WhatsApp envia mensagens pelo chat pedindo códigos?",
        r: "Nunca. O WhatsApp possui canais oficiais verificados (marcados com selo verde autêntico), mas NUNCA solicita códigos de validação por mensagens de texto ou chamadas de voz."
      },
      {
        p: "O backup de conversas no Google Drive ou iCloud é seguro?",
        r: "Para máxima privacidade, ative o 'Backup criptografado de ponta a ponta' em Configurações > Conversas > Backup de conversas. Sem essa chave, nem mesmo o Google ou a Apple conseguem ler suas mensagens nos servidores de nuvem."
      }
    ],
    fontes: [
      {
        titulo: "Central de Ajuda do WhatsApp — Como manter sua conta segura",
        url: "https://faq.whatsapp.com/1131652977717250/"
      },
      {
        titulo: "Central de Ajuda do WhatsApp — Contas roubadas e procedimentos de recuperação",
        url: "https://faq.whatsapp.com/1131750047788390/"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [131, 132, 166, 201]
  },
  {
    id: 152,
    slug: "como-proteger-arquivos-contra-ransomware-regra-backup-3-2-1",
    titulo: "Como Proteger Seus Arquivos Contra Ransomware com a Regra 3-2-1",
    descricao: "Guia completo de defesa contra sequestro de dados e ransomware: implementação da regra de backup 3-2-1-1-0, cópias imutáveis e proteção de pastas no Windows 11.",
    resposta_curta: "Para proteger seus arquivos de forma definitiva contra ataques de ransomware, implemente a metodologia padrão ouro de cibersegurança: a Regra de Backup 3-2-1-1-0. Mantenha 3 cópias de dados em pelo menos 2 tipos de mídias diferentes, com 1 cópia fora do local (nuvem), 1 cópia imutável ou offline (desconectada da rede elétrica/ar-gap) e 0 erros validados em testes periódicos de restauração. No Windows 11, ative também o recurso nativo de 'Acesso a Pastas Controladas' do Microsoft Defender.",
    aplica_se: "Windows 11, Windows 10, servidores e armazenamento corporativo",
    intro: [
      "O ransomware representa a ameaça cibernética mais destrutiva da atualidade para usuários domésticos e empresas de todos os portes. Diferente de vírus comuns que apenas exibem anúncios ou roubam senhas, os ransomwares modernos operam como armas criptográficas de extorsão: eles invadem o sistema, apagam silenciosamente as cópias de sombra do Windows (VSS), percorrem as unidades de rede compartilhadas e criptografam todos os seus documentos, fotos, bancos de dados e planilhas com cifras inquebráveis (como AES-256 e RSA-4096).",
      "Ao final da infecção, o invasor altera o papel de parede e deposita arquivos de texto com instruções exigindo resgates milionários em criptomoedas para fornecer a chave de descriptografia. A recomendação unânime de todas as agências internacionais de cibersegurança (incluindo CISA, FBI e autoridades brasileiras) é **nunca pagar o resgate**, pois o pagamento financia o crime organizado e não garante a devolução dos dados. A única salvação garantida é possuir cópias de segurança isoladas e imutáveis. A seguir, ensinamos como estruturar essa defesa na prática."
    ],
    secoes: [
      {
        id: "anatomia-do-ataque-ransomware",
        titulo: "Como os Ransomwares Modernos Agem no Windows",
        blocos: [
          { "tipo": "p", "texto": "Compreender as fases de um ataque moderno explica por que um simples backup em um pendrive que fica o tempo todo espetado no computador é inútil:" },
          { "tipo": "tabela", "cabecalho": ["Fase do Ataque", "Ação do Ransomware", "Por Que Destrói Backups Comuns"], "linhas": [
            ["1. Acesso e Reconhecimento", "Invasão via e-mail de phishing, RDP exposto ou vulnerabilidade de software.", "Mapeia todas as unidades de disco locais (C:, D:) e pastas compartilhadas na rede."],
            ["2. Destruição de Defesas", "Executa comandos como `vssadmin delete shadows /all /quiet` e desativa o WinRE.", "Inutiliza completamente a Restauração do Sistema nativa do Windows."],
            ["3. Criptografia em Massa", "Gera uma chave única e criptografa arquivos substituindo extensões.", "Se o seu HD externo de backup estiver conectado à porta USB, ele será criptografado junto."],
            ["4. Extorsão e Mensagem", "Exibe a nota de resgate com prazos em contagem regressiva.", "Sem um backup offline ou imutável, a perda dos dados é definitiva."]
          ]}
        ]
      },
      {
        id: "regra-de-backup-3-2-1-1-0",
        titulo: "Passo 1: Implementar a Estratégia de Backup 3-2-1-1-0",
        blocos: [
          { "tipo": "p", "texto": "A arquitetura de contingência recomendada por especialistas em continuidade de negócios é a evolução da regra 3-2-1 para a era do ransomware:" },
          { "tipo": "lista", "itens": [
            "**3 Cópias de Dados:** Mantenha os dados originais de produção e pelo menos mais duas cópias de segurança atualizadas.",
            "**2 Tipos Diferentes de Mídia:** Utilize suportes físicos distintos para evitar falhas sistêmicas (por exemplo, uma cópia em unidade de disco externa local e outra cópia em armazenamento em nuvem).",
            "**1 Cópia Fora do Local (Off-site):** Armazene uma cópia em um local geograficamente distante (nuvem como Google Drive, OneDrive, Backblaze B2 ou AWS S3) para sobreviver a furtos, inundações ou incêndios.",
            "**1 Cópia Imutável ou Offline (Air-Gapped):** Mantenha um HD externo que é conectado ao computador **apenas durante a gravação do backup e desconectado da porta USB logo em seguida**, ou utilize armazenamento em nuvem com bloqueio de exclusão (Object Lock). Cópias desconectadas não podem ser alcançadas por ransomwares que infectam a máquina.",
            "**0 Erros em Testes de Restauração:** Realize testes práticos mensais de recuperação para garantir que os arquivos salvos não estão corrompidos e abrem perfeitamente."
          ]}
        ]
      },
      {
        id: "acesso-pastas-controladas-windows-11",
        titulo: "Passo 2: Ativar o 'Acesso a Pastas Controladas' do Microsoft Defender",
        blocos: [
          { "tipo": "p", "texto": "O Windows 11 inclui uma barreira nativa antiransomware excelente que bloqueia qualquer aplicativo não autorizado de modificar arquivos em pastas protegidas:" },
          { "tipo": "passos", "itens": [
            "Abra o menu Iniciar e digite **Segurança do Windows**.",
            "Clique na seção **Proteção contra vírus e ameaças**.",
            "Role até a seção inferior **Proteção contra ransomware** e clique no link **Gerenciar proteção contra ransomware**.",
            "Ative a chave seletora **Acesso a pastas controladas** (Controlled Folder Access).",
            "Clique em 'Pastas protegidas' para adicionar pastas personalizadas de trabalho além das pastas padrão (Documentos, Fotos, Vídeos, Área de Trabalho).",
            "Se um aplicativo confiável for bloqueado ao tentar salvar um arquivo, clique em 'Permitir um aplicativo pelo Acesso a pastas controladas' para adicioná-lo à lista de exceções."
          ]},
          { "tipo": "aviso", "nivel": "sucesso", "texto": "Com o Acesso a Pastas Controladas ativo, mesmo que um executável malicioso de ransomware rode na máquina, o kernel do Windows interceptará a tentativa de criptografia e bloqueará a alteração em tempo real." }
        ]
      },
      {
        id: "desativar-servicos-vulneraveis-rdp",
        titulo: "Passo 3: Fechar Portas de Acesso Remoto (RDP e SMBv1)",
        blocos: [
          { "tipo": "p", "texto": "Muitas infecções corporativas ocorrem porque a porta de Área de Trabalho Remota (RDP) fica exposta diretamente para a internet:" },
          { "tipo": "passos", "itens": [
            "Em computadores domésticos, certifique-se de que a Área de Trabalho Remota está desativada em Configurações > Sistema > Área de Trabalho Remota.",
            "Desative o protocolo obsoleto SMB versão 1 (utilizado historicamente por ataques como o WannaCry) executando no PowerShell administrativo:",
            "Nunca abra a porta 3389 do seu roteador direcionada para computadores locais sem uma conexão VPN prévia."
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart" }
        ]
      }
    ],
    faq: [
      {
        p: "Por que as empresas de segurança recomendam nunca pagar o resgate?",
        r: "Pagar o resgate não garante que os criminosos entregarão a chave descriptografadora (estatísticas globais apontam que mais de 20% das vítimas pagam e nunca recebem nada). Além disso, comprova que a vítima é rentável, tornando-a alvo prioritário para novos ataques subsequentes."
      },
      {
        p: "O que são ferramentas de descriptografia gratuitas (No More Ransom)?",
        r: "O projeto internacional 'No More Ransom' (nomoreransom.org), criado pela Europol e líderes de cibersegurança, reúne centenas de chaves e ferramentas de descriptografia recuperadas em operações policiais contra quadrilhas. Se você for atacado, verifique a plataforma antes de qualquer decisão."
      },
      {
        p: "O backup no OneDrive ou Google Drive protege 100% contra ransomware?",
        r: "Protege se a função de 'Histórico de Versões' estiver disponível. Se os arquivos criptografados sincronizarem com a nuvem sobrescrevendo as versões limpas, serviços como OneDrive e Google Drive possuem recursos para reverter a pasta inteira para o estado de horas antes da infecção."
      },
      {
        p: "Um pendrive comum serve como backup seguro?",
        r: "Serve como cópia offline complementar, desde que você copie os arquivos e retire imediatamente o pendrive da porta USB física do computador. Se o pendrive ficar plugado permanentemente, ele será criptografado junto com o computador."
      },
      {
        p: "Qual a diferença entre cópia de backup e sincronização em tempo real?",
        r: "Sincronização em tempo real (como espelhamento de pastas) replica instantaneamente exclusões e alterações: se um arquivo for corrompido ou criptografado no computador, ele será corrompido na nuvem no mesmo segundo. Um backup verdadeiro preserva versões congeladas no tempo e possui regras de retenção histórica imutáveis."
      }
    ],
    fontes: [
      {
        titulo: "CISA — Stop Ransomware Official Guidance and Prevention Best Practices",
        url: "https://www.cisa.gov/stopransomware"
      },
      {
        titulo: "Europol / No More Ransom Project — Decryption Tools and Information",
        url: "https://www.nomoreransom.org/pt_BR/index.html"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [131, 132, 166, 168]
  },
  {
    id: 201,
    slug: "como-usar-passkeys-chaves-de-acesso-substituir-senhas-seguranca",
    titulo: "Como Usar Passkeys (Chaves de Acesso) para Substituir Senhas com Segurança",
    descricao: "Guia definitivo sobre Passkeys: padrão FIDO2/WebAuthn, como configurar no Google, Apple e WhatsApp, imunidade a phishing e métodos de recuperação.",
    resposta_curta: "Passkeys (chaves de acesso) são credenciais digitais baseadas no padrão criptográfico FIDO2/WebAuthn que substituem senhas tradicionais por autenticação biométrica (Face ID, impressão digital ou PIN local do aparelho). Elas utilizam um par de chaves assimétricas: a chave privada fica isolada no enclave de segurança do seu dispositivo e a chave pública é registrada no serviço. Como as chaves de acesso são vinculadas criptograficamente ao domínio do site, elas são matematicamente imunes a ataques de phishing.",
    aplica_se: "Android, iOS (iPhone/iPad), Windows 11, Mac e navegadores modernos",
    intro: [
      "Durante mais de meio século de computação moderna, as senhas de texto foram a base da segurança e autenticação na internet. No entanto, o fator humano sempre representou o elo mais vulnerável dessa equação: pessoas escolhem senhas fracas, reutilizam a mesma combinação em dezenas de sites e caem com facilidade em páginas falsas de phishing projetadas para roubar credenciais digitadas.",
      "Para resolver essa falha estrutural de uma vez por todas, as maiores empresas de tecnologia do planeta (Google, Apple, Microsoft) reuniram-se na FIDO Alliance e no consórcio W3C para desenvolver o padrão **Passkeys** (Chaves de Acesso). As chaves de acesso eliminam completamente a necessidade de criar, lembrar ou digitar senhas. O login em sites e aplicativos passa a ser realizado instantaneamente através da mesma biometria que você já usa para desbloquear o celular. Neste guia aprofundado, explicamos como a tecnologia funciona, como configurá-la nos principais serviços e como manter o acesso seguro caso perca seu aparelho."
    ],
    secoes: [
      {
        id: "como-funciona-criptografia-passkeys",
        titulo: "Como Funcionam as Passkeys: A Criptografia de Chave Pública",
        blocos: [
          { "tipo": "p", "texto": "A revolução das chaves de acesso baseia-se em princípios de criptografia assimétrica consolidada:" },
          { "tipo": "tabela", "cabecalho": ["Elemento Criptográfico", "Onde Fica Armazenado", "Como Atua na Proteção"], "linhas": [
            ["Chave Privada (Private Key)", "Gravada exclusivamente no hardware seguro do seu aparelho (TPM / Secure Enclave).", "Nunca sai do seu dispositivo, nunca transita pela internet e não pode ser roubada em invasões de servidores."],
            ["Chave Pública (Public Key)", "Registrada no servidor do site ou aplicativo (ex: servidores da Google).", "Serve apenas para validar matematicamente as assinaturas geradas pelo seu aparelho durante o login."],
            ["Desafio Criptográfico", "Gerado pelo servidor a cada tentativa de login.", "O aparelho assina o desafio com a chave privada após a confirmação biométrica do usuário."],
            ["Vínculo Criptográfico de Origem", "Atrelado estritamente ao domínio do site (ex: `google.com`).", "Impossível de sofrer phishing: o navegador se recusa a assinar o desafio se você estiver em um site falso como `google-falso.com`."]
          ]}
        ]
      },
      {
        id: "configurar-passkey-conta-google",
        titulo: "Passo 1: Como Configurar uma Chave de Acesso na Conta Google",
        blocos: [
          { "tipo": "p", "texto": "A Google permite utilizar o próprio smartphone como chave de acesso mestra para todos os seus serviços (Gmail, YouTube, Drive):" },
          { "tipo": "passos", "itens": [
            "Acesse a página oficial de segurança da sua conta em `myaccount.google.com/security`.",
            "Na seção 'Como você faz login no Google', clique em **Chaves de acesso e chaves de segurança**.",
            "Faça login com sua senha atual pela última vez.",
            "Clique no botão **Criar uma chave de acesso**.",
            "O navegador exibirá o pop-up nativo do sistema operacional solicitando a validação biométrica (Face ID, leitor de digitais ou PIN do Windows Hello).",
            "Confirme a biometria: sua chave de acesso estará criada e pronta para uso imediato em futuros logins com um único toque."
          ]}
        ]
      },
      {
        id: "configurar-passkey-apple-id",
        titulo: "Passo 2: Configurar Chaves de Acesso no Ecossistema Apple (iOS e Mac)",
        blocos: [
          { "tipo": "p", "texto": "No iPhone, iPad e Mac, as chaves de acesso são gerenciadas nativamente pelo Chaves do iCloud (iCloud Keychain) com sincronização criptografada ponta a ponta:" },
          { "tipo": "passos", "itens": [
            "Certifique-se de que as Chaves do iCloud estão ativadas em Ajustes > [Seu Nome] > iCloud > Senhas e Chaves.",
            "Ao acessar sites e serviços compatíveis (como PayPal, WhatsApp, Amazon ou eBay) pelo Safari, o sistema perguntará automaticamente: 'Deseja salvar uma chave de acesso para sua conta?'.",
            "Confirme com o Face ID ou Touch ID.",
            "A chave será sincronizada instantaneamente entre todos os seus dispositivos Apple logados no mesmo Apple ID."
          ]}
        ]
      },
      {
        id: "gerenciadores-senhas-terceiros-passkeys",
        titulo: "Passo 3: Usar Passkeys em Gerenciadores de Senhas (Bitwarden e 1Password)",
        blocos: [
          { "tipo": "p", "texto": "Se você utiliza simultaneamente aparelhos com sistemas diferentes (por exemplo, um computador Windows e um celular iPhone, ou um Mac com um celular Android), gerenciadores de terceiros oferecem portabilidade universal:" },
          { "tipo": "lista", "itens": [
            "Gerenciadores como **Bitwarden** e **1Password** suportam armazenamento nativo de Passkeys em suas extensões de navegador e aplicativos móveis.",
            "Ao salvar a chave no cofre do gerenciador, ela fica acessível em qualquer computador, independente do sistema operacional ou marca do dispositivo.",
            "O cofre permanece blindado pela sua Senha Mestra e pelo 2FA do aplicativo."
          ]}
        ]
      },
      {
        id: "o-que-acontece-se-perder-celular",
        titulo: "Passo 4: O Que Acontece se Você Perder ou Danificar o Celular?",
        blocos: [
          { "tipo": "p", "texto": "Um dos maiores receios dos usuários é perder o acesso às contas caso o aparelho seja roubado ou quebre. O padrão FIDO foi projetado com múltiplas camadas de recuperação:" },
          { "tipo": "lista", "itens": [
            "**Sincronização em Nuvem (Multi-device Passkeys):** As chaves de acesso são sincronizadas com segurança criptografada ponta a ponta através do Google Password Manager, Chaves do iCloud ou cofre do Bitwarden. Ao logar sua conta em um novo celular, todas as suas chaves são restauradas automaticamente.",
            "**Chaves Físicas FIDO de Backup (YubiKey):** Usuários avançados e empresas podem registrar chaves físicas USB/NFC (como YubiKey) como método secundário de acesso.",
            "**Métodos Tradicionais de Resgate:** Durante a fase de transição, os serviços mantêm métodos alternativos de recuperação (como código enviado ao e-mail alternativo cadastrado ou número de telefone verificado)."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "As Passkeys compartilham meus dados de impressão digital com os sites?",
        r: "Não. A biometria nunca sai do processador de segurança do seu próprio aparelho. O sensor biométrico serve unicamente para autorizar o chip local a assinar o desafio criptográfico. O site receptor recebe apenas a assinatura matemática pública, sem ter acesso aos seus dados biométricos."
      },
      {
        p: "Posso fazer login com minha Passkey em um computador público de uma lan house?",
        r: "Sim, com total segurança usando o recurso 'Fazer login com outro dispositivo'. O site no computador público exibirá um QR Code. Você abre a câmera do seu celular, escaneia o código e valida com sua biometria no celular. A conexão ocorre por proximidade Bluetooth e nenhuma credencial fica salva no computador público."
      },
      {
        p: "Por que as Passkeys são imunes a golpes de phishing?",
        r: "Porque o navegador valida a origem criptográfica exata (o domínio web). Se um criminoso criar um site falso perfeito chamado 'meubanco-seguro.com', seu aparelho reconhecerá que a chave foi registrada para 'meubanco.com.br' e se recusará terminantemente a assinar a autenticação."
      },
      {
        p: "O que acontece se eu desativar o Bluetooth durante o login entre aparelhos?",
        r: "A autenticação entre dispositivos diferentes (celular autenticando login no PC) exige que ambos estejam com Bluetooth ativado. O Bluetooth não transmite dados confidenciais, mas serve como prova física de proximidade (proximidade de rádio) para impedir que invasores remotos tentem forçar a validação à distância."
      },
      {
        p: "Todas as empresas já suportam Passkeys em 2026?",
        r: "A grande maioria dos líderes de tecnologia (Google, Apple, Microsoft, WhatsApp, Amazon, PlayStation, GitHub, Shopify, X/Twitter) já suporta chaves de acesso nativamente. O mercado bancário brasileiro também vem realizando a migração progressiva nos aplicativos móveis."
      }
    ],
    fontes: [
      {
        titulo: "FIDO Alliance — Passkeys (Chaves de Acesso): O futuro da autenticação segura",
        url: "https://fidoalliance.org/passkeys/"
      },
      {
        titulo: "Google Safety Center — Faça login com chaves de acesso em vez de senhas",
        url: "https://safety.google/authentication/passkey/"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [131, 132, 166, 165]
  }
];

let okCount = 0;
segurancaArticles.forEach(art => {
  const filePath = path.join(EDITORIAL_DIR, `${art.slug}.json`);
  const words = countEditorial(art);
  console.log(`Artigo ID ${art.id} (${art.slug}): ${words} palavras`);
  if (words >= MIN_WORDS) okCount++;
  else console.warn(`⚠️ Menos de ${MIN_WORDS} palavras: ${words}`);
  fs.writeFileSync(filePath, JSON.stringify(art, null, 2), 'utf-8');
});

console.log(`Lote Segurança processado: ${okCount}/${segurancaArticles.length} acima da meta de ${MIN_WORDS} palavras.`);
