# INTEGRATIONS — void system v1.3

## Variáveis de ambiente

### Frontend (Vite — prefixo `VITE_`)

| Variável | Uso |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave pública do Supabase |

### Backend (Netlify Functions)

| Variável | Uso |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL (Supabase) |
| `JWT_SECRET` | Segredo para assinar/verificar tokens JWT |

> Nunca commitar `.env`. Usar `.env.example` como referência.

---

## Supabase

- **Uso:** PostgreSQL hospedado + Storage (fotos de perfil)
- **Auth:** O Supabase Auth não é usado diretamente — auth é via JWT gerado pelas Netlify Functions
- **Cliente frontend:** `src/lib/supabase.ts`
- **Cliente backend:** `netlify/functions/lib/supabase.mts`

---

## Netlify

- **Uso:** Hospedagem da SPA + serverless functions
- **Redirects:** Configurados em `netlify.toml` — `/api/*` mapeia para as functions
- **Deploy:** Push em `main` → build automático

---

## Pagarme / Pagamentos

- **Arquivo:** `src/services/pagarme.ts`
- **Uso:** Integração de pagamentos (cartão de crédito, PIX)
- **Status:** Verificar `src/services/pagarme.ts` para estado atual da integração

---

## Última atualização
2026-03-17 — integrações documentadas
