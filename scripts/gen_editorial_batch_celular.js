const fs = require('fs');
const path = require('path');
const { countEditorial, MIN_WORDS } = require('./count_words');

const EDITORIAL_DIR = path.resolve(__dirname, '..', 'data', 'editorial');
if (!fs.existsSync(EDITORIAL_DIR)) fs.mkdirSync(EDITORIAL_DIR, { recursive: true });

const celularArticles = [
  {
    id: 137,
    slug: "como-resolver-iphone-travado-tela-logo-maca-loop-boot",
    titulo: "Como Resolver iPhone Travado na Maçã ou Loop de Inicialização",
    descricao: "Guia completo para destravar o iPhone travado na tela da maçã ou reiniciando em loop: reinício forçado, Modo de Recuperação e Restauração DFU sem perder dados.",
    resposta_curta: "Quando o iPhone fica travado no logotipo da Apple (maçã) ou reinicia em loop infinito, a primeira medida é realizar o reinício forçado combinando os botões físicos correspondentes ao seu modelo. Se persistir, conecte o aparelho a um computador (Mac com Finder ou PC com app Apple Devices/iTunes), coloque o iPhone em Modo de Recuperação e selecione a opção 'Atualizar' — o que reinstala o iOS sem apagar fotos ou dados pessoais.",
    aplica_se: "iPhone 8 até iPhone 16 (iOS 15, 16, 17 e 18)",
    intro: [
      "Ver o iPhone congelado na tela preta com o logotipo prateado da maçã ou preso em um ciclo interminável de reinicializações (boot loop) é um dos maiores sustos que um proprietário de dispositivo Apple pode enfrentar. O problema costuma acontecer logo após uma atualização de sistema operacional interrompida pela metade, quando a bateria se esgota no meio de uma gravação de firmware, ou quando o armazenamento interno atinge 100% de ocupação e o iOS não consegue criar arquivos de swap temporários para carregar o sistema.",
      "Apesar da aparência assustadora de 'morte do aparelho', na vasta maioria dos casos o circuito de hardware está intacto e o travamento é puramente lógico. O próprio ecossistema do iOS foi desenvolvido com camadas de proteção de boot (como o iBoot e o SecureROM) que permitem recuperar o sistema operacional sem necessariamente apagar fotos, conversas do WhatsApp ou documentos. Neste guia, apresentamos a sequência progressiva de soluções oficiais recomendadas pelo suporte da Apple."
    ],
    secoes: [
      {
        id: "reinicio-forcado-por-modelo",
        titulo: "Passo 1: Fazer o Reinício Forçado de Acordo com o Seu Modelo",
        blocos: [
          { "tipo": "p", "texto": "O reinício forçado corta a alimentação lógica dos circuitos temporários sem descarregar a memória flash. A combinação de teclas varia conforme a geração do iPhone:" },
          { "tipo": "tabela", "cabecalho": ["Modelo do iPhone", "Sequência Exata de Botões Físicos"], "linhas": [
            ["iPhone 8, SE (2ª e 3ª ger), X, XR, XS, 11, 12, 13, 14, 15 e 16", "Pressione e solte rápido o botão **Aumentar Volume**; pressione e solte rápido o botão **Diminuir Volume**; mantenha pressionado o **botão Lateral (Power)** até a maçã sumir e reaparecer na tela (cerca de 10 a 15 segundos)."],
            ["iPhone 7 e iPhone 7 Plus", "Mantenha pressionados simultaneamente o botão **Diminuir Volume** e o botão **Repousar/Despertar (Lateral)** até o logotipo da Apple reaparecer."],
            ["iPhone 6s, SE (1ª geração) e anteriores", "Mantenha pressionados simultaneamente o botão **Início (Home)** e o botão **Superior ou Lateral** por pelo menos 10 segundos até ver a maçã."]
          ]},
          { "tipo": "aviso", "nivel": "info", "texto": "Não solte o botão lateral antes de ver a maçã reaparecer. Se você soltar precocemente quando a tela apagar, o aparelho simplesmente permanecerá desligado." }
        ]
      },
      {
        id: "modo-recuperacao-atualizar-sem-perder-dados",
        titulo: "Passo 2: Modo de Recuperação via Computador (Opção Atualizar)",
        blocos: [
          { "tipo": "p", "texto": "Se o reinício forçado não quebrar o loop e a maçã continuar piscando, coloque o iPhone em Modo de Recuperação para reinstalar o iOS preservando seus dados:" },
          { "tipo": "passos", "itens": [
            "Conecte o iPhone a um computador (Mac com macOS Catalina ou superior via Finder, ou PC com Windows através do aplicativo oficial 'Dispositivos Apple' ou iTunes atualizado).",
            "Com o cabo conectado ao computador, coloque o aparelho em Modo de Recuperação: no iPhone 8 e posteriores, pressione e solte Aumentar Volume, pressione e solte Diminuir Volume e mantenha o botão Lateral pressionado mesmo depois que a maçã aparecer, segurando até a tela exibir a imagem de um cabo apontando para um computador.",
            "No computador, o Finder ou iTunes abrirá um alerta dizendo: 'Há um problema com o iPhone que requer que ele seja atualizado ou restaurado'.",
            "Clique obrigatoriamente no botão **Atualizar** (NÃO clique em Restaurar neste momento).",
            "O computador baixará a versão limpa mais recente do iOS (cerca de 6 a 8 GB) e reinstalará o software mantendo seus arquivos intactos."
          ]},
          { "tipo": "aviso", "nivel": "atencao", "texto": "Se o download do iOS demorar mais de 15 minutos, o iPhone sairá automaticamente da tela do Modo de Recuperação. Aguarde o download terminar completamente no computador e então repita o Passo 2 para recolocar o iPhone em Modo de Recuperação." }
        ]
      },
      {
        id: "modo-dfu-restauracao-profunda",
        titulo: "Passo 3: Modo DFU (Device Firmware Upgrade) para Casos Severos",
        blocos: [
          { "tipo": "p", "texto": "O Modo DFU é o estado de mais baixo nível acessível no iPhone. Ele ignora o bootloader principal (iBoot) e grava o firmware diretamente na memória. Esta opção deve ser usada quando o Modo de Recuperação tradicional der erro e ela **apagará todos os dados**:" },
          { "tipo": "passos", "itens": [
            "Conecte o iPhone ao computador e abra o iTunes ou Finder.",
            "Pressione e solte Volume Mais, pressione e solte Volume Menos e mantenha o botão Lateral pressionado por 10 segundos.",
            "Sem soltar o botão Lateral, pressione e segure também o botão Diminuir Volume por 5 segundos.",
            "Solte o botão Lateral, mas continue segurando o botão Diminuir Volume por mais 10 segundos.",
            "A tela do iPhone deve permanecer completamente PRETA (sem maçã, sem texto). No computador, aparecerá a mensagem 'O computador detectou um iPhone em modo de recuperação'.",
            "Clique em **Restaurar iPhone** para instalar o firmware limpo de fábrica."
          ]}
        ]
      },
      {
        id: "diagnostico-hardware-bateria-sensor",
        titulo: "Passo 4: Quando o Problema é Físico (Sensor do Alto-falante ou Bateria)",
        blocos: [
          { "tipo": "p", "texto": "Se mesmo após a restauração DFU com êxito o iPhone continuar reiniciando exatamente a cada 3 minutos, a falha reside em um componente físico com barramento I2C em curto:" },
          { "tipo": "lista", "itens": [
            "**Flex do Alto-falante Superior / Sensor de Proximidade:** Se o aparelho sofreu contato com umidade ou suor no auricular, o sensor inunda o barramento I2C com sinais corrompidos, fazendo o circuito Watchdog reiniciar o aparelho pontualmente a cada 180 segundos.",
            "**Bateria Degradada ou Termistor com Falha:** Se a placa-mãe não conseguir ler a linha de dados da bateria (dados HDQ/SWI), ela desliga o aparelho por proteção térmica.",
            "Nesses cenários específicos, encaminhe o dispositivo a uma assistência técnica especializada para teste de desconexão de periféricos."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O iPhone travou na maçã porque a memória estava 100% cheia. Vou perder tudo?",
        r: "Nem sempre. Ao conectar o aparelho ao computador e escolher a opção 'Atualizar' no Finder ou iTunes, o sistema tenta expandir a partição temporária e liberar caches do sistema operacional para iniciar. Se a atualização for concluída, o iPhone ligará permitindo que você apague vídeos pesados imediatamente."
      },
      {
        p: "Colocar o iPhone no congelador ajuda a sair do loop da maçã?",
        r: "Nunca faça isso. O choque térmico cria condensação interna de gotículas de água nos circuitos e microfissuras na solda do processador, danificando a placa-mãe de forma irreparável."
      },
      {
        p: "O que significa o Erro 4013 ou Erro 9 durante a restauração no computador?",
        r: "Os erros 4013 e 9 indicam falha de comunicação entre o computador e a memória flash NAND do iPhone. As causas mais frequentes são cabos Lightning/USB-C com defeito, portas USB lentas ou curto no flex do sensor superior do aparelho. Troque de cabo e de porta USB antes de tentar novamente."
      },
      {
        p: "Softwares de terceiros que prometem 'reparar o iOS sem apagar dados' são confiáveis?",
        r: "A maioria desses programas comerciais pagos apenas automatiza o mesmo comando do Modo de Recuperação gratuito que o Finder da Apple já realiza nativamente. Recomendamos utilizar estritamente as ferramentas oficiais da Apple."
      },
      {
        p: "Como evitar que o iPhone volte a travar na maçã no futuro?",
        r: "Mantenha sempre no mínimo 10% a 15% do armazenamento interno do aparelho livre (pelo menos 5 a 10 GB livres), evite instalar versões de teste Beta do iOS no seu aparelho principal de trabalho e mantenha o backup diário do iCloud ativado."
      }
    ],
    fontes: [
      {
        titulo: "Suporte da Apple — Se o iPhone não ligar ou estiver travado",
        url: "https://support.apple.com/pt-br/102642"
      },
      {
        titulo: "Suporte da Apple — Se não for possível atualizar nem restaurar o iPhone ou iPod touch",
        url: "https://support.apple.com/pt-br/108964"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [112, 149, 138, 158]
  },
  {
    id: 138,
    slug: "como-resolver-erro-interface-sistema-parou-system-ui-android",
    titulo: "Como Resolver o Erro 'A Interface do Sistema Parou' no Android",
    descricao: "Solução definitiva para o travamento 'System UI parou' ou 'Interface do sistema não está respondendo' no celular Android: limpeza de cache, WebView e modo de segurança.",
    resposta_curta: "A mensagem 'A interface do sistema parou' (System UI has stopped) indica que o processo com.android.systemui travou ao renderizar a barra de status, os botões de navegação ou o painel de notificações. Para resolver rapidamente, desinstale as atualizações mais recentes do aplicativo 'Android System WebView' na Google Play Store, limpe o cache do app Google e da Interface do Sistema nas Configurações, e remova launchers ou temas de terceiros incompatíveis.",
    aplica_se: "Android 10, 11, 12, 13, 14 e 15 (Samsung, Motorola, Xiaomi, etc.)",
    intro: [
      "A Interface do Sistema (processo identificado tecnicamente como com.android.systemui) é um dos componentes gráficos mais essenciais de qualquer dispositivo Android. Ela é a responsável direta pela renderização e funcionamento ininterrupto da barra de status superior (ícones de bateria, sinal e relógio), dos gestos ou botões de navegação inferiores, do painel retrátil de notificações e das telas de bloqueio.",
      "Quando o pacote System UI sofre uma exceção de software irrecuperável, a tela do celular pisca em preto, a barra superior desaparece e a incômoda caixa de diálogo 'A interface do sistema parou' ou 'Interface do sistema não está respondendo' passa a surgir em loop contínuo a cada poucos segundos. Neste tutorial detalhado, mostramos como diagnosticar as três principais causas do problema — atualizações defeituosas do WebView, sobreposição de temas e corrupção de cache — e restaurar a estabilidade do aparelho."
    ],
    secoes: [
      {
        id: "causa-raiz-webview-google",
        titulo: "O Principal Culpado: Android System WebView e Google App",
        blocos: [
          { "tipo": "p", "texto": "Historicamente, mais de 80% das ondas massivas de falhas no System UI decorrem de bugs em atualizações automáticas do componente **Android System WebView** (que renderiza conteúdo web dentro de apps) ou do aplicativo central **Google**:" },
          { "tipo": "tabela", "cabecalho": ["Componente", "Função no Android", "Sintoma Típico de Falha"], "linhas": [
            ["Android System WebView", "Mecanismo de renderização do Chrome usado por apps do sistema.", "System UI trava ao exibir notificações com conteúdo dinâmico."],
            ["Google App", "Alimenta o assistente, feed de notícias e barra de busca.", "Interface reinicia sempre que a tela inicial é carregada."],
            ["Temas de Terceiros / Substratum", "Modificam cores e ícones da barra de status via sobreposição de APKs.", "Loop de travamento após atualização de segurança do Android."],
            ["Armazenamento Esgotado", "Memória flash com menos de 200 MB livres.", "O banco de dados SQLite do System UI não consegue gravar estados temporários."]
          ]}
        ]
      },
      {
        id: "desinstalar-atualizacoes-webview",
        titulo: "Passo 1: Desinstalar Atualizações do Android System WebView",
        blocos: [
          { "tipo": "p", "texto": "Restaurar o WebView para a versão original de fábrica costuma resolver o problema instantaneamente sem apagar nenhum arquivo pessoal:" },
          { "tipo": "passos", "itens": [
            "Abra o aplicativo **Configurações** (ícone de engrenagem) no seu aparelho.",
            "Acesse a seção **Aplicativos** (ou Apps e Notificações).",
            "Toque no menu de três pontos no canto superior direito e selecione **Mostrar aplicativos do sistema**.",
            "Localize e toque sobre o item **Android System WebView**.",
            "Toque no menu de três pontos no topo da tela e selecione **Desinstalar atualizações**.",
            "Confirme a mensagem que avisa que o aplicativo será revertido para a versão original de fábrica e reinicie o smartphone."
          ]},
          { "tipo": "aviso", "nivel": "info", "texto": "Em smartphones Samsung Galaxy, o navegador Samsung Internet também utiliza módulos compartilhados; mantenha-o atualizado pela Galaxy Store." }
        ]
      },
      {
        id: "limpar-cache-system-ui-e-google",
        titulo: "Passo 2: Limpar Cache da Interface do Sistema e do Google",
        blocos: [
          { "tipo": "p", "texto": "Se a falha persistir, limpe os arquivos temporários armazenados na partição de cache do próprio subsistema de interface:" },
          { "tipo": "passos", "itens": [
            "Nas **Configurações** > **Aplicativos**, certifique-se de que a opção de 'Mostrar apps do sistema' está ativa.",
            "Role até encontrar **Interface do Sistema** (ou System UI).",
            "Toque em **Armazenamento** (ou Armazenamento e Cache).",
            "Toque no botão **Limpar Cache** (o botão Limpar Dados costuma ficar desabilitado por segurança para este app nativo).",
            "Volte para a lista de aplicativos, localize o app **Google**, toque em **Armazenamento** e selecione **Limpar Cache** e em seguida **Gerenciar Espaço** > **Limpar Todos os Dados**."
          ]}
        ]
      },
      {
        id: "modo-de-seguranca-android",
        titulo: "Passo 3: Inicializar no Modo de Segurança para Isolar Apps Conflitantes",
        blocos: [
          { "tipo": "p", "texto": "Se você instalou launchers personalizados (como Nova Launcher, Lawnchair), aplicativos de personalização de barra de status ou pacotes de temas, inicie em Modo de Segurança para testar sem a interferência deles:" },
          { "tipo": "passos", "itens": [
            "Mantenha pressionado o botão físico Liga/Desliga até que o menu de desligamento apareça na tela.",
            "Toque e mantenha o dedo pressionado sobre a opção **Desligar** (ou **Reiniciar**) por cerca de 3 segundos.",
            "Uma mensagem surgirá perguntando se você deseja 'Reiniciar em modo de segurança'. Toque em **OK**.",
            "O aparelho reiniciará exibindo o texto 'Modo de segurança' no canto inferior esquerdo da tela.",
            "Se o erro da interface sumir completamente no Modo de Segurança, desinstale os últimos launchers e utilitários instalados antes de reiniciar normalmente."
          ]}
        ]
      },
      {
        id: "wipe-cache-partition-recovery",
        titulo: "Passo 4: Limpar a Partição de Cache pelo Menu Recovery (Sem Perder Dados)",
        blocos: [
          { "tipo": "p", "texto": "Em aparelhos de marcas como Samsung e Motorola, a partição de cache geral do sistema pode ser purgada diretamente pelo modo de recuperação de hardware:" },
          { "tipo": "passos", "itens": [
            "Desligue o smartphone por completo.",
            "Conecte o aparelho a um computador via cabo USB (necessário nas versões recentes do Android da Samsung para habilitar a combinação).",
            "Mantenha pressionados os botões **Aumentar Volume** e **Liga/Desliga** até o logotipo aparecer na tela.",
            "No menu de texto do Android Recovery, use as teclas de volume para navegar até a opção **Wipe cache partition** e confirme com o botão Liga/Desliga.",
            "Selecione **Yes** para confirmar a limpeza e, em seguida, selecione **Reboot system now**."
          ]},
          { "tipo": "aviso", "nivel": "sucesso", "texto": "A opção Wipe Cache Partition limpa apenas arquivos temporários residuais de atualizações do Android, sem apagar nenhum contato, foto, mensagem ou aplicativo instalado." }
        ]
      }
    ],
    faq: [
      {
        p: "O erro Interface do Sistema parou apaga fotos ou contatos do celular?",
        r: "Não. A interface do sistema é apenas o invólucro visual que exibe a barra superior e os botões de navegação. A falha não afeta os bancos de dados do usuário, galerias de fotos ou contas configuradas no aparelho."
      },
      {
        p: "Por que esse erro é tão frequente após atualizar o sistema?",
        r: "Grandes atualizações de versão do Android (como do Android 13 para o 14) introduzem novas APIs para ícones e cores dinâmicas da barra de notificações. Se existirem dados residuais em cache de temas antigos que não suportam as novas bibliotecas, o processo de renderização trava."
      },
      {
        p: "O que fazer se a caixa de diálogo não deixar eu clicar nas configurações?",
        r: "Se o aviso 'Fechar app' surgir repetidamente a cada segundo impedindo o toque, deslize a barra de notificações rapidamente pelo topo e toque no ícone de engrenagem, ou inicie o celular no Modo de Segurança conforme explicado no Passo 3."
      },
      {
        p: "Atualizar os aplicativos na Google Play Store ajuda a prevenir a falha?",
        r: "Sim. Especialmente manter atualizados os pacotes Android System WebView, Google Chrome e Serviços do Google Play (Google Play Services), onde os desenvolvedores enviam patches rápidos quando uma versão defeituosa é detectada."
      },
      {
        p: "A restauração de fábrica (formatar) é sempre obrigatória?",
        r: "Não. Em mais de 90% dos casos, desinstalar as atualizações do Android System WebView ou executar a limpeza do Wipe Cache Partition pelo Recovery resolve a falha sem necessidade de formatação."
      }
    ],
    fontes: [
      {
        titulo: "Ajuda do Google Android — Corrigir um app Android que não está funcionando",
        url: "https://support.google.com/android/answer/2668614?hl=pt-BR"
      },
      {
        titulo: "Samsung Support — O que fazer quando aparece a mensagem 'Interface do sistema parou'",
        url: "https://www.samsung.com/br/support/mobile-devices/o-que-fazer-quando-aparece-a-mensagem-interface-do-sistema-parou/"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [139, 160, 158, 137]
  },
  {
    id: 139,
    slug: "como-corrigir-erro-download-pendente-google-play-store",
    titulo: "Como Corrigir o Erro 'Download Pendente' na Google Play Store",
    descricao: "Passo a passo definitivo para resolver o travamento de download pendente na Play Store: fila de atualizações, limpeza de cache, otimização de bateria e Play Services.",
    resposta_curta: "O erro de download pendente na Google Play Store ocorre quando há outros aplicativos sendo atualizados simultaneamente em segundo plano, quando o cache da loja ou do Google Play Services está corrompido, ou devido a restrições de economia de bateria e limites de dados. Para resolver, abra a Play Store, cancele downloads em segundo plano em 'Gerenciar apps e dispositivos', limpe o cache e armazenamento da 'Google Play Store' e do 'Google Play Services' nas Configurações, e desative a otimização de bateria restritiva.",
    aplica_se: "Todos os celulares e tablets Android",
    intro: [
      "Você tenta baixar um novo aplicativo ou atualizar uma ferramenta urgente no smartphone e a Google Play Store exibe indefinidamente a mensagem 'Download pendente...' com uma barra circular cinza que nunca sai do lugar. Esse travamento é um dos mais comuns em celulares Android e impede a instalação de qualquer novo software, além de bloquear correções críticas de segurança.",
      "A Google Play Store não baixa múltiplos aplicativos ao mesmo tempo por padrão: ela organiza os pedidos em uma fila sequencial rigorosa. Se um aplicativo grande estiver parado aguardando conexão Wi-Fi, se a bateria estiver em modo de ultraeconomia ou se o gerenciador de downloads do Android tiver perdido a sincronia de rede, toda a fila ficará congelada. A seguir, apresentamos a sequência metódica e oficial para destravar seus downloads em poucos minutos."
    ],
    secoes: [
      {
        id: "cancelar-atualizacoes-fila",
        titulo: "Passo 1: Verificar e Cancelar a Fila de Atualizações Automáticas",
        blocos: [
          { "tipo": "p", "texto": "A causa mais frequente é a própria Play Store atualizando aplicativos pesados em segundo plano no momento exato em que você solicitou o novo download:" },
          { "tipo": "passos", "itens": [
            "Abra o aplicativo da **Google Play Store**.",
            "Toque na foto do seu perfil no canto superior direito.",
            "Selecione **Gerenciar apps e dispositivos**.",
            "Na aba 'Visão geral', verifique a seção 'Atualizações disponíveis'. Se estiver escrito 'Instalando atualizações...', toque em **Ver detalhes**.",
            "Toque no botão **Cancelar tudo** para esvaziar a fila de espera temporariamente.",
            "Volte ao aplicativo que você desejava e tente baixá-lo novamente de forma individual."
          ]}
        ]
      },
      {
        id: "limpar-dados-play-store-services",
        titulo: "Passo 2: Limpar Cache e Armazenamento da Play Store e Play Services",
        blocos: [
          { "tipo": "p", "texto": "Arquivos temporários fragmentados no banco de dados da loja causam bloqueios lógicos de download. Uma limpeza completa restabelece o funcionamento padrão:" },
          { "tipo": "passos", "itens": [
            "Abra as **Configurações** do Android e acesse **Aplicativos**.",
            "Localize e toque sobre **Google Play Store**.",
            "Toque em **Armazenamento** e selecione primeiro **Limpar Cache** e em seguida **Limpar Dados** (ou Limpar Armazenamento). Confirme a mensagem.",
            "Retorne à lista de aplicativos e localize o item **Google Play Services** (Serviços do Google Play).",
            "Toque em **Armazenamento**, selecione **Limpar Cache** e depois **Gerenciar Espaço** > **Limpar Todos os Dados**.",
            "Reinicie o smartphone para reconfigurar os serviços de nuvem do Google."
          ]},
          { "tipo": "aviso", "nivel": "info", "texto": "Limpar os dados da Play Store não exclui seus aplicativos instalados nem apaga suas compras; apenas redefine o cache e as preferências locais do aplicativo." }
        ]
      },
      {
        id: "desativar-otimizacao-bateria",
        titulo: "Passo 3: Desativar a Otimização de Bateria Agressiva",
        blocos: [
          { "tipo": "p", "texto": "Sistemas modernos de economia de energia (como o gerenciamento adaptativo da Xiaomi, Samsung e Motorola) colocam serviços de download em suspensão profunda:" },
          { "tipo": "passos", "itens": [
            "Acesse **Configurações** > **Aplicativos** > **Google Play Store**.",
            "Toque em **Bateria** (ou Uso da Bateria).",
            "Altere a configuração de 'Otimizado' para **Irrestrito** (ou Sem Restrições).",
            "Faça o mesmo ajuste de bateria irrestrita para o **Google Play Services** e para o **Gerenciador de Downloads** do sistema.",
            "Essa alteração garante que o processo de download não seja abortado pelo sistema quando a tela do celular apagar."
          ]}
        ]
      },
      {
        id: "verificar-gerenciador-downloads-sistema",
        titulo: "Passo 4: Limpar o Gerenciador de Downloads do Android",
        blocos: [
          { "tipo": "p", "texto": "A Play Store depende de um processo nativo do sistema operacional chamado Download Manager para transferir os arquivos APK dos servidores para a memória do celular:" },
          { "tipo": "passos", "itens": [
            "Nas **Configurações** > **Aplicativos**, toque no menu de três pontos e selecione **Mostrar aplicativos do sistema**.",
            "Procure pelo aplicativo **Gerenciador de Downloads** (Download Manager).",
            "Toque em **Armazenamento** e selecione **Limpar Dados** e **Limpar Cache**.",
            "Verifique se as permissões de notificação e rede do gerenciador estão ativadas."
          ]}
        ]
      },
      {
        id: "preferencias-download-rede-data",
        titulo: "Passo 5: Ajustar Preferências de Rede, Espaço em Disco e Data/Hora",
        blocos: [
          { "tipo": "p", "texto": "Configurações erradas de data e hora impedem a validação de certificados SSL/TLS da Google, pausando os downloads por segurança:" },
          { "tipo": "lista", "itens": [
            "**Data e Hora Automáticas:** Acesse Configurações > Sistema > Data e hora e certifique-se de que a opção 'Usar horário fornecido pela rede' está ativada.",
            "**Preferência de Download de Rede:** Dentro da Play Store, toque no seu perfil > Configurações > Preferências de rede > Preferência de download de apps e selecione **Por qualquer rede** (para evitar que downloads fiquem pendentes esperando por Wi-Fi).",
            "**Espaço Mínimo de Armazenamento:** Se o celular tiver menos de 1 GB de espaço livre na memória interna, o Android recusa o início de novos downloads para proteger a estabilidade do sistema operacional. Exclua arquivos desnecessários na lixeira."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "Por que a Play Store trava quando a bateria está muito fraca?",
        r: "Muitos fabricantes implementam políticas agressivas de economia de energia no Android que suspendem transferências em segundo plano do Google Play Services quando o nível da bateria atinge valores inferiores a 15% ou 20%."
      },
      {
        p: "O uso de VPN ou DNS privado pode deixar o download pendente?",
        r: "Sim. Servidores VPN congestionados ou provedores de DNS privado (DoH/DoT) com regras rígidas de bloqueio de anúncios podem bloquear as portas de CDN (Content Delivery Network) utilizadas pela infraestrutura do Google para entregar os pacotes de instalação."
      },
      {
        p: "O que fazer se a mensagem 'download pendente' ocorrer apenas no Wi-Fi?",
        r: "Isso indica instabilidade na conexão local com os servidores do Google. Desative o Wi-Fi e teste via dados móveis (4G/5G). Se funcionar nos dados móveis, reinicie seu roteador Wi-Fi ou mude os servidores DNS da sua rede para o DNS público do Google (8.8.8.8 e 8.8.4.4)."
      },
      {
        p: "O controle dos pais do Google Family Link pode travar o download?",
        r: "Sim. Se o aparelho for supervisionado pelo Family Link, o download de qualquer novo aplicativo ficará com status pendente até que o responsável aprove o pedido na notificação enviada ao celular dos pais."
      },
      {
        p: "Preciso remover e adicionar minha conta Google novamente?",
        r: "Em casos raros de falha de token de autenticação, sim. Vá em Configurações > Contas > Google, selecione sua conta e toque em 'Remover conta'. Reinicie o celular, retorne à mesma tela e adicione sua conta novamente."
      },
      {
        p: "A falta de espaço de armazenamento causa esse sintoma?",
        r: "Sim. A Play Store exige um espaço livre no armazenamento interno correspondente ao dobro do tamanho do aplicativo para poder baixar o instalador compactado e descompactá-lo simultaneamente. Mantenha pelo menos 2 a 3 GB livres."
      }
    ],
    fontes: [
      {
        titulo: "Ajuda do Google Play — A Play Store não abre, não carrega ou não faz o download de apps",
        url: "https://support.google.com/googleplay/answer/7513003?hl=pt-BR"
      },
      {
        titulo: "Ajuda do Google Play — Corrigir problemas de download de apps com etapas básicas",
        url: "https://support.google.com/googleplay/answer/1067233?hl=pt-BR"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [138, 160, 158, 112]
  },
  {
    id: 149,
    slug: "como-corrigir-erro-sem-servico-sim-invalido-iphone",
    titulo: "Como Corrigir o Erro 'Sem Serviço' ou 'SIM Inválido' no iPhone",
    descricao: "Guia técnico para resolver problemas de rede móvel no iPhone: Sem Serviço, Buscando rede, SIM Inválido ou falha no eSIM com procedimentos oficiais da Apple.",
    resposta_curta: "Quando o iPhone exibe 'Sem Serviço', 'Buscando' ou 'SIM Inválido', ative o Modo Avião por 15 segundos e desative para forçar uma nova negociação de torre de celular. Se não resolver, reinicie o aparelho, verifique se há atualizações de ajustes da operadora em Ajustes > Geral > Sobre, ejete e limpe a gaveta do chip SIM físico (ou reative o perfil eSIM), teste a seleção manual de operadora e redefina os ajustes de rede.",
    aplica_se: "iPhone (modelos com chip físico e eSIM no iOS 15 a 18)",
    intro: [
      "Ficar subitamente sem conectividade celular no iPhone — deparando-se com as mensagens 'Sem Serviço', 'Buscando...' ou o alerta vermelho de 'SIM Inválido' — impede a realização de chamadas telefônicas de emergência, recebimento de SMS de validação bancária e navegação na internet fora de redes Wi-Fi.",
      "Esse erro pode se originar de quatro naturezas distintas: falha lógica transitória na antena do modem baseband do iPhone, chips nano-SIM físicos gastos ou com poeira acumulada nos contatos dourados, perfis de eSIM corrompidos após restauração, ou bloqueio formal de IMEI na operadora por contestação de titularidade. A seguir, detalhamos a sequência de testes recomendada pelo suporte oficial da Apple para isolar e solucionar a falha com segurança."
    ],
    secoes: [
      {
        id: "ciclo-de-antena-e-modo-aviao",
        titulo: "Passo 1: Reinicialização da Antena Celular e Modo Avião",
        blocos: [
          { "tipo": "p", "texto": "Ao transitar entre zonas rurais, túneis ou subsolos com baixa recepção, o modem celular do iPhone pode entrar em estado de latência na tentativa de economizar bateria:" },
          { "tipo": "passos", "itens": [
            "Deslize o dedo do canto superior direito da tela para baixo para abrir a **Central de Controle**.",
            "Toque no ícone do **Modo Avião** (símbolo de avião) para ativá-lo.",
            "Aguarde cerca de 15 a 20 segundos para que todos os transceptores de rádio celular sejam desligados pelo sistema.",
            "Toque novamente no ícone para desativar o Modo Avião e observe a barra de status enquanto o iPhone se reconecta à torre mais próxima."
          ]}
        ]
      },
      {
        id: "atualizacao-ajustes-operadora",
        titulo: "Passo 2: Atualizar os Ajustes da Operadora (Carrier Bundle)",
        blocos: [
          { "tipo": "p", "texto": "Operadoras de telefonia (Claro, Vivo, TIM, etc.) enviam pacotes de configuração de rede (Carrier Settings) que atualizam tabelas de frequências de 4G/5G e pontos de acesso APN:" },
          { "tipo": "passos", "itens": [
            "Conecte o iPhone a uma rede Wi-Fi estável.",
            "Abra os **Ajustes** do iOS.",
            "Acesse **Geral** > **Sobre**.",
            "Aguarde cerca de 15 segundos nessa tela. Se houver uma atualização de ajustes da operadora disponível, um pop-up surgirá automaticamente na tela dizendo: 'Atualização dos Ajustes da Operadora'.",
            "Toque no botão **Atualizar** para aplicar as novas configurações de rede."
          ]}
        ]
      },
      {
        id: "selecao-manual-de-rede",
        titulo: "Passo 3: Testar a Seleção Manual de Operadora de Rede",
        blocos: [
          { "tipo": "p", "texto": "Em regiões de fronteira de cobertura ou falha temporária de roaming, o iPhone pode tentar se conectar a uma antena incorreta. Forçar a busca manual restabelece o sinal:" },
          { "tipo": "passos", "itens": [
            "Acesse **Ajustes** > **Celular** (ou Dados Celulares).",
            "Toque na opção **Seleção de Rede**.",
            "Desative a chave seletora **Automática**.",
            "Aguarde de 30 a 60 segundos enquanto o iPhone escaneia todas as frequências disponíveis no ambiente.",
            "Toque manualmente sobre o nome exato da sua operadora contratada (por exemplo, Claro BR, VIVO ou TIM Brasil) para forçar o registro na torre."
          ]}
        ]
      },
      {
        id: "inspecao-fisica-chip-esim",
        titulo: "Passo 4: Inspeção Física do Chip SIM ou Diagnóstico do eSIM",
        blocos: [
          { "tipo": "p", "texto": "O contato metálico do chip nano-SIM pode sofrer oxidação ou deslocamento físico na bandeja:" },
          { "tipo": "lista", "itens": [
            "**Chip Físico:** Insira a ferramenta de ejeção oficial (ou um clipe de papel desdobrado) no orifício da bandeja do SIM e pressione firmemente para ejetar. Retire o chip, limpe suavemente a superfície metálica dourada com um pano seco e macio de microfibra e reinsira a gaveta certificando-se de que fechou alinhada.",
            "**eSIM (Chip Virtual):** Vá em Ajustes > Celular. Verifique se o seu plano celular está marcado como 'Ativado'. Se houver uma mensagem de erro no perfil eSIM, entre em contato com o canal de atendimento da sua operadora para solicitar um novo QR Code de ativação de perfil digital."
          ]}
        ]
      },
      {
        id: "redefinir-ajustes-de-rede-ios",
        titulo: "Passo 5: Redefinir os Ajustes de Rede do iPhone",
        blocos: [
          { "tipo": "p", "texto": "Essa etapa limpa todos os caches de roteamento celular, servidores DNS gravados e perfis de VPN que possam estar bloqueando o tráfego:" },
          { "tipo": "passos", "itens": [
            "Acesse **Ajustes** > **Geral**.",
            "Role até o final da página e toque em **Transferir ou Redefinir o iPhone**.",
            "Toque na opção **Redefinir** na parte inferior.",
            "Selecione com atenção a opção **Redefinir Ajustes de Rede**.",
            "Insira o código de desbloqueio do iPhone e confirme a ação.",
            "O iPhone será reiniciado automaticamente com as configurações de fábrica das conexões sem fio."
          ]},
          { "tipo": "aviso", "nivel": "atencao", "texto": "Redefinir os ajustes de rede NÃO apaga suas fotos ou mensagens, mas apagará as senhas de redes Wi-Fi salvas e configurações de VPN personalizadas, sendo necessário redigitar as senhas do seu Wi-Fi residencial." }
        ]
      },
      {
        id: "verificar-bloqueio-imei",
        titulo: "Passo 6: Verificar Bloqueio de IMEI ou Falha no Chip Baseband",
        blocos: [
          { "tipo": "p", "texto": "Se após todos os passos o aparelho continuar exibindo 'Sem Serviço', abra o aplicativo Telefone e digite `*#06#`. Se a tela NÃO exibir o número de IMEI ou se em Ajustes > Geral > Sobre o campo 'Firmware do Modem' estiver em branco, o chip de modem baseband soldado na placa-mãe sofreu uma trinca de solda ou falha de hardware, exigindo reparo técnico em laboratório." }
        ]
      }
    ],
    faq: [
      {
        p: "O que significa 'SIM Não Válido' acompanhado de 'Bloqueio de Operadora'?",
        r: "Essa mensagem específica indica que o iPhone foi adquirido no exterior ou vinculado a um contrato de subsídio e está bloqueado por software para operar apenas na rede da operadora de origem. Você deve solicitar o desbloqueio internacional junto à operadora que vendeu o dispositivo."
      },
      {
        p: "Como saber se o meu IMEI foi bloqueado na Anatel?",
        r: "Acesse o site oficial Consulta Aparelho Legal (consultaaparelholegal.com.br) mantido pela Anatel e digite o número do IMEI do seu aparelho. O portal informará gratuitamente se há registros de impedimento por perda, roubo ou pendência administrativa."
      },
      {
        p: "Trocar de operadora de chip resolve o problema de 'Sem Serviço'?",
        r: "Se você testar o chip de um amigo de outra operadora no seu iPhone e ele funcionar normalmente, o problema reside na sua linha ou no seu chip SIM físico antigo. Basta comparecer a uma loja da sua operadora para emitir uma segunda via do chip (ou migrar para eSIM)."
      },
      {
        p: "Como configurar o roaming internacional ao viajar para fora do país?",
        r: "Acesse Ajustes > Celular > Opções de Dados Celulares e ative a chave 'Roaming de Dados'. Certifique-se previamente com a sua operadora de que o pacote de tráfego internacional está contratado para evitar bloqueios de autenticação."
      },
      {
        p: "O erro pode ser causado por atualização recente do iOS?",
        r: "Sim. Raramente, falhas durante o processo de gravação de firmware do modem podem corromper os parâmetros de rádio. Uma restauração completa via Modo DFU conectando o iPhone ao computador costuma recuperar a partição do modem."
      },
      {
        p: "O iPhone esquenta quando fica buscando rede sem parar?",
        r: "Sim. Quando a recepção de sinal é inexistente, o amplificador de potência de rádio da placa-mãe opera em potência máxima tentando alcançar uma torre distante, o que causa aquecimento na carcaça e consumo acelerado da bateria."
      }
    ],
    fontes: [
      {
        titulo: "Suporte da Apple — Se você vir a mensagem Sem Serviço, Buscando ou SOS no iPhone",
        url: "https://support.apple.com/pt-br/102500"
      },
      {
        titulo: "Suporte da Apple — Se você vir a mensagem SIM Inválido ou Sem SIM no iPhone",
        url: "https://support.apple.com/pt-br/102422"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [137, 112, 141, 161]
  },
  {
    id: 112,
    slug: "como-resolver-armazenamento-sistema-cheio-iphone-ios",
    titulo: "Como Resolver Armazenamento do Sistema Cheio no iPhone (Dados do Sistema)",
    descricao: "Guia definitivo para liberar espaço nos Dados do Sistema (antigo 'Outros') no iPhone: limpeza de cache de streaming, sincronização do iCloud e backup local.",
    resposta_curta: "A categoria 'Dados do Sistema' (antigo 'Outros') no armazenamento do iPhone reúne caches temporários de aplicativos de streaming, logs do iOS, vozes da Siri, índices do Spotlight e arquivos de mídia em trânsito. Para reduzir drasticamente seu tamanho, sincronize o iPhone com um computador (Mac ou PC) para forçar a purgação de logs de diagnóstico, descarregue aplicativos não usados, limpe o histórico do Safari e reinicie o aparelho.",
    aplica_se: "iPhone (iOS 15, 16, 17 e 18)",
    intro: [
      "Você acessa Ajustes > Geral > Armazenamento do iPhone e se depara com a barra de capacidade praticamente lotada. Ao rolar até o final da lista, nota que a misteriosa categoria **Dados do Sistema** (chamada de 'Outros' em versões anteriores do iOS) está ocupando 20 GB, 40 GB ou até mais de metade da memória do seu celular.",
      "Diferente dos aplicativos convencionais, os Dados do Sistema não possuem um botão direto de 'Desinstalar' ou 'Limpar'. Essa partição virtual dinâmica abriga arquivos de cache não removíveis de imediato, gravações de voz do sistema, índices de pesquisa, buffers de serviços de streaming (como Spotify, Netflix e TikTok) e arquivos de atualização pendentes. Neste guia passo a passo, ensinamos os métodos técnicos mais eficazes para forçar o iOS a limpar esses arquivos fantasmas com segurança."
    ],
    secoes: [
      {
        id: "o-que-sao-dados-do-sistema",
        titulo: "O Que Realmente Compõe os 'Dados do Sistema' no iOS?",
        blocos: [
          { "tipo": "p", "texto": "A arquitetura de armazenamento do iOS classifica sob essa etiqueta qualquer dado volátil que não pertença estritamente ao binário de um aplicativo específico:" },
          { "tipo": "tabela", "cabecalho": ["Elemento Oculto", "Como é Gerado", "Como Limpar Efetivamente"], "linhas": [
            ["Caches de Áudio e Vídeo", "Músicas e vídeos pré-carregados em streaming (Spotify, YouTube, Instagram).", "Limpar caches dentro das opções de cada app ou reinstalar."],
            ["Histórico e Caches Web", "Páginas, imagens e scripts salvos durante navegação no Safari e Chrome.", "Limpar Histórico e Dados dos Sites nos Ajustes do Safari."],
            ["Logs de Diagnóstico do iOS", "Relatórios de falhas de apps e estatísticas de telemetria.", "Sincronizar o iPhone conectado via cabo a um computador."],
            ["Mensagens e Mídias do iMessage", "Fotos e vídeos pesados com anexos sincronizados no iCloud.", "Ativar a opção de apagar mensagens antigas automaticamente."]
          ]}
        ]
      },
      {
        id: "sincronizacao-computador-purgar-logs",
        titulo: "Passo 1: Sincronizar o iPhone com o Computador para Descarregar Logs",
        blocos: [
          { "tipo": "p", "texto": "Este é o segredo técnico mais eficiente e menos conhecido: quando o iPhone é conectado a um computador de confiança, o sistema operacional descarrega gigabytes de relatórios de falhas e logs de depuração acumulados:" },
          { "tipo": "passos", "itens": [
            "Conecte o iPhone a um Mac (pelo Finder) ou a um PC com Windows (usando o app oficial Dispositivos Apple ou iTunes) através do cabo USB.",
            "Desbloqueie o iPhone e toque em 'Confiar neste computador', digitando sua senha de tela.",
            "No computador, abra a janela do dispositivo e clique no botão **Sincronizar** (ou Fazer Backup Agora).",
            "Aguarde o término de todas as etapas de sincronização (passos 1 a 5 da barra de progresso superior).",
            "Desconecte o cabo, aguarde cerca de 2 minutos e volte em Ajustes > Geral > Armazenamento do iPhone para constatar a redução dos Dados do Sistema."
          ]}
        ]
      },
      {
        id: "descarregar-aplicativos-nao-usados",
        titulo: "Passo 2: Ativar o Recurso 'Desinstalar Apps Não Usados'",
        blocos: [
          { "tipo": "p", "texto": "O iOS oferece um recurso inteligente que remove o executável pesado de aplicativos raramente abertos, preservando todos os seus documentos, logins e dados intactos:" },
          { "tipo": "passos", "itens": [
            "Acesse **Ajustes** > **App Store**.",
            "Role até a opção **Desinstalar Apps Não Usados** e ative a chave seletora.",
            "O sistema passará a liberar espaço dinamicamente sempre que a memória estiver prestes a se esgotar, mantendo o ícone com uma pequena nuvem cinza na tela inicial para reinstalação instantânea com um toque."
          ]}
        ]
      },
      {
        id: "limpeza-safari-caches-offline",
        titulo: "Passo 3: Limpar Histórico do Safari e Dados de Navegação",
        blocos: [
          { "tipo": "p", "texto": "Bancos de dados locais de sites acessados (Service Workers e WebSQL) residem permanentemente nos Dados do Sistema até serem esvaziados manualmente:" },
          { "tipo": "passos", "itens": [
            "Abra os **Ajustes** do iPhone e selecione **Safari**.",
            "Role para baixo até encontrar a opção **Limpar Histórico e Dados dos Sites**.",
            "Escolha o intervalo de tempo **Todo o histórico** e toque em **Limpar Histórico**.",
            "Em seguida, toque em **Avançado** (no final do menu do Safari) > **Dados dos Sites** e toque em **Remover Todos os Dados dos Sites**."
          ]}
        ]
      },
      {
        id: "gerenciamento-anexos-mensagens",
        titulo: "Passo 4: Excluir Anexos Grandes do App Mensagens e WhatsApp",
        blocos: [
          { "tipo": "p", "texto": "Vídeos em alta definição recebidos em conversas frequentemente ficam em cache duplicado nos dados do sistema:" },
          { "tipo": "passos", "itens": [
            "Em **Ajustes** > **Geral** > **Armazenamento do iPhone**, verifique a seção de recomendações do iOS.",
            "Se houver a opção **Rever Anexos Grandes**, toque nela e exclua vídeos e arquivos compactados que já foram salvos.",
            "No WhatsApp, acesse Configurações > Armazenamento e Dados > Gerenciar Armazenamento e exclua arquivos maiores que 5 MB de grupos antigos."
          ]}
        ]
      },
      {
        id: "backup-e-restauracao-limpa",
        titulo: "Passo 5: Solução Definitiva com Backup e Restauração",
        blocos: [
          { "tipo": "p", "texto": "Se os Dados do Sistema estiverem com mais de 50 GB consumidos por um bug de indexação do iOS que se recusa a esvaziar, o procedimento padrão da engenharia da Apple é fazer backup e restaurar:" },
          { "tipo": "lista", "itens": [
            "Faça um backup completo criptografado no computador ou no iCloud.",
            "Vá em Ajustes > Geral > Transferir ou Redefinir o iPhone e selecione **Apagar Conteúdo e Ajustes**.",
            "Durante a tela de inicialização ('Olá'), selecione **Restaurar de um Backup do Mac/PC** ou **Restaurar do Backup do iCloud**.",
            "Esse processo reconstrói as partições lógicas do zero, devolvendo os Dados do Sistema para o patamar padrão de 5 a 8 GB."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "Qual é o tamanho normal dos Dados do Sistema em um iPhone saudável?",
        r: "Em condições normais de uso, a categoria Dados do Sistema varia naturalmente entre 5 GB e 12 GB. Valores nessa faixa são esperados e necessários para o funcionamento ágil do cache do processador neural e das funções do iOS."
      },
      {
        p: "Por que os Dados do Sistema aumentam sozinhos de repente?",
        r: "Geralmente ocorre após o iPhone baixar em segundo plano uma grande atualização do iOS (como do iOS 17 para o 18) que fica aguardando autorização para ser instalada durante a noite, ou durante a indexação de milhares de fotos após uma viagem."
      },
      {
        p: "Aplicativos de 'limpeza de memória' na App Store funcionam no iPhone?",
        r: "Não. Devido à arquitetura fechada de sandboxing do iOS, nenhum aplicativo de terceiros tem permissão para vasculhar ou apagar arquivos de outros apps ou da pasta do sistema. Esses aplicativos costumam ser apenas enganosos."
      },
      {
        p: "Desinstalar e reinstalar o Instagram e TikTok ajuda?",
        r: "Sim, muito. Aplicativos de redes sociais com feed de vídeo contínuo acumulam gigabytes de cache que o iOS às vezes classifica sob Dados do Sistema. Desinstalar e reinstalar esvazia esses bancos de dados temporários de uma só vez."
      },
      {
        p: "Downloads de mapas offline e podcasts aumentam os Dados do Sistema?",
        r: "Sim. Episódios baixados no Apple Podcasts ou áreas salvas para navegação offline no Apple Maps ficam alocados em caches de mídia do sistema. Acesse Ajustes > Podcasts e Ajustes > Mapas para gerenciar ou apagar conteúdos offline."
      },
      {
        p: "Reiniciar o iPhone ajuda a diminuir esse espaço?",
        r: "Sim. Um reinício simples do aparelho descarrega arquivos temporários da memória de paginação swap do sistema, frequentemente liberando entre 1 e 3 GB instantaneamente."
      }
    ],
    fontes: [
      {
        titulo: "Suporte da Apple — Como verificar o armazenamento no iPhone e iPad",
        url: "https://support.apple.com/pt-br/108429"
      },
      {
        titulo: "Suporte da Apple — Se você precisar de mais espaço para uma atualização no iPhone",
        url: "https://support.apple.com/pt-br/102670"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [137, 149, 158, 138]
  },
  {
    id: 158,
    slug: "como-recuperar-fotos-videos-apagados-lixeira-celular",
    titulo: "Como Recuperar Fotos e Vídeos Apagados da Lixeira do Celular",
    descricao: "Guia completo para recuperar mídias excluídas no Android e iPhone: pasta Apagados Recentes, backups na nuvem (Google Fotos/iCloud) e mitos de apps milagrosos.",
    resposta_curta: "Para recuperar fotos e vídeos excluídos, verifique primeiro a pasta 'Lixeira' ou 'Apagados Recentemente' na Galeria do celular, onde os arquivos permanecem salvos por 30 a 60 dias. Se a lixeira já foi esvaziada, consulte a lixeira da nuvem no Google Fotos (photos.google.com) ou no iCloud Fotos (icloud.com). Evite instalar aplicativos milagrosos no próprio celular, pois gravar novos dados sobrescreve as células de memória onde as fotos estavam alocadas.",
    aplica_se: "Android (Samsung, Motorola, Xiaomi) e iPhone (iOS)",
    intro: [
      "Apagar acidentalmente uma foto de família insubstituível, um vídeo de viagem ou o comprovante de um pagamento bancário importante é uma das experiências mais desesperadoras que podem acontecer no uso do celular. Diante do pânico, muitos usuários recorrem impulsivamente à instalação de aplicativos duvidosos que prometem milagres mas que acabam piorando a situação ao sobrescrever o espaço livre da memória flash.",
      "Tanto o sistema operacional Android quanto o iOS possuem camadas nativas de proteção projetadas justamente para evitar a exclusão imediata definitiva de mídias. Mesmo quando você esvazia a lixeira principal do aplicativo de galeria, cópias em segundo plano sincronizadas com o Google Fotos, OneDrive ou iCloud frequentemente continuam intactas nas nuvens associadas à sua conta. A seguir, detalhamos o passo a passo seguro para resgatar seus arquivos sem colocar sua privacidade em risco."
    ],
    secoes: [
      {
        id: "lixeira-nativa-iphone-android",
        titulo: "Passo 1: Verificar a Pasta 'Apagados Recentemente' da Galeria",
        blocos: [
          { "tipo": "p", "texto": "Quase todos os sistemas operacionais modernos não apagam arquivos de mídia de imediato; eles os movem para uma pasta de quarentena temporária:" },
          { "tipo": "passos", "itens": [
            "**No iPhone (iOS):** Abra o app Fotos, toque na aba **Álbuns**, role até a seção 'Mais Itens' e toque em **Apagados** (requer Face ID/Touch ID para abrir). Selecione as fotos desejadas e toque em **Recuperar**.",
            "**Na Samsung (One UI):** Abra a Galeria, toque no menu de três linhas no canto inferior direito, selecione **Lixeira**, toque em 'Editar', marque as fotos e selecione **Restaurar**.",
            "**Na Motorola / Xiaomi / Google Pixel:** Abra o Google Fotos, toque na aba **Biblioteca** ou **Coleções** e selecione **Lixeira**."
          ]},
          { "tipo": "aviso", "nivel": "info", "texto": "Os arquivos permanecem na lixeira nativa por até 30 dias (no iOS e Samsung) ou 60 dias (no Google Fotos com backup ativado) antes de serem purgados de forma permanente." }
        ]
      },
      {
        id: "recuperar-nuvem-google-icloud",
        titulo: "Passo 2: Recuperar Direto pelos Portais Web da Nuvem",
        blocos: [
          { "tipo": "p", "texto": "Se o seu celular foi formatado, roubado ou a galeria local foi esvaziada, acesse o repositório central da nuvem usando um navegador de internet no computador:" },
          { "tipo": "lista", "itens": [
            "**Google Fotos Web:** Acesse `photos.google.com` com a mesma conta Google logada no celular. Verifique na aba principal e depois clique na aba **Lixeira** na barra lateral esquerda. Fotos excluídas do aparelho às vezes continuam salvas na nuvem caso a sincronização de exclusão não tenha sido transmitida.",
            "**iCloud Fotos Web:** Acesse `icloud.com/photos` com seu Apple ID e senha. No menu lateral, clique em **Apagados Recentemente** para visualizar e restaurar as mídias para a biblioteca.",
            "**OneDrive / Samsung Cloud:** Se você possui um celular Samsung com integração ao OneDrive da Microsoft, acesse `onedrive.live.com` e consulte a lixeira do seu armazenamento corporativo ou pessoal.",
            "**Google Drive / Lixeira Geral:** Documentos e fotos compartilhadas em pastas do Drive permanecem por 30 dias em `drive.google.com/drive/trash`."
          ]}
        ]
      },
      {
        id: "perigo-sobrescrita-memoria",
        titulo: "Passo 3: A Regra de Ouro Contra a Sobrescrita de Memória",
        blocos: [
          { "tipo": "p", "texto": "Se as fotos foram de fato esvaziadas de todas as lixeiras e nuvens, o sucesso de qualquer procedimento técnico de recuperação de baixo nível depende de não gravar nada novo no aparelho:" },
          { "tipo": "passos", "itens": [
            "Coloque o celular imediatamente em **Modo Avião** para impedir que mensagens de WhatsApp com fotos e vídeos cheguem em segundo plano.",
            "Não baixe novos aplicativos, não tire novas fotos nem grave vídeos.",
            "Nas memórias flash modernas com criptografia por arquivo (FBE - File-Based Encryption) presentes no Android e iPhone, quando um arquivo é purgado permanentemente, a chave criptográfica é destruída. Se novos blocos de dados forem gravados por cima das células de memória, a recuperação torna-se matematicamente impossível."
          ]}
        ]
      },
      {
        id: "softwares-computador-vs-apps-celular",
        titulo: "Passo 4: Usar Softwares de Computador em Vez de Aplicativos no Celular",
        blocos: [
          { "tipo": "p", "texto": "Nunca instale apps de recuperação diretamente no smartphone afetado, pois o próprio ato de baixar o app sobrescreve o espaço livre onde as fotos deletadas residiam:" },
          { "tipo": "lista", "itens": [
            "Conecte o smartphone via cabo USB ao computador em modo MTP ou depuração.",
            "Utilize softwares consolidados de varredura profunda no computador (como Disk Drill ou Recuva para cartões MicroSD externos).",
            "Para cartões de memória SD, remova o cartão do celular e utilize um leitor USB dedicado no computador para rodar ferramentas forenses de código aberto como o **PhotoRec / TestDisk**, que leem blocos RAW sem alterar a tabela de arquivos."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "Aplicativos grátis na Play Store que prometem recuperar fotos funcionam?",
        r: "A grande maioria desses aplicativos apenas vasculha a pasta de miniaturas de cache (thumbnails) de imagens que você já tem no celular ou que viu em navegadores, exibindo-as em baixa resolução como se fossem fotos recuperadas. Eles não conseguem contornar a criptografia de blocos apagados."
      },
      {
        p: "O WhatsApp possui backup próprio de fotos?",
        r: "Sim. Se você apagar uma foto da galeria, ela ainda pode estar preservada dentro da conversa do WhatsApp caso você não tenha excluído a mensagem. Acesse os Dados do Contato > Mídias, links e docs para verificar e baixar novamente para o celular."
      },
      {
        p: "É possível recuperar fotos apagadas há mais de 1 ano?",
        r: "Sem um backup prévio feito na nuvem ou em um computador, é praticamente impossível. Após 30 a 60 dias nas lixeiras, os sistemas operacionais executam rotinas de limpeza profunda (comando TRIM em memórias flash) que liberam e limpam definitivamente os setores de armazenamento."
      },
      {
        p: "Fotos apagadas de pasta segura (como a Pasta Segura da Samsung) têm lixeira?",
        r: "Sim. A Pasta Segura possui sua própria Lixeira independente. Abra a Pasta Segura, acesse a Galeria interna, toque nos três pontos e selecione Lixeira para recuperar arquivos excluídos dentro do ambiente protegido."
      },
      {
        p: "Como funciona a ferramenta de código aberto PhotoRec?",
        r: "O PhotoRec é uma ferramenta forense independente de sistema operacional que analisa cabeçalhos binários de arquivos de imagem (como magic bytes de JPEG e PNG) diretamente no setor físico do disco, sendo extremamente eficaz para recuperar cartões de memória MicroSD formatados acidentalmente."
      },
      {
        p: "Como me proteger contra perda definitiva de fotos no futuro?",
        r: "Ative o backup automático do Google Fotos ou do iCloud Fotos em resolução original. Para máxima segurança profissional, adote a regra de backup 3-2-1: mantenha seus arquivos no celular, uma cópia sincronizada na nuvem e uma cópia física mensal transferida para um computador ou HD externo."
      }
    ],
    fontes: [
      {
        titulo: "Ajuda do Google Fotos — Encontrar fotos e vídeos excluídos ou restaurá-los",
        url: "https://support.google.com/photos/answer/6128858?hl=pt-BR"
      },
      {
        titulo: "Suporte da Apple — Se você não encontrar fotos ou vídeos no app Fotos",
        url: "https://support.apple.com/pt-br/102558"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [112, 137, 138, 152]
  },
  {
    id: 160,
    slug: "como-resolver-erro-dispositivo-incompativel-google-play-store",
    titulo: "Como Resolver o Erro 'Seu Dispositivo Não é Compatível com Esta Versão'",
    descricao: "Solução prática para o erro de dispositivo incompatível na Google Play Store: verificação de arquitetura (32/64 bits), versão do Android e Play Protect.",
    resposta_curta: "A mensagem 'Seu dispositivo não é compatível com esta versão' na Play Store ocorre quando o aplicativo exige uma versão mais recente do Android, depende de recursos de hardware específicos ausentes no aparelho (como sensores giroscópio, câmera com foco automático ou chips de 64 bits), ou quando a certificação Play Protect do aparelho está corrompida. Para resolver, verifique atualizações de sistema do celular, limpe os dados da Google Play Store e confira o status de certificação do dispositivo.",
    aplica_se: "Smartphones e tablets Android",
    intro: [
      "Tentar baixar um aplicativo de banco, jogo popular ou ferramenta de streaming na Google Play Store e receber a mensagem bloqueadora 'Seu dispositivo não é compatível com esta versão' é uma das situações mais decepcionantes para usuários de Android. O botão verde de 'Instalar' simplesmente não aparece, deixando o usuário sem acesso ao software.",
      "Esse bloqueio é estabelecido pelos próprios desenvolvedores do aplicativo através das diretrizes do manifesto do Android (AndroidManifest.xml). No entanto, em muitos casos o aparelho possui capacidade de hardware suficiente e o bloqueio decorre apenas de inconsistências temporárias no perfil de certificação Play Protect, restrições regionais de país ou de caches corrompidos que informam parâmetros incorretos de tela ou DPI aos servidores do Google. A seguir, ensinamos como identificar a causa real e tentar contornar a restrição com segurança."
    ],
    secoes: [
      {
        id: "principais-motivos-incompatibilidade",
        titulo: "Por Que Esse Bloqueio Acontece na Play Store?",
        blocos: [
          { "tipo": "p", "texto": "Os filtros de distribuição da Google Play Store avaliam os metadados do seu dispositivo cruzando com as seguintes exigências do aplicativo:" },
          { "tipo": "tabela", "cabecalho": ["Exigência Técnica", "O Que Significa", "Pode Ser Resolvido?"], "linhas": [
            ["Versão Mínima do Android (minSdkVersion)", "O app exige Android 12 ou superior e o aparelho está no Android 10.", "Apenas se houver atualização oficial do sistema pendente."],
            ["Arquitetura de CPU (ARM64 vs ARMv7)", "Apps modernos exigem exclusivamente processadores e sistemas de 64 bits.", "Não. Limitação física e de kernel do aparelho."],
            ["Recursos de Hardware ausentes", "O aplicativo requer giroscópio, NFC, bússola ou câmera com autofoco.", "Não, se a peça de hardware físico não existir no aparelho."],
            ["Status Play Protect Não Certificado", "Aparelho com root, ROM customizada ou falha de assinatura de fábrica.", "Sim. Limpeza de dados ou registro de ID na Google."],
            ["Restrição Geográfica de País", "O desenvolvedor disponibilizou o app apenas em regiões ou países específicos.", "Sim. Ajustando o país da conta na Google Play Store."]
          ]}
        ]
      },
      {
        id: "limpar-dados-play-store-cache-filtro",
        titulo: "Passo 1: Limpar Cache e Dados da Google Play Store",
        blocos: [
          { "tipo": "p", "texto": "Muitas vezes a Play Store armazena em cache uma lista antiga de compatibilidade de quando o celular estava em uma versão anterior do sistema:" },
          { "tipo": "passos", "itens": [
            "Abra as **Configurações** do Android.",
            "Vá em **Aplicativos** > **Google Play Store**.",
            "Toque em **Armazenamento** e selecione **Limpar Cache** e depois **Limpar Dados**.",
            "Faça o mesmo procedimento para o aplicativo **Google Play Services**.",
            "Reinicie o smartphone, abra a Play Store, aguarde 1 minuto para a recriação do perfil de dispositivo e busque o aplicativo novamente."
          ]}
        ]
      },
      {
        id: "verificar-certificacao-play-protect",
        titulo: "Passo 2: Verificar a Certificação Play Protect do Aparelho",
        blocos: [
          { "tipo": "p", "texto": "Se o seu aparelho for importado ou tiver sofrido modificações no software, a Play Store pode classificá-lo como não certificado, bloqueando aplicativos que exigem alta segurança (como apps bancários):" },
          { "tipo": "passos", "itens": [
            "Abra a **Google Play Store** e toque na foto do seu perfil.",
            "Acesse **Configurações** e toque na seção **Sobre** para expandir os detalhes.",
            "Role até o final e verifique o campo **Certificação do Play Protect**.",
            "Se estiver escrito 'O dispositivo é certificado', o aparelho está regular.",
            "Se estiver escrito 'Dispositivo não certificado', registre o GSF ID do seu aparelho no portal oficial da Google (`google.com/android/uncertified`) para liberar a compatibilidade de fábrica."
          ]}
        ]
      },
      {
        id: "verificar-pais-regiao-play-store",
        titulo: "Passo 3: Verificar o País e Região da Conta na Play Store",
        blocos: [
          { "tipo": "p", "texto": "Muitos serviços corporativos, de streaming e bancos só liberam seus APKs em países selecionados:" },
          { "tipo": "passos", "itens": [
            "Na Google Play Store, toque no seu perfil no canto superior direito.",
            "Acesse **Configurações** > **Geral** > **Preferências da conta e do dispositivo**.",
            "Verifique a seção 'País e perfis'. Se a sua conta estiver associada a um país estrangeiro (por exemplo, Estados Unidos ou Portugal), aplicativos do mercado brasileiro (como bancos locais ou apps governamentais) surgirão marcados como incompatíveis.",
            "Mude para o país de residência correto associando uma forma de pagamento local."
          ]}
        ]
      },
      {
        id: "verificar-atualizacoes-do-android",
        titulo: "Passo 4: Atualizar a Versão do Sistema Operacional",
        blocos: [
          { "tipo": "p", "texto": "Se o desenvolvedor aumentou os requisitos mínimos de sistema, confira se não há um pacote de atualização oficial pendente:" },
          { "tipo": "passos", "itens": [
            "Acesse **Configurações** > **Atualização de Software** (ou Sistema > Atualizações do Sistema).",
            "Toque em **Baixar e Instalar** ou **Verificar se há atualizações**.",
            "Se houver uma versão mais recente do Android disponível para o seu modelo, instale-a para atualizar o nível da API do sistema."
          ]}
        ]
      },
      {
        id: "alternativas-seguras-sideloading",
        titulo: "Passo 5: Cuidados ao Baixar APKs Externos (Sideloading)",
        blocos: [
          { "tipo": "p", "texto": "Muitos usuários recorrem ao download de arquivos APK em sites de terceiros quando a Play Store bloqueia o app. Se você optar por essa alternativa, adote precauções rigorosas de segurança:" },
          { "tipo": "lista", "itens": [
            "Utilize exclusivamente repositórios reconhecidos pela comunidade de segurança técnica, como o **APKMirror** (mantido pela equipe do Android Police), que valida as assinaturas criptográficas originais dos desenvolvedores.",
            "Nunca baixe versões 'modificadas' (MODs) de aplicativos de bancos ou redes sociais, pois elas frequentemente contêm malwares bancários (Trojans) embutidos.",
            "Se o APK acusar erro 'Falha ao analisar o pacote' (Parse Error) durante a instalação manual, confirma-se que a versão do seu Android é inferior à exigida pela biblioteca do aplicativo."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O que significa erro de arquitetura ARM64 vs ARMv7?",
        r: "ARM64 refere-se a processadores e sistemas de 64 bits, enquanto ARMv7 refere-se à tecnologia antiga de 32 bits. Aplicativos modernos (especialmente jogos com gráficos avançados e navegadores) abandonaram o suporte a 32 bits. Se o seu aparelho possuir chip de 32 bits, o aplicativo não poderá ser executado de forma alguma."
      },
      {
        p: "Mudar a DPI ou resolução da tela pode causar esse erro?",
        r: "Sim. Se você alterou a densidade de pixels nas Opções do Desenvolvedor ('Menor largura'), alguns aplicativos que exigem layouts específicos de tela podem considerar o aparelho incompatível na Play Store. Restaure o valor padrão de fábrica."
      },
      {
        p: "Por que aplicativos de banco mostram incompatível em celulares com root?",
        r: "Porque o Google Play Integrity API (antigo SafetyNet) detecta alterações no bootloader e no kernel do aparelho. Aplicativos financeiros bloqueiam a instalação em dispositivos com root para prevenir a interceptação de credenciais bancárias e dados sensíveis."
      },
      {
        p: "Posso forçar a instalação do app de banco pelo APKMirror?",
        r: "Mesmo que você instale o arquivo APK manualmente, o aplicativo do banco rodará as checagens de integridade em tempo de execução ao ser aberto e se recusará a carregar caso o aparelho não atenda aos requisitos de segurança."
      },
      {
        p: "Participar do programa Beta de um aplicativo pode causar incompatibilidade?",
        r: "Sim. Versões beta frequentemente contêm requisitos experimentais ou instabilidades de compilação. Role até o final da página do aplicativo na Play Store e toque em 'Sair do programa beta', aguarde alguns minutos e reinstale a versão estável pública."
      },
      {
        p: "Tablets Android sofrem mais com esse problema do que celulares?",
        r: "Sim. Desenvolvedores que não desenharam interfaces adaptadas para telas grandes às vezes marcam seus aplicativos na Play Store como exclusivos para 'telefones', impedindo o download oficial em tablets."
      }
    ],
    fontes: [
      {
        titulo: "Ajuda do Google Play — 'Seu dispositivo não é compatível com esta versão'",
        url: "https://support.google.com/googleplay/answer/113410?hl=pt-BR"
      },
      {
        titulo: "Android Developers — Filtros do Google Play e compatibilidade de hardware",
        url: "https://developer.android.com/google/play/filters?hl=pt-br"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [139, 138, 158, 112]
  }
];

let okCount = 0;
celularArticles.forEach(art => {
  const filePath = path.join(EDITORIAL_DIR, `${art.slug}.json`);
  const words = countEditorial(art);
  console.log(`Artigo ID ${art.id} (${art.slug}): ${words} palavras`);
  if (words >= MIN_WORDS) okCount++;
  else console.warn(`⚠️ Menos de ${MIN_WORDS} palavras: ${words}`);
  fs.writeFileSync(filePath, JSON.stringify(art, null, 2), 'utf-8');
});

console.log(`Lote Celular processado: ${okCount}/${celularArticles.length} acima da meta de ${MIN_WORDS} palavras.`);
