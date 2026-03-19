# design-system

## Propósito
Repositório central do Design System do Void System. Toda cor, tipografia, espaçamento, componente e utilitário deve ser importado a partir daqui — nunca diretamente de `@/components/ui/*` ou valores hardcoded.

## Possui
- `tokens/palette.js` — paleta de cores raw (compartilhada com `tailwind.config.js`)
- `tokens/colors.ts` — tokens de cor tipados (inclui escalas + paleta site + variáveis semânticas)
- `tokens/typography.ts` — famílias de fonte, escala de tamanhos, pesos, line-height
- `tokens/spacing.ts` — escala de espaçamento estendida (espelha `tailwind.config.js`)
- `tokens/radius.ts` — border radius
- `tokens/animations.ts` — duração, easing e transições nomeadas
- `tokens/index.ts` — barrel de tokens
- `components/index.ts` — re-exporta todos os componentes UI e de site
- `utils/index.ts` — re-exporta `cn()` e utilitários
- `index.ts` — master barrel (ponto único de entrada)

## Aliases disponíveis
| Alias | Resolve para |
|-------|-------------|
| `@ds` | `src/design-system/index.ts` |
| `@ds/tokens` | `src/design-system/tokens/index.ts` |
| `@ds/components` | `src/design-system/components/index.ts` |
| `@ds/utils` | `src/design-system/utils/index.ts` |

## Uso
```ts
// Recomendado — importar tudo de @ds
import { Button, colors, cn, typography } from '@ds'

// Aceitável — imports por módulo para clareza
import { colors, spacing } from '@ds/tokens'
import { Button, Card }    from '@ds/components'
import { cn }              from '@ds/utils'
```

## Depende de
- `@/components/ui/*` — primitivos Radix/shadcn (re-exportados, não consumir diretamente)
- `@/components/site/*` — componentes de site (re-exportados)
- `@/lib/utils` — função `cn()` (re-exportada)

## Não possui
- Lógica de negócio (regras de preço, memberships, etc.)
- Estado global (AuthContext, CartContext)
- Chamadas à API
- Rotas ou páginas

## Regra de ouro
> Qualquer valor visual (cor, tamanho, espaçamento) que apareça em mais de um lugar deve morar aqui.

## Última atualização
2026-03-19 — Criação do repositório central do Design System (tokens, componentes, utils, aliases @ds)
