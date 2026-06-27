# Design System Strategy
## Plug Soluções Sustentáveis — Landing Page de Conversão

> Documento estratégico que traduz o guia de marca em decisões de design system para a landing page e futuras peças digitais. Escrito para servir como referência de decisões, não como catálogo de componentes.

---

## 1. Princípios de Design

Quatro princípios orientam toda decisão visual e de copy. Quando houver conflito entre dois componentes ou estilos, voltamos aqui.

### 1.1 Orgânico antes de Tecnológico
Somos uma empresa de energia solar, mas vendemos **tranquilidade financeira**, não painéis. A estética rejeita o clichê "tech azul elétrico / gradient neon" e abraça tons terrosos, serifas humanistas e texturas de papel. A tecnologia aparece como consequência, não como estética.

### 1.2 Calmo, mas Confiante
O público-alvo (empresários com dor de conta de luz) está cansado de promessas inflamadas. Usamos tipografia grande, respiração generosa e afirmações diretas — nunca caps-lock, nunca selos de "OFERTA LIMITADA". A confiança vem da clareza, não da pressão.

### 1.3 Prova antes de Promessa
Toda seção tem um elemento de evidência visível antes de pedir ação: número, depoimento, case, passo-a-passo. O CTA funciona porque a prova o precede.

### 1.4 Uma Marca, Uma Voz
A identidade é monolítica: mesmo verde, mesma serifa, mesmo tom em WhatsApp, no site, no PDF de proposta. O cliente reconhece a Plug antes de ler o logo.

---

## 2. Brand Heart aplicado

| Valor da marca | Como se manifesta no design |
|---|---|
| Sustentabilidade | Paleta terrosa, placeholders com listras diagonais (evitar SVG hand-drawn de folhas/sol), imagens reais de natureza e obra |
| Sinergia | Layout de grid com encontros limpos, steps numerados 01→04, "um contrato, três especialidades" como narrativa visual |
| Empatia | Copy na 2ª pessoa ("você", "sua empresa"), depoimentos com nome e cidade, CTA "falar" em vez de "clicar" |
| Profissionalismo criativo | Rokkitt (serifa humanista) + DM Sans + JetBrains Mono em kickers — cria ritmo editorial, não corporativo genérico |

---

## 3. Paleta de Cores — Sistema

### 3.1 Tokens institucionais (do guia de marca)

| Token | Nome oficial | HEX | Papel no sistema |
|---|---|---|---|
| `--cream` | Manteiga de Carité | `#e5e4d9` | Background primário — a página respira em creme |
| `--ink` | Verde Colegial | `#344233` | Texto, headlines, seções escuras de alto contraste |
| `--leaf` | Pitão Verde | `#6db85e` | Acento de ação — CTAs secundários, badges, destaque |
| `--black` | Preto Absoluto | `#333333` | Detalhes, bordas de ícones, fallback de texto |

### 3.2 Tokens derivados (geraram-se para dar escala ao sistema)

| Token | HEX | Uso |
|---|---|---|
| `--cream-deep` | `#d8d7ca` | Divisores, placeholders claros |
| `--cream-soft` | `#eeede3` | Trust bar, cards secundários |
| `--paper` | `#f5f4ea` | Fundo de cards (benefits, testimonials) |
| `--line` | `#c9c8b9` | Bordas 1px, separadores |
| `--ink-soft` | `#4a5a48` | Parágrafos sobre creme |
| `--ink-mute` | `#7b897a` | Metadados, kickers, cidade nos depoimentos |
| `--leaf-deep` | `#4e9f40` | CTA primário (contraste WCAG AA em branco) |

### 3.3 Regras de uso

**Proporção 70/20/8/2** — em qualquer tela:
- 70% creme (`--cream`, `--cream-soft`, `--paper`)
- 20% verde escuro (`--ink`) em texto e seções inteiras (Problema, CTA Final)
- 8% verde claro (`--leaf`) em acentos e destaques
- 2% para cinza-esverdeado e pretos de detalhe

