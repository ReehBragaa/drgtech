const fs = require('fs');
const path = require('path');
const { countEditorial, MIN_WORDS } = require('./count_words');

const EDITORIAL_DIR = path.resolve(__dirname, '..', 'data', 'editorial');
if (!fs.existsSync(EDITORIAL_DIR)) fs.mkdirSync(EDITORIAL_DIR, { recursive: true });

const winArticles = [
  {
    id: 177,
    slug: "como-resolver-erro-critical-process-died-boot-windows-11",
    titulo: "Como Resolver o Erro CRITICAL_PROCESS_DIED no Boot do Windows 11",
    descricao: "Guia completo para solucionar o erro de parada Critical Process Died (0x000000EF) no Windows 11: reparo de inicialização, BCD, drivers e WinRE.",
    resposta_curta: "O erro CRITICAL_PROCESS_DIED (código 0x000000EF) ocorre quando um processo vital do kernel do Windows (como csrss.exe, wininit.exe ou services.exe) é encerrado de forma anômala. Para corrigir quando o sistema não inicia, acesse o Ambiente de Recuperação (WinRE), abra o Prompt de Comando e execute o reparo de inicialização com `bootrec /fixmbr`, `bootrec /rebuildbcd`, seguido por `sfc /scannow /offbootdir=C:\\ /offwindir=C:\\windows` e desinstalação de atualizações problemáticas recentes.",
    aplica_se: "Windows 11 e Windows 10 em UEFI/GPT",
    intro: [
      "O código de bugcheck CRITICAL_PROCESS_DIED (identificador hexadecimal 0x000000EF) é um dos erros de tela azul mais severos do ecossistema Windows. Ele não decorre de travamentos em aplicativos comuns de usuário (como navegadores ou editores de texto), mas sim do encerramento inesperado de um dos processos nucleares do sistema operacional sem os quais o kernel não consegue manter a integridade básica da sessão.",
      "Entre esses processos críticos protegidos estão o Gerenciador de Sessão (smss.exe), o Subsistema de Tempo de Execução Cliente-Servidor (csrss.exe), a Inicialização do Windows (wininit.exe) ou o Gerenciador de Logon (winlogon.exe). Se um driver de dispositivo corrompido, uma falha de leitura em setores defeituosos do SSD ou uma infecção por rootkit forçar o encerramento forçado de qualquer um desses executáveis, o Windows paralisa o processador para evitar danos irreparáveis à estrutura de arquivos. Neste guia passo a passo, demonstramos como restaurar o boot do sistema diretamente pelo console de recuperação."
    ],
    secoes: [
      {
        id: "processos-criticos-envolvidos",
        titulo: "Quais Processos Provocam o Bugcheck 0xEF?",
        blocos: [
          { "tipo": "p", "texto": "No modelo de segurança do Windows, certos processos são marcados com o atributo de processo crítico no subsistema de gerenciamento de objetos do kernel. A tabela abaixo lista os principais executáveis cujo encerramento aciona essa tela azul:" },
          { "tipo": "tabela", "cabecalho": ["Processo", "Função no Sistema", "Causa Comum de Falha"], "linhas": [
            ["csrss.exe", "Subsistema Win32, gerencia janelas e consoles.", "Injeção de DLLs incompatíveis ou corrupção de arquivos do sistema."],
            ["smss.exe", "Gerenciador de Sessão, cria subsistemas e variáveis de ambiente.", "Problemas no registro do sistema ou setores defeituosos no SSD/HD."],
            ["wininit.exe", "Inicializa o subsistema de segurança LSASS e Service Control Manager.", "Drivers de antivírus ou filtros de segurança corrompidos."],
            ["services.exe", "Controlador central de serviços e drivers automáticos.", "Falha de driver de terceiros com privilégio SYSTEM."],
            ["lsass.exe", "Serviço de autenticação de segurança local.", "Corrupção de credenciais ou conflitos com softwares corporativos."]
          ]}
        ]
      },
      {
        id: "acessar-winre",
        titulo: "Passo 1: Acessar o Ambiente de Recuperação (WinRE)",
        blocos: [
          { "tipo": "p", "texto": "Se o computador estiver preso em loop de inicialização exibindo a tela azul antes de carregar a Área de Trabalho, você precisará acionar o console de recuperação de emergência:" },
          { "tipo": "passos", "itens": [
            "Pressione o botão liga/desliga do computador para ligá-lo. Assim que o logotipo do fabricante aparecer com o círculo de carregamento, mantenha o botão liga/desliga pressionado por 5 a 10 segundos para forçar o desligamento.",
            "Repita esse procedimento de desligamento forçado por duas vezes consecutivas.",
            "Na terceira inicialização, o Windows detectará a anomalia e exibirá a mensagem 'Preparando Reparo Automático' seguida por 'Diagnosticando o computador'.",
            "Na tela azul com o título 'Reparo Automático', clique no botão **Opções avançadas**.",
            "Navegue até **Solução de Problemas** e selecione **Opções avançadas**."
          ]}
        ]
      },
      {
        id: "reparo-offline-sfc-dism",
        titulo: "Passo 2: Executar Reparo Offline de Arquivos do Sistema via Prompt",
        blocos: [
          { "tipo": "p", "texto": "Como o Windows não está iniciando, o comando SFC tradicional não funcionará diretamente sem parâmetros offline, pois ele tentará verificar a partição virtual RAM temporária (disco X:) em vez do seu sistema real:" },
          { "tipo": "passos", "itens": [
            "Na tela de Opções Avançadas do WinRE, clique em **Prompt de Comando**.",
            "Identifique a letra da partição onde o Windows está instalado digitando `bcdedit | findstr /i osdevice` e anotando a unidade (habitualmente `C:` ou `D:` no ambiente de recuperação).",
            "Execute a varredura offline apontando a pasta do Windows correta:",
            "Aguarde a finalização da verificação e substituição de arquivos corrompidos."
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "sfc /scannow /offbootdir=C:\\ /offwindir=C:\\windows" },
          { "tipo": "aviso", "nivel": "info", "texto": "Se a sua partição do Windows for a letra D: dentro do WinRE, altere o comando para /offbootdir=D:\\ /offwindir=D:\\windows." }
        ]
      },
      {
        id: "reparo-de-inicializacao-bcd",
        titulo: "Passo 3: Reconstruir os Registros de Inicialização (BCD e MBR)",
        blocos: [
          { "tipo": "p", "texto": "Se ponteiros corrompidos nos arquivos BCD (Boot Configuration Data) impedirem o carregamento dos drivers essenciais no arranque, execute a sequência padrão de reconstrução no console:" },
          { "tipo": "codigo", "linguagem": "powershell", "texto": "bootrec /fixmbr\nbootrec /fixboot\nbootrec /rebuildbcd" },
          { "tipo": "p", "texto": "Se o comando `bootrec /fixboot` retornar 'Acesso negado' em sistemas modernos UEFI, execute os comandos de atribuição de volume na partição EFI oculta ou utilize o utilitário nativo `bcdboot` para recriar os arquivos de boot limpos:" },
          { "tipo": "codigo", "linguagem": "powershell", "texto": "bcdboot C:\\Windows /s C: /f ALL" }
        ]
      },
      {
        id: "desinstalar-atualizacoes-recentes",
        titulo: "Passo 4: Desinstalar Atualizações Recentes do Windows",
        blocos: [
          { "tipo": "p", "texto": "Se o erro Critical Process Died surgiu imediatamente após uma atualização cumulativa do Windows Update, a causa é incompatibilidade de pacotes com drivers legados instalados na placa-mãe:" },
          { "tipo": "passos", "itens": [
            "Volte ao menu principal de Opções Avançadas do WinRE.",
            "Selecione **Desinstalar Atualizações**.",
            "Clique primeiro em **Desinstalar a atualização de qualidade mais recente** (pacotes cumulativos mensais de correção).",
            "Aguarde o processo de reversão e tente reiniciar normalmente.",
            "Se a falha persistir, repita o processo e escolha **Desinstalar a atualização de recursos mais recente** (grandes versões anuais do sistema)."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O que significa o código de parada 0x000000EF?",
        r: "O código 0x000000EF é a representação numérica formal de CRITICAL_PROCESS_DIED. Ele indica especificamente que um thread pertencente a um processo vital do sistema operacional foi abortado inesperadamente, impedindo a continuidade segura da operação do kernel."
      },
      {
        p: "Posso perder meus arquivos pessoais com o erro Critical Process Died?",
        r: "O erro em si não apaga documentos, fotos ou planilhas armazenadas nas suas pastas de usuário. No entanto, se o desligamento ocorreu no exato momento em que um arquivo estava sendo gravado, esse arquivo específico pode sofrer corrupção. O disco e suas partições permanecem intactos."
      },
      {
        p: "O que fazer se o Prompt de Comando do WinRE pedir a senha do BitLocker?",
        r: "Se o seu SSD estiver criptografado pelo BitLocker, você precisará inserir a chave de recuperação numérica de 48 dígitos. Você pode consultá-la acessando a página oficial account.microsoft.com/devices/recoverykey através de qualquer outro celular ou computador conectado à mesma conta Microsoft."
      },
      {
        p: "Modo de Segurança funciona quando ocorre Critical Process Died?",
        r: "Em cerca de metade dos casos, sim. Como o Modo de Segurança carrega apenas drivers genéricos essenciais da Microsoft e bloqueia serviços de inicialização de terceiros, se o causador for um driver conflitante, o sistema conseguirá inicializar no Modo de Segurança, permitindo desinstalar o programa problemático."
      },
      {
        p: "Quando a restauração ou formatação do PC se torna necessária?",
        r: "Se você executou o reparo de arquivos offline com o SFC, reconstruiu a partição de boot com o bcdboot e reverteu atualizações, mas a máquina continua caindo no erro 0xEF antes do logon, o Registro do Windows (arquivos SAM e SYSTEM na pasta config) sofreu corrupção estrutural irrecuperável. Nesse cenário, utilize a opção 'Restaurar o PC' mantendo seus arquivos pessoais."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — Bug Check 0xEF CRITICAL_PROCESS_DIED",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/debugger/bug-check-0xef---critical-process-died"
      },
      {
        titulo: "Microsoft Learn — Como solucionar problemas de inicialização do Windows",
        url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/performance/windows-boot-issues-troubleshooting"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [143, 155, 176, 178]
  },
  {
    id: 178,
    slug: "como-resolver-tela-azul-memory-management-windows-11",
    titulo: "Como Resolver a Tela Azul MEMORY_MANAGEMENT no Windows 11",
    descricao: "Guia técnico para diagnosticar e solucionar o erro MEMORY_MANAGEMENT (0x0000001A) no Windows 11: teste de pentes de memória RAM e integridade de arquivo de paginação.",
    resposta_curta: "A tela azul MEMORY_MANAGEMENT (código 0x0000001A) indica que o gerenciador de memória do Windows detectou uma corrupção severa nas estruturas de controle de paginação ou alocação de RAM física. Para resolver, execute o Diagnóstico de Memória do Windows (`mdsched.exe`) para identificar defeitos nos pentes de memória, redefina o arquivo de paginação (pagefile.sys), atualize os drivers de chipset, investigue pools de drivers com o Driver Verifier e desative perfis XMP/EXPO de aceleração de RAM na BIOS.",
    aplica_se: "Windows 11 e Windows 10",
    intro: [
      "O gerenciador de memória do Windows é responsável por mapear endereços de memória virtual dos programas para endereços de memória física (RAM) e gerenciar a troca contínua de páginas com o arquivo pagefile.sys no disco de armazenamento. Quando o kernel detecta uma inconsistência lógica que não pode ser reconciliada (como contadores de descritores de página corrompidos, listas de quadros livres violadas ou bits invertidos em endereços físicos de memória), ele aciona a tela azul de parada MEMORY_MANAGEMENT (código 0x0000001A).",
      "Embora muitos usuários associem esse erro exclusivamente a defeito físico irreversível na memória RAM, uma parcela expressiva das ocorrências decorre de problemas lógicos tratáveis, como drivers de vídeo gravando em áreas de memória de outros processos, arquivo de paginação corrompido em SSDs sobrecarregados ou tensões elétricas instáveis na placa-mãe. Neste artigo técnico, mostramos como separar falhas de software de defeitos reais de hardware e como interpretar os códigos de subdiagnóstico do kernel."
    ],
    secoes: [
      {
        id: "subcodigos-parametro-1-memoria",
        titulo: "Entendendo os Subcódigos do Parâmetro 1 (Arg1)",
        blocos: [
          { "tipo": "p", "texto": "Ao abrir o arquivo de despejo de memória minidump com o WinDbg ou BlueScreenView, o primeiro parâmetro (Arg1) indica a causa exata identificada pelo subsistema de memória do kernel NT:" },
          { "tipo": "tabela", "cabecalho": ["Código Arg1", "Significado Técnico", "Causa Mais Provável"], "linhas": [
            ["0x41792", "Uma tabela de páginas do processo foi corrompida.", "Defeito de hardware em pente de RAM ou driver corrompendo pool."],
            ["0x41284", "Uma lista de páginas modificadas foi corrompida.", "Instabilidade de tensão no controlador de memória da CPU (IMC)."],
            ["0x41287", "A contagem de referências de uma página tornou-se inconsistente.", "Driver de dispositivo sobrescrevendo ponteiros de memória alheia."],
            ["0x61941", "Falha de proteção em nível de decodificação de página.", "Incompatibilidade severa de perfil de overclock XMP/EXPO."],
            ["0x3451", "Falha de E/S ao ler uma página do disco no arquivo de paginação.", "Setores defeituosos ou falha de comunicação no SSD/HD."]
          ]}
        ]
      },
      {
        id: "diagnostico-memoria-windows",
        titulo: "Passo 1: Executar o Diagnóstico de Memória do Windows (mdsched)",
        blocos: [
          { "tipo": "p", "texto": "O Windows inclui uma ferramenta integrada de diagnóstico que testa os módulos físicos de RAM antes do carregamento do sistema operacional, sem a interferência de drivers de terceiros:" },
          { "tipo": "passos", "itens": [
            "Pressione as teclas `Windows + R`, digite `mdsched.exe` e pressione Enter.",
            "Na janela que se abrir, clique na opção **Reiniciar agora e verificar se há problemas (recomendado)**.",
            "O computador será reiniciado imediatamente na Ferramenta de Diagnóstico de Memória do Windows, executando uma série de testes de leitura e escrita em blocos.",
            "Pressione a tecla **F1** para acessar as opções avançadas e selecione a combinação de teste **Estendida** com cache ativado para uma checagem rigorosa.",
            "Aguarde o término dos testes (pode levar de 15 a 45 minutos). O computador reiniciará automaticamente no Windows."
          ]},
          { "tipo": "p", "texto": "Se a ferramenta acusar qualquer erro em tela durante o teste, um ou mais pentes de memória RAM estão com defeito físico em células semicondutoras ou mal encaixados no slot da placa-mãe." }
        ]
      },
      {
        id: "redefinir-arquivo-paginacao",
        titulo: "Passo 2: Limpar e Redefinir o Arquivo de Paginação (pagefile.sys)",
        blocos: [
          { "tipo": "p", "texto": "Se o arquivo de paginação no disco contiver setores corrompidos ou tiver sido dimensionado de forma fragmentada por programas de otimização, o gerenciador de memória falhará ao descarregar dados da RAM para o disco:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + R`, digite `sysdm.cpl` e pressione Enter para abrir as Propriedades do Sistema.",
            "Acesse a aba **Avançado** e, na seção 'Desempenho', clique no botão **Configurações**.",
            "Na nova janela, clique na aba **Avançado** e, na seção 'Memória virtual', clique em **Alterar**.",
            "Desmarque a opção 'Gerenciar automaticamente o tamanho do arquivo de paginação de todas as unidades'.",
            "Selecione a unidade C:, marque a opção **Sem arquivo de paginação** e clique no botão **Definir**.",
            "Reinicie o computador para que o arquivo corrompido seja purgado do disco.",
            "Após o reinício, retorne à mesma tela e marque novamente a opção **Gerenciar automaticamente o tamanho do arquivo de paginação**, clicando em OK e reiniciando mais uma vez."
          ]}
        ]
      },
      {
        id: "desativar-xmp-expo",
        titulo: "Passo 3: Desativar Perfis de Overclock XMP / AMD EXPO",
        blocos: [
          { "tipo": "p", "texto": "Muitas memórias modernas de alta velocidade são vendidas com frequências como 3200MHz, 3600MHz, 6000MHz ou superiores, que operam sob overclock de fábrica através de perfis Intel XMP ou AMD EXPO. Se o controlador de memória integrado da CPU (IMC) não conseguir manter a estabilidade térmica com essas tensões, ocorrerá o bugcheck 0x1A:" },
          { "tipo": "passos", "itens": [
            "Acesse a BIOS/UEFI do computador pressionando **Del** ou **F2** na inicialização.",
            "Localize a configuração de memória (geralmente sob as abas Ai Tweaker, OC ou Overclocking).",
            "Mude o perfil XMP/EXPO de 'Enabled' para **Disabled** ou **Auto**.",
            "Pressione **F10** para salvar e inicializar."
          ]}
        ]
      },
      {
        id: "driver-verifier-diagnostico",
        titulo: "Passo 4: Rastrear Drivers Conflitantes com o Driver Verifier",
        blocos: [
          { "tipo": "p", "texto": "Se a memória RAM física estiver saudável mas a tela azul persistir, um driver de dispositivo está gravando ilegalmente em pools de memória reservados para outros componentes. O utilitário nativo Driver Verifier monitora essas violações:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + R`, digite `verifier.exe` e execute como Administrador.",
            "Selecione **Criar configurações padrão** e clique em Avançar.",
            "Escolha **Selecionar drivers de uma lista** e ordene a lista por 'Provedor'.",
            "Marque todos os drivers que NÃO sejam da Microsoft (drivers de placa de vídeo, placas de som, periféricos e antivírus).",
            "Clique em Concluir e reinicie o computador para iniciar a monitoração intensiva."
          ]},
          { "tipo": "aviso", "nivel": "atencao", "texto": "Caso o computador apresente tela azul no boot indicando o driver culpado, entre no Modo de Segurança e execute `verifier /reset` no Prompt para desativar o monitoramento antes de desinstalar o driver defeituoso." }
        ]
      },
      {
        id: "teste-individual-pentes",
        titulo: "Passo 5: Teste Físico e Limpeza dos Contatos dos Pentes de RAM",
        blocos: [
          { "tipo": "p", "texto": "Se os testes de software apontaram erros de memória e você possui mais de um pente instalado, isole qual deles é o culpado:" },
          { "tipo": "lista", "itens": [
            "Desligue o computador da tomada e descarregue a eletricidade estática do corpo tocando em uma superfície metálica sem pintura.",
            "Remova todos os pentes de memória e deixe apenas um único módulo conectado no slot primário (consulte o manual da placa-mãe, habitualmente o slot A2).",
            "Limpe cuidadosamente os contatos dourados do pente com uma borracha branca escolar limpa e remova resíduos com pincel seco.",
            "Ligue o computador e use normalmente. Se o erro não se repetir após alguns dias, teste o segundo pente no mesmo slot para confirmar o defeito."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O erro MEMORY_MANAGEMENT pode ser causado por SSD ou HD defeituoso?",
        r: "Sim. Como a memória virtual depende diretamente do arquivo pagefile.sys gravado no SSD ou disco rígido, se o disco tiver setores defeituosos (bad blocks) no local onde o arquivo de paginação está alocado, a leitura da memória falhará, gerando a tela azul 0x1A com o subcódigo 0x3451."
      },
      {
        p: "Memória RAM suja pode gerar esse erro?",
        r: "Com certeza. Poeira acumulada nos slots da placa-mãe ou oxidação nos contatos dourados dos módulos de RAM aumentam a resistência elétrica e introduzem ruído nos sinais de alta frequência da memória, causando corrupção esporádica de bits de dados."
      },
      {
        p: "Posso misturar pentes de memória de marcas ou frequências diferentes?",
        r: "Não é recomendável. Misturar memórias de fabricantes distintos, com latências (CL) e chips de memória diferentes frequentemente causa incompatibilidade de sincronismo de temporização no controlador de memória da CPU, resultando em travamentos periódicos."
      },
      {
        p: "O comando sfc /scannow ajuda a resolver o Memory Management?",
        r: "Ajuda caso a causa seja a corrupção de arquivos de sistema ou drivers essenciais que operam no gerenciamento de memória. Execute o sfc /scannow e o dism /online /cleanup-image /restorehealth como medida complementar de software."
      },
      {
        p: "Qual a melhor ferramenta para testar memória além do Windows?",
        r: "A ferramenta de padrão ouro na indústria técnica é o MemTest86 (versão inicializável via pendrive da PassMark). Ele executa 13 algoritmos de teste matemático durante vários ciclos para detectar até mesmo falhas intermitentes que ocorrem apenas sob aquecimento prolongado."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — Bug Check 0x1A MEMORY_MANAGEMENT",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/debugger/bug-check-0x1a---memory-management"
      },
      {
        titulo: "Microsoft Support — Como diagnosticar problemas de memória no Windows",
        url: "https://support.microsoft.com/pt-br/windows/diagnosticar-problemas-de-mem%C3%B3ria-do-computador-86ef5693-a44d-487d-8fb0-4ddf311c9703"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [143, 155, 176, 177]
  },
  {
    id: 135,
    slug: "como-corrigir-tela-azul-dpc-watchdog-violation-windows-11",
    titulo: "Como Corrigir a Tela Azul DPC_WATCHDOG_VIOLATION no Windows 11",
    descricao: "Solução completa para o erro DPC Watchdog Violation (0x00000133) no Windows 11: atualização de driver SATA AHCI, SSD e firmware.",
    resposta_curta: "A tela azul DPC_WATCHDOG_VIOLATION (código de parada 0x00000133) ocorre quando o temporizador 'cão de guarda' (watchdog) do Windows detecta que uma Chamada de Procedimento Adiada (DPC) ou uma rotina de serviço de interrupção (ISR) de um driver permaneceu em execução por tempo excessivo em nível de IRQL elevado. A causa mais comum é um driver de controladora de armazenamento SATA/NVMe desatualizado (como iaStorA.sys) ou firmware de SSD antigo. Para resolver, altere o driver da controladora SATA para o controlador padrão da Microsoft e atualize o firmware do SSD.",
    aplica_se: "Windows 11 e Windows 10",
    intro: [
      "O subsistema do Windows utiliza um mecanismo inteligente chamado DPC (Deferred Procedure Call) para permitir que os drivers de dispositivos adiem tarefas mais longas de processamento sem bloquear o processador em níveis de interrupção de hardware imediatos. Para garantir que nenhum driver monopolize a CPU indefinidamente, o Windows possui um temporizador sentinela chamado Watchdog.",
      "Se um driver permanecer ocupado executando uma rotina DPC por mais tempo do que o limite seguro estabelecido pelo kernel (geralmente acima de alguns milissegundos sem devolver o controle da fila), o Watchdog interrompe o sistema com o código de parada DPC_WATCHDOG_VIOLATION (0x00000133). Isso impede que a máquina congele de maneira irresponsiva sem gerar relatórios de diagnóstico. A seguir, detalhamos como resolver essa falha que historicamente afeta controladoras de armazenamento e placas sem fio."
    ],
    secoes: [
      {
        id: "parametros-bugcheck-133",
        titulo: "Entendendo os Parâmetros do Bug Check 0x133",
        blocos: [
          { "tipo": "p", "texto": "A tela azul DPC_WATCHDOG_VIOLATION possui dois modos operacionais principais descritos no primeiro parâmetro (Arg1) do despejo de memória minidump:" },
          { "tipo": "tabela", "cabecalho": ["Parâmetro Arg1", "Diagnóstico Técnico", "Causa Típica"], "linhas": [
            ["0x00000000", "Um único DPC executou além do limite de tempo máximo permitido continuamente.", "Driver gráfico (GPU) ou driver de rede travado em laço fechado."],
            ["0x00000001", "O tempo cumulativo de processamento de DPCs superou o teto aceitável de sistema.", "Driver de controladora de armazenamento (SATA/NVMe) com alta latência de I/O."]
          ]},
          { "tipo": "p", "texto": "Identificar se o seu sistema acionou o código 0x0 ou 0x1 ajuda a direcionar a atenção para a placa de vídeo ou para o SSD." }
        ]
      },
      {
        id: "trocar-driver-sata-ahci",
        titulo: "Passo 1: Substituir o Driver da Controladora SATA AHCI pelo Driver Nativo",
        blocos: [
          { "tipo": "p", "texto": "Em mais de 70% dos casos de DPC Watchdog Violation, a causa raiz é o driver de armazenamento da Intel (como `iaStorA.sys` ou `iaStorAVC.sys` do pacote Intel Rapid Storage Technology) que não consegue sincronizar adequadamente comandos de energia com SSDs modernos. A solução comprovada pela comunidade técnica é alternar para o driver padrão AHCI nativo da Microsoft:" },
          { "tipo": "passos", "itens": [
            "Pressione as teclas `Windows + X` e selecione **Gerenciador de Dispositivos**.",
            "Expanda a categoria **Controladores IDE ATA/ATAPI**.",
            "Clique com o botão direito sobre a controladora listada (por exemplo, 'Intel(R) Chipset SATA/PCIe RST Premium Controller' ou similar) e selecione **Atualizar driver**.",
            "Escolha a opção **Procurar drivers no meu computador**.",
            "Em seguida, clique em **Permitir que eu escolha em uma lista de drivers disponíveis em meu computador**.",
            "Selecione na lista a opção **Controlador AHCI SATA padrão** (Standard SATA AHCI Controller) e clique em **Avançar**.",
            "Conclua a instalação e reinicie o computador imediatamente quando solicitado."
          ]},
          { "tipo": "aviso", "nivel": "sucesso", "texto": "O driver AHCI padrão fornecido nativamente pela Microsoft possui alta estabilidade e compatibilidade universal com todos os SSDs e placas-mãe do mercado." }
        ]
      },
      {
        id: "atualizar-firmware-ssd",
        titulo: "Passo 2: Atualizar o Firmware da Unidade SSD",
        blocos: [
          { "tipo": "p", "texto": "SSDs com versões primitivas de firmware frequentemente entram em estados de economia de energia agressivos (LPM - Link Power Management) e demoram para acordar ao receber comandos de leitura, estourando o tempo limite do Watchdog:" },
          { "tipo": "lista", "itens": [
            "Identifique o modelo exato do seu SSD abrindo o Gerenciador de Dispositivos na seção 'Unidades de disco'.",
            "Baixe o utilitário oficial correspondente ao fabricante (Samsung Magician, Crucial Storage Executive, Kingston SSD Manager ou Western Digital Dashboard).",
            "Verifique no painel do aplicativo se há avisos de nova versão de firmware e aplique a atualização seguindo rigorosamente as instruções da fabricante.",
            "Reinicie o computador após a atualização do firmware."
          ]}
        ]
      },
      {
        id: "desativar-inicializacao-rapida",
        titulo: "Passo 3: Desativar a Inicialização Rápida do Windows",
        blocos: [
          { "tipo": "p", "texto": "A Inicialização Rápida (Fast Startup) do Windows coloca os drivers em um estado de hibernação híbrida em vez de um desligamento limpo. Isso pode fazer com que drivers de rede ou armazenamento carreguem em estado inconsistente ao religar a máquina:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + R`, digite `powercfg.cpl` e pressione Enter para abrir as Opções de Energia.",
            "No menu lateral esquerdo, clique em **Escolher a função dos botões de energia**.",
            "Clique no link superior **Alterar configurações não disponíveis no momento** (requer privilégios de administrador).",
            "Na seção 'Configurações de desligamento' na parte inferior, desmarque a caixa **Ligar inicialização rápida (recomendado)**.",
            "Clique em **Salvar alterações** e reinicie o computador."
          ]}
        ]
      },
      {
        id: "gerenciamento-energia-pcie",
        titulo: "Passo 4: Ajustar o Gerenciamento de Energia do PCI Express",
        blocos: [
          { "tipo": "p", "texto": "O recurso de economia de energia Link State Power Management da porta PCIe pode tentar suspender conexões com SSDs NVMe de alta velocidade, causando travamentos temporizados:" },
          { "tipo": "passos", "itens": [
            "No menu `powercfg.cpl`, clique em **Alterar configurações do plano** ao lado do seu plano de energia ativo.",
            "Clique em **Alterar configurações de energia avançadas**.",
            "Expanda o item **PCI Express** e em seguida **Gerenciamento de Energia do Estado do Link**.",
            "Altere a configuração para **Desativado** (tanto na bateria quanto na tomada, se for notebook).",
            "Clique em Aplicar e em OK."
          ]}
        ]
      },
      {
        id: "verificar-drivers-de-rede",
        titulo: "Passo 5: Atualizar Drivers de Placas de Rede Wi-Fi e Ethernet",
        blocos: [
          { "tipo": "p", "texto": "Outro módulo frequente associado ao bugcheck 0x133 é o driver de adaptador Wi-Fi ou Ethernet (como drivers Realtek ou Intel Killer Networking):" },
          { "tipo": "lista", "itens": [
            "Acesse o site oficial da fabricante da sua placa-mãe ou do seu notebook na página de suporte e downloads.",
            "Baixe a versão mais recente dos drivers de LAN (Ethernet) e WLAN (Wi-Fi).",
            "Evite utilizar utilitários genéricos de terceiros de atualização de drivers; utilize exclusivamente os instaladores oficiais do fabricante."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "O que é um DPC no Windows?",
        r: "DPC significa Deferred Procedure Call (Chamada de Procedimento Adiada). É uma fila de tarefas no kernel do Windows onde drivers colocam trabalhos de processamento mais longos logo após responderem a uma interrupção imediata de hardware, evitando travar a CPU."
      },
      {
        p: "O erro DPC Watchdog Violation pode queimar o processador ou placa de vídeo?",
        r: "Não. Trata-se de uma exceção temporizada de software no kernel. A tela azul é disparada exatamente para proteger o computador de travar sem capacidade de resposta, não havendo risco de dano térmico ou elétrico direto."
      },
      {
        p: "Por que esse erro é tão comum após conectar um SSD novo?",
        r: "Porque muitos SSDs recentes utilizam comandos avançados de protocolo NVMe ou SATA que exigem atualização de firmware ou drivers compatíveis com a controladora do chipset da placa-mãe. Se o driver antigo congelar a resposta de I/O, o Watchdog dispara o erro."
      },
      {
        p: "Como saber qual driver específico causou a violação DPC?",
        r: "Você pode analisar o arquivo minidump em C:\\Windows\\Minidump usando a ferramenta gratuita BlueScreenView ou WhoCrashed. O parâmetro 1 (Arg1) com valor 0x0 aponta para uma rotina individual de driver que estourou o tempo limite; o nome do arquivo problemático aparecerá na coluna 'Caused By Driver'."
      },
      {
        p: "Desativar o Watchdog é uma boa ideia?",
        r: "Não. O temporizador Watchdog é um componente de segurança nuclear do kernel NT do Windows e não deve ser desativado. Corrigir o driver que está demorando excessivamente é a única abordagem tecnicamente correta e duradoura."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — Bug Check 0x133 DPC_WATCHDOG_VIOLATION",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/debugger/bug-check-0x133---dpc-watchdog-violation"
      },
      {
        titulo: "Microsoft Learn — Visão geral de chamadas de procedimento adiadas (DPCs)",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/drivers/kernel/introduction-to-dpcs"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [143, 155, 176, 178]
  },
  {
    id: 153,
    slug: "como-corrigir-erro-0x800f081f-windows-update-dotnet-framework",
    titulo: "Como Corrigir o Erro 0x800F081F no Windows Update e .NET Framework",
    descricao: "Guia passo a passo para solucionar o erro 0x800F081F no Windows 11 e 10: reparo de fontes do DISM, ativação do .NET Framework 3.5 e limpeza de cache.",
    resposta_curta: "O erro 0x800F081F ('CBS_E_SOURCE_NOT_FOUND') indica que o Windows Update ou o DISM não conseguiram localizar os arquivos binários de origem necessários para instalar uma atualização cumulativa ou ativar o recurso .NET Framework 3.5. Para resolver, monte uma imagem ISO oficial do Windows 11, execute o comando de reparo apontando o arquivo install.wim com `DISM /Online /Cleanup-Image /RestoreHealth /Source:WIM:X:\\sources\\install.wim:1 /LimitAccess` ou ative o .NET com o comando `DISM /Online /Enable-Feature /FeatureName:NetFx3 /All /Source:X:\\sources\\sxs /LimitAccess`.",
    aplica_se: "Windows 11 e Windows 10",
    intro: [
      "O código de erro 0x800F081F é uma das mensagens mais frustrantes do ecossistema de manutenção do Windows. Na arquitetura do subsistema CBS (Component Based Servicing), esse código traduz-se tecnicamente como CBS_E_SOURCE_NOT_FOUND. Ele ocorre quando o instalador do sistema operacional precisa compilar ou atualizar um pacote de componentes, mas os arquivos binários de referência na pasta de armazenamento WinSxS estão corrompidos, ausentes ou inacessíveis.",
      "Esse erro manifesta-se tipicamente em dois momentos cruciais: durante a tentativa de instalação de atualizações de segurança cumulativas através do Windows Update ou quando o usuário tenta habilitar recursos legados essenciais, como o .NET Framework 3.5 (necessário para executar softwares profissionais de engenharia, sistemas contábeis e jogos clássicos). A seguir, apresentamos o procedimento técnico oficial para contornar a falha utilizando fontes locais e mídias de instalação limpas."
    ],
    secoes: [
      {
        id: "entenda-origem-0x800f081f",
        titulo: "Por que o Erro CBS_E_SOURCE_NOT_FOUND Acontece?",
        blocos: [
          { "tipo": "p", "texto": "Quando você comanda a instalação de um recurso no Windows, o sistema operacional segue uma ordem estrita de busca de arquivos:" },
          { "tipo": "lista", "itens": [
            "**1. Repositório local WinSxS:** O Windows primeiro verifica se os arquivos compactados necessários já residem na pasta `C:\\Windows\\WinSxS`.",
            "**2. Servidores do Windows Update:** Se não encontrar localmente, o sistema faz requisições HTTPS para os servidores centrais da Microsoft.",
            "**3. Políticas de Grupo (WSUS/GPO):** Em computadores de empresas gerenciados por domínio corporativo, políticas de rede podem bloquear o acesso ao Windows Update público e falhar caso o servidor WSUS interno não contenha os pacotes opcionais."
          ]},
          { "tipo": "p", "texto": "Se a conexão com o Windows Update falhar ou se o repositório local tiver sofrido corrupção de manifesto, o instalador desiste e cospe o código 0x800F081F." }
        ]
      },
      {
        id: "ativar-dotnet-com-iso",
        titulo: "Solução 1: Ativar o .NET Framework 3.5 Apontando a Pasta SxS da ISO",
        blocos: [
          { "tipo": "p", "texto": "Se o erro 0x800F081F ocorreu ao tentar ativar o .NET Framework 3.5 pelo Painel de Controle, a maneira mais confiável e à prova de falhas é utilizar a pasta de componentes da mídia ISO oficial:" },
          { "tipo": "passos", "itens": [
            "Baixe o arquivo ISO oficial do Windows 11 diretamente no site da Microsoft.",
            "Dê um duplo clique no arquivo ISO baixado para montá-lo como uma unidade virtual no Explorador de Arquivos (por exemplo, unidade `E:`).",
            "Abra o Prompt de Comando como Administrador (`Windows + X` > Terminal / Prompt Admin).",
            "Execute o comando abaixo, substituindo a letra `E:` pela letra correspondente à sua unidade montada:",
            "Aguarde a barra de progresso atingir 100%. Você verá a mensagem: 'A operação foi concluída com êxito'."
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "DISM /Online /Enable-Feature /FeatureName:NetFx3 /All /Source:E:\\sources\\sxs /LimitAccess" },
          { "tipo": "aviso", "nivel": "sucesso", "texto": "A pasta sources\\sxs da imagem de instalação contém todos os binários originais necessários do .NET Framework 2.0 e 3.5, dispensando qualquer download pela internet." }
        ]
      },
      {
        id: "ajuste-politica-grupo-wsus",
        titulo: "Solução 2: Configurar a Política de Grupo para Recursos Opcionais (GPO)",
        blocos: [
          { "tipo": "p", "texto": "Em máquinas corporativas ou versões Windows Pro/Enterprise conectadas a servidores WSUS, uma diretiva de grupo pode impedir o download de componentes opcionais:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + R`, digite `gpedit.msc` e pressione Enter.",
            "Navegue até: **Configuração do Computador** > **Modelos Administrativos** > **Sistema**.",
            "No painel direito, localize a política: **Especificar configurações para a instalação e reparo de componentes opcionais**.",
            "Dê um duplo clique, marque a opção **Habilitado** e marque a caixa de seleção: **Fazer contato diretamente com o Windows Update para baixar conteúdo de reparo em vez do WSUS**.",
            "Clique em Aplicar, OK e feche o editor."
          ]}
        ]
      },
      {
        id: "reparo-windows-update-dism-wim",
        titulo: "Solução 3: Reparar o Repositório do Windows Update com Imagem WIM",
        blocos: [
          { "tipo": "p", "texto": "Se o erro 0x800F081F impede a instalação de atualizações cumulativas de segurança, você deve usar o DISM para regenerar o repositório de componentes utilizando o arquivo `install.wim` da ISO montada:" },
          { "tipo": "passos", "itens": [
            "Com a ISO do Windows montada (supondo a letra `E:`), descubra o índice da sua edição do Windows (Home, Pro) executando:",
            "Anote o número do índice da sua versão (habitualmente índice 1 para Home ou 6 para Pro).",
            "Execute o comando de restauração completa apontando o índice correspondente:"
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "dism /Get-WimInfo /WimFile:E:\\sources\\install.wim\nDISM /Online /Cleanup-Image /RestoreHealth /Source:WIM:E:\\sources\\install.wim:1 /LimitAccess" },
          { "tipo": "p", "texto": "Após a conclusão com êxito, rode o verificador de arquivos: `sfc /scannow` e reinicie o computador." }
        ]
      },
      {
        id: "limpeza-cache-windows-update",
        titulo: "Solução 4: Redefinir os Componentes de Download do Windows Update",
        blocos: [
          { "tipo": "p", "texto": "Arquivos temporários corrompidos na pasta de distribuição de software podem travar as tentativas subsequentes de atualização. Redefina a pasta SoftwareDistribution com estes comandos em lote no Prompt Administrativo:" },
          { "tipo": "codigo", "linguagem": "powershell", "texto": "net stop wuauserv\nnet stop cryptSvc\nnet stop bits\nnet stop msiserver\nren C:\\Windows\\SoftwareDistribution SoftwareDistribution.old\nren C:\\Windows\\System32\\catroot2 catroot2.old\nnet start wuauserv\nnet start cryptSvc\nnet start bits\nnet start msiserver" },
          { "tipo": "p", "texto": "Abra as Configurações do Windows (`Windows + I`), acesse o Windows Update e clique em **Verificar se há atualizações** para recomeçar o processo do zero." }
        ]
      }
    ],
    faq: [
      {
        p: "O que significa o parâmetro /LimitAccess no comando DISM?",
        r: "O parâmetro /LimitAccess instrui o DISM a não tentar se conectar ao Windows Update na nuvem nem a servidores WSUS locais, forçando a ferramenta a buscar estritamente os arquivos da pasta ou imagem WIM especificada no parâmetro /Source."
      },
      {
        p: "E se na minha ISO o arquivo for install.esd em vez de install.wim?",
        r: "Se a mídia foi criada pela Ferramenta de Criação de Mídia (Media Creation Tool), o arquivo se chamará install.esd. Basta alterar a sintaxe do comando de /Source:WIM:E:\\sources\\install.wim:1 para /Source:ESD:E:\\sources\\install.esd:1."
      },
      {
        p: "É seguro apagar a pasta SoftwareDistribution.old depois?",
        r: "Sim. A pasta renomeada SoftwareDistribution.old contém apenas os instaladores e históricos temporários antigos. Depois de confirmar que o Windows Update voltou a funcionar e instalou as atualizações com sucesso, você pode excluí-la com segurança para liberar espaço em disco."
      },
      {
        p: "Por que as empresas costumam sofrer mais com o erro 0x800F081F?",
        r: "Em ambientes corporativos, administradores frequentemente configuram Políticas de Grupo (GPO) que direcionam os computadores para servidores internos WSUS que não têm os pacotes do .NET 3.5 aprovados. A solução é habilitar a política de grupo 'Especificar configurações para a instalação e reparo de componentes opcionais' apontando diretamente para o Windows Update da Microsoft."
      },
      {
        p: "O .NET Framework 3.5 ainda é necessário no Windows 11?",
        r: "O Windows 11 já vem com versões modernas (.NET 4.8 e .NET 8/9) nativamente ativadas. No entanto, aplicativos legados desenvolvidos entre 2005 e 2015 exigem especificamente os binários do .NET 2.0 e 3.5 e não conseguem executar sem que esse recurso opcional esteja habilitado."
      },
      {
        p: "Como verificar se a ISO baixada é da mesma compilação do meu Windows?",
        r: "Para evitar erros de incompatibilidade de versão durante o reparo com o DISM, abra o Prompt e digite winver para verificar sua compilação exata (por exemplo, Build 22631). Em seguida, inspecione a ISO montada com o comando dism /Get-WimInfo /WimFile:E:\\sources\\install.wim /index:1 e confira se o número da ServicePack Build coincide ou é superior ao instalado."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Learn — Erro do Windows Update 0x800F081F",
        url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-client/deployment/error-0x800f081f-install-features-on-demand"
      },
      {
        titulo: "Microsoft Learn — Implantar o .NET Framework 3.5 usando o DISM",
        url: "https://learn.microsoft.com/pt-br/windows-hardware/manufacture/desktop/deploy-net-framework-35-by-using-deployment-image-servicing-and-management--dism"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [143, 155, 176, 154]
  },
  {
    id: 154,
    slug: "como-resolver-uso-disco-100-porcento-sysmain-wmi-provider-host",
    titulo: "Como Resolver Uso de Disco em 100% no Windows 11 com SysMain e WMI",
    descricao: "Guia prático para solucionar o travamento de disco em 100% no Windows 11: desativação segura do SysMain, reparo do WMI Provider Host e diagnóstico de SSD.",
    resposta_curta: "O problema de uso de disco em 100% no Windows 11 ocorre com frequência quando o serviço SysMain (antigo SuperFetch) indexa agressivamente aplicativos em segundo plano ou quando o processo WMI Provider Host (WmiPrvSE.exe) entra em loop consumindo I/O devido a chamadas defeituosas de softwares de terceiros. Para resolver, desative temporariamente o serviço SysMain no console `services.msc`, rastreie processos clientes no Visualizador de Eventos, reinicie o repositório WMI com `net stop winmgmt` e `winmgmt /resetrepository`, e verifique a integridade do disco com `chkdsk C: /f`.",
    aplica_se: "Windows 11 e Windows 10 em SSDs e HDs",
    intro: [
      "Abrir o Gerenciador de Tarefas do Windows e se deparar com a coluna de Disco marcando 100% de uso de forma ininterrupta, mesmo sem nenhum aplicativo pesado em execução, é um dos problemas mais comuns e irritantes relatados no Windows 11. Essa condição faz com que o ponteiro do mouse congele, navegadores demorem minutos para abrir e o computador pareça completamente paralisado.",
      "Nas versões modernas do sistema operacional, os dois maiores culpados por esse consumo descontrolado de operações de entrada e saída (I/O) são o serviço **SysMain** (conhecido antigamente como SuperFetch) e o subsistema **WMI Provider Host** (`WmiPrvSE.exe`). Embora ambos tenham sido criados pela Microsoft com finalidades legítimas de otimização e instrumentação, falhas de sincronização com certos controladores de SSD e programas mal programados podem colocá-los em loops contínuos. A seguir, apresentamos a sequência metódica para restaurar o desempenho normal."
    ],
    secoes: [
      {
        id: "desativar-sysmain-seguro",
        titulo: "Passo 1: Desativar o Serviço SysMain (SuperFetch) Corretamente",
        blocos: [
          { "tipo": "p", "texto": "O SysMain analisa os horários e padrões em que você abre programas para pré-carregá-los na memória RAM. Em discos rígidos mecânicos lentos ou SSDs SATA com DRAM cache pequena, esse pré-carregamento constante estrangula a fila de transferência do disco:" },
          { "tipo": "passos", "itens": [
            "Pressione as teclas `Windows + R`, digite `services.msc` e pressione Enter para abrir o console de Serviços do Windows.",
            "Role a lista de serviços até localizar o item chamado **SysMain**.",
            "Dê um duplo clique sobre ele para abrir a janela de propriedades.",
            "No campo 'Tipo de inicialização', altere a opção para **Desativado**.",
            "Na seção 'Status do serviço', clique no botão **Parar** e em seguida em **OK**.",
            "Abra o Gerenciador de Tarefas (`Ctrl + Shift + Esc`) e observe se o indicador de uso de disco diminui imediatamente para valores abaixo de 5%."
          ]},
          { "tipo": "aviso", "nivel": "info", "texto": "Em computadores com SSDs NVMe modernos de alta velocidade, desativar o SysMain não causa nenhuma perda perceptível de desempenho e elimina completamente o pico de leitura de inicialização." }
        ]
      },
      {
        id: "rastrear-wmi-event-viewer",
        titulo: "Passo 2: Identificar Qual Aplicativo Está Causando Loop no WMI",
        blocos: [
          { "tipo": "p", "texto": "O processo `WmiPrvSE.exe` não gera consultas por vontade própria; ele é apenas o executor. Se ele está usando 100% de CPU ou disco, algum software instalado está enviando consultas com erro. Para descobrir o culpado exato:" },
          { "tipo": "passos", "itens": [
            "Pressione `Windows + X` e abra o **Visualizador de Eventos**.",
            "No menu superior, clique em **Exibir** e marque **Mostrar Logs Analíticos e de Depuração**.",
            "Navegue na árvore lateral até: **Logs de Aplicativos e Serviços** > **Microsoft** > **Windows** > **WMI-Activity** > **Operational**.",
            "Procure por eventos marcados como **Erro** com a **ID do Evento 5858**.",
            "Selecione o evento e, no painel inferior, anote o valor numérico indicado no campo **ClientProcessId** (por exemplo, `ClientProcessId = 4120`).",
            "Abra o Gerenciador de Tarefas, vá na aba **Detalhes**, ordene pela coluna **PID** e encontre o aplicativo com esse número (frequentemente softwares de iluminação RGB, antivírus desatualizados ou utilitários de placa-mãe)."
          ]}
        ]
      },
      {
        id: "reparar-wmi-provider-host",
        titulo: "Passo 3: Redefinir e Reparar o Repositório WMI",
        blocos: [
          { "tipo": "p", "texto": "Se a base de dados do WMI estiver corrompida, ela deve ser reconstruída pelo console administrativo:" },
          { "tipo": "passos", "itens": [
            "Abra o Terminal como Administrador (`Windows + X` > Terminal Admin).",
            "Pare temporariamente o serviço de gerenciamento do Windows:",
            "Redefina o repositório WMI para o estado limpo de fábrica:",
            "Reinicie o serviço e verifique a integridade da base:"
          ]},
          { "tipo": "codigo", "linguagem": "powershell", "texto": "net stop winmgmt\nwinmgmt /resetrepository\nwinmgmt /verifyrepository" },
          { "tipo": "p", "texto": "Se o retorno for 'O repositório do WMI é consistente', as tabelas de consulta foram reconstruídas com sucesso." }
        ]
      },
      {
        id: "desativar-telemetria-pesada",
        titulo: "Passo 4: Desativar o Serviço de Rastreamento de Diagnóstico",
        blocos: [
          { "tipo": "p", "texto": "O serviço Connected User Experiences and Telemetry coleta logs de uso em segundo plano para envio à Microsoft e frequentemente causa picos de I/O em discos rígidos:" },
          { "tipo": "passos", "itens": [
            "No console `services.msc`, localize o serviço **Experiências do Usuário Conectado e Telemetria** (Connected User Experiences and Telemetry).",
            "Dê um duplo clique, defina o 'Tipo de inicialização' como **Desativado** e clique em **Parar**.",
            "Clique em OK para confirmar."
          ]}
        ]
      },
      {
        id: "verificar-saude-disco-chkdsk",
        titulo: "Passo 5: Verificar Danos Físicos e Setores Defeituosos com CHKDSK",
        blocos: [
          { "tipo": "p", "texto": "Se mesmo após desativar esses serviços o disco continuar cravado em 100%, o controlador do armazenamento pode estar lutando repetidamente para ler setores danificados:" },
          { "tipo": "codigo", "linguagem": "powershell", "texto": "chkdsk C: /f /r" },
          { "tipo": "p", "texto": "Pressione a letra `S` para confirmar o agendamento da checagem para a próxima inicialização e reinicie o computador. O Windows analisará e isolará blocos defeituosos automaticamente." }
        ]
      }
    ],
    faq: [
      {
        p: "Desativar o SysMain é prejudicial para o Windows 11?",
        r: "Não. O SysMain é apenas um mecanismo de conveniência que pré-carrega arquivos na memória com base nos seus hábitos. Desativá-lo é uma prática amplamente recomendada por técnicos de suporte da Microsoft para sistemas que apresentam lentidão em operações de disco."
      },
      {
        p: "Por que o WMI Provider Host consome tanta CPU e disco às vezes?",
        r: "O WMI em si não é o gerador do trabalho, ele apenas atende a pedidos. Quando ele consome 100% de recursos, quase sempre há um aplicativo de terceiros (como softwares de controle de iluminação RGB, drivers desatualizados de notebook ou antivírus corrompido) bombardeando o sistema com centenas de consultas WMI por segundo."
      },
      {
        p: "O Windows Search pode causar 100% de uso de disco?",
        r: "Sim. O serviço Windows Search indexa arquivos para buscas rápidas. Se você tiver pastas com milhões de arquivos pequenos ou repositórios de código no disco, desative a indexação nessas pastas específicas nas Opções de Indexação do Windows."
      },
      {
        p: "Como saber se o meu disco está fisicamente condenado?",
        r: "Baixe a ferramenta gratuita CrystalDiskInfo. Se o status de saúde da unidade indicar 'Alerta' (em amarelo) com contadores de 'Setores Realocados' ou 'Eventos de Realocação' aumentando a cada dia, o disco está sofrendo degradação física irreversível e deve ser substituído com urgência após backup."
      },
      {
        p: "Mudar o plano de energia pode ajudar?",
        r: "Em alguns modelos de notebook com SSDs SATA, habilitar o plano de energia 'Alto Desempenho' impede que o disco entre e saia repetidamente de estados de hibernação profunda da porta SATA (LPM), eliminando pequenas pausas e travamentos intermitentes de resposta."
      },
      {
        p: "O Monitor de Recursos (resmon) ajuda a identificar o arquivo exato que trava o disco?",
        r: "Sim. Pressione Windows + R, digite resmon e pressione Enter. Na aba Disco, expanda a seção 'Atividade do Disco' e ordene pela coluna 'Total (B/s)'. O utilitário listará os caminhos absolutos dos arquivos que estão sendo lidos ou gravados em tempo real, permitindo identificar se é um arquivo de log temporário, um banco de dados local ou uma varredura de antivírus."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Support — Solucionar problemas de alto uso de recursos do WMI",
        url: "https://learn.microsoft.com/pt-br/troubleshoot/windows-server/system-run-levels-and-service-startup/wmi-high-cpu-usage-troubleshooting"
      },
      {
        titulo: "Microsoft Community — Alto uso de disco pelo SysMain no Windows 11",
        url: "https://answers.microsoft.com/pt-br/windows/forum/all/100-de-uso-de-disco-no-windows-11-sysmain/5a4d46cf-369b-43ad-8d3e-95d4695b77ee"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [143, 155, 176, 178]
  },
  {
    id: 168,
    slug: "analise-tecnica-zero-day-cve-2026-68820-afd-sys-windows",
    titulo: "Análise Técnica do Zero-Day CVE-2026-68820 no afd.sys do Windows",
    descricao: "Análise aprofundada da vulnerabilidade de elevação de privilégio Use-After-Free (CVE-2026-68820) no driver afd.sys (WinSock) e guia de mitigação.",
    resposta_curta: "A CVE-2026-68820 é uma vulnerabilidade de Use-After-Free (UAF) de alta gravidade no driver do modo kernel afd.sys (Ancillary Function Driver for WinSock) do Windows. A falha permite que um invasor com acesso local prévio ou código em execução no contexto de usuário comum obtenha privilégios máximos de SYSTEM através de uma condição de corrida (race condition) na manipulação de sockets de rede. A mitigação definitiva exige a aplicação das atualizações cumulativas de segurança disponibilizadas pela Microsoft a partir do Patch Tuesday de agosto de 2026.",
    aplica_se: "Windows 11, Windows 10 e Windows Server 2022/2025",
    intro: [
      "No ciclo de atualizações de segurança (Patch Tuesday) de agosto de 2026, a Microsoft catalogou oficialmente e corrigiu uma vulnerabilidade crítica de dia zero identificada como CVE-2026-68820. O vetor afeta o driver de modo kernel afd.sys (Ancillary Function Driver for WinSock), componente histórico responsável por intermediar toda a comunicação entre as APIs de rede do espaço de usuário (Windows Sockets) e o subsistema de transporte de pacotes do kernel do Windows NT.",
      "Relatórios de inteligência de ameaças emitidos por pesquisadores de cibersegurança revelaram que a falha vinha sendo ativamente explorada em campanhas direcionadas (in the wild) atribuídas a grupos avançados de ameaça persistente (como o grupo Lazarus) para contornar proteções de sandboxing e obter controle absoluto da máquina como NT AUTHORITY\\SYSTEM. Neste artigo técnico, examinamos a mecânica interna da vulnerabilidade, corrigimos equívocos frequentes de divulgação e orientamos a verificação rigorosa da correção em seu ambiente."
    ],
    secoes: [
      {
        id: "mecanica-da-vulnerabilidade",
        titulo: "Mecânica da Falha: Condição de Corrida e Use-After-Free no afd.sys",
        blocos: [
          { "tipo": "p", "texto": "A vulnerabilidade reside na gestão incorreta de ciclo de vida de objetos de socket durante operações assíncronas concorrentes no driver `afd.sys`:" },
          { "tipo": "lista", "itens": [
            "**Natureza da Falha:** Trata-se de uma falha de Use-After-Free (uso de memória após liberação) combinada com condição de corrida (race condition).",
            "**Contexto de Execução:** Ao fechar e reutilizar simultaneamente referências de manipuladores de socket WinSock a partir de threads concorrentes, o driver liberava o bloco de memória associado sem invalidar adequadamente o ponteiro de referência do kernel.",
            "**Elevação de Privilégios (LPE):** O atacante consegue então manipular a estrutura do heap do kernel para alocar um objeto controlado no endereço de memória liberado, redirecionando o ponteiro de execução do kernel para código arbitrário com privilégios de SYSTEM."
          ]},
          { "tipo": "aviso", "nivel": "atencao", "texto": "Esclarecimento factual: A CVE-2026-68820 é uma vulnerabilidade de Elevação Local de Privilégios (Local Privilege Escalation - LPE, CVSS 7.0), e não um Remote Code Execution (RCE) sem interação. Ela exige que o atacante já possua execução de código local no dispositivo (por exemplo, via phishing, macro ou cadeia prévia de exploração em navegadores) para então saltar para SYSTEM." }
        ]
      },
      {
        id: "vetores-cadeia-lazarus",
        titulo: "Como Ameaças Avançadas Encadeiam a Exploração na Prática",
        blocos: [
          { "tipo": "p", "texto": "Compreender como a falha se encaixa na cadeia de ataque de atores de ameaça (como Lazarus) desmonta mitos sobre infecções mágicas sem interação:" },
          { "tipo": "passos", "itens": [
            "**Fase 1 (Acesso Inicial):** O invasor envia um arquivo malicioso disfarçado (engenharia social, phishing com PDF/DOCX armado) ou explora uma falha n-day em um navegador da web desatualizado.",
            "**Fase 2 (Escape de Sandbox):** O código inicial roda preso no sandbox de baixa integridade do navegador ou aplicativo.",
            "**Fase 3 (Disparo da CVE-2026-68820):** O malware aciona o driver afd.sys abrindo dezenas de conexões de socket WinSock simultâneas para disparar a condição de corrida no kernel.",
            "**Fase 4 (Substituição de Token):** Com privilégios de kernel obtidos via Use-After-Free, o payload localiza a estrutura EPROCESS do processo do atacante e copia o token de segurança do processo SYSTEM, ganhando poderes irrestritos na máquina.",
            "**Fase 5 (Implantação de Rootkit):** Com privilégios SYSTEM, os invasores desativam telemetrias de segurança e instalam rootkits de persistência profunda."
          ]}
        ]
      },
      {
        id: "validar-patches-powershell",
        titulo: "Passo 1: Validar se a Sua Máquina Já Possui a Mitigação Aplicada",
        blocos: [
          { "tipo": "p", "texto": "Para conferir se o seu Windows já recebeu o patch cumulativo corretivo da Microsoft, abra o PowerShell como Administrador e consulte a lista de hotfixes instalados:" },
          { "tipo": "codigo", "linguagem": "powershell", "texto": "Get-HotFix | Where-Object { $_.InstalledOn -ge (Get-Date '2026-08-01') } | Select-Object HotFixID, Description, InstalledOn" },
          { "tipo": "p", "texto": "Se a sua máquina exibir pacotes cumulativos de segurança com data igual ou posterior a agosto de 2026 (como o pacote KB5041585 ou compilações subsequentes), o binário do driver `afd.sys` já foi substituído pela versão corrigida." }
        ]
      },
      {
        id: "inspecionar-versao-driver",
        titulo: "Passo 2: Inspecionar a Versão Exata do Binário afd.sys",
        blocos: [
          { "tipo": "p", "texto": "Você pode checar os metadados do arquivo do driver diretamente no disco para confirmar que a versão do arquivo é superior à compilação vulnerável:" },
          { "tipo": "codigo", "linguagem": "powershell", "texto": "(Get-Item $env:windir\\System32\\drivers\\afd.sys).VersionInfo | Select-Object FileVersion, ProductVersion" },
          { "tipo": "p", "texto": "Verifique se a numeração de compilação corresponde à versão liberada no Patch Tuesday de agosto de 2026 ou versão mais recente." }
        ]
      },
      {
        id: "boas-praticas-edr",
        titulo: "Passo 3: Mitigações Complementares e Detecção via EDR",
        blocos: [
          { "tipo": "p", "texto": "Para ambientes corporativos que ainda homologam patches antes da distribuição ampla, recomenda-se adotar as seguintes medidas de defesa em profundidade:" },
          { "tipo": "lista", "itens": [
            "**Isolamento de Contas:** Garantir que usuários comuns não façam parte do grupo local de Administradores, dificultando a exploração de cadeias subsequentes.",
            "**Regras de Redução de Superfície de Ataque (ASR):** Habilitar as regras ASR do Microsoft Defender, em especial o bloqueio de criação de processos filhos a partir de aplicativos do Office e navegadores.",
            "**Monitoramento de Criação de Threads:** Auditar no EDR eventos de processos não confiáveis criando sockets raw ou padrões anômalos de chamadas DeviceIoControl no dispositivo `\\Device\\Afd`."
          ]}
        ]
      }
    ],
    faq: [
      {
        p: "A CVE-2026-68820 permite invasão direta pela internet sem clique da vítima?",
        r: "Não. A CVE-2026-68820 é classificada como Elevação Local de Privilégios (LPE). Ela não pode ser disparada diretamente pela internet contra uma porta aberta. O atacante necessita primeiro obter a execução de código no computador (por exemplo, convencendo o usuário a abrir um anexo malicioso ou explorando uma falha separada no navegador) para então utilizar a falha no afd.sys e virar administrador total do sistema."
      },
      {
        p: "Desativar o WinSock é uma mitigação viável?",
        r: "Não. O afd.sys é a espinha dorsal de rede do Windows. Toda conexão de rede, navegação na web, compartilhamento de arquivos e serviços locais dependem desse driver. Desativá-lo inutilizaria completamente a conectividade do sistema operacional."
      },
      {
        p: "Qual foi a atribuição de autoria das campanhas ativas?",
        r: "Empresas líderes de cibersegurança (como Check Point e Microsoft Threat Intelligence) documentaram que a exploração ativa in the wild foi conduzida primariamente por grupos norte-coreanos avançados, notadamente clusters ligados ao grupo Lazarus, utilizando a falha para implantar rootkits como o FudModule."
      },
      {
        p: "O Windows Defender padrão detecta a exploração?",
        r: "Sim. As assinaturas modernas do Microsoft Defender e soluções EDR de mercado monitoram a telemetria comportamental de race conditions no afd.sys e bloqueiam a tentativa de elevação de privilégios em memória."
      },
      {
        p: "Usuários domésticos com Windows Update automático precisam se preocupar?",
        r: "Se o seu computador está configurado para receber e instalar atualizações automáticas do Windows Update e foi reiniciado após agosto de 2026, seu sistema já está protegido contra essa vulnerabilidade."
      }
    ],
    fontes: [
      {
        titulo: "Microsoft Security Response Center (MSRC) — CVE-2026-68820 Windows Ancillary Function Driver for WinSock Elevation of Privilege Vulnerability",
        url: "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-68820"
      },
      {
        titulo: "National Vulnerability Database (NVD) — CVE-2026-68820 Detail",
        url: "https://nvd.nist.gov/vuln/detail/CVE-2026-68820"
      }
    ],
    publicado_iso: "2026-11-06",
    atualizado_iso: "2026-11-06",
    atualizado: "novembro de 2026",
    relacionados: [143, 155, 176, 152]
  }
];

let okCount = 0;
winArticles.forEach(art => {
  const filePath = path.join(EDITORIAL_DIR, `${art.slug}.json`);
  const words = countEditorial(art);
  console.log(`Artigo ID ${art.id} (${art.slug}): ${words} palavras`);
  if (words >= MIN_WORDS) okCount++;
  else console.warn(`⚠️ Menos de ${MIN_WORDS} palavras: ${words}`);
  fs.writeFileSync(filePath, JSON.stringify(art, null, 2), 'utf-8');
});

console.log(`Lote Windows processado: ${okCount}/${winArticles.length} acima da meta de ${MIN_WORDS} palavras.`);
