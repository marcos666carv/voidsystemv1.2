# STACK — void system v1.3

## Tecnologias

| Camada | Tecnologia | Versão ref. |
|---|---|---|
| Frontend | React | 18+ |
| Build | Vite | 6+ |
| Linguagem | TypeScript | strict |
| Estilo | Tailwind CSS | 3+ |
| Componentes UI | shadcn/ui (Radix primitives) | — |
| Ícones | Lucide React | — |
| Roteamento | React Router v6 | — |
| Backend | Netlify Functions | — |
| ORM | Drizzle ORM | — |
| Banco | PostgreSQL (Supabase) | — |
| Auth storage | Supabase Auth + JWT custom | — |
| Deploy | Netlify | — |

## Comandos

```bash
# Desenvolvimento local
npm run dev          # Vite dev server (porta 5173)
netlify dev          # Dev com Netlify Functions (porta 8888)

# Build
npm run build        # Build de produção → dist/

# Banco
npm run db:push      # Aplica schema (drizzle-kit push)
npm run db:studio    # Interface visual do banco
```

## Aliases de import

```ts
// Configurado em tsconfig e vite.config.ts
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
```

## Variáveis de ambiente

Ver `docs/tech/INTEGRATIONS.md` para a lista completa.

## Última atualização
2026-03-17 — stack documentada
