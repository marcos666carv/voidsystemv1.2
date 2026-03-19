/**
 * @file radius.ts
 * @description Border radius tokens.
 * Mirrors tailwind.config.js `theme.extend.borderRadius`.
 * Base: --radius: 0.5rem (definido em src/index.css)
 */

export const radius = {
  sm:   'calc(var(--radius) - 4px)',  // ~2px
  md:   'calc(var(--radius) - 2px)',  // ~4px
  lg:   'var(--radius)',              // 8px
  xl:   '12px',
  '2xl': '16px',
  full: '9999px',
  none: '0px',
} as const;
