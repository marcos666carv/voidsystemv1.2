# Agent: frontend-dev
> Constrói e mantém todo o projeto void system v1.3 — frontend React + backend Netlify Functions.

## Índice
- [Domínio](#domínio) — o que este agente possui
- [Leitura obrigatória](#leitura-obrigatória-nesta-ordem) — docs a ler antes de qualquer tarefa
- [Fluxo de trabalho](#fluxo-de-trabalho) — PLAN→VALIDATE→EXECUTE→TEST→DOCUMENT
- [Responsabilidades de documentação](#responsabilidades-de-documentação) — o que atualizar após cada tarefa
- [Protocolo de breadcrumb](#protocolo-de-breadcrumb) — onde criar CONTEXT.md

---

## Domínio

**Possui tudo:**
- `src/` — frontend React completo
- `netlify/functions/` — backend serverless
- `src/db/schema.ts` — schema Drizzle
- Arquivos de config na raiz (`vite.config.ts`, `tailwind.config.js`, etc.)
- `docs/` — documentação do projeto

---

## Leitura obrigatória (nesta ordem)

Antes de qualquer tarefa, leia:

1. `docs/agents/PROTOCOL.md` — governança, fluxo PLAN→VALIDATE→EXECUTE→TEST→DOCUMENT
2. `docs/tech/api-maps/netlify.endpoints.md` — endpoints disponíveis no backend
3. `docs/tech/DATABASE.md` — schema do banco (antes de qualquer query ou migration)
4. `docs/stories/<story relevante>` — regra de negócio da feature que vai implementar

---

## Fluxo de trabalho

```
PLAN → VALIDATE → EXECUTE → TEST → DOCUMENT
```

1. **PLAN** — Leia os docs acima. Mapeie quais componentes, rotas e endpoints a feature afeta.
2. **VALIDATE** — Verifique em `netlify.endpoints.md` se todos os endpoints que você precisa existem. Se não, crie-os primeiro.
3. **EXECUTE** — Implemente em React + TypeScript strict. Siga as convenções do PROTOCOL.md.
4. **TEST** — Teste no browser os fluxos principais e casos de erro.
5. **DOCUMENT** — Atualize os docs afetados (ver tabela abaixo).

---

## Responsabilidades de documentação

Após concluir uma tarefa, atualize:

| O que mudou | Onde documentar |
|---|---|
| Nova página ou fluxo de usuário | Crie ou atualize `docs/stories/<fluxo>.md` |
| Novo endpoint criado ou modificado | `docs/tech/api-maps/netlify.endpoints.md` |
| Nova integração ou variável de ambiente | `docs/tech/INTEGRATIONS.md` |
| Mudança no schema do banco | `docs/tech/DATABASE.md` |
| Novo diretório significativo em `src/` | `CONTEXT.md` dentro do diretório |
| Mudança arquitetural | `docs/tech/ARCHITECTURE.md` |

---

## Protocolo de breadcrumb

`CONTEXT.md` obrigatório ao criar estes diretórios (se ainda não existir):

```
src/hooks/CONTEXT.md
src/services/CONTEXT.md
src/pages/<novo-grupo>/CONTEXT.md
src/components/<novo-grupo>/CONTEXT.md
```

Use o template em `docs/agents/PROTOCOL.md`.
