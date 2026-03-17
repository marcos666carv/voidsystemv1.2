# checkout-flow — Fluxo de checkout

## Entrypoints

- **Público:** `/checkout` — acessível sem login (para gift cards e compras avulsas)
- **Cliente logado:** `/app/checkout` — mesmo componente com contexto de usuário
- **Carrinho:** `CartDrawer` → botão "Finalizar compra" → `/checkout`

## Componentes

- `src/pages/public/checkout/CheckoutFlow.tsx` — orquestrador do fluxo em steps
- `src/pages/public/checkout/steps/VariantStep.tsx` — seleção de variante/quantidade
- `src/components/checkout/PaymentForm.tsx` — formulário de pagamento

## Fluxo

```
1. Usuário chega ao checkout (via carrinho ou link direto)
2. VariantStep — seleciona o que está comprando (serviço/variante/quantidade)
3. Dados do comprador (se não logado)
4. PaymentForm — método de pagamento (cartão, PIX, cupom)
5. POST /api/checkout/session → cria order "pending"
6. Processamento do pagamento (Pagarme)
7. POST /api/checkout/confirm → order "paid"
8. Créditos aplicados ao cliente (client_credits)
9. Confirmação exibida
```

## Gift card

- Comprador configura destinatário e mensagem
- Gift card é comprado como qualquer produto
- Destinatário recebe crédito de sessão vinculado ao `service_id`

## Regras

- `totalAmount` sempre em **centavos**
- Order expira se não confirmada (lógica a implementar no backend)
- Métodos: `credit_card`, `pix`, `coupon`
- Crédito de sessão: inserido em `client_credits` após `order=paid`

## Endpoints usados

- `POST /api/checkout/session` — cria order pending
- `POST /api/checkout/confirm` — confirma pagamento e aplica créditos

## Última atualização
2026-03-17 — fluxo documentado