**Blocos escuros ≠ seções genéricas.** O verde colegial de fundo é reservado para momentos de alta carga emocional (seção Problema, CTA Final). Usado em excesso, perde impacto.

**Nunca criar nova cor.** Se um componente parece precisar de laranja/vermelho de alerta, é sinal de que o componente está errado — usar tom do próprio sistema com peso tipográfico.

---

## 4. Tipografia — Sistema

### 4.1 Fontes

| Família | Papel | Substituto web-safe |
|---|---|---|
| **Rokkitt** | Display/títulos (Rokkit do guia não existe no Google Fonts; Rokkitt é a grafia oficial e é a mesma família slab-serif humanista) | Georgia |
| **DM Sans** | Corpo de texto (substituto de Metropolis — ambos são sans geométricos de ampla escala) | Helvetica Neue, Arial |
| **JetBrains Mono** | Kickers, metadados, números de step, tags de cidade | monospace do sistema |

> **Nota para impressão:** em materiais impressos oficiais seguir exatamente o guia de marca (Arial no logo + Rokkit Bold + Metropolis no corpo). As substituições acima são exclusivamente para web.

### 4.2 Escala tipográfica

| Nível | Família | Peso | Tamanho | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display (H1) | Rokkitt | 600 | `clamp(44px, 6.2vw, 84px)` | 0.98 | -0.015em |
| Title (H2) | Rokkitt | 600 | `clamp(34px, 4.4vw, 56px)` | 1.02 | -0.01em |
| H3 card | Rokkitt | 600 | 24-26px | 1.15 | -0.005em |
| Quote | Rokkitt | 500 | `clamp(28px, 3.2vw, 40px)` | 1.15 | 0 |
| Lead | DM Sans | 400 | 19-20px | 1.5 | 0 |
| Body | DM Sans | 400 | 16-17px | 1.55 | 0 |
| Kicker | JetBrains Mono | 500 | 12.5px | 1.4 | 0.14-0.18em + uppercase |
| Meta | JetBrains Mono | 400 | 11.5px | 1.4 | 0.1em + uppercase |

### 4.3 Regras tipográficas

- **Nunca usar 3 fontes na mesma tela sem justificativa.** Rokkitt + DM Sans é a dupla de trabalho; JetBrains entra apenas como "etiqueta" (kickers, código visual).
- **Serifa é para emoção, sans é para informação.** Benefícios (escaneáveis) em DM Sans; quotes e headlines (emocionais) em Rokkitt.
- **Itálico verde** é um recurso exclusivo de palavras-chave na H1 e CTA final. Máximo 2 palavras por headline.
- **text-wrap: balance** em todos os títulos; **text-wrap: pretty** em parágrafos longos.

---

## 5. Espaçamento & Layout

### 5.1 Grid

- Container máximo: `1240px`
- Padding lateral: `40px` desktop / `22px` mobile
- Gap padrão entre colunas: `64-80px`
- Gap entre elementos: `12, 18, 24, 32, 44, 64, 80, 120px` (escala de 4× de base 4)

### 5.2 Ritmo vertical por seção

Cada seção tem `padding: 120px 0` desktop / `80px 0` mobile — isso cria cadência previsível que compensa a densidade de conteúdo.

Exceção: seções em bloco de destaque (Problema, CTA Final) têm margin lateral de `40px` com `border-radius: 28px`, isolando-as do resto da página como "cápsulas" de alta intensidade.

### 5.3 Border-radius — sistema semântico

| Raio | Uso |
|---|---|
| `8-10px` | Tags, botões pequenos, metadados |
| `14-18px` | Cards (benefits, testimonials), imagens |
| `20-28px` | Blocos-seção inteiros (problema, CTA final) |
| `999px` | Botões primários, pílulas de nav CTA |

---

## 6. Componentes — Biblioteca

