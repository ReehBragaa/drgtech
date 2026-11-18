# Guia Editorial do DRGTech

Este documento define **como um artigo do DRGTech deve ser escrito** e como ele entra no site. Ele existe por causa da política de *conteúdo de baixo valor* do Google AdSense: um artigo só é indexado e só exibe anúncios se passar neste padrão. Veja o contexto em [ADSENSE_COMPLIANCE.md](ADSENSE_COMPLIANCE.md).

## 1. Princípios

1. **Cada artigo responde a uma dúvida específica** com informação que o leitor não encontra em um parágrafo genérico.
2. **Nada de texto-modelo.** Nenhuma frase pode ser reaproveitada entre artigos (o `quality_check` mede isso).
3. **Só afirmamos o que podemos comprovar.** Sem "testado por especialistas", sem estatísticas inventadas, sem "análises técnicas identificaram...". Se um procedimento não foi testado em um aparelho real, o artigo não diz que foi.
4. **Fontes reais.** Cada artigo cita pelo menos 2 fontes oficiais (documentação do fabricante, Microsoft Learn, suporte da Apple/Google etc.) que foram **de fato consultadas**.
5. **Segurança do leitor.** Nada de instruções para acesso não autorizado, quebra de licença, chaves de produto ou desativar proteções sem avisar o risco.

## 2. Padrão mínimo de qualidade

| Requisito | Regra |
|---|---|
| Tamanho | **≥ 900 palavras** de texto corrido (`node scripts/count_words.js`). Meta: 1.100–1.600. |
| Originalidade | Menos de **15%** de frases (trechos de 6 palavras) repetidas em outros artigos. |
| Fontes | **≥ 2** URLs oficiais consultadas, listadas em `fontes`. |
| Especificidade | Mensagem de erro/código exato, versões afetadas, onde clicar, o que o comando faz e o que esperar na tela. |
| Reversibilidade | Dizer como desfazer e quais os riscos de cada solução. |
| Verificação | Dizer **como confirmar** que o problema foi resolvido. |
| FAQ | 4 a 6 perguntas **específicas** do problema (nunca "é seguro aplicar estes comandos?"). |
| Honestidade | Sem promessas ("resolve em 1 minuto"), sem alegações de teste não realizado. |
| Idioma | pt-BR claro, sem jargão desnecessário, sem emojis. |

## 3. Estrutura sugerida (flexível)

1. **O que está acontecendo** — causa específica, versões afetadas, mensagem exata.
2. **Antes de começar** — ponto de restauração/backup, permissões, tempo estimado.
3. **Soluções em ordem, da menos para a mais invasiva** — para cada uma: por que funciona, passos, comando, resultado esperado e o que fazer se não funcionar.
4. **Como confirmar que resolveu.**
5. **Como desfazer e riscos.**
6. **Quando procurar assistência técnica.**

Os títulos das seções devem ser **escritos para aquele assunto**, não repetidos de outros artigos.

## 4. Formato do arquivo (`data/editorial/<slug>.json`)

O nome do arquivo é o `slug` da entrada em `data/dataset.json`. Se o arquivo existe, o artigo é **publicado** (indexável, com anúncios). Se não existe, a entrada fica como rascunho (`noindex`, sem anúncios, fora do sitemap).

```json
{
  "id": 140,
  "slug": "como-corrigir-erro-dns-probe-finished-nxdomain-navegador",
  "titulo": "Título H1 (com a palavra-chave)",
  "descricao": "Meta description única, até 155 caracteres.",
  "resposta_curta": "2 a 3 frases com a resposta direta.",
  "aplica_se": "Windows 10 e 11; Chrome e Edge",
  "intro": ["Parágrafo 1 específico.", "Parágrafo 2."],
  "secoes": [
    {
      "id": "kebab-case-unico",
      "titulo": "Título H2 específico",
      "blocos": [
        { "tipo": "p", "texto": "Texto. Use **negrito** e `código inline`." },
        { "tipo": "lista", "itens": ["item 1", "item 2"] },
        { "tipo": "passos", "itens": ["Passo 1", "Passo 2"] },
        { "tipo": "codigo", "linguagem": "powershell", "texto": "ipconfig /flushdns" },
        { "tipo": "aviso", "nivel": "atencao", "texto": "Texto do aviso." },
        { "tipo": "tabela", "cabecalho": ["A", "B"], "linhas": [["1", "2"]] }
      ]
    }
  ],
  "faq": [ { "p": "Pergunta específica?", "r": "Resposta objetiva." } ],
  "fontes": [ { "titulo": "Nome da página", "url": "https://..." } ],
  "publicado_iso": "2026-11-06",
  "atualizado_iso": "2026-11-06",
  "atualizado": "novembro de 2026",
  "relacionados": [143, 155]
}
```

Tipos de bloco: `p`, `lista`, `passos`, `codigo`, `aviso` (níveis `info`, `dica`, `atencao`, `sucesso`) e `tabela`. Texto é puro (sem HTML): o gerador escapa tudo e converte apenas `**negrito**` e `` `código` ``.

## 5. Como publicar

```bash
node scripts/count_words.js            # confere o mínimo de palavras
npm run build                          # gera as páginas, sitemap e cards da home
npm run check                          # quality gate (precisa passar sem erros)
git add . && git commit -m "..." && git push origin main
```

## 6. Fila editorial atual (28 artigos publicados nesta revisão)

| Grupo | IDs |
|---|---|
| Windows | 143, 155, 176, 177, 178, 135, 153, 154, 168 |
| Celular | 137, 138, 139, 149, 112, 158, 160 |
| Internet | 140, 162, 141, 161, 194, 196 |
| Segurança | 131, 132, 166, 165, 152, 201 |

As demais entradas do `dataset.json` ficam como **rascunho** até serem reescritas neste padrão. Para promover um rascunho: escrever `data/editorial/<slug>.json`, rodar `npm run build` e `npm run check`.

## 7. O que nunca deve voltar

- Seções genéricas iguais em todos os artigos ("Diagnóstico e Contexto Técnico", "Dicas de Prevenção" padrão).
- Caixa de autoria com "especialistas" ou "equipe" sem identificação.
- Formulários ou botões que prometem algo que o site não faz (ex.: "sua dúvida entrou na fila de produção" sem ninguém receber).
- Anúncios em páginas utilitárias (Sobre, Contato, Privacidade, Termos, Política Editorial, ferramenta) ou em rascunhos.
