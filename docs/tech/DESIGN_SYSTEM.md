# Design System — Void System v1.3

## Visão geral

O Design System centraliza todos os tokens visuais, componentes e utilitários em `src/design-system/`. É a **fonte única de verdade** para qualquer decisão visual no projeto.

## Alias `@ds`

Configurado em `vite.config.ts` e `tsconfig.app.json`:

```ts
import { Button, colors, cn } from '@ds'
```

Resolve para `src/design-system/index.ts`.

---

## Estrutura

```
src/design-system/
├── index.ts              # Master barrel — importe daqui
├── tokens/
│   ├── palette.js        # ⚡ Fonte das cores (usado por tailwind.config.js + app)
│   ├── colors.ts         # Tokens de cor tipados
│   ├── typography.ts     # Escala tipográfica
│   ├── spacing.ts        # Escala de espaçamento
│   ├── radius.ts         # Border radius
│   ├── animations.ts     # Duração, easing, transições
│   └── index.ts
├── components/
│   └── index.ts          # Re-exporta todos os componentes UI
├── utils/
│   └── index.ts          # cn() e utilitários
└── CONTEXT.md
```

---

## Tokens de cor

### Paleta raw (`palette.js`)
Fonte de verdade compartilhada com `tailwind.config.js`:

| Token | Valor |
|-------|-------|
| `lilac` | Escala 50–950 (brand principal) |
| `void_` | Escala 50–950 (brand secundário) |
| `site.alabaster` | `#e3e3d9` — fundo do site público |
| `site.gunmetal` | `#082b3b` — texto escuro |
| `site.tiffany` | `#b0d6cf` — destaque verde-água |
| `site.rust` | `#ab542b` — destaque laranja |
| `site.ocean` | `#008cff` — azul |
| `site.mauve` | `#ccb0f0` — lilás |
| `site.deepOcean` | `#07162b` — fundo escuro |
| `site.electricViolet` | `#896dad` — roxo |

### Variáveis semânticas (app/admin)
Definidas em `src/index.css` como CSS vars HSL. Referenciadas em TypeScript via `colors.semantic.*`:

```ts
import { colors } from '@ds'
// ex: colors.semantic.primary → 'hsl(var(--primary))'
```

---

## Tipografia

```ts
import { typography } from '@ds'

typography.fontFamily.sans    // 'Inter', system-ui, sans-serif
typography.fontSize.lg        // 20px — body-lg, hero-body
typography.fontWeight.semibold // 600
```

---

## Componentes

Todos os componentes UI (Radix/shadcn) e de site são re-exportados por `@ds`:

```ts
import { Button, Card, Input, Typography, Badge } from '@ds'
```

---

## Como atualizar cores

1. Edite `src/design-system/tokens/palette.js`
2. A mudança propaga automaticamente para `tailwind.config.js` e `colors.ts`
3. Em dev, use `POST /api/design-tokens` para editar CSS vars em tempo real

---

## Como adicionar um novo componente ao DS

1. Crie o componente em `src/components/ui/` ou `src/components/site/`
2. Exporte-o em `src/design-system/components/index.ts`
3. Adicione ao master barrel `src/design-system/index.ts`
4. Atualize este doc

---

## Regras

- **Nunca** importe de `@/components/ui/*` diretamente — use `@ds`
- **Nunca** hardcode valores de cor, tamanho ou espaçamento nos componentes — use os tokens
- Qualquer mudança visual que afete mais de um componente deve passar por um token
