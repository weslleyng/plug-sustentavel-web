# GEO-AUDIT-REPORT — Plug Soluções Sustentáveis

Auditoria GEO + SEO de pré-lançamento, conduzida sobre o código-fonte local (Angular 21, CSR puro).
Data: 28/06/2026. Local: Manaus / AM. Marca: Plug Soluções Sustentáveis (informal "Plug Sustentável").

> Observação metodológica: o site ainda não está publicado e não há domínio registrado
> (`brand-plug-sustentavel.md`, itens 333 e 385). Não houve URL ao vivo para auditar.
> Sinais que exigem domínio real — acesso efetivo de crawlers, validação de Core Web Vitals,
> menções de marca em terceiros — foram avaliados como ausentes/indeterminados e devem ser
> reauditados após o deploy. Os ativos abaixo usam o placeholder `https://SEU-DOMINIO` /
> `https://www.plugsustentavel.com.br`; substituir quando o domínio for definido.

---

## 1. Score consolidado

GEO Score composto: 32/100 — Poor (descoberta mínima por IA).

| Categoria | Peso | Score | Ponderado |
|---|---|---|---|
| Citabilidade e visibilidade em IA | 25% | 35 | 8,75 |
| Sinais de autoridade de marca | 20% | 3 | 0,60 |
| Conteúdo e E-E-A-T | 20% | 56 | 11,20 |
| Fundamentos técnicos | 15% | 52 | 7,80 |
| Dados estruturados | 10% | 0 | 0,00 |
| Otimização por plataforma | 10% | 36 | 3,60 |
| Total | | | 31,95 ≈ 32 |

Faixas: 0-20 Crítico · 21-40 Poor · 41-60 Fair · 61-80 Good · 81-100 Excellent.

Prontidão por plataforma de IA (do agente de plataformas): Bing Copilot 43 · Google AIO 38 · ChatGPT Search 34 · Gemini 33 · Perplexity 30.

---

## 2. Diagnóstico central

Há uma inversão perigosa: o conteúdo é de alta qualidade, mas chega invisível a quem importa.

1. Entrega (causa-raiz). O `index.html` serve apenas `<app-root></app-root>` no `<body>`. Toda a copy — H1, serviços, FAQ, cases, provas, CTA — só existe depois que o Angular executa JavaScript. Googlebot até renderiza JS (com atraso), mas o índice do Bing (base de ChatGPT Search e Copilot) e o PerplexityBot praticamente não executam JS. Para eles, a página é vazia. Este único fator rebaixa quase todas as categorias.

2. Entidade. Não há nenhum dado estruturado (JSON-LD) no projeto. Sem `Organization`/`LocalBusiness`, a IA não tem como resolver "quem é a Plug", onde atua, ou o que oferece.

3. Reputação. A pegada externa da marca é praticamente nula: sem Google Business Profile, sem LinkedIn, sem Wikidata, sem avaliações verificáveis, sem menções em comunidades. Mesmo com o site corrigido, o teto de score só sobe quando existir corroboração de terceiros (20% do peso total, hoje em 3/100).

O conteúdo não é o problema: a copy é autoral, específica e densa em engenharia (MT/AT, BESS, GD, SPDA, cases com cliente público nominal). O problema é entrega, identidade e reputação.

---

## 3. Achados por severidade (consolidado dos 5 agentes)

Crítico
1. CSR sem prerender — 100% do conteúdo invisível a crawlers de IA que não executam JS. Raiz do score baixo. (`src/index.html:49`, `src/main.ts`, `angular.json` sem alvo `server`/`prerender`).
2. Dados estruturados ausentes (Schema 0/100) — nenhum `Organization`/`LocalBusiness`/`FAQPage`/`Service`.
3. Pegada de marca externa nula (3/100) — sem GBP, LinkedIn, Wikidata, avaliações, menções. Trava 20% do peso.
4. E-E-A-T: nenhum responsável técnico nomeado (sem nome/CREA/ART/bio) e formulário do simulador coleta dados pessoais sem consentimento LGPD nem política de privacidade.

