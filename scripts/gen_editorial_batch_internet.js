const fs = require('fs');
const path = require('path');
const { countEditorial, MIN_WORDS } = require('./count_words');

const EDITORIAL_DIR = path.resolve(__dirname, '..', 'data', 'editorial');
if (!fs.existsSync(EDITORIAL_DIR)) fs.mkdirSync(EDITORIAL_DIR, { recursive: true });

const internetArticles = [
  {
    id: 140,
    slug: "como-corrigir-erro-dns-probe-finished-nxdomain-navegador",
    titulo: "Como Corrigir o Erro DNS_PROBE_FINISHED_NXDOMAIN no Navegador",
    descricao: "Guia completo para solucionar o erro DNS_PROBE_FINISHED_NXDOMAIN no Chrome e Edge: flushdns, troca para DNS público (1.1.1.1 / 8.8.8.8) e reset de Winsock.",
    resposta_curta: "O erro DNS_PROBE_FINISHED_NXDOMAIN ocorre quando o resolvedor DNS não consegue localizar o endereço IP numérico correspondente ao domínio solicitado (NXDOMAIN significa 'Non-Existent Domain'). Para corrigir, libere e limpe o cache DNS do sistema executando `ipconfig /flushdns` no Prompt como Administrador, redefina o catálogo de rede com `netsh winsock reset`, e configure resolvedores DNS públicos confiáveis (como Cloudflare 1.1.1.1 ou Google 8.8.8.8).",
    aplica_se: "Windows 11, Windows 10, macOS, Android e iOS",
    intro: [
      "Ao tentar abrir um site habitual no Google Chrome, Microsoft Edge ou Firefox, a página recusa o carregamento e exibe uma tela de alerta com o código de diagnóstico **DNS_PROBE_FINISHED_NXDOMAIN**. Esse é um dos erros de rede mais comuns na navegação moderna e impede que o dispositivo estabeleça contato com o servidor de hospedagem da página.",
      "Para entender a falha, imagine o DNS (Domain Name System) como a lista telefônica da internet: quando você digita um endereço amigável (como `drgtech.com.br`), o computador consulta um servidor DNS para descobrir o endereço IP numérico real daquele servidor. A sigla **NXDOMAIN** significa formalmente 'Non-Existent Domain' (Domínio Não Existente). Se o cache do seu computador tiver memorizado uma resposta corrompida ou se os servidores DNS do seu provedor de internet estiverem instáveis, o navegador presumirá erroneamente que o site não existe. A seguir, ensinamos o procedimento metódico para restaurar a navegação."
    ],
    secoes: [
      {
        id: "mecanica-resolucao-dns",
        titulo: "Entenda o Mecanismo da Falha NXDOMAIN",
        blocos: [
          { "tipo": "p", "texto": "A resolução de nomes de domínio segue uma hierarquia bem definida. A falha ocorre quando a resposta de inexistência é interceptada ou devolvida incorretamente em uma das etapas:" },
          { "tipo": "tabela", "cabecalho": ["Etapa de Consulta", "O Que Acontece", "Possível Causa do Erro"], "linhas": [
            ["Cache Local do Navegador", "Chrome checa tabela interna de DNS em memória.", "Cache de socket expirado ou corrompido no navegador."],
            ["Cache Local do Windows", "Serviço Cliente DNS do Windows consulta tabela local.", "Desligamentos súbitos ou alterações no arquivo hosts."],
            ["Roteador Wi-Fi Local", "Roteador repassa consulta aos servidores do provedor.", "Tabela NAT do roteador congestionada por conexões antigas."],
            ["Servidor DNS do Provedor", "Operadora consulta a árvore de servidores raiz.", "Instabilidade técnica temporária ou bloqueio de domínio."]
          ]}
        ]
      },
      {
        id: "limpar-cache-dns-windows",
        titulo: "Passo 1: Liberar e Limpar o Cache DNS no Windows (FlushDNS)",
        blocos: [
          { "tipo": "p", "texto": "O primeiro passo é purgar todos os registros DNS locais salvos no sistema operacional que possam estar apontando para rotas obsoletas:" },
          { "tipo": "passos", "itens": [
            "Pressione as teclas `Windows + X` e selecione **Terminal (Administrador)** ou **Prompt de Comando (Admin)**.",
            "Digite o comando abaixo e pressione Enter para descarregar o cache de nomes do Windows:",
            "Aguarde a mensagem de confirmação: 'Liberação do Cache do DNS Resolver bem-sucedida'.",
            "Em seguida, libere e renove o contrato de concessão de IP com o roteador:",
            "Reinicie os adaptadores de rede executando a sequência completa."
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "ipconfig /flushdns\nipconfig /release\nipconfig /renew" }
        ]
      },
      {
        id: "redefinir-winsock-pilha-ip",
        titulo: "Passo 2: Redefinir o Catálogo Winsock e a Pilha TCP/IP",
        blocos: [
          { "tipo": "p", "texto": "Softwares de antivírus ou VPNs antigas frequentemente instalam provedores de serviço em camadas (LSP) que travam o Winsock:" },
          { "tipo": "passos", "itens": [
            "Na mesma janela administrativa do Prompt, execute os dois comandos de redefinição de fábrica da rede:",
            "Reinicie o computador imediatamente após o término para consolidar as chaves de registro do protocolo TCP/IP."
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "netsh winsock reset\nnetsh int ip reset" }
        ]
      },
      {
        id: "mudar-dns-publico-seguro",
        titulo: "Passo 3: Mudar para Servidores DNS Públicos Confiáveis",
        blocos: [
          { "tipo": "p", "texto": "Os servidores DNS fornecidos automaticamente por operadoras de banda larga frequentemente sofrem quedas e lentidão de resposta. Configurar resolvedores globais resolve o erro na hora:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + R`, digite `ncpa.cpl` e pressione Enter para abrir as Conexões de Rede.",
            "Clique com o botão direito sobre o seu adaptador ativo (Wi-Fi ou Ethernet) e selecione **Propriedades**.",
            "Dê um duplo clique sobre o item **Protocolo IP Versão 4 (TCP/IPv4)**.",
            "Marque a opção **Usar os seguintes endereços de servidor DNS**.",
            "Para utilizar o DNS da **Cloudflare** (foco em máxima velocidade e privacidade), insira: Primário `1.1.1.1` e Secundário `1.0.0.1`.",
            "Para utilizar o DNS do **Google**, insira: Primário `8.8.8.8` e Secundário `8.8.4.4`.",
            "Marque a caixa 'Validar configurações na saída' e clique em **OK**."
          ]}
        ]
      },
      {
        id: "limpar-cache-dns-chrome",
        titulo: "Passo 4: Limpar o Cache de DNS Interno do Google Chrome",
        blocos: [
          { "tipo": "p", "texto": "O Google Chrome mantém seu próprio repositório isolado de DNS que não é afetado pelo comando do Windows:" },
          { "tipo": "passos", "itens": [
            "Abra uma nova aba no Google Chrome.",
            "Copie e cole o seguinte endereço na barra de navegação: `chrome://net-internals/#dns` e pressione Enter.",
            "Clique no botão **Clear host cache** (Limpar cache de host).",
            "Em seguida, acesse `chrome://net-internals/#sockets` e clique no botão **Flush socket pools**.",
            "Reinicie o navegador e tente carregar o site novamente."
          ]}
        ]
      },
      {
        id: "verificar-arquivo-hosts",
        titulo: "Passo 5: Inspecionar o Arquivo Hosts do Windows",
        blocos: [
          { "tipo": "p", "texto": "O arquivo `hosts` tem prioridade sobre qualquer servidor DNS. Se um malware ou programa de bloqueio tiver inserido uma linha com o endereço do site apontando para `127.0.0.1` ou `0.0.0.0`, o navegador retornará NXDOMAIN:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + R`, digite `notepad.exe C:\\Windows\\System32\\drivers\\etc\\hosts` (abra como Administrador).",
            "Examine as linhas no final do arquivo. Linhas normais de exemplo começam com o caractere `#`.",
            "Se você encontrar linhas contendo o nome do domínio que não abre associado a IPs locais (como `127.0.0.1 site.com`), apague essas linhas, salve o arquivo e feche o Bloco de Notas."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O erro DNS_PROBE_FINISHED_NXDOMAIN é problema do meu PC ou do site?",
        r: "Pode ser de ambos. Se apenas um site específico não abre em nenhum dispositivo da sua casa (nem no 4G do celular), o domínio do site expirou, o registro de DNS do dono do site está com erro ou o servidor dele caiu. Se o site abre normalmente no 4G do celular mas falha no Wi-Fi do computador, o problema é local da sua rede ou computador."
      },
      {
        p: "Por que reiniciar o roteador Wi-Fi às vezes resolve o NXDOMAIN?",
        r: "Roteadores domésticos mantêm um cache de nomes simplificado na memória RAM. Quando o roteador fica ligado por semanas seguidas, esse cache pode memorizar respostas negativas de DNS. Desligá-lo da tomada por 30 segundos esvazia a memória volátil e obriga o aparelho a buscar dados limpos."
      },
      {
        p: "O uso de VPN pode causar esse erro de DNS?",
        r: "Sim. Se a VPN cair de forma anômala, os adaptadores virtuais de rede (TAP/TUN) podem deixar configurações residuais de DNS ativo que não respondem fora do túnel criptografado. Desative a VPN e reinicie o adaptador de rede."
      },
      {
        p: "Qual é o DNS mais rápido: Google ou Cloudflare?",
        r: "Em testes globais independentes de latência de resposta, o DNS da Cloudflare (1.1.1.1) costuma apresentar tempos médios de resposta de 12 a 15 ms, enquanto o Google (8.8.8.8) opera entre 18 e 25 ms. Ambos são significativamente mais rápidos e estáveis do que os servidores padrão da maioria dos provedores."
      },
      {
        p: "Esse erro tem relação com vírus ou spywares?",
        r: "Em alguns casos, malwares do tipo Trojan Banker alteram as configurações de DNS do computador ou do roteador (técnica conhecida como DNS Hijacking) para desviar o usuário para páginas falsas. Se o servidor malicioso for desativado pela polícia, o computador passa a acusar erro NXDOMAIN."
      }
    ],
    fontes: [
      {
        titulo: "Google Chrome Help — Corrigir erros de conexão e páginas que não abrem",
        url: "https://support.google.com/chrome/answer/6098869?hl=pt-BR"
      },
      {
        titulo: "Cloudflare Docs — What is DNS and how does 1.1.1.1 work",
        url: "https://developers.cloudflare.com/1.1.1.1/what-is-1.1.1.1/"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [162, 141, 161, 196]
  },
  {
    id: 162,
    slug: "como-resolver-erro-err-connection-timed-out-chrome-edge",
    titulo: "Como Resolver o Erro ERR_CONNECTION_TIMED_OUT no Navegador",
    descricao: "Guia prático para solucionar o erro ERR_CONNECTION_TIMED_OUT no Chrome e Edge: tempo limite de conexão esgotado, ajuste de MTU e firewall.",
    resposta_curta: "O erro ERR_CONNECTION_TIMED_OUT indica que o navegador tentou estabelecer comunicação com o servidor de destino, mas não recebeu nenhuma resposta dentro do tempo limite tolerado (o aperto de mão TCP SYN não foi completado). Para resolver, reinicie o roteador de internet, desative temporariamente firewalls ou antivírus de terceiros com filtro de rede, limpe o cache SSL no Painel de Controle e reduza o valor de MTU da placa de rede caso esteja em conexões com sobrecarga de encapsulamento.",
    aplica_se: "Windows 11, Windows 10, Mac e celulares",
    intro: [
      "A mensagem **ERR_CONNECTION_TIMED_OUT** (Tempo de Conexão Esgotado) é uma das respostas mais clássicas de falha de comunicação na web. Ela indica que o seu computador conseguiu resolver o nome do domínio para um endereço IP válido, enviou os pacotes iniciais de solicitação de conexão (pacote TCP SYN), mas o servidor remoto simplesmente não respondeu com a confirmação (SYN-ACK) antes que o cronômetro de segurança do navegador expirasse.",
      "Ao contrário de erros de página não encontrada (como o 404), o timed out indica um bloqueio físico ou lógico no trajeto: ou o servidor de destino está fora do ar/sobrecarregado, ou existe um dispositivo intermediário (como o firewall local, um proxy mal configurado, a tabela de rotas da sua operadora ou o roteador Wi-Fi) descartando silenciosamente os pacotes de dados. A seguir, detalhamos a sequência técnica para rastrear o ponto de estrangulamento e reestabelecer o acesso."
    ],
    secoes: [
      {
        id: "anatomia-do-aperto-de-mao-tcp",
        titulo: "Entenda o Mecanismo Técnico do Timeout de Conexão",
        blocos: [
          { "tipo": "p", "texto": "Para que qualquer página web segura carregue via HTTP/HTTPS, o navegador e o servidor precisam concluir com sucesso o 'Three-Way Handshake' do protocolo TCP:" },
          { "tipo": "tabela", "cabecalho": ["Fase TCP", "Ação do Cliente / Servidor", "O Que Dá Erro no Timeout"], "linhas": [
            ["1. SYN (Sincronização)", "Seu computador envia um pacote solicitando abertura de canal de dados.", "O pacote sai do seu PC, mas é bloqueado por firewall ou descartado na rota."],
            ["2. SYN-ACK (Confirmação)", "O servidor responde aceitando a conexão e alocando portas.", "O servidor está sobrecarregado (DDoS) ou sua operadora perdeu a rota reversa."],
            ["3. ACK (Reconhecimento)", "Seu computador confirma e inicia o tráfego de páginas.", "Se o passo 2 não ocorrer em até 20–30 segundos, o navegador dispara ERR_CONNECTION_TIMED_OUT."]
          ]}
        ]
      },
      {
        id: "reiniciar-roteador-purgar-nat",
        titulo: "Passo 1: Ciclo Elétrico do Roteador para Limpar a Tabela NAT",
        blocos: [
          { "tipo": "p", "texto": "Roteadores Wi-Fi domésticos possuem processadores e memórias limitadas. Quando dezenas de aparelhos celulares e computadores abrem conexões simultâneas, a tabela NAT (Network Address Translation) satura:" },
          { "tipo": "passos", "itens": [
            "Desconecte a fonte de alimentação do roteador e do modem da tomada elétrica.",
            "Aguarde obrigatoriamente pelo menos **30 segundos** para que todos os capacitores da placa do roteador descarreguem por completo, limpando a memória volátil.",
            "Ligue o modem primeiro e aguarde as luzes de conexão (PON/DSL/WAN) estabilizarem.",
            "Em seguida, ligue o roteador Wi-Fi e aguarde 2 minutos até que todos os dispositivos se reconectem.",
            "Tente abrir o site novamente no navegador."
          ]}
        ]
      },
      {
        id: "limpar-estado-ssl-windows",
        titulo: "Passo 2: Limpar o Estado SSL e Configurações de Proxy no Windows",
        blocos: [
          { "tipo": "p", "texto": "Certificados de criptografia SSL desatualizados ou proxies corporativos fantasmas podem interceptar e congelar chamadas HTTPS:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + R`, digite `inetcpl.cpl` e pressione Enter para abrir as **Propriedades de Internet**.",
            "Acesse a aba **Conteúdo** e clique no botão **Limpar estado SSL**. Uma mensagem de confirmação 'O cache SSL foi limpo com êxito' será exibida.",
            "Em seguida, acesse a aba **Conexões** e clique no botão **Configurações da LAN**.",
            "Certifique-se de que a opção **Detectar automaticamente as configurações** está marcada.",
            "Desmarque impreterivelmente a opção **Usar um servidor proxy para a rede local** caso ela esteja ativada sem o seu consentimento.",
            "Clique em OK e em Aplicar."
          ]}
        ]
      },
      {
        id: "ajuste-tamanho-mtu-placa-rede",
        titulo: "Passo 3: Ajustar o Tamanho do MTU (Maximum Transmission Unit)",
        blocos: [
          { "tipo": "p", "texto": "Se o valor de MTU (Unidade Máxima de Transmissão) da sua placa de rede for maior do que o suportado pela infraestrutura da sua operadora (comum em conexões PPPoE com encapsulamento de fibra), os pacotes sofrerão fragmentação excessiva e serão descartados:" },
          { "tipo": "passos", "itens": [
            "Abra o Prompt de Comando como Administrador.",
            "Consulte os valores atuais de MTU das suas placas digitando:",
            "Se o valor estiver em 1500 mas sua conexão exigir cabeçalhos PPPoE extras, reduza o MTU para 1472 ou 1450 com o comando:",
            "Substitua 'Wi-Fi' pelo nome exato da sua interface ativa indicada na listagem anterior."
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "netsh interface ipv4 show subinterfaces\nnetsh interface ipv4 set subinterface \"Wi-Fi\" mtu=1472 store=persistent" }
        ]
      },
      {
        id: "teste-ping-traceroute-diagnostico",
        titulo: "Passo 4: Isolar a Rota com os Utilitários Ping e Traceroute",
        blocos: [
          { "tipo": "p", "texto": "Para ter certeza absoluta se o problema é da sua máquina ou da internet externa, execute um teste de rastreamento de saltos no console:" },
          { "tipo": "codigo", "linguagem": "powershell", "texto": "tracert drgtech.com.br" },
          { "tipo": "p", "texto": "Observe os resultados: se os asteriscos `* * * Esgotado o tempo limite do pedido` surgirem logo no primeiro salto (salto 1), o problema é na comunicação com seu próprio roteador. Se os saltos avançarem normalmente por 8 a 10 roteadores da sua operadora e falharem apenas no destino final, o servidor do site está indisponível na origem." }
        ]
      }
    ],
    faq: [
      {
        p: "O erro ERR_CONNECTION_TIMED_OUT pode ser culpa do próprio site?",
        r: "Sim. Se o servidor do site sofreu uma queda de energia, está passando por manutenção emergencial ou recebendo um volume de acessos simultâneos superior ao que suporta, ele deixará de responder às requisições, gerando o erro de timeout para todos os visitantes do mundo."
      },
      {
        p: "Como testar se o site está fora do ar apenas para mim ou para todos?",
        r: "Acesse ferramentas gratuitas de diagnóstico externo como o 'Down For Everyone Or Just Me' (downforeveryoneorjustme.com) ou 'IsItDownRightNow'. Esses serviços tentam acessar o site a partir de datacenters neutros e informam se a falha é generalizada ou local."
      },
      {
        p: "Antivírus de terceiros podem causar o erro de tempo esgotado?",
        r: "Sim. Módulos de proteção web de antivírus inspecionam o tráfego de pacotes na camada de rede. Se o módulo travar ou tiver regras desatualizadas, ele retém os pacotes de rede sem liberá-los para o navegador, forçando o estouro do cronômetro."
      },
      {
        p: "O que significa o código correspondente ERR_TIMED_OUT no celular?",
        r: "É exatamente a mesma falha do computador. No celular, experimente alternar entre Wi-Fi e dados móveis (4G/5G). Se o site abrir nos dados móveis, o problema reside na rota da sua banda larga doméstica."
      },
      {
        p: "Mudar o DNS resolve o erro de tempo de conexão esgotado?",
        r: "Geralmente não de forma direta, pois o timed out ocorre após a resolução do IP. Porém, se o DNS anterior apontava para um IP de CDN antigo e desativado do site, trocar para o DNS do Google (8.8.8.8) ou Cloudflare (1.1.1.1) entregará o endereço IP operacional mais recente."
      },
      {
        p: "Navegação anônima ou desativar extensões ajuda a testar timeouts?",
        r: "Sim. Abra uma janela anônima (Ctrl + Shift + N) que desativa extensões por padrão. Se o site carregar na janela anônima, alguma extensão instalada (bloqueadores de anúncios agressivos ou proxies de extensões) está interceptando e travando a conexão TCP."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — Solucionar problemas de conectividade TCP/IP",
        url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-server/networking/troubleshoot-tcp-ip-connectivity"
      },
      {
        titulo: "Google Chrome Developers — Network Error Codes and Timeouts",
        url: "https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [140, 141, 161, 196]
  },
  {
    id: 141,
    slug: "como-resolver-wifi-conectado-sem-acesso-internet-pc-celular",
    titulo: "Como Resolver Wi-Fi Conectado Sem Acesso à Internet no PC e Celular",
    descricao: "Solução passo a passo para o aviso 'Wi-Fi Conectado, mas Sem Internet' no Windows e celular: falha de DHCP, conflito de IP, DNS e reinício de roteador.",
    resposta_curta: "O status 'Conectado, sem internet' indica que seu dispositivo estabeleceu conexão física de rádio com o roteador Wi-Fi com sucesso, mas o roteador não está conseguindo encaminhar o tráfego para a rede externa da operadora ou não atribuiu um endereço IP válido via DHCP. Para resolver, reinicie o roteador retirando-o da tomada por 30 segundos, renove a concessão de IP com `ipconfig /release` e `ipconfig /renew` no PC (ou use 'Esquecer rede' no celular) e verifique se o modem da operadora está com sinal de fibra sincronizado.",
    aplica_se: "Windows 11, Windows 10, Android e iPhone",
    intro: [
      "Você olha para a barra de tarefas do computador ou para o topo da tela do celular e o ícone de Wi-Fi está visível, mas acompanhado por um ponto de exclamação, um pequeno triângulo amarelo ou a frustrante mensagem: **'Conectado, sem internet'** (ou 'Sem acesso à internet'). Nenhuma página carrega, o WhatsApp não envia mensagens e os aplicativos recusam conexão.",
      "Esse estado ambíguo confunde muitos usuários porque a palavra 'Conectado' dá a falsa impressão de que a internet deveria estar funcionando. Tecnicamente, a conexão possui duas metades independentes: a comunicação sem fio local entre o seu aparelho e o roteador (Camada 2 / Enlace) e a comunicação entre o seu roteador e os servidores da provedora de internet (Camada 3 / Rede). Estar conectado significa apenas que o sinal de rádio entre o celular e a caixinha do Wi-Fi está bom, mas a ponte para a rua caiu. A seguir, ensinamos o método oficial para restabelecer o sinal."
    ],
    secoes: [
      {
        id: "diagnostico-luzes-modem",
        titulo: "Passo 1: Inspecionar as Luzes Indicadoras do Modem da Operadora",
        blocos: [
          { "tipo": "p", "texto": "Antes de alterar configurações no computador ou celular, verifique o estado físico do modem da sua operadora (Claro, Vivo, Oi, provedor regional de fibra):" },
          { "tipo": "tabela", "cabecalho": ["LED no Modem", "Cor Normal", "Sintoma de Problema na Operadora"], "linhas": [
            ["PON / Fibra / WAN", "Verde ou Azul fixo", "Vermelho piscando ou apagado: cabo de fibra óptica rompido ou rompimento externo de poste."],
            ["Internet / Online", "Verde piscando rápido", "Apagado ou Laranja: falta de autenticação de usuário ou bloqueio na central do provedor."],
            ["LAN / Ethernet", "Verde fixo", "Apagado: cabo de rede desconectado entre o modem e o roteador principal."]
          ]},
          { "tipo": "aviso", "nivel": "atencao", "texto": "Se a luz PON ou Internet estiver vermelha ou piscando sem parar, o problema é externo na fiação do provedor e nenhuma alteração no celular resolverá; ligue para o suporte da sua operadora." }
        ]
      },
      {
        id: "renovacao-ip-dhcp-windows",
        titulo: "Passo 2: Renovar a Concessão de IP e Tratar Endereço APIPA no PC",
        blocos: [
          { "tipo": "p", "texto": "Se outros aparelhos da casa estão navegando normalmente e apenas o seu computador está sem internet, sua máquina pode ter recebido um endereço inválido de APIPA (iniciado em `169.254.x.x`):" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + X` e abra o **Terminal (Administrador)**.",
            "Digite o comando abaixo para conferir seu IP atual:",
            "Se o IPv4 começar com `169.254`, o roteador falhou ao entregar um IP via DHCP.",
            "Execute a liberação e renovação forçada digitando:",
            "Limpe os registros de nomes do Windows em seguida com `ipconfig /flushdns`."
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "ipconfig\nipconfig /release\nipconfig /renew" }
        ]
      },
      {
        id: "esquecer-rede-celular-android-ios",
        titulo: "Passo 3: 'Esquecer Rede' e Redefinir Parâmetros no Smartphone",
        blocos: [
          { "tipo": "p", "texto": "No celular Android ou iPhone, o perfil salvo da rede Wi-Fi pode ter mantido credenciais ou permissões de MAC Address travadas:" },
          { "tipo": "passos", "itens": [
            "No **iPhone (iOS):** Acesse Ajustes > Wi-Fi, toque no ícone de informação **(i)** ao lado do nome da sua rede e selecione **Esquecer Esta Rede**. Desligue o Wi-Fi por 10 segundos, reative-o, selecione a rede e digite a senha novamente.",
            "No **Android:** Acesse Configurações > Rede e Internet > Internet (ou Conexões > Wi-Fi). Toque no ícone de engrenagem ao lado da rede conectada e selecione **Esquecer** (ou Excluir). Reconecte digitando a senha.",
            "**Verificação de Endereço MAC:** Se o seu roteador tiver filtro de dispositivos, altere a opção 'Tipo de endereço MAC' de 'MAC Aleatório' para **MAC do Dispositivo** nas propriedades da rede do smartphone."
          ]}
        ]
      },
      {
        id: "configurar-dns-e-gateway-manual",
        titulo: "Passo 4: Configurar IP e DNS Estático para Descartar Falha no DHCP",
        blocos: [
          { "tipo": "p", "texto": "Se o servidor DHCP do roteador parou de entregar endereços automáticos, você pode atribuir um IP fixo na mesma faixa da rede:" },
          { "tipo": "passos", "itens": [
            "Abra as Conexões de Rede no Windows (`ncpa.cpl`).",
            "Abra as Propriedades do adaptador Wi-Fi > duplo clique em **TCP/IPv4**.",
            "Selecione 'Usar o seguinte endereço IP' e configure:",
            "- Endereço IP: `192.168.1.150` (ou `192.168.0.150`, dependendo da faixa do seu roteador).",
            "- Máscara de sub-rede: `255.255.255.0`.",
            "- Gateway padrão: `192.168.1.1` (o endereço de acesso do seu roteador).",
            "- Servidor DNS preferencial: `1.1.1.1` e alternativo: `8.8.8.8`.",
            "Salve as configurações e verifique se o triângulo amarelo desaparece."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O que causa conflito de endereço IP na rede local?",
        r: "Um conflito de IP ocorre quando dois dispositivos na mesma rede (por exemplo, sua Smart TV e seu computador) recebem exatamente o mesmo número de IP do roteador. Isso trava o tráfego de ambos os aparelhos. Reiniciar o roteador reorganiza a tabela DHCP e atribui IPs exclusivos para cada um."
      },
      {
        p: "O que significa quando o sinal do Wi-Fi está com exclamação?",
        r: "O ponto de exclamação é a representação visual dos sistemas operacionais para o teste de conectividade HTTP de sonda de rede (Captive Portal Detection). Se o sistema tentar acessar servidores de verificação (como connectivitycheck.gstatic.com do Google ou captive.apple.com da Apple) e não obtiver resposta 204, ele exibe a exclamação."
      },
      {
        p: "Redes Wi-Fi com tela de login (hotel, aeroporto) mostram esse erro?",
        r: "Sim. Em redes públicas com portal de autenticação, o aparelho ficará marcado como 'sem internet' até que você abra o navegador e preencha o cadastro ou aceite os termos de uso na tela de boas-vindas do estabelecimento."
      },
      {
        p: "Cabo de rede conectado funciona, mas o Wi-Fi fica sem internet?",
        r: "Isso indica que o sinal da internet no roteador está perfeito, mas o módulo de rádio sem fio do roteador está sofrendo interferência severa de canais vizinhos ou travou em uma frequência congestionada. Acesse as configurações do roteador e mude a largura de canal de 40MHz para 20MHz na faixa de 2.4 GHz."
      },
      {
        p: "Posso usar a ferramenta de Solução de Problemas do Windows?",
        r: "Sim. Clicar com o botão direito sobre o ícone de rede e selecionar 'Diagnosticar problemas de rede' reinicia o adaptador de rede e renova o contrato DHCP automaticamente na maioria dos casos simples."
      },
      {
        p: "Desativar o protocolo IPv6 temporariamente pode resolver a falta de internet?",
        r: "Sim. Em certas operadoras que sofrem instabilidade no túnel dual-stack IPv6, o computador tenta carregar rotas IPv6 inexistentes antes de recorrer ao IPv4, causando a impressão de queda total da rede. Desmarcar a caixa 'Protocolo IP Versão 6 (TCP/IPv6)' nas propriedades do adaptador de rede pode restabelecer a conexão imediata em IPv4."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Support — Corrigir problemas de conexão Wi-Fi no Windows",
        url: "https://support.microsoft.com/pt-br/windows/corrigir-problemas-de-conex%C3%A3o-wi-fi-no-windows-9424a1f7-6a3b-65a6-4d78-7f07eee84d2c"
      },
      {
        titulo: "Ajuda do Google Android — Corrigir problemas de conexão com a Internet em dispositivos Android",
        url: "https://support.google.com/android/answer/7680439?hl=pt-BR"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [140, 162, 161, 194]
  },
  {
    id: 161,
    slug: "como-mudar-dns-roteador-windows-android-iphone",
    titulo: "Como Mudar o DNS no Roteador, Windows, Android e iPhone",
    descricao: "Tutorial definitivo para alterar servidores DNS no roteador e em todos os dispositivos: comparativo de velocidade (1.1.1.1 vs 8.8.8.8 vs 9.9.9.9) e DNS Privado.",
    resposta_curta: "Para mudar o DNS no computador com Windows 11, acesse Configurações > Rede e Internet > Propriedades do Hardware > Atribuição de Servidor DNS, mude para 'Manual' e insira os IPs dos servidores desejados (como Cloudflare 1.1.1.1 ou Google 8.8.8.8). No Android, configure em Rede e Internet > DNS Privado inserindo o hostname `one.one.one.one` ou `dns.google`. No iPhone, ajuste nas propriedades da rede Wi-Fi em 'Configurar DNS' como Manual.",
    aplica_se: "Windows 11/10, Android, iOS e todos os roteadores Wi-Fi",
    intro: [
      "O Sistema de Nomes de Domínio (DNS) é o mecanismo central que traduz os nomes de sites que digitamos em endereços IP numéricos compreendidos pelos roteadores da internet. Por padrão, quando você contrata um plano de internet banda larga residencial ou plano móvel, seus dispositivos utilizam automaticamente os servidores DNS da sua operadora de telecomunicações.",
      "No entanto, os servidores DNS dos provedores comerciais costumam ser lentos, frequentemente sofrem instabilidades técnicas, mantêm registros de navegação para fins comerciais e podem falhar ao aplicar rotas otimizadas. Ao substituir os servidores DNS pelos grandes resolvedores globais independentes (como Cloudflare, Google ou Quad9), você ganha menor tempo de carregamento de páginas, proteção nativa contra phishing e maior privacidade. A seguir, ensinamos o passo a passo exato para trocar o DNS no roteador da sua casa e em cada aparelho individualmente."
    ],
    secoes: [
      {
        id: "comparativo-melhores-dns-publicos",
        titulo: "Qual o Melhor DNS Público Gratuito em 2026?",
        blocos: [
          { "tipo": "p", "texto": "Antes de configurar, escolha o provedor de DNS que melhor atende às suas prioridades de navegação:" },
          { "tipo": "tabela", "cabecalho": ["Provedor DNS", "IPs Primário / Secundário", "Destaque Principal", "Hostname DNS Privado (DoT)"], "linhas": [
            ["Cloudflare (1.1.1.1)", "1.1.1.1 e 1.0.0.1", "Menor latência global e política rigorosa de não reter logs.", "one.one.one.one"],
            ["Google Public DNS", "8.8.8.8 e 8.8.4.4", "Máxima estabilidade e infraestrutura de datacenters no Brasil.", "dns.google"],
            ["Quad9 (Proteção Ativa)", "9.9.9.9 e 149.112.112.112", "Bloqueio automático de domínios com malwares e phishing.", "dns.quad9.net"],
            ["AdGuard DNS (Filtro)", "94.140.14.14 e 94.140.15.15", "Bloqueio de anúncios intrusivos e rastreadores em nível de DNS.", "dns.adguard.com"]
          ]}
        ]
      },
      {
        id: "mudar-dns-roteador-wifi",
        titulo: "Método 1: Trocar o DNS Diretamente no Roteador Wi-Fi (Protege a Casa Toda)",
        blocos: [
          { "tipo": "p", "texto": "Alterar o DNS nas configurações do roteador é a abordagem mais eficiente, pois aplica os novos servidores automaticamente a todos os celulares, computadores, Smart TVs e consoles conectados à sua rede:" },
          { "tipo": "passos", "itens": [
            "Abra o navegador e digite o endereço de IP do seu roteador (habitualmente `192.168.0.1`, `192.168.1.1` ou `192.168.15.1`).",
            "Faça login com o usuário e senha de administrador (consulte a etiqueta na parte de baixo do aparelho se nunca alterou).",
            "Navegue até o menu **Rede** > **LAN** ou **Configurações DHCP** (em alguns modelos fica sob WAN/Internet).",
            "Localize os campos **Servidor DNS Primário** e **Servidor DNS Secundário**.",
            "Substitua os números existentes pelos servidores escolhidos (por exemplo, `1.1.1.1` e `1.0.0.1`).",
            "Clique em **Salvar** ou **Aplicar** e reinicie o roteador."
          ]}
        ]
      },
      {
        id: "mudar-dns-windows-11",
        titulo: "Método 2: Trocar o DNS no Windows 11",
        blocos: [
          { "tipo": "p", "texto": "No Windows 11, a Microsoft integrou o suporte nativo a DNS criptografado nas configurações centrais do sistema:" },
          { "tipo": "passos", "itens": [
            "Abra as **Configurações** (`Windows + I`) e clique em **Rede e Internet**.",
            "Clique na conexão ativa (**Wi-Fi** ou **Ethernet**).",
            "Clique em **Propriedades do Hardware**.",
            "Ao lado de 'Atribuição de servidor DNS', clique no botão **Editar**.",
            "Altere o menu suspenso de Automático (DHCP) para **Manual** e ative a chave **IPv4**.",
            "Insira no campo 'DNS Preferencial' o IP `1.1.1.1` e no 'DNS Alternativo' o IP `1.0.0.1`.",
            "Se desejar ativar criptografia DoH, mude o campo 'Criptografia de DNS' para **Apenas Criptografado (DNS sobre HTTPS)**.",
            "Clique em **Salvar**."
          ]}
        ]
      },
      {
        id: "mudar-dns-android-privado",
        titulo: "Método 3: Configurar o DNS Privado no Android (DoT)",
        blocos: [
          { "tipo": "p", "texto": "O Android utiliza a tecnologia DNS-over-TLS (DNS Privado), criptografando todas as consultas via Wi-Fi e dados móveis 4G/5G com um único ajuste:" },
          { "tipo": "passos", "itens": [
            "Acesse **Configurações** > **Rede e Internet** (ou Conexões > Mais configurações de conexão).",
            "Toque na opção **DNS Privado**.",
            "Selecione a opção **Nome de host do provedor de DNS privado**.",
            "Digite o hostname do serviço desejado: `one.one.one.one` (Cloudflare) ou `dns.google` (Google).",
            "Toque em **Salvar**. Se o endereço estiver correto, o texto de status indicará que a conexão está segura e criptografada."
          ]}
        ]
      },
      {
        id: "mudar-dns-iphone-ios",
        titulo: "Método 4: Trocar o DNS no iPhone e iPad (iOS)",
        blocos: [
          { "tipo": "p", "texto": "No iPhone, você pode definir servidores DNS específicos para a sua rede sem fio:" },
          { "tipo": "passos", "itens": [
            "Abra os **Ajustes** e toque em **Wi-Fi**.",
            "Toque no ícone azul de informação **(i)** ao lado do nome da sua rede conectada.",
            "Role até o final da tela e toque em **Configurar DNS**.",
            "Altere de Automático para **Manual**.",
            "Toque no botão vermelho de menos para remover os servidores DNS antigos da operadora.",
            "Toque em **Adicionar Servidor** e digite `1.1.1.1` e adicione outro com `1.0.0.1`.",
            "Toque em **Salvar** no canto superior direito."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "Mudar o DNS aumenta a velocidade de download de arquivos grandes?",
        r: "Não aumenta a taxa de transferência máxima em megabits por segundo (largura de banda), mas reduz a latência (tempo de resposta) de início de navegação. Clicar em links e abrir sites responderá de forma sensivelmente mais ágil porque o endereço IP do destino é resolvido em milissegundos."
      },
      {
        p: "Mudar o DNS pode deixar a internet mais lenta se configurado errado?",
        r: "Se você inserir um endereço IP de servidor DNS geograficamente muito distante ou desativado, o computador demorará vários segundos para descobrir cada site. Escolher resolvedores globais consagrados (Cloudflare ou Google) garante tempo de resposta mínimo no Brasil."
      },
      {
        p: "O que acontece se o servidor DNS que configurei cair?",
        r: "É exatamente por isso que configuramos sempre dois servidores: o DNS Primário e o Secundário (Alternativo). Se o primário falhar ou demorar para responder, seu sistema operacional consulta instantaneamente o secundário sem interromper sua navegação."
      },
      {
        p: "Mudar o DNS no roteador afeta o desempenho da Smart TV?",
        r: "Afeta positivamente. Smart TVs e consoles de videogame frequentemente utilizam requisições DNS para carregar catálogos e trailers em aplicativos como Netflix e YouTube. Resolvedores rápidos eliminam pequenas pausas ao carregar capas de vídeos."
      },
      {
        p: "O que é DNS-over-HTTPS (DoH) e DNS-over-TLS (DoT)?",
        r: "São tecnologias que criptografam as consultas de DNS. No modelo tradicional de 1983, as consultas são enviadas em texto puro sem segurança, permitindo que provedores de internet e espiões em Wi-Fi públicos saibam todos os sites que você visita. Com DoH/DoT, a consulta fica completamente ilegível para intermediários."
      },
      {
        p: "Como testar se o meu computador sofre com vazamento de DNS (DNS Leak)?",
        r: "Acesse o portal gratuito dnsleaktest.com e execute o teste estendido. A ferramenta listará os endereços IP de todos os servidores que resolveram requisições da sua máquina. Se os servidores exibidos pertencerem à Cloudflare ou Google (e não ao seu provedor local de banda larga), sua configuração está perfeitamente vedada sem vazamento."
      }
    ],
    fontes: [
      {
        titulo: "Google Developers — Public DNS Overview and Configuration",
        url: "https://developers.google.com/speed/public-dns/docs/using?hl=pt-br"
      },
      {
        titulo: "Cloudflare 1.1.1.1 — The free app that makes your Internet safer",
        url: "https://1.1.1.1/"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [140, 196, 141, 194]
  },
  {
    id: 194,
    slug: "como-resolver-aviso-seguranca-fraca-wifi-celular-pc",
    titulo: "Como Resolver o Aviso 'Segurança Fraca' no Wi-Fi do Celular e PC",
    descricao: "Guia completo para corrigir o alerta 'Segurança Fraca' no iPhone e Windows: migração de WPA/WPA2 (TKIP) para WPA2-AES (CCMP) ou WPA3 e desativação do WPS.",
    resposta_curta: "O aviso 'Segurança Fraca' surge no iPhone, Android e Windows 11 quando a sua rede Wi-Fi está utilizando protocolos de criptografia legados considerados vulneráveis, como WEP ou WPA/WPA2 com criptografia TKIP. Para solucionar definitivamente, acesse a página de administração do seu roteador Wi-Fi (192.168.0.1 ou 192.168.1.1), localize as configurações de Segurança Sem Fio e altere o modo para WPA2-Personal (AES) ou modo de transição WPA2/WPA3, desativando também a função WPS.",
    aplica_se: "iPhone (iOS 14 a 18), Android e Windows 11/10",
    intro: [
      "Ao conectar seu celular iPhone, smartphone Android ou computador com Windows 11 à rede Wi-Fi da sua própria residência ou escritório, você percebe um alerta amarelo sob o nome da rede exibindo a mensagem: **'Segurança Fraca'** (ou 'Weak Security'). O sistema operacional complementa avisando que o padrão utilizado não é seguro e recomenda reconfigurar o roteador.",
      "Esse aviso não significa que o seu aparelho foi hackeado ou que a sua senha foi descoberta. Trata-se de uma recomendação proativa de segurança introduzida pelas desenvolvedoras de sistemas operacionais para forçar o abandono de tecnologias de criptografia sem fio obsoletas dos anos 2000, como o WEP e o WPA com algoritmo TKIP, que podem ser quebradas por ferramentas automatizadas em poucos minutos. A seguir, ensinamos como atualizar as configurações do seu roteador para o padrão WPA2-AES ou WPA3, eliminando o aviso para sempre."
    ],
    secoes: [
      {
        id: "diferenca-protocolos-seguranca-wifi",
        titulo: "Entenda os Protocolos de Criptografia Wi-Fi",
        blocos: [
          { "tipo": "p", "texto": "A evolução da segurança de redes sem fio substituiu algoritmos frágeis por cifras criptográficas modernas de nível militar:" },
          { "tipo": "tabela", "cabecalho": ["Protocolo Wi-Fi", "Algoritmo de Cifra", "Nível de Segurança", "Gera Aviso de Segurança Fraca?"], "linhas": [
            ["WEP (Wired Equivalent Privacy)", "RC4 (estático)", "Quebrado em minutos com ferramentas públicas.", "Sim, alerta crítico de insegurança."],
            ["WPA (v1) ou WPA2 com TKIP", "TKIP (Temporal Key Integrity)", "Vulnerável a ataques de reinjeção e quebra de chave.", "Sim, gera o aviso 'Segurança Fraca'."],
            ["WPA2-PSK (AES / CCMP)", "AES-128 (Moderno)", "Padrão ouro de estabilidade e ampla compatibilidade.", "Não. Considerado perfeitamente seguro."],
            ["WPA3-Personal (SAE)", "AES-256 e Dragonfly handshake", "Mais moderno padrão de proteção contra dicionário e escuta.", "Não. Segurança máxima da indústria."]
          ]}
        ]
      },
      {
        id: "acessar-painel-roteador",
        titulo: "Passo 1: Fazer Login no Painel de Administração do Roteador",
        blocos: [
          { "tipo": "p", "texto": "Para alterar o tipo de criptografia, você precisará acessar a interface web interna do seu roteador sem fio:" },
          { "tipo": "passos", "itens": [
            "Conecte um computador ou celular à rede Wi-Fi (ou utilize um cabo de rede conectado à porta LAN).",
            "Abra o navegador de internet e digite o endereço do Gateway Padrão: habitualmente `192.168.0.1`, `192.168.1.1` ou `192.168.15.1` (no Windows, confirme o IP digitando `ipconfig` no CMD e checando o campo Gateway Padrão).",
            "Insira o nome de usuário e a senha de administração do roteador (se nunca alterou, consulte a etiqueta física na parte inferior do aparelho).",
            "Faça login para abrir o painel principal de controle."
          ]}
        ]
      },
      {
        id: "alterar-criptografia-wpa2-aes",
        titulo: "Passo 2: Configurar a Criptografia para WPA2-AES ou WPA3",
        blocos: [
          { "tipo": "p", "texto": "Dentro do menu de configurações do roteador, localize a seção de proteção sem fio:" },
          { "tipo": "passos", "itens": [
            "Acesse o menu **Sem Fio** (Wireless ou Wi-Fi) e entre em **Segurança Sem Fio** (Wireless Security).",
            "Se o roteador for dual-band (com redes 2.4 GHz e 5 GHz separadas), execute esta etapa em ambas as frequências.",
            "No campo 'Modo de Segurança' (Security Mode), selecione **WPA2-PSK** ou **WPA2-Personal** (ou WPA2/WPA3 Personal se o seu roteador for moderno).",
            "No campo 'Tipo de Criptografia' ou 'Cifra' (Encryption/Cipher), selecione obrigatoriamente **AES** ou **CCMP** (NUNCA selecione TKIP ou Automático/TKIP+AES).",
            "Clique no botão **Salvar** ou **Aplicar**."
          ]},
          { "tipo": "aviso", "nivel": "sucesso", "texto": "Ao selecionar WPA2-PSK com cifra estrita AES, você elimina a vulnerabilidade TKIP e garante a máxima taxa de transferência de dados suportada pelo padrão Wi-Fi 5 e Wi-Fi 6." }
        ]
      },
      {
        id: "desativar-wps-vulnerabilidade",
        titulo: "Passo 3: Desativar a Função WPS (Wi-Fi Protected Setup)",
        blocos: [
          { "tipo": "p", "texto": "O WPS é um recurso antigo criado para conectar impressoras ou celulares apertando um botão ou digitando um PIN de 8 dígitos. Ele possui uma falha grave de concepção matemática que permite a invasores descobrir a senha do seu Wi-Fi por força bruta:" },
          { "tipo": "passos", "itens": [
            "No painel do roteador, localize a aba **WPS** ou **Wi-Fi Protected Setup**.",
            "Altere o status da função de Habilitado para **Desativado** (Disabled).",
            "Salve as alterações e reinicie o roteador."
          ]}
        ]
      },
      {
        id: "reconectar-aparelhos-esquecer-rede",
        titulo: "Passo 4: Esquecer a Rede nos Dispositivos e Reconectar",
        blocos: [
          { "tipo": "p", "texto": "Como os parâmetros de criptografia foram alterados no roteador, o iPhone ou computador pode tentar conectar com o perfil antigo em cache:" },
          { "tipo": "passos", "itens": [
            "Acesse os ajustes de Wi-Fi do seu iPhone ou Windows, toque no nome da sua rede e selecione **Esquecer Esta Rede**.",
            "Desligue o Wi-Fi do aparelho por 5 segundos e ligue novamente.",
            "Toque sobre o nome do seu Wi-Fi, digite a senha e conecte-se.",
            "Observe que o aviso 'Segurança Fraca' terá desaparecido completamente."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "Mudar para WPA2-AES vai desconectar aparelhos antigos da casa?",
        r: "Aparelhos fabricados a partir de 2006 já suportam nativamente WPA2-AES. Dispositivos muito antigos de Internet das Coisas (como certas lâmpadas inteligentes ou impressoras de 2010) podem exigir suporte a 2.4 GHz, mas praticamente todos suportam AES sem problemas."
      },
      {
        p: "O que é o modo de transição WPA2/WPA3?",
        r: "É um modo híbrido compatível oferecido por roteadores modernos Wi-Fi 6. Ele permite que aparelhos novos (como iPhones e computadores recentes) se conectem usando a criptografia máxima WPA3, enquanto aparelhos mais antigos continuam se conectando em WPA2-AES sem quebrar a rede."
      },
      {
        p: "O aviso de Segurança Fraca gasta mais bateria no celular?",
        r: "Não. O aviso é apenas um alerta informativo visual do sistema operacional e não consome recursos adicionais de bateria ou processamento."
      },
      {
        p: "Se eu não trocar a configuração, alguém pode roubar meus dados?",
        r: "Em redes com TKIP ou WEP, um invasor no alcance do sinal Wi-Fi (na rua ou prédio vizinho) com um notebook e ferramentas de captura de pacotes pode injetar tráfego e desautenticar aparelhos. A migração para WPA2-AES neutraliza esses ataques."
      },
      {
        p: "Por que meu roteador novo veio de fábrica com TKIP ativado?",
        r: "Muitas fabricantes mantinham o modo misto 'WPA/WPA2 Auto' ou 'TKIP+AES' ativado por padrão por razões de retrocompatibilidade com produtos obsoletos. Hoje em dia, configurar apenas AES é a melhor prática recomendada pela Wi-Fi Alliance."
      },
      {
        p: "O que foram os ataques KRACK e FragAttacks contra redes Wi-Fi antigas?",
        r: "KRACK (Key Reinstallation Attack) e FragAttacks foram vulnerabilidades críticas descobertas no protocolo WPA2 com TKIP que permitiam a invasores interceptar e reinjetar pacotes em redes sem fio. Roteadores e sistemas que utilizam WPA2-AES e WPA3 com patches atualizados contêm mitigações nativas contra essas brechas."
      }
    ],
    fontes: [
      {
        titulo: "Suporte da Apple — Ajustes recomendados para roteadores e pontos de acesso Wi-Fi",
        url: "https://support.apple.com/pt-br/102766"
      },
      {
        titulo: "Wi-Fi Alliance — Security Guidelines and WPA3 Specification",
        url: "https://www.wi-fi.org/discover-wi-fi/security"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [141, 161, 196, 131]
  },
  {
    id: 196,
    slug: "como-configurar-dns-sobre-https-doh-chrome-firefox-edge",
    titulo: "Como Configurar DNS sobre HTTPS (DoH) no Chrome, Edge e Firefox",
    descricao: "Guia técnico para ativar DNS over HTTPS (DoH) no navegador e no Windows 11: criptografia de consultas DNS contra espionagem de operadoras e Wi-Fi público.",
    resposta_curta: "O DNS sobre HTTPS (DoH, RFC 8484) encapsula todas as consultas de nomes de sites dentro de pacotes criptografados TLS através da porta HTTPS padrão (porta 443), impedindo que provedores de internet ou invasores em redes Wi-Fi públicas espionem seu histórico de navegação. Para ativar no Google Chrome ou Edge, acesse Configurações > Privacidade e Segurança > Segurança, ative a opção 'Usar DNS seguro' e selecione um provedor como Cloudflare ou Google. No Firefox, habilite a 'Proteção Máxima' em Privacidade e Segurança.",
    aplica_se: "Google Chrome, Microsoft Edge, Mozilla Firefox e Windows 11",
    intro: [
      "Desde a criação da arquitetura da internet em 1983, o protocolo DNS tradicional opera através de pacotes UDP na porta 53 sem nenhuma criptografia. Isso significa que mesmo quando você acessa um site protegido por cadeado HTTPS (como um banco ou loja virtual), o seu provedor de internet, o administrador da rede Wi-Fi do café ou qualquer intermediário na rota consegue ler em texto puro o nome exato de cada domínio que você consulta.",
      "Para eliminar essa grave brecha histórica de privacidade e combater ataques de redirecionamento malicioso (DNS Spoofing), a indústria padronizou o **DNS sobre HTTPS** (DoH - RFC 8484). Com o DoH ativado, as consultas de resolução de nomes são transmitidas como tráfego HTTPS comum criptografado com certificados TLS modernos, misturando-se com o restante do tráfego web seguro e tornando sua navegação completamente blindada contra monitoramento externo. A seguir, ensinamos o passo a passo para habilitar o recurso no Chrome, Edge, Firefox e de forma global no Windows 11."
    ],
    secoes: [
      {
        id: "diferenca-dns-tradicional-vs-doh",
        titulo: "Como o DoH Protege a Sua Privacidade na Prática",
        blocos: [
          { "tipo": "p", "texto": "A comparação entre o modelo antigo e o protocolo DoH evidencia o salto de segurança para o usuário comum:" },
          { "tipo": "tabela", "cabecalho": ["Critério de Segurança", "DNS Convencional (Porta 53)", "DNS sobre HTTPS (DoH - Porta 443)"], "linhas": [
            ["Criptografia de Dados", "Nenhuma. Pacotes enviados em texto puro aberto.", "Criptografia ponta a ponta com TLS 1.3."],
            ["Visibilidade do Provedor (ISP)", "Seu provedor registra cada site que você digita.", "O provedor só enxerga tráfego HTTPS genérico para o resolvedor."],
            ["Vulnerabilidade a Redirecionamento", "Alta. Suscetível a ataques Man-in-the-Middle e spoofing.", "Blindado contra adulteração de respostas por assinatura criptográfica."],
            ["Bloqueio e Censura Indevida", "Fácil. Provedores aplicam bloqueios de DNS arbitrários.", "Impossível de filtrar sem derrubar todo o tráfego HTTPS."]
          ]}
        ]
      },
      {
        id: "configurar-doh-google-chrome",
        titulo: "Passo 1: Ativar DNS sobre HTTPS no Google Chrome",
        blocos: [
          { "tipo": "p", "texto": "No Google Chrome para computador ou Android, o recurso é habilitado nas opções de segurança:" },
          { "tipo": "passos", "itens": [
            "Abra o **Google Chrome** e clique no menu de três pontos no canto superior direito.",
            "Selecione **Configurações** e clique em **Privacidade e segurança** na barra lateral esquerda.",
            "Clique na opção **Segurança**.",
            "Role para baixo até a seção 'Avançado' e localize a opção **Usar DNS seguro**.",
            "Ative a chave seletora e marque a opção **Com** (Personalizado).",
            "No menu suspenso, escolha um resolvedor confiável: selecione **Cloudflare (1.1.1.1)** ou **Google (Public DNS)**.",
            "Feche o navegador e reabra para aplicar a criptografia imediata."
          ]}
        ]
      },
      {
        id: "configurar-doh-microsoft-edge",
        titulo: "Passo 2: Ativar DNS sobre HTTPS no Microsoft Edge",
        blocos: [
          { "tipo": "p", "texto": "No Microsoft Edge, o procedimento segue a mesma arquitetura Chromium:" },
          { "tipo": "passos", "itens": [
            "Abra o **Microsoft Edge**, clique nos três pontos e selecione **Configurações**.",
            "No menu lateral, selecione **Privacidade, pesquisa e serviços**.",
            "Role até a seção 'Segurança' e localize **Usar DNS seguro para especificar como pesquisar o endereço de rede para sites**.",
            "Marque a opção **Escolher um provedor de serviços**.",
            "Clique na caixa de seleção e escolha **Cloudflare (1.1.1.1)** ou **Google (Public DNS)**."
          ]}
        ]
      },
      {
        id: "configurar-doh-mozilla-firefox",
        titulo: "Passo 3: Ativar DNS sobre HTTPS no Mozilla Firefox (Proteção Máxima)",
        blocos: [
          { "tipo": "p", "texto": "O Firefox possui uma das implementações mais rigorosas de DoH do mercado, permitindo forçar o modo estrito:" },
          { "tipo": "passos", "itens": [
            "Abra o **Firefox**, clique no menu de três barras e selecione **Configurações**.",
            "Acesse a aba **Privacidade e Segurança** no menu lateral.",
            "Role até a seção **DNS sobre HTTPS**.",
            "Selecione o nível de proteção **Proteção Máxima** (o Firefox usará sempre o DoH e avisará caso haja falhas no provedor criptografado em vez de recorrer ao DNS aberto desprotegido).",
            "No campo 'Escolher provedor', selecione **Cloudflare** ou **NextDNS**."
          ]}
        ]
      },
      {
        id: "doh-nativo-windows-11",
        titulo: "Passo 4: Habilitar DoH Global no Windows 11 (Para Todos os Apps)",
        blocos: [
          { "tipo": "p", "texto": "O Windows 11 suporta DoH nativo em nível de sistema operacional, protegendo até mesmo aplicativos sem navegador (jogos, clientes de e-mail, terminal):" },
          { "tipo": "passos", "itens": [
            "Acesse **Configurações** (`Windows + I`) > **Rede e Internet**.",
            "Clique na sua conexão ativa (**Wi-Fi** ou **Ethernet**) > **Propriedades do Hardware**.",
            "Ao lado de 'Atribuição de servidor DNS', clique em **Editar**.",
            "Selecione **Manual** e ative o **IPv4**.",
            "Em DNS Preferencial digite `1.1.1.1` e mude 'Criptografia de DNS preferencial' para **Apenas Criptografado (DNS sobre HTTPS)**.",
            "Em DNS Alternativo digite `1.0.0.1` e defina também como **Apenas Criptografado (DNS sobre HTTPS)**.",
            "Clique em Salvar. O Windows 11 passará a criptografar 100% das requisições de todos os softwares."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O DoH substitui completamente a necessidade de uma VPN?",
        r: "Não. O DoH criptografa apenas as consultas de nomes de domínio (DNS). O tráfego de dados do seu navegador para o site de destino continua utilizando seu endereço IP público real. Uma VPN oculta tanto o DNS quanto o seu endereço IP, roteando todo o tráfego por um túnel criptografado separado."
      },
      {
        p: "Como testar se o meu DNS sobre HTTPS está realmente funcionando?",
        r: "Acesse a ferramenta oficial de teste de navegação da Cloudflare em `1.1.1.1/help` ou o site `browserleaks.com/dns`. O relatório indicará se você está utilizando 'Using DNS over HTTPS (DoH)' com status 'Yes'."
      },
      {
        p: "O DoH pode causar lentidão na abertura de sites?",
        r: "Na maioria dos casos, a diferença de tempo é imperceptível (frações de milissegundos adicionais para a negociação TLS inicial, que é então mantida aberta via conexões persistentes HTTP/2 e HTTP/3)."
      },
      {
        p: "Empresas e escolas podem bloquear o uso de DoH?",
        r: "Sim. Redes corporativas frequentemente bloqueiam os IPs de resolvedores DoH conhecidos ou aplicam certificados de inspeção profunda para poder filtrar conteúdos maliciosos em computadores corporativos da empresa."
      },
      {
        p: "O que é ECH (Encrypted Client Hello) e qual a relação com o DoH?",
        r: "O ECH é a peça complementar do DoH. Enquanto o DoH criptografa a consulta de nomes, o ECH criptografa o cabeçalho SNI (Server Name Indication) na primeira conexão TLS, impedindo que o provedor descubra o site mesmo inspecionando o aperto de mão inicial."
      },
      {
        p: "Qual a diferença entre DoH (porta 443) e DoT (porta 853)?",
        r: "DoT (DNS-over-TLS) roda exclusivamente na porta 853 e é muito utilizado no recurso de DNS Privado nativo do Android. Já o DoH roda na porta HTTPS 443 padrão. A grande vantagem do DoH é que ele trafega indistinguível do tráfego web seguro comum, tornando quase impossível para firewalls restritivos ou hotéis bloquearem suas consultas."
      }
    ],
    fontes: [
      {
        titulo: "IETF RFC 8484 — DNS Queries over HTTPS (DoH)",
        url: "https://datatracker.ietf.org/doc/html/rfc8484"
      },
      {
        titulo: "Mozilla Support — DNS over HTTPS (DoH) no Firefox",
        url: "https://support.mozilla.org/pt-BR/kb/dns-sobre-https-doh-firefox"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [140, 161, 162, 194]
  }
];

let okCount = 0;
internetArticles.forEach(art => {
  const filePath = path.join(EDITORIAL_DIR, `${art.slug}.json`);
  const words = countEditorial(art);
  console.log(`Artigo ID ${art.id} (${art.slug}): ${words} palavras`);
  if (words >= MIN_WORDS) okCount++;
  else console.warn(`⚠️ Menos de ${MIN_WORDS} palavras: ${words}`);
  fs.writeFileSync(filePath, JSON.stringify(art, null, 2), 'utf-8');
});

console.log(`Lote Internet processado: ${okCount}/${internetArticles.length} acima da meta de ${MIN_WORDS} palavras.`);
