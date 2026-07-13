# Spec — Correções da landing page (manifesto "Energia com propósito")

**Data:** 2026-07-13
**Fonte:** Documento do cliente "Plug — Energia com propósito" (lista de 18 tarefas)
**Site:** https://plugsustentavel.com.br/
**Status:** aprovado em brainstorming (13/07/2026)

---

## 1. Contexto e diagnóstico

O cliente enviou um manifesto de marca novo com 18 tarefas de correção de conteúdo,
reordenação de cards e um bug reportado ("fotos não carregam"). O reposicionamento
central: a Plug deixa de se apresentar como empresa de energia solar e passa a
"Engenharia e Arquitetura Sustentável", com portfólio completo (redes de distribuição,
subestações, solar, eficiência energética, eletromobilidade, SCI, educação).

**Diagnóstico do bug (item 12):** as imagens `.webp` existem em `src/assets/projetos/`,
estão versionadas no git e respondem HTTP 200 em produção. O problema é o carrossel:
o bundle publicado (`main-LCHHBJYZ.js`) roda o código antigo, sem o fix de slides em
branco aplicado em 13/07/2026 (working tree: `projetos.component.{ts,html,css}` —
transition lock, settle com fallback de 700 ms, filtragem de `transitionend`, pausa de
autoplay). O fix já resolve o bug; falta commit e deploy.

## 2. Escopo

- **Dentro:** itens 1–16 e 18 do documento do cliente.
- **Fora:** item 17 (depoimentos reais) — bloqueado aguardando material da equipe de
  atendimento do cliente. Os depoimentos atuais permanecem até o material chegar.

## 3. Decisões tomadas (13/07/2026, com Weslley)

1. **Pendências do cliente → defaults conservadores:** textos novos aplicados verbatim
   (incluindo "redução de faturamento" no card solar); rótulos de semana do processo
   mantidos; selo "T1" mantido; selo "5y" removido (perde referência com o novo título).
   Ajustes finos após resposta do cliente.
2. **Hero H1 em duas escalas:** frase de serviços em escala menor; "Transformamos sua
   conta de energia em investimento inteligente." como display grande com itálico verde.
3. **Manifesto editorial completo:** texto integral, valores em grid 2×2, citação final
   em itálico display; rodapé de estatísticas (25/1/3) removido.
4. **FAQ:** 5 novas Q&As redigidas (uma por frente de serviço), somadas às 5 atuais de
   solar; respostas novas sinalizadas para validação do cliente.
5. **Entrega em dois lotes (abordagem A):** lote 1 = fix do carrossel (já pronto);
   lote 2 = conteúdo. Commits e deploy só com autorização explícita do Weslley.

## 4. Design por componente

### 4.1 Hero — `src/app/components/hero/hero.component.{html,css}`

- **Kicker** (item 1): `Plug · Engenharia e Arquitetura Sustentável`
  (CSS existente já aplica uppercase).
- **H1** (item 2) — duas escalas dentro do mesmo `<h1>`:
  - Escala menor (nova classe, tipografia Rokkitt no padrão headline):
    > Serviços de projeto, instalação e manutenção de redes de distribuição,
    > subestações, energia solar e eficiência energética para quem não pode errar.
  - Display grande (padrão `display-xl` atual), com `<em>` em "investimento inteligente"
    usando a cor de ênfase acessível já existente para fundo creme (nunca `--leaf`):
    > Transformamos sua conta de energia em *investimento inteligente*.
- **Subheadline** (item 3), no `hero-lead` atual:
  > Projetos e serviços de engenharia e arquitetura para indústrias, condomínios,
  > comércios e o setor de distribuição de energia, do laudo de diagnóstico técnico à
  > homologação, com responsabilidade técnica registrada junto ao CREA e ao CAU, aliado
  > ao melhor pós-venda da região, com o acompanhamento de quem entende e estuda todas
  > as regras do jogo.
- `hero-strip`, CTA e trust indicator permanecem como estão.
- CSS: nova regra para a escala menor do H1; se o arquivo ameaçar 4 KB, mover a regra
  para o parcial global apropriado em `src/styles/`.

