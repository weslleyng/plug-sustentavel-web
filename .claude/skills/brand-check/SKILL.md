---
name: brand-check
description: Executa o checklist de conformidade de marca da Plug Sustentável (Terroso seção 13) em um arquivo ou diretório de componente. Responde com APROVADO ou REPROVADO + lista de correções.
user-invocable: true
---

Você vai executar uma auditoria de conformidade de marca no arquivo ou diretório informado pelo usuário.

## Uso

```
/brand-check src/app/components/hero/
/brand-check src/app/components/voices/voices.component.html
```

## Checklist completo (Terroso seção 13 + CLAUDE.md)

Para cada item, relatar: **OK**, **FALHA** (com detalhe) ou **N/A** (não aplicável ao arquivo auditado).

### Paleta
- [ ] Usa apenas as 4 cores institucionais + derivados de `_tokens.css`?
- [ ] Nenhum token Material 3 (`--primary`, `--surface*`, `--on-primary`, etc.)?
- [ ] `--leaf` não aparece como `color:` de texto sobre fundo claro?
- [ ] Nenhuma cor hex literal fora dos tokens?

### Tipografia
- [ ] Rokkitt (`var(--f-headline)`) para títulos H1–H3?
- [ ] Manrope (`var(--f-body)`) para corpo, kickers, metas?
- [ ] Newsreader (`var(--f-display)`) para itálico editorial e display?
- [ ] `em` em headlines: cor `var(--leaf)`, máximo 2 palavras?
- [ ] JetBrains Mono ausente (não usado neste projeto)?

### Copy e tom
- [ ] Evita termos da lista "Evitar" (`brand-plug-sustentavel.md` 6.5)?
- [ ] Evita proibições do Terroso 8.3 ("Transforme sua vida", "O futuro é agora", emojis fora de WhatsApp)?
- [ ] Usa 2ª pessoa ("você", "sua empresa")?
- [ ] Verbos no presente ("projetamos", "instalamos")?
- [ ] Tem pelo menos um elemento de prova antes do CTA (número, depoimento, case)?

### Logo e assets
- [ ] Logo na versão correta para o fundo (`brand-plug-sustentavel.md` 7.5)?
- [ ] CTA principal direciona para WhatsApp via `WaService`?

### Acessibilidade (Terroso seção 10)
- [ ] Contraste AA em todo texto?
- [ ] `aria-hidden` em decorativos (watermark, badge, grain)?
- [ ] `alt` em logos e imagens reais?
- [ ] `scroll-margin-top` em `section[id]`?

### Assinatura visual
- [ ] Badge / símbolo presente (hero e/ou CTA final)?
- [ ] Watermark do símbolo (4% opacidade) em pelo menos 2 seções?

## Procedimento

1. Ler todos os arquivos `.ts`, `.html`, `.css` no caminho informado.
2. Para cada item do checklist, grep o conteúdo e determinar OK/FALHA/N/A.
3. Emitir relatório em formato de tabela markdown.
4. Concluir com **APROVADO** (todos OK ou N/A) ou **REPROVADO** (qualquer FALHA).
5. Para cada FALHA, listar a correção específica necessária.
