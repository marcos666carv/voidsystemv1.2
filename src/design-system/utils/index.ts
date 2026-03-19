/**
 * @file utils/index.ts
 * @description Design system utilities.
 *
 * Uso:
 *   import { cn } from '@ds/utils'
 *   // ou via master barrel:
 *   import { cn } from '@ds'
 */

// cn() — combina classes Tailwind com resolução de conflitos (clsx + twMerge)
export { cn } from '@/lib/utils';