### 4.2 Manifesto — `src/app/components/manifesto/manifesto.component.{html,css}`

Substituição completa do bloco (item 4). Estrutura:

1. **Aside:** kicker "Manifesto" + subtítulo
   "Manifesto da Plug Engenharia e Arquitetura Sustentável".
2. **Título display:** "Energia com *propósito*." (`em` em "propósito", cor acessível).
3. **Parágrafos de abertura (3):**
   > Acreditamos que engenharia e arquitetura não são apenas técnicas: são uma escolha.
   > A escolha de construir um futuro em que a Amazônia lidera a transição energética,
   > não apenas a contempla.
   >
   > Somos filhos de Manaus. Conhecemos a força deste território e a responsabilidade
   > que ele carrega. Por isso, não vendemos apenas projetos: entregamos soluções que
   > respeitam a floresta, honram nossos clientes e fortalecem as comunidades ao nosso
   > redor.
   >
   > Em cada usina fotovoltaica dimensionada, em cada subestação projetada, em cada
   > automação instalada ou análise de viabilidade financeira apresentada, colocamos o
   > nosso nome com transparência absoluta. E nosso nome significa dedicação,
   > compromisso e excelência.
4. **Grid 2×2 de valores** (cada célula: h3 + parágrafo, padrão título + parágrafo do
   site — sem travessão, conforme observação do documento):
   - **Segurança** — Nenhum prazo justifica risco. Projetamos pensando em quem vai
     operar, manter e viver com o que entregamos.
   - **Excelência** — Não há atalho técnico que valha a reputação construída projeto a
     projeto. O rigor é nosso padrão mínimo.
   - **Transparência** — O cliente merece entender o que está comprando. Comunicamos
     com clareza: números, riscos, datas e expectativas reais.
   - **Inovação** — Aprendemos com cada projeto. Usamos tecnologia e dados para
     entregar mais valor, sempre com propósito, nunca por modismo.
5. **Parágrafos de fechamento (2):**
   > Trabalhamos com distribuidoras de energia, empresas corporativas e empreendedores
   > que já perceberam: sustentabilidade não é custo, é vantagem competitiva. Ajudamos
   > a transformar essa convicção em energia real e retorno financeiro mensurável.
   >
   > Não prometemos o impossível. Prometemos presença: do dimensionamento à entrega,
   > da engenharia à arquitetura, do relatório técnico à conversa franca sobre o que
   > funciona e o que precisa melhorar.
6. **Citação final** (Newsreader itálico, escala display menor, sem aspas de bloco
   decorativas fora do padrão do site):
   > "Plug não é só um nome. É o ponto de conexão entre o que existe e o que deve
   > existir, entre a energia que temos e o futuro que queremos construir."
