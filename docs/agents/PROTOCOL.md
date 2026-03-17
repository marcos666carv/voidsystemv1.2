# PROTOCOL — void system v1.3

Leia este arquivo inteiro antes de qualquer ação. Sem exceções.

## Índice
- [Regra zero](#regra-zero) — identifique o que vai fazer antes de codar
- [O que é o void system](#o-que-é-o-void-system) — contexto e propósito
- [Estrutura do projeto](#estrutura-do-projeto) — src, netlify, docs
- [Fluxo de desenvolvimento](#fluxo-de-desenvolvimento) — PLAN→VALIDATE→EXECUTE→TEST→DOCUMENT
- [Princípio de documentação atômica](#princípio-de-documentação-atômica) — uma responsabilidade por doc
- [Regras de negócio](#regras-de-negócio) — agendamento, créditos, memberships
- [Convenções TypeScript e React](#convenções-typescript-e-react) — padrões de código
- [Template de CONTEXT.md](#template-de-contextmd) — breadcrumb para novos diretórios

---

## Regra zero

Antes de qualquer ação, você deve saber **o que vai mudar e onde**:

- `src/pages/` — rotas e views
- `src/components/` — UI reutilizável
- `src/context/` — estado global (AuthContext, CartContext)
- `src/layouts/` — wrappers de layout por tipo de usuário
- `src/lib/` — utilitários, cliente Supabase, chamadas à API
- `netlify/functions/` — serverless backend (handlers REST)
- `src/db/schema.ts` — schema Drizzle (só mude com propósito claro e documente)

**Se a tarefa não estiver clara, pergunte antes de escrever código.**

---

## O que é o void system

Sistema de gestão para float spa (tanques de flutuação). Clientes agendam sessões, compram produtos e gift cards via web. A equipe gerencia agenda, clientes, tanques, finanças e comunicações via painel admin.

**Stack principal:**
- Frontend: React + Vite + TypeScript + Tailwind CSS
- Backend: Netlify Functions (serverless) + Drizzle ORM
- Banco: PostgreSQL via Supabase
- Auth: JWT gerado nas Netlify Functions
- Deploy: Netlify (push → main → deploy automático)

---

## Estrutura do projeto

```
src/
  pages/
    public/      # Landing, VoidClub, About, Checkout (sem auth)
    auth/        # Login, Register (client + admin)
    app/         # Área do cliente (protegida: role=client)
    admin/       # Painel admin (protegido: role=admin)
  components/
    ui/          # Primitivos (button, card, dialog, input…)
    booking/     # Componentes de agendamento
    dashboard/   # Modais do dashboard do cliente
    admin/       # Componentes exclusivos do admin
    auth/        # ProtectedRoute
    cards/       # Cards de produto, serviço, categoria
    checkout/    # Formulário de pagamento
    cart/        # CartDrawer
    common/      # EasterEgg e outros utilitários visuais
  context/
    AuthContext.tsx   # Usuário logado, token, role
    CartContext.tsx   # Carrinho de compras
  layouts/
    PublicLayout.tsx  # Navbar + Footer
    AuthLayout.tsx    # Sem nav, fundo limpo
    AppLayout.tsx     # Sidebar cliente
    AdminLayout.tsx   # Sidebar admin
  lib/
    api.ts            # Funções de fetch para as Netlify Functions
    supabase.ts       # Cliente Supabase (auth + storage)
    utils.ts          # Helpers gerais
    mockData.ts       # Dados mock (usar apenas em desenvolvimento)
  db/
    schema.ts         # Schema Drizzle — fonte da verdade do banco
netlify/
  functions/          # Serverless handlers REST
    lib/              # auth.mts, db.mts, supabase.mts (helpers compartilhados)
docs/
  agents/             # Este diretório — protocolo e personas
    PROTOCOL.md       # Governança global
    frontend-dev.md   # Persona de desenvolvimento
    opensquad.md      # Orquestração multi-agente (squads, skills, CLI)
  tech/               # Referência técnica (arquitetura, banco, stack, integrações)
  stories/            # Domínio de negócio em linguagem plana
  SEARCH_GUIDE.md     # Navegação rápida — onde encontrar cada informação

_opensquad/           # Framework OpenSquad (após npx opensquad init)
squads/               # Squads criados (CRM, conteúdo, features)
skills/               # Skills instaladas via opensquad skills install
```

---

## Fluxo de desenvolvimento — obrigatório para toda feature

```
PLAN → VALIDATE → EXECUTE → TEST → DOCUMENT
```

1. **PLAN** — Leia os docs obrigatórios. Entenda o que vai mudar. Mapeie os componentes, rotas e endpoints afetados.
2. **VALIDATE** — Confirme que os endpoints que você precisa existem em `docs/tech/api-maps/netlify.endpoints.md`. Se não existirem, crie-os primeiro (ou documente o pedido).
3. **EXECUTE** — Escreva o código. Siga as convenções abaixo.
4. **TEST** — Verifique o comportamento no browser. Feature não está pronta até funcionar end-to-end.
5. **DOCUMENT** — Atualize os docs afetados. Não é opcional.

---

## Princípio de documentação atômica

Cada documento tem **uma única responsabilidade**.

- Endpoints das Netlify Functions → `docs/tech/api-maps/netlify.endpoints.md`
- Schema do banco → `docs/tech/DATABASE.md`
- Regras de negócio → `docs/stories/`
- Intenção de módulo → `CONTEXT.md` dentro do diretório
- Nenhum doc deve exigir a leitura de três outros para ser útil
- Doc longo é um bug — se passar de ~100 linhas, divida

---

## Regras de negócio

- **Roles:** `client`, `admin`, `staff` — definidos no banco em `clients.role`
- **Memberships:** `standard`, `void_club`, `vip` — afetam preços e acesso
- **Void Level:** gamificação por XP — `iniciado → explorador → habilidoso → especialista → mestre → voidwalker → transcendente`
- **Créditos de sessão:** `client_credits` — vinculados a `service_id` + `variant_id`, com expiração opcional
- **Status de agendamento:** `pending → confirmed → completed | cancelled | no_show`
- **Status de tanque:** `livre | em_sessao | limpeza | modo_noturno | manutencao | standby`
- **Checkout:** cria uma `order` com status `pending`, confirma via `/checkout/confirm`
- **Pagamentos:** `credit_card`, `pix`, `coupon` — integrado via Netlify Function `/checkout`
- **Preços:** armazenados em **centavos** (integer) — sempre exibir dividido por 100

---

## Convenções TypeScript e React

- **TypeScript strict em todo o projeto — sem `any`, sem exceções**
- Tipos explícitos em props de componente e retorno de funções; inferência só em variáveis locais óbvias
- `camelCase` variáveis/funções · `PascalCase` componentes/tipos · `SCREAMING_SNAKE_CASE` constantes
- Componentes funcionais com arrow functions e named exports
- Hooks customizados em `src/hooks/` (se criados)
- Dados do servidor via `src/lib/api.ts` — nunca fazer fetch direto nos componentes
- Erros de formulário via estado local — não usar `alert()`
- Imports com alias `@/` — nunca com caminhos relativos profundos (`../../..`)

### Clean Code

- Componentes fazem uma coisa — se passar de ~150 linhas, considere dividir
- Nomes revelam intenção — sem abreviações, sem nomes genéricos (`data`, `info`, `temp`)
- Sem `console.log` esquecido em produção
- Sem código morto, sem variáveis não usadas
- Props opcionais com valor default explícito

---

## Template de CONTEXT.md (breadcrumb de módulo)

Ao criar um novo diretório significativo em `src/`, crie este arquivo dentro dele:

```markdown
# <nome do diretório>

## Propósito
O que este diretório é responsável por. Um parágrafo.

## Possui
Lista de componentes/hooks/utils que vivem aqui.

## Depende de
O que este módulo importa (outros diretórios, context, lib).

## Não possui
Lista explícita de responsabilidades que este diretório deliberadamente não tem.

## Decisões não-óbvias
Por que algo foi feito de uma forma específica.

## Última atualização
<data> — <resumo em uma linha>
```
