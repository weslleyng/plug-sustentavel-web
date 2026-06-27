# Plug Sustentável — Landing Page (Angular 21)

Aplicação Angular 21 standalone que implementa a landing page da Plug Soluções Sustentáveis
sob o sistema de design **The Architectural Greenhouse** (ver `docs/DESIGN_SYSTEM.md`).

Variação ativa: `surfaceTone: paper` · `heroDensity: editorial`.

## Scripts

```bash
npm install
npm start      # ng serve — http://localhost:4200
npm run build  # produção em dist/plug-sustentavel
```

## Estrutura

```
src/
  index.html          data-surface="paper" data-density="editorial" no <body>
  styles.css          tokens globais do design system + base (tipografia, layout, componentes)
  main.ts
  app/
    app.component.ts         Shell com <router-outlet>
    app.config.ts            provideRouter
    app.routes.ts
    shared/
      wa.service.ts          URL única do WhatsApp
    pages/
      landing-page/          Página que orquestra as seções
    components/
      nav/                   Nav fixo com glassmorphism
      hero/                  Display-xl assimétrico + strip tonal + badge girando
      manifesto/             Tese editorial com 3 métricas-âncora
      process/               4 estágios + conduits animados
      value/                 Lista de valores + painel visual sobreposto
      voices/                Grid 5/4/3 assimétrico de depoimentos
      faq/                   <details> com ícone rotativo
      closing/               CTA final com gradiente verde + sidebar em glass
      footer/                Rodapé em surface-dim
public/
  *.png                 Logos, símbolos e badges da marca
docs/
  DESIGN_SYSTEM.md      Documento do sistema de design aplicado
```

## Design System

Todos os tokens (cores, tipografia, raios, sombras) estão em `src/styles.css` como custom
properties no `:root`. As variações de superfície (`butter`, `paper`, `fog`) e densidade
(`editorial`, `compact`) são selecionáveis no `<body>` via `data-surface` e `data-density`
— o padrão é o escolhido pelo time (`paper` + `editorial`).

Ver `docs/DESIGN_SYSTEM.md` para a filosofia completa.