### 6.1 Botão Primário
- Pílula (`border-radius: 999px`)
- Fundo: `--leaf-deep`, texto branco
- Padding: `18px 28px`
- Font: DM Sans 500, 17px
- Ícone à esquerda (WhatsApp sempre)
- Hover: eleva 2px + muda para `--ink`
- Sempre acompanhado de microcopy abaixo (stars + contagem de clientes) quando for o primary da Hero

### 6.2 Seção com Kicker
Estrutura fixa: `kicker` (mono + traço) → `title` (Rokkitt) → `subtitle` (DM Sans grande)

### 6.3 Card de Benefício
- Fundo `--paper` em grid de 3 colunas colado por `2px` de `--line` (efeito de grade contínua)
- Ícone em quadrado outlined 52×52
- Numeração "01…06" em Rokkitt como "peso editorial"
- Hover: fundo muda para `--cream-soft`

### 6.4 Card de Depoimento
- Formato: aspas grandes em serifa, estrelas verdes, avatar com iniciais + nome + cidade em mono
- **Ritmo alternado**: o card do meio inverte (`--ink` de fundo, texto creme) — quebra a monotonia do grid de 3.

### 6.5 FAQ
- `<details>` nativo com `summary` customizado
- Ícone `+` em círculo outlined que rotaciona 45° no open e vira `--ink` sólido
- Sem accordion exclusivo — usuário pode abrir várias

### 6.6 Bloco "Cápsula" (Problema / CTA Final)
- Fundo `--ink`, texto `--cream`
- Badge circular gigante (marca girando 40s infinite) no background em baixa opacidade
- Kickers trocam para tom verde claro
- Usada 2 vezes na página, no máximo — "ancoras emocionais"

### 6.7 Trust Bar
- Strip de 26px entre Hero e Problema
- Nomes de setores (não logos reais) em Rokkitt 18px

### 6.8 Badge Flutuante (assinatura visual)
- Usa os PNGs do guia (`badge-plug-verde-e-creme.png` etc.)
- Sempre em rotação lenta (40s linear infinite)
- Aparece 2-3 vezes no site como "selo de autoria" — Hero, CTA final

---

## 7. Imagem & Textura

### 7.1 Fotografia
- **Preferência:** ângulos aéreos de coberturas com painéis, close de instalação, retratos humanos de clientes (depois que chegarem).
- **Tratamento:** luz natural quente, sem filtros azulados "tech".
- **Proibido:** stock genérico de globo terrestre, mão segurando muda, gráfico flutuante.

### 7.2 Placeholders (enquanto sem fotos reais)
Listras diagonais de `rgba(109,184,94,0.16)` sobre gradiente de `--ink` → `#253021`, com caption em JetBrains Mono descrevendo o que entrará ali. **Nunca desenhar SVG de painel solar** — placeholder honesto vale mais que ilustração fraca.

### 7.3 Textura
Grain SVG sobreposto a 35% de opacidade em `body::before`, `mix-blend-mode: multiply`. Sutil o bastante para só ser percebido de perto — dá sensação de papel sem poluir.

### 7.4 O símbolo como watermark
O símbolo da marca (4 octógonos) aparece rotacionado a 8°/15° em opacidade 0.12-0.55 atrás de seções-chave. Funciona como "assinatura d'água" e reforça memorização.

---

## 8. Copywriting — Voz da Marca

### 8.1 Princípios de copy
1. **2ª pessoa sempre** — "sua empresa", "você", nunca "o cliente" ou "nós acreditamos"
2. **Verbo no presente** — "projetamos, instalamos, entregamos", não "iremos projetar"
3. **Números concretos** — "95%", "30 dias", "R$ 18 mil → R$ 900". Abstrações não convertem.
4. **Sem jargão técnico na superfície** — "Tier 1" aparece uma vez, contextualizado. "ART" e "homologação" só depois que o leitor está comprado.
5. **Pergunta como headline** é válida quando toca a dor direta: *"Sua empresa gastando mais com luz do que com folha de pagamento?"*

