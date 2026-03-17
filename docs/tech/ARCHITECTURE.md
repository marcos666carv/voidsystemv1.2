# ARCHITECTURE — void system v1.3

## Visão geral

SPA React servida via Netlify CDN. Backend são Netlify Functions (serverless) que conectam ao PostgreSQL via Drizzle ORM. Auth é JWT gerado pelas próprias functions.

```
Browser (React SPA)
    │
    ├── Netlify CDN (assets estáticos)
    │
    └── Netlify Functions (/api/*)
            │
            └── PostgreSQL (Supabase)
```

## Roteamento frontend

| Grupo | Prefixo | Layout | Proteção |
|---|---|---|---|
| Público | `/`, `/club`, `/about` | PublicLayout (Navbar + Footer) | Nenhuma |
| Checkout público | `/checkout` | Standalone | Nenhuma |
| Auth | `/login`, `/register` | AuthLayout | Nenhuma |
| Cliente | `/app/*` | AppLayout | role=client |
| Admin | `/admin/*` | AdminLayout | role=admin |

## Autenticação

- Login via `POST /api/auth-login` → retorna JWT
- JWT armazenado em `localStorage` via `AuthContext`
- `ProtectedRoute` valida role antes de renderizar
- Netlify Functions validam JWT via helper `requireAuth()` em `netlify/functions/lib/auth.mts`

## Chamadas à API

Todas as chamadas ao backend passam por `src/lib/api.ts`. Nunca fazer `fetch` diretamente nos componentes.

## Banco de dados

- PostgreSQL hospedado no Supabase
- ORM: Drizzle (schema em `src/db/schema.ts`)
- Migrations via `drizzle-kit` (`drizzle.config.ts`)
- Netlify Functions se conectam via `DATABASE_URL` (env var)

## Deploy

- Push em `main` → Netlify detecta → build (`npm run build`) → deploy automático
- Netlify Functions ficam em `netlify/functions/` e são expostas como `/.netlify/functions/<nome>` ou via `netlify.toml` com redirects para `/api/*`

## Última atualização
2026-03-17 — estrutura inicial documentada