7. **Removido:** rodapé de estatísticas `manifesto-foot` (25 anos / 1 contrato /
   3 especialidades) e o texto atual do aside ("Uma tese sobre o que energia
   sustentável deveria ser…").

CSS novo: grid 2×2 dos valores (1 coluna no mobile), estilo da citação final. Se o
componente ultrapassar 4 KB, mover regras genéricas para parcial global.

### 4.3 Serviços — `src/app/components/services/services.component.html`

**Nova ordem e índices** (item 5): 01 Solar · 02 Engenharia MT/AT · 03 Arquitetura ·
04 Eletromobilidade · 05 SCI · 06 Educação.

| # | Tag | Título | Descrição | Bullets |
|---|-----|--------|-----------|---------|
| 01 | Geração distribuída (mantém) | **Energia Solar Fotovoltaica e Armazenamento de Energia** | Projetamos, instalamos e operamos plantas fotovoltaicas com opção de instalação direta ou aluguel via associação de geração de energia compartilhada parceira. Também implementamos BESS como backup de energia e peak shifting para redução de faturamento. | mantém os 3 atuais |
| 02 | Energia industrial (mantém) | Engenharia Elétrica MT/AT (mantém) | Projeto, execução e O&M de elétrica predial, industrial, subestações de média e alta tensão, SPDA, eficiência energética e automação, com migração para o Mercado Livre (ACL e PIE). | mantém os 3 atuais |
| 03 | Obra integrada (mantém) | Projeto e Arquitetura (mantém) | mantém | mantém |
| 04 | Mobilidade elétrica (mantém) | Eletromobilidade (mantém) | Estudo de viabilidade, instalação e O&M de eletropostos e carregadores elétricos veiculares, do wall box aos carregadores rápidos com softwares para pagamento. | Carregadores CA e CC rápidos de 7,8 a 160 kW · Estudo de viabilidade de frota elétrica · Captação de investimento para transição de frota elétrica |
| 05 | Segurança & IoT (mantém) | **SCI, Monitoramento e Automação** | Implementação de Sistemas de Detecção e Combate a Incêndio e Pânico, CFTV e Casas Inteligentes em residências, comércios e patrimônio histórico. | Detecção e combate a incêndio · CFTV · Casas inteligentes |
| 06 | **Educação profissionalizante** | **Academia Plugados** | Trilhas de qualificação profissional para eletricistas, técnicos e engenheiros em projeto, instalação, operação e manutenção elétrica. | Trilha do projetista elétrico · Trilha do instalador solar, de baterias e carros elétricos · Trilha do instalador de Smart Home |

Notas: a menção ao Teatro Amazonas sai (card 05). O bullet "Usinas até 5 MW" do card 01
permanece (documento não o altera) mesmo com a descrição nova sem o teto de 5 MW —
listado nas pendências para o cliente (seção 7).

### 4.4 Processo — `src/app/components/process/process.component.html`

Quatro etapas (item 11), rótulos de semana mantidos, bloco `conduit` mantido:

| # | Título | Texto |
|---|--------|-------|
| 01 | Diagnóstico individual | Elaboramos um diagnóstico completo da sua necessidade, apontando problemas e identificando ações corretivas e oportunidades de melhoria, com base em análises de dados reais. |
| 02 | Projeto integrado | Solução em arquitetura e engenharia, com responsabilidade técnica homologada junto ao CREA e ao CAU em um único caderno de obra. |
| 03 | Instalação | Equipe própria, equipamentos de primeira linha, testados e homologados no mais alto grau de qualidade, e cronograma que respeita sua operação, sem interferir na sua produção. |
| 04 | Pós-venda | Entrega com manual de operação e manutenção, acompanhamento em garantia, SLA de pós-venda e monitoramento online. |

### 4.5 Diferenciais — `src/app/components/value/value.component.{html,css}`

| Card | Título | Descrição | Selo |
|------|--------|-----------|------|
| 01 | **Economia de até 90%** | Redução imediata na conta já no terceiro mês, com medição, documentação e comprovação via aplicativo. | `−95%` → **`−90%`** |
| 02 | Um contrato, três especialidades (mantém) | Projeto, instalação e manutenção sob um único responsável, sem troca de responsabilidades entre fornecedores. Assumimos todos os ônus de nosso trabalho técnico. | `1×3` → **`3 em 1`** |
| 03 | Equipamentos Tier 1 (mantém) | Somos especialistas em controle de qualidade de materiais e, dessa forma, só trabalhamos com equipamentos do mais alto grau de qualidade, com certificados internacionais e garantias comprovadas de empresas sólidas no mercado. | `T1` mantém |
| 04 | **Retorno do Investimento** | Todos os nossos orçamentos são realizados buscando eficiência operacional e financeira e trazem dados com cálculo de retorno de investimento, para acompanhamento e certeza dos resultados esperados. | `5y` **removido** |

Verificar no CSS que o `.pull` comporta "3 em 1" (mais largo que "1×3") sem quebrar o
layout em desktop e mobile.

### 4.6 FAQ — `src/app/components/faq/faq.component.html`

- **Abertura** (item 18): `Respostas diretas, que explicam o detalhe que não deixamos
  passar despercebido.` (quebra de linha a ajustar visualmente no `headline-lg`).
- **5 perguntas atuais de solar permanecem.** 5 novas Q&As adicionadas ao final
  (**rascunhos meus — validar com o cliente antes de publicar**):

1. **Vocês instalam carregadores para carros elétricos?**
   > Sim. Fazemos estudo de viabilidade, instalação e manutenção de eletropostos e
   > carregadores veiculares — do wall box residencial aos carregadores rápidos CA e CC
   > de 7,8 a 160 kW, com software de pagamento integrado. Para empresas, avaliamos
   > também a viabilidade de transição de frota e a captação de investimento para o
   > projeto.
2. **A Plug atende subestações e média/alta tensão?**
   > Atendemos. Projetamos, executamos e operamos elétrica predial e industrial,
   > subestações de média e alta tensão, SPDA e eficiência energética — com
   > responsabilidade técnica registrada no CREA e suporte à migração para o Mercado
   > Livre de energia (ACL e PIE).
3. **A Plug também faz projeto de arquitetura?**
   > Sim. Entregamos projetos integrados de arquitetura e engenharia em um único
   > caderno de obra, com responsabilidade técnica registrada junto ao CREA e ao CAU —
   > incluindo construção, reforma e manutenção civil, hidráulica e sanitária, sem você
   > coordenar fornecedores diferentes.
4. **Vocês trabalham com detecção de incêndio e automação?**
   > Trabalhamos. Implementamos Sistemas de Detecção e Combate a Incêndio e Pânico,
   > CFTV e casas inteligentes — em residências, comércios e patrimônio histórico. O
   > projeto nasce integrado à elétrica, com um único responsável técnico.
5. **O que é a Academia Plugados?**
   > É o braço de educação profissionalizante da Plug: trilhas de qualificação para
   > eletricistas, técnicos e engenheiros em projeto, instalação, operação e manutenção
   > elétrica — incluindo as trilhas do projetista elétrico; do instalador solar, de
   > baterias e carros elétricos; e do instalador de Smart Home.

### 4.7 Bug do carrossel — item 12 (lote 1)

Nenhum código novo: o fix de 13/07/2026 já está no working tree
(`src/app/components/projetos/projetos.component.{ts,html,css}`). Ações:

1. Commit dedicado do fix (com autorização do Weslley).
2. Deploy para produção (Vercel).
3. Verificação pós-deploy no site publicado: carrossel navega sem slides em branco,
   imagens visíveis, teste de cliques rápidos.

## 5. Entrega

- **Lote 1:** commit do fix do carrossel → deploy → verificação em produção.
- **Lote 2:** mudanças de conteúdo (4.1–4.6) → build → verificação → commit → deploy.
- Nenhum commit/push/deploy sem autorização explícita do Weslley.

## 6. Verificação (antes de cada deploy)

1. `ng build` de produção sem warnings de budget (4 KB por componente).
2. Grep de tokens Material proibidos (`--primary`, `--secondary`, `--surface` etc.) — zero ocorrências.
3. Checklist Terroso: contraste AA nas novas headlines (nunca `--leaf` como texto sobre
   creme), `aria-hidden` em decorativos, CTAs via `WaService`, itálico verde restrito a
   1–2 palavras por headline.
4. Inspeção visual no dev server: desktop e 360 px (hero com headline longa, grid de
   valores do manifesto, selo "3 em 1", FAQ expandido).

## 7. Pendências que permanecem com o cliente

1. "Redução de faturamento" (card solar): confirmar que o sentido é redução da fatura.
2. Rótulos de semana das etapas do processo: mantidos por default — confirmar.
3. Título "Equipamentos Tier 1" e selo "T1": mantidos por default — confirmar.
4. Selo "5y": removido por default — confirmar.
5. Bullet "Usinas até 5 MW" no card solar: mantido — confirmar se o teto de 5 MW ainda vale.
6. Depoimentos reais (item 17): aguardando material da equipe de atendimento.
7. Novas Q&As do FAQ (seção 4.6): validar redação antes do deploy do lote 2.
