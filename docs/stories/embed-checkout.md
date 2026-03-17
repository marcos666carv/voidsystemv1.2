# embed-checkout — Como embutir o checkout em qualquer lugar

## O que é

`CheckoutIframe` é um componente React que abre o fluxo de checkout completo
(`/checkout?type=X`) dentro de um overlay `<iframe>`. Funciona em qualquer página
do sistema sem duplicar lógica de pagamento, agendamento ou autenticação.

## Arquivo

```
src/components/checkout/CheckoutIframe.tsx
```

## Uso básico

```tsx
import { CheckoutIframe, type CheckoutFlowType } from '@/components/checkout/CheckoutIframe';

// 1. Estado de controle
const [open, setOpen] = useState(false);
const [type, setType] = useState<CheckoutFlowType>('float');

// 2. Botão que abre
<button onClick={() => { setType('float'); setOpen(true); }}>
    Comprar créditos
</button>

// 3. Componente (coloque no final do JSX)
<CheckoutIframe
    type={type}
    isOpen={open}
    onClose={() => setOpen(false)}
    onSuccess={() => console.log('compra finalizada')}
/>
```

## Props

| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `type` | `CheckoutFlowType` | sim | Tipo de fluxo a abrir |
| `isOpen` | `boolean` | sim | Controla visibilidade do overlay |
| `onClose` | `() => void` | sim | Chamado ao fechar (X, backdrop, voltar no step 0) |
| `onSuccess` | `() => void` | não | Chamado após confirmação de compra |

## Tipos de fluxo (`CheckoutFlowType`)

| Valor | Fluxo | Steps |
|---|---|---|
| `float` | Compra de flutuação | variante → agendamento → auth → pagamento |
| `massage` | Compra de massoterapia | variante → agendamento → auth → pagamento |
| `combo` | Float + massagem | variante → agendamento → auth → pagamento |
| `gift` | Presente/vale-presente | variante → destinatário → auth → pagamento |
| `redeem` | Resgatar gift card | gift_card → agendamento → auth |

## Como funciona internamente

```
[página pai]
    └── CheckoutIframe (overlay)
            └── <iframe src="/checkout?type=float" />
                    └── CheckoutFlow.tsx (standalone)
                            ├── detecta window.parent !== window
                            └── ao finalizar → postMessage('void:checkout:success')

[página pai] ouve o postMessage → chama onSuccess() → fecha overlay
```

## Onde já está sendo usado

| Local | Tipo | Propósito |
|---|---|---|
| `ClientDashboard` | `float` | "comprar mais créditos" |
| `ClientDashboard` | `gift` | "Comprar Presente" |

## Como adicionar em novos lugares

### Exemplo: landing page pública

```tsx
// src/pages/public/LandingPage.tsx
import { CheckoutIframe } from '@/components/checkout/CheckoutIframe';

const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Agendar sessão</button>

<CheckoutIframe type="float" isOpen={open} onClose={() => setOpen(false)} />
```

### Exemplo: página de admin iniciando compra para cliente

```tsx
<CheckoutIframe type="massage" isOpen={open} onClose={() => setOpen(false)} />
```

### Exemplo: banner de gift card

```tsx
<CheckoutIframe type="gift" isOpen={open} onClose={() => setOpen(false)}
    onSuccess={() => toast('Presente enviado!')} />
```

## Regras

- O iframe carrega `/checkout` — rota pública standalone, sem AppLayout ou PublicLayout.
- Auth é compartilhada via localStorage (mesma origem). Se o usuário está logado,
  o step de identificação exibe "Você já está conectado" e avança automaticamente.
- `onSuccess` é disparado **após** a animação de confirmação (≈2.5s depois da compra).
- O overlay bloqueia o scroll do body enquanto aberto.
- Fechar via backdrop ou botão X dispara `onClose` sem disparar `onSuccess`.

## Última atualização

2026-03-17 — componente criado, integrado ao ClientDashboard