Alto
5. `robots.txt`, `sitemap.xml` e `llms.txt` ausentes em `public/`.
6. NAP incompleto no rodapé: há telefone e "Manaus · AM", mas falta endereço/CEP, e-mail institucional e CNPJ/razão social.
7. `rel=canonical` e `og:url` ausentes; `og:image`/`twitter:image` em caminho relativo (vários parsers não resolvem).
8. Provas sem fonte verificável: "+100 empresas", "−95%", "412 MWh / 195 residências", "ranking Bloomberg", depoimentos sem atribuição externa.

Médio
9. Headers de segurança ausentes no `vercel.json` (sem HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
10. Meta: `title` curto (~43 chars; alvo 50-60); `description` longa (~210 chars; Google trunca em ~160).
11. Hierarquia de headings: Manifesto sem H2 (usa kicker em `aside`); H3 do rodapé sem H2 ancestral.
12. Risco de LCP/CLS: fontes do Google sem `preload`/self-host no caminho crítico; em CSR o texto só pinta após ~328 kB de JS.
13. Sem datas de publicação/atualização (frescor — penaliza Perplexity e ChatGPT).
14. IndexNow ausente (ganho fácil para Bing/Copilot via Vercel).

Baixo
15. Página única, sem cluster temático nem páginas de serviço dedicadas (profundidade percebida).
16. Depoimentos: NÃO marcar como `Review`/`AggregateRating` no próprio site (avaliação self-serving viola política do Google). Usar só via mecanismo independente (Google Business Profile).
17. Favicons/`apple-touch-icon` adicionais.

---

## 4. Plano de ação priorizado (por impacto)

P0 — Destrava tudo
- Habilitar SSG/prerender. Para landing de rota única, prerender estático é ideal e mantém deploy estático na Vercel (sem servidor Node):
  - `ng add @angular/ssr`
  - em `angular.json` (`architect.build.options`): `"outputMode": "static"`, `"prerender": true`
  - em `src/app/app.routes.server.ts`: rota `''` com `RenderMode.Prerender`
  - antes do build, auditar acesso a `window`/`document`/`localStorage`/`IntersectionObserver`/`ResizeObserver` em `simulador`, `nav`, `projetos` (carrossel) e `wa.service` — proteger com `afterNextRender()` ou `isPlatformBrowser(inject(PLATFORM_ID))`, pois quebram o prerender.
  - validar que `dist/.../browser/index.html` passa a conter o HTML completo das seções.
  - Efeito esperado: citabilidade sobe de ~25 para ~78; melhora as 5 plataformas de uma vez; reduz LCP (texto pinta antes da hidratação).

P1 — Quick wins de baixo risco e alto retorno (assets prontos na seção 5)
- Injetar JSON-LD estático no `<head>` do `index.html`: `WebSite` + `Organization`/`LocalBusiness` (NAP, geo, areaServed, sameAs) + `Service` (solar, eletromobilidade, automação) + `FAQPage` (5 perguntas reais).
- Criar `public/robots.txt`, `public/sitemap.xml` e `public/llms.txt`.
- Adicionar `<link rel="canonical">`, `og:url` e tornar `og:image`/`twitter:image` absolutos (dependem do domínio).

P2 — Confiança / E-E-A-T (conteúdo)
- Bloco "Responsável técnico": nome, foto, formação, CREA, frase de assinatura (ART). Resolve a maior trava de Expertise e de Trust ao mesmo tempo.
- Completar NAP no rodapé (endereço, CEP, e-mail, CNPJ/razão social) + links de política de privacidade e termos.
- Consentimento LGPD no simulador (checkbox + link de privacidade antes do envio).
- Tornar provas verificáveis (vincular estrelas a avaliações reais; nomear empresa/segmento dos depoimentos com autorização; citar fonte do "ranking Bloomberg").

P3 — Offsite (em paralelo, independe do código; destrava os 20% de autoridade de marca)
- Google Business Profile verificado, com NAP idêntico ao do site (maior alavanca para respostas locais e AIO).
- Página de empresa no LinkedIn; manter Instagram @plugsustentavel ativo e referenciado no `sameAs`.
- Acumular avaliações verificáveis e menções em diretórios locais/setoriais e comunidades de Manaus.

P4 — Técnico fino
- Headers de segurança no `vercel.json` (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) — testar CSP em preview, pois mal calibrada quebra fontes/estilos.
- `preload`/self-host das fontes críticas (Rokkitt/Newsreader/Manrope) para reduzir LCP/CLS.
- Ajustar `title` (~55 chars) e `description` (~155 chars).
- Corrigir hierarquia de headings (H2 no Manifesto; H2 ancestral para o rodapé).
- Habilitar IndexNow na Vercel e submeter `sitemap.xml` no Bing Webmaster Tools (verificação já existe via `msvalidate.01`).
- Datar o conteúdo (data de atualização visível + `dateModified` no schema).

Pré-requisito transversal: registrar o domínio. `canonical`, `og:url`, `sitemap loc`, URLs do `llms.txt` e do JSON-LD dependem dele.

---

## 5. Ativos prontos para uso

### 5.1 `public/robots.txt`

```
# robots.txt — Plug Soluções Sustentáveis
User-agent: *
Allow: /

# Crawlers de IA — liberados explicitamente para GEO
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

# Preferências de uso por IA (IETF draft-romm-aipref-contentsignals)
Content-Signal: ai-train=yes, search=yes, ai-retrieval=yes, ai-personalization=yes

Sitemap: https://SEU-DOMINIO/sitemap.xml
```

### 5.2 `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://SEU-DOMINIO/</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 5.3 `public/llms.txt`

```markdown
# Plug Soluções Sustentáveis

> Engenharia e arquitetura sustentável em Manaus (AM). Energia solar fotovoltaica,
> eletromobilidade, engenharia elétrica MT/AT, projeto e arquitetura, segurança e
> automação predial — tudo sob um único contrato, do diagnóstico ao último kWh gerado.

A Plug Soluções Sustentáveis (informalmente "Plug Sustentável") reúne arquitetos,
engenheiros e especialistas em energia solar para projetar sistemas de geração
distribuída como obra integrada. Atua em Manaus e no interior do Amazonas, atendendo
indústrias, clínicas, redes de varejo, condomínios e o poder público.

## Serviços
- [Energia Solar Fotovoltaica](https://SEU-DOMINIO/#servicos): Usinas de até 5 MW (mini e micro GD), aluguel via associação compartilhada e armazenamento BESS.
- [Eletromobilidade](https://SEU-DOMINIO/#servicos): Viabilidade, instalação e O&M de eletropostos e carregadores de 7,8 kW a 60 kW.
- [Engenharia Elétrica MT/AT](https://SEU-DOMINIO/#servicos): Subestações de média e alta tensão, migração para o Mercado Livre de Energia (ACL/PIE), operação e manutenção.
- [Projeto e Arquitetura](https://SEU-DOMINIO/#servicos): Projeto executivo integrado, construção, reforma e manutenção predial.
- [Segurança e Automação](https://SEU-DOMINIO/#servicos): Detecção e alarme de incêndio, SPDA, CFTV/IoT e automação predial.
- [Plug Educação Técnica](https://SEU-DOMINIO/#servicos): Qualificação em solar, projeto elétrico, instalação de carregadores VE e CAD/Revit.

## Diferenciais
- Economia de até 95% na conta de energia já no segundo mês.
- Contrato único: arquitetura, engenharia fotovoltaica e instalação sob um só responsável.
- Equipamentos Tier 1 (ranking Bloomberg): 25 anos de garantia em módulos, 10 anos em inversores.
- Retorno (payback) médio entre 3 e 5 anos; +20 anos de energia quase gratuita depois disso.

## Perguntas frequentes
- [Quanto custa um sistema](https://SEU-DOMINIO/#faq): Pequenos comércios a partir de ~R$ 28 mil; indústrias proporcional ao telhado. Proposta com cálculo de retorno gratuita.
- [Em quanto tempo se paga](https://SEU-DOMINIO/#faq): Payback médio de 3 a 5 anos.
- [Preciso de arquiteto e engenheiro separados](https://SEU-DOMINIO/#faq): Não — projeto, ART, homologação e instalação no mesmo contrato.

## Contato
- WhatsApp: +55 92 98286-2240
- E-mail: plugsustentavel@gmail.com
- Instagram: https://instagram.com/plugsustentavel
- Localização: Manaus, Amazonas, Brasil

## Optional
- [Projetos entregues](https://SEU-DOMINIO/#projetos): Cases com economia e payback comprovados.
- [Processo em quatro estágios](https://SEU-DOMINIO/#processo): Diagnóstico, projeto integrado, instalação e acompanhamento por 25 anos.
```

### 5.4 JSON-LD para o `<head>` de `src/index.html`

Colar antes de `</head>`. Como o Angular só hidrata o `<body>`, esses blocos permanecem no HTML servido e ficam visíveis a crawlers que não executam JS. Não inserir via `Meta`/`Renderer2` em runtime — seria invisível para GPTBot/ClaudeBot/PerplexityBot. Substituir `[REPLACE: ...]` e o domínio placeholder; validar em validator.schema.org e no Rich Results Test.

Bloco 1 — Identidade (WebSite + Organization/LocalBusiness). `LocalBusiness` já é subclasse de `Organization`: um único nó multi-tipado evita duplicar a entidade.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.plugsustentavel.com.br/#website",
      "url": "https://www.plugsustentavel.com.br/",
      "name": "Plug Soluções Sustentáveis",
      "inLanguage": "pt-BR",
      "publisher": { "@id": "https://www.plugsustentavel.com.br/#org" }
    },
    {
      "@type": ["Organization", "LocalBusiness", "GeneralContractor"],
      "@id": "https://www.plugsustentavel.com.br/#org",
      "name": "Plug Soluções Sustentáveis",
      "alternateName": "Plug Sustentável",
      "url": "https://www.plugsustentavel.com.br/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.plugsustentavel.com.br/logo-horizontal.png",
        "width": 600,
        "height": 285
      },
      "image": "https://www.plugsustentavel.com.br/og-image.png",
      "slogan": "Conectando você à sustentabilidade",
      "description": "Engenharia e arquitetura sustentável em Manaus (AM): energia solar fotovoltaica, eletromobilidade, engenharia elétrica MT/AT, automação predial e projeto arquitetônico sob um único contrato.",
      "foundingDate": "[REPLACE: ano de fundação]",
      "knowsAbout": [
        "Energia solar fotovoltaica",
        "Geração distribuída",
        "Armazenamento BESS",
        "Eletromobilidade e carregadores veiculares",
        "Engenharia elétrica de média e alta tensão",
        "Mercado livre de energia (ACL e PIE)",
        "Automação predial e CFTV",
        "Projeto e arquitetura sustentável"
      ],
      "telephone": "+5592982862240",
      "email": "plugsustentavel@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "[REPLACE: logradouro e número]",
        "addressLocality": "Manaus",
        "addressRegion": "AM",
        "postalCode": "[REPLACE: CEP]",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "[REPLACE: -3.1190 — ajustar ao endereço real]",
        "longitude": "[REPLACE: -60.0217 — ajustar ao endereço real]"
      },
      "areaServed": [
        { "@type": "City", "name": "Manaus" },
        { "@type": "AdministrativeArea", "name": "Iranduba" },
        { "@type": "AdministrativeArea", "name": "Parintins" },
        { "@type": "State", "name": "Amazonas" }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+5592982862240",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": ["Portuguese"]
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "[REPLACE: 08:00]",
          "closes": "[REPLACE: 18:00]"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/plugsustentavel"
      ]
    }
  ]
}
</script>
```

Bloco 2 — Serviços (Service). Padrão replicável para as demais frentes.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.plugsustentavel.com.br/#servico-solar",
      "name": "Energia Solar Fotovoltaica",
      "serviceType": "Geração distribuída de energia solar fotovoltaica",
      "provider": { "@id": "https://www.plugsustentavel.com.br/#org" },
      "areaServed": { "@type": "State", "name": "Amazonas" },
      "url": "https://www.plugsustentavel.com.br/#servicos",
      "description": "Projeto, instalação e operação de usinas de até 5 MW (mini e micro GD), com instalação direta ou aluguel via associação compartilhada e armazenamento BESS."
    },
    {
      "@type": "Service",
      "@id": "https://www.plugsustentavel.com.br/#servico-eletromobilidade",
      "name": "Eletromobilidade",
      "serviceType": "Instalação e O&M de eletropostos e carregadores veiculares",
      "provider": { "@id": "https://www.plugsustentavel.com.br/#org" },
      "areaServed": { "@type": "State", "name": "Amazonas" },
      "url": "https://www.plugsustentavel.com.br/#servicos",
      "description": "Estudo de viabilidade, instalação e O&M de carregadores de 7,8 kW residenciais a 60 kW trifásicos, incluindo viabilidade de frota elétrica."
    },
    {
      "@type": "Service",
      "@id": "https://www.plugsustentavel.com.br/#servico-automacao",
      "name": "Segurança e Automação Predial",
      "serviceType": "Automação predial, detecção de incêndio, SPDA e CFTV/IoT",
      "provider": { "@id": "https://www.plugsustentavel.com.br/#org" },
      "areaServed": { "@type": "State", "name": "Amazonas" },
      "url": "https://www.plugsustentavel.com.br/#servicos",
      "description": "Detecção e alarme de incêndio, SPDA, proteção patrimonial, CFTV/IoT e automação predial para obras críticas."
    }
  ]
}
</script>
```