### 8.2 Vocabulário característico
- "plugar" (verbo da marca)
- "diagnóstico" (nunca "orçamento" na primeira menção — diagnóstico é consultivo)
- "financiar a concessionária" (reframing da dor)
- "kWh gerado" / "dias de caixa" (linguagem do público empresário)

### 8.3 Proibições
- "Transforme sua vida"
- "O futuro é agora"
- Emojis, exceto em WhatsApp link
- Exclamações em série
- "Nós somos os melhores"

---

## 9. Interação & Movimento

- **Hover em botão**: `translateY(-1 a -2px)` + mudança de cor, `transition .2s`
- **Badge girando**: 40s linear infinite — lento o suficiente para ser percebido só como "algo vivo"
- **FAQ abrindo**: `+` rotaciona 45° em 0.3s, transforma em X
- **Cards de benefício**: mudança suave de fundo no hover (0.25s)
- **Sem parallax, sem scroll-jacking, sem scroll-animations.** O ritmo editorial vem do layout, não do JavaScript.

---

## 10. Acessibilidade

- Contraste mínimo AA em todo texto
- `--leaf` NUNCA usado como texto sobre `--cream` (contraste insuficiente) — apenas como cor de fundo ou de ícone/estrela com peso >500
- `--leaf-deep` como cor de texto quando for sobre creme/paper
- `<details>` nativo para FAQ (funciona sem JS, acessível por teclado)
- Alt text em todas as logos; `aria-hidden` em placeholders decorativos
- `scroll-margin-top` nos anchors para compensar nav sticky

---

## 11. Tweaks & Variações (sistema vivo)

A landing page expõe variações via painel Tweaks:

- **Hero A (Split):** imagem à direita com badge flutuante + card de estatística "-95%"
- **Hero B (Center):** headline centralizada, banner panorâmico abaixo, badge girando sobreposto — para testar tom mais editorial

O sistema foi desenhado para que novas variações de Hero, cor de acento ou tipografia sejam adicionadas sem quebrar o restante. Toda variação nova deve:
1. Respeitar a paleta institucional (nunca introduzir nova cor)
2. Manter a dupla Rokkitt + DM Sans
3. Ser toggled pelo painel Tweaks (nunca hard-coded em branch)

---

## 12. Roadmap

| Prioridade | Item | Observação |
|---|---|---|
| Alta | Substituir 2 placeholders por fotos reais de obra Plug | Brief: manhã/fim-de-tarde, sem filtro azul |
| Alta | Coletar 3 depoimentos em vídeo curto (15s) para embed na seção atual | Manter estrutura de card atual |
| Média | Criar seção "Cases" com antes/depois de conta de luz | Layout inspirado nos benefits, 4-6 cases |
| Média | Adicionar calculadora de economia (CEP + valor da conta → projeção) | Embed antes do CTA final |
| Média | Versão em modo escuro (`--ink` como background global) | Manter sistema; adicionar tokens `--dark-*` |
| Baixa | Páginas internas: /residencial, /empresarial, /projetos | Mesmo system, templates diferentes |

---

## 13. Checklist de aplicação

Antes de publicar qualquer peça nova sob essa marca, validar:

- [ ] Usa apenas as 4 cores institucionais + derivados documentados?
- [ ] Rokkitt para título, DM Sans para corpo, Mono para meta?
- [ ] Tem pelo menos um elemento de prova antes do CTA?
- [ ] Evita todos os itens da seção 8.3 (Proibições)?
- [ ] Logo aplicado corretamente (cor, respiro, tamanho mínimo)?
- [ ] CTA principal leva ao WhatsApp com mensagem pré-preenchida?
- [ ] Passa em contraste AA?
- [ ] Tem badge/símbolo como assinatura (watermark ou flutuante)?

---

*Documento vivo — versão 1.0 · abril 2026 · Plug Soluções Sustentáveis*
