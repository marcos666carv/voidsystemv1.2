# checkout-flow — Fluxo de checkout e pagamento

## Entrypoints

| Forma de acesso | URL / Componente | Contexto |
|---|---|---|
| Público direto | `/checkout?type=float` | sem login, fluxo completo com AuthStep |
| Embutido (iframe) | `<CheckoutIframe type="float" />` | qualquer página, mesmo login |
| App (página dedicada) | `/app/checkout` | dentro do AppLayout, sem AuthStep |

> Para embutir o checkout em qualquer lugar → veja `docs/stories/embed-checkout.md`

## Orquestrador

`src/pages/public/checkout/CheckoutFlow.tsx`

- Detecta se está rodando dentro de um iframe (`window.parent !== window`)
- Em iframe: ao finalizar, envia `postMessage('void:checkout:success')` em vez de navegar
- Standalone: ao finalizar, navega para `/app` após 2.5s

## Steps disponíveis

| Step id | Componente | Propósito |
|---|---|---|
| `variant` | `VariantStep.tsx` | Seleção de serviço, duração e pacote |
| `schedule` | `ScheduleStep.tsx` | Unidade e data/horário |
| `recipient` | `RecipientStep.tsx` | Destinatário do gift card |
| `gift_card` | `GiftCardStep.tsx` | Resgate de código de presente |
| `auth` | `AuthStep.tsx` | Login/identificação (auto-skip se logado) |
| `payment` | `PaymentStep.tsx` | Cartão, PIX ou cupom |

## Composição de steps por tipo

```
float / massage / combo:
  variant → schedule → auth → payment

gift:
  variant → recipient → auth → payment

redeem:
  gift_card → schedule → auth
```

## API calls

```
POST /api/checkout/session   → cria order "pending", retorna { id: orderId }
POST /api/checkout/confirm   → confirma pagamento, aplica créditos → order "paid"
```

> Arquivo: `src/lib/api.ts` → `checkoutApi.createSession()` / `checkoutApi.confirm()`

## PIX (pagamento assíncrono)

- Order fica `pending` — confirmação chega via webhook
- Erro na API é ignorado: fluxo avança para tela de sucesso mesmo assim
- Cartão/cupom: exigem confirmação imediata; erro é exibido inline

## Regras

- `totalAmount` sempre em **centavos** (`Math.round(price * 100)`)
- Se usuário logado, `AuthStep` auto-chama `onAuthSuccess(user.id)` via `useEffect`
- Crédito de sessão: inserido em `client_credits` após `order = paid`
- Preços vêm de `MOCK_PACKAGES` + `MOCK_SERVICES` em `src/lib/mockData.ts` (fase mock)

## Última atualização

2026-03-17 — entrypoints atualizados, iframe, postMessage documentados
