# CLAUDE.md — angular-plug / Plug Soluções Sustentáveis

Instrucoes especificas para o projeto Angular da Plug Soluções Sustentáveis.
Herda todas as regras de `WBM Studio/CLAUDE.md`. Em caso de conflito, este arquivo prevalece.

---

## Marca e Design System

O documento de marca canonico e `brand-plug-sustentavel.md` na raiz do projeto.
O documento de estrategia visual e `Design System Strategy Terroso.md`.
A referencia executiva tecnica do sistema e `docs/DESIGN_SYSTEM.md`.

### Paleta institucional — unica fonte de verdade

Usar exclusivamente os tokens CSS definidos em `src/styles/_tokens.css`. Nunca criar nova
cor hex diretamente em um componente. Se um componente parecer precisar de uma cor fora do
sistema, revise o componente, nao crie uma nova cor (regra Terroso 3.3).

Tokens principais:
- `--cream`, `--ink`, `--leaf`, `--black` — 4 cores institucionais oficiais
- `--cream-bright`, `--cream-soft`, `--cream-deep`, `--cream-deeper`, `--paper`, `--line` — derivados creme
- `--ink-deep`, `--ink-shadow`, `--ink-soft`, `--ink-mute` — derivados verde escuro
- `--leaf-deep`, `--leaf-soft`, `--leaf-line` — derivados verde claro

Proibido: qualquer referencia a `--primary`, `--secondary`, `--surface`, `--on-surface`,
`--on-primary`, `--tertiary`, `--outline-variant`, `--surface-dim` ou qualquer token
Material 3. Se aparecer em grep, e um bug.

Proporcao obrigatoria (Terroso 3.3): 70% creme / 20% verde escuro / 8% verde claro / 2% detalhes.

### Tipografia — stack decidida e fixada

| Variavel      | Familia                             | Uso                                     |
|---------------|-------------------------------------|-----------------------------------------|
| `--f-display` | Newsreader (Rokkitt fallback)       | Italico editorial, display grande       |
| `--f-headline`| Rokkitt (Georgia fallback)          | Titulos H1–H3, headlines de secao       |
| `--f-body`    | Manrope (Helvetica Neue/Arial fall) | Corpo de texto, kickers, meta           |

JetBrains Mono nao e usado neste projeto.

Kickers usam `--f-body` com `letter-spacing: .18em; text-transform: uppercase;`.

Italico verde (`em { color: var(--leaf) }`) e exclusivo de 1–2 palavras por headline (Terroso 4.3).

### Acessibilidade

`--leaf` NUNCA como `color:` de texto sobre `--cream`, `--cream-bright` ou `--paper` —
contraste insuficiente (Terroso 10). CTA primario usa `--leaf-deep` sobre branco.

Usar `scroll-margin-top` em todos os `section[id]`. `aria-hidden` em elementos decorativos
(watermark, badge rotativo, grain).

---

## Angular 21

- Todos os componentes sao standalone.
- Usar signal-based inputs (`input()`, `output()`) em novos componentes.
- Tipagem forte obrigatoria; `any` proibido.
- Inje cao de dependencias via construtor.
- Seguir Angular Style Guide oficial (prefixo `app-`).
- CSS puro com nesting nativo (sem SCSS por enquanto). Alterar apenas apos alinhamento explicito.

### Budget de estilo

Cada `*.component.css` deve ficar abaixo de 4 KB (limite `anyComponentStyle` do Angular).
Regras globais ficam nos parciais `src/styles/_*.css`.

### Servico WhatsApp

`WaService` (`src/app/shared/wa.service.ts`) centraliza numero e mensagem. Todos os CTAs
que abrem WhatsApp devem consumi-lo. Nunca hardcode a URL diretamente em template.

### Otimizacao de imagens

Os PNGs de marca em `public/` e as fotos em `src/assets/projetos/` sao a fonte de verdade,
mas NAO sao publicados como PNG. Os derivados web (`.webp`, favicon, og-image) sao gerados
por `npm run images` (script `scripts/optimize-images.mjs`, usa `sharp` como devDependency e
roda apenas localmente — nunca no build do Vercel). Sempre que adicionar ou trocar uma foto
de projeto ou um asset de marca, rode `npm run images` e commite os derivados gerados.

No `angular.json`, o asset glob de `public/` ignora os PNGs de marca que tem `.webp`, e o de
`src/assets` ignora `projetos/**/*.png` — entao so os webp/derivados vao para `dist/`.
Templates e CSS referenciam sempre os `.webp` (logos via `<img src>` webp; watermarks via
`background-image: url('/simbolo-*.webp')`; carrossel via `img()` em `projetos.component.ts`).

---

## Checklist de aplicacao (Terroso secao 13)

Antes de entregar qualquer componente ou seccao nova, validar:

- [ ] Usa apenas as 4 cores institucionais + derivados documentados em `_tokens.css`?
- [ ] Rokkitt para titulo, Manrope para corpo, Newsreader para italico editorial?
- [ ] Tem pelo menos um elemento de prova antes do CTA (numero, depoimento, case)?
- [ ] Evita todos os itens da secao 8.3 do Terroso (proibicoes de copy)?
- [ ] Evita os termos da lista "Evitar" de `brand-plug-sustentavel.md` secao 6.5?
- [ ] Logo aplicado corretamente (cor, respiro, versao de fundo — brand 7.5)?
- [ ] CTA principal abre WhatsApp via `WaService`?
- [ ] Passa em contraste AA (`--leaf-deep` sobre claro; `--cream-bright` sobre `--ink`)?
- [ ] `aria-hidden` em decorativos; `alt` em logos e imagens reais?
- [ ] Badge/simbolo presente como assinatura visual (watermark ou flutuante)?

---

## Convencoes de copy

Idioma: portugues brasileiro, norma culta.
Tom: confiante, empático, tecnico. Nunca informal demais.
2a pessoa: "sua empresa", "você" — nunca "o cliente" ou "nos acreditamos".
Verbos no presente: "projetamos, instalamos, entregamos".
Numeros concretos antes de abstrações.
Vocabulario recomendado: ver `brand-plug-sustentavel.md` secao 6.5.

---

## Referencia rapida de arquivos

| Arquivo/Caminho | Proposito |
|----------------|-----------|
| `brand-plug-sustentavel.md` | Guia de marca canonico (cor, tipografia, tom, logo, canais) |
| `Design System Strategy Terroso.md` | Estrategia visual da landing (paleta, tokens, componentes, regras) |
| `docs/DESIGN_SYSTEM.md` | Referencia executiva tecnica do sistema (Architectural Greenhouse) |
| `src/styles/_tokens.css` | Tokens CSS de marca — fonte de verdade para CSS |
| `src/app/shared/wa.service.ts` | URL canonico do WhatsApp |
| `public/` | Assets institucionais (logos, badges, simbolos) — nao alterar sem aprovacao |
