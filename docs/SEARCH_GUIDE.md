# SEARCH_GUIDE — navegação rápida

Use esta tabela para encontrar qualquer informação sem precisar buscar no código.

## Lookup rápido

| Pergunta | Arquivo |
|---|---|
| O que é este projeto? | `docs/stories/DOMAIN_OVERVIEW.md` |
| Quais são as regras de desenvolvimento? | `docs/agents/PROTOCOL.md` |
| Quais são minhas responsabilidades como agente? | `docs/agents/frontend-dev.md` |
| Como usar o OpenSquad neste projeto? | `docs/agents/opensquad.md` |
| Como criar um squad de CRM, conteúdo ou dev? | `docs/agents/opensquad.md` |
| Quais endpoints existem no backend? | `docs/tech/api-maps/netlify.endpoints.md` |
| Houve breaking changes recentes na API? | `docs/tech/api-maps/README.md` |
| Schema do banco de dados? | `docs/tech/DATABASE.md` |
| Variáveis de ambiente e integrações? | `docs/tech/INTEGRATIONS.md` |
| Stack, versões e comandos? | `docs/tech/STACK.md` |
| Arquitetura do sistema? | `docs/tech/ARCHITECTURE.md` |
| Como funciona o agendamento? | `docs/stories/booking-flow.md` |
| Como funciona o checkout e pagamento? | `docs/stories/checkout-flow.md` |
| Como embutir o checkout em qualquer página? | `docs/stories/embed-checkout.md` |
| Como usar o `CheckoutIframe`? | `docs/stories/embed-checkout.md` |
| O que faz um diretório específico? | `CONTEXT.md` dentro daquele diretório |
| Repositório GitHub? | https://github.com/marcos666carv/voidsystemv1.2 |

## Regras de navegação

1. **Sempre comece em `docs/agents/PROTOCOL.md`.** Sem exceções.
2. **Leia `docs/agents/frontend-dev.md`** para saber o que deve e não deve modificar.
3. **Se a informação não está nos docs, os docs estão errados.** Corrija como parte da sua tarefa.
4. **Nunca busque no código informações que deveriam estar nos docs.**
5. **Docs longos são um bug.** Se ultrapassar ~100 linhas, divida.

## Estrutura de docs/

```
docs/
├── SEARCH_GUIDE.md              ← você está aqui
├── agents/
│   ├── PROTOCOL.md              ← governança global — leia sempre primeiro
│   ├── frontend-dev.md          ← persona única deste projeto
│   └── opensquad.md             ← orquestração multi-agente (squads, skills, CLI)
├── tech/
│   ├── ARCHITECTURE.md          ← fluxos e decisões arquiteturais
│   ├── DATABASE.md              ← schema PostgreSQL, enums, regras
│   ├── INTEGRATIONS.md          ← env vars e uso de cada serviço
│   ├── STACK.md                 ← versões, toolchain, comandos
│   └── api-maps/
│       ├── README.md            ← changelog e pedidos pendentes
│       └── netlify.endpoints.md ← contrato REST das Netlify Functions
└── stories/
    ├── DOMAIN_OVERVIEW.md       ← o que é o void system
    ├── booking-flow.md          ← fluxo de agendamento
    ├── checkout-flow.md         ← fluxo de checkout e pagamento
    └── embed-checkout.md        ← como embutir o checkout em qualquer página (CheckoutIframe)
```
