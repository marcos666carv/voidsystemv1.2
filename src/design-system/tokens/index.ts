/**
 * @file tokens/index.ts
 * @description Barrel de tokens — re-exporta tudo de um único ponto.
 *
 * Uso:
 *   import { colors, typography, spacing, radius, animations } from '@ds/tokens'
 *   // ou via master barrel:
 *   import { colors } from '@ds'
 */

export { colors, lilac, void_, site, semantic } from './colors';
export { typography, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } from './typography';
export { spacing, spacingExtended, siteContainer, componentSpacing } from './spacing';
export { radius } from './radius';
export { animations, duration, easing, transition } from './animations';