Bloco 3 — FAQPage (perguntas reais de `faq.component.html`).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.plugsustentavel.com.br/#faq",
  "isPartOf": { "@id": "https://www.plugsustentavel.com.br/#website" },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa um sistema para minha empresa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Varia com consumo e porte. Para pequenos comércios, sistemas começam em torno de R$ 28 mil; para indústrias, é proporcional ao telhado disponível. Na visita técnica entregamos proposta com cálculo de retorno detalhado, gratuita e sem compromisso."
      }
    },
    {
      "@type": "Question",
      "name": "Em quanto tempo o sistema se paga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Na média dos projetos Plug, o payback acontece entre 3 e 5 anos. A partir daí, você continua gerando energia praticamente gratuita por mais de 20 anos, com garantia de fábrica em todos os módulos."
      }
    },
    {
      "@type": "Question",
      "name": "Preciso contratar arquiteto e engenheiro separado?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Projeto arquitetônico, engenharia fotovoltaica, ART, homologação e instalação estão todos dentro do mesmo contrato. Um único gerente de projeto responde por tudo."
      }
    },
    {
      "@type": "Question",
      "name": "E se faltar energia na rede? O sistema funciona?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sistemas on-grid desligam por segurança durante apagões. Para operações que não podem parar, como clínicas, frigoríficos e data centers, oferecemos sistemas híbridos com baterias. Avaliamos a melhor configuração no diagnóstico."
      }
    },
    {
      "@type": "Question",
      "name": "A instalação atrapalha o funcionamento da empresa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Planejamos a obra em conjunto com sua operação, com instalações em finais de semana, madrugadas ou janelas técnicas. A maior parte fica no telhado e não interfere no dia a dia."
      }
    }
  ]
}
</script>
```

### 5.5 Headers de segurança — `vercel.json` (array `headers`)

```json
{
  "source": "/(.*)",
  "headers": [
    { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
    { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
    { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'self'" }
  ]
}
```

Ajustar `style-src`/`font-src` se as fontes forem self-hostadas; testar em preview antes de produção.

---

## 6. Reauditar pós-deploy

Após publicar com domínio próprio, rodar novamente para validar o que exige URL ao vivo:
acesso efetivo de crawlers (`/geo crawlers`), Core Web Vitals reais (PageSpeed/CrUX),
indexação no Bing/Google e evolução das menções de marca (`/geo brands`). Usar `/geo compare`
para medir o delta de score após as correções P0–P1.
