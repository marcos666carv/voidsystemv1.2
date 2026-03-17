# CLAUDE.md — void system v1.3

Leia este arquivo antes de qualquer ação neste repositório.

## Contexto

**Repositório:** https://github.com/marcos666carv/voidsystemv1.2
**Branch principal:** `main`
**Deploy:** Netlify (automático ao push em `main`)

## Documentação obrigatória

Antes de qualquer tarefa, leia nesta ordem:

1. `docs/agents/PROTOCOL.md` — governança global, fluxo de trabalho, convenções
2. `docs/agents/frontend-dev.md` — responsabilidades, o que pode e não pode modificar
3. `docs/SEARCH_GUIDE.md` — onde encontrar cada informação rapidamente

## Estrutura rápida

```
src/
  pages/       # Rotas: public/, auth/, app/, admin/
  components/  # UI e componentes reutilizáveis
  context/     # AuthContext, CartContext
  layouts/     # PublicLayout, AuthLayout, AppLayout, AdminLayout
  lib/         # api.ts, supabase.ts, utils.ts
  db/          # schema Drizzle (leitura apenas — não modifique sem docs)
netlify/
  functions/   # Serverless functions (backend)
docs/          # Toda documentação do projeto
```

## Regra zero

Este projeto tem **um único agente**: `frontend-dev`.
Domínio: `src/` + `netlify/functions/` + arquivos de config na raiz.

Se a tarefa não estiver clara, pergunte antes de escrever código.
