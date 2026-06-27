---
name: new-section
description: Scaffolding de uma nova seção da landing page da Plug Sustentável. Gera o componente Angular standalone com a estrutura padrão kicker → headline → subtitle, conforme Design System Terroso seção 6.2.
user-invocable: true
---

Você vai criar uma nova seção da landing page da Plug Soluções Sustentáveis.

## Argumentos

O usuário deve informar:
1. **Nome da seção** (ex: "cases", "servicos", "parceiros") — usado como nome do componente.
2. **Kicker** — etiqueta curta em uppercase (ex: "Nossos cases").
3. **Headline** — título principal da seção (em Rokkitt — itálico em até 2 palavras com `<em>`).
4. **Subtítulo/lead** — texto de abertura em Manrope.
5. **Tipo de grid** (opcional): `cards-3`, `cards-4`, `split-2`, `full-width`.

Se não informados, perguntar antes de criar.

## O que criar

### 1. `src/app/components/<nome>/<nome>.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-<nome>',
  standalone: true,
  imports: [],
  templateUrl: './<nome>.component.html',
  styleUrl: './<nome>.component.css'
})
export class <Nome>Component {}
```

### 2. `src/app/components/<nome>/<nome>.component.html`

Estrutura padrão Terroso seção 6.2:

```html
<section id="<nome>" class="<nome> breathe">
  <div class="wrap">
    <header>
      <span class="kicker"><kicker-text></span>
      <h2 class="headline-xl"><headline-text></h2>
      <p class="lead"><subtitulo-text></p>
    </header>
    <!-- grid ou conteúdo da seção -->
  </div>
</section>
```

### 3. `src/app/components/<nome>/<nome>.component.css`

Inicializar com `:host { display: contents; }` e as regras básicas da seção, usando apenas tokens de `_tokens.css`.

### 4. Atualizar `src/app/pages/landing-page/landing-page.component.ts`

Adicionar o import do novo componente e incluir no array `imports`.

### 5. Atualizar `src/app/pages/landing-page/landing-page.component.html`

Inserir o seletor `<app-<nome> />` na posição correta (informar ao usuário onde posicionar).

## Validações antes de entregar

- [ ] Usa apenas tokens de marca (`--cream*`, `--ink*`, `--leaf*`, `--paper`, `--line`)?
- [ ] Tipografia correta: Rokkitt para headline, Manrope para corpo?
- [ ] `section[id]` presente para ancora de navegação?
- [ ] Tem `aria-hidden` em decorativos se os houver?
- [ ] Tem ao menos um elemento de prova antes do CTA (se houver CTA)?
- [ ] `.css` abaixo de 4 KB?
