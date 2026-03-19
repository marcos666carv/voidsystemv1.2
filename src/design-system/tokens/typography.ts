/**
 * @file typography.ts
 * @description Typography tokens — font families, type scale, weights, line heights.
 *
 * Uso:
 *   import { typography } from '@ds/tokens'
 *   const size = typography.fontSize.xl
 */

// ─── Font families ─────────────────────────────────────────────────────────────

export const fontFamily = {
  sans:  "'Inter', system-ui, sans-serif",
  mono:  "'JetBrains Mono', 'Fira Code', monospace",
} as const;

// ─── Type scale (px) ───────────────────────────────────────────────────────────

export const fontSize = {
  xs:   '12px',   // caption, badge, meta
  sm:   '14px',   // nav-item, body-default, label
  base: '16px',   // body (faq-answer)
  lg:   '20px',   // body-lg, hero-body
  xl:   '24px',   // cta-body, highlights-desc, xl heading, faq-question
  '2xl': '32px',  // heading-2, card-title (responsive), page title
  '3xl': '48px',  // heading-1, display, highlight-card
} as const;

// ─── Font weights ──────────────────────────────────────────────────────────────

export const fontWeight = {
  light:    300,
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
  black:    900,
} as const;

// ─── Line heights ──────────────────────────────────────────────────────────────

export const lineHeight = {
  tight:   '1.1',
  snug:    '1.25',
  normal:  '1.5',
  relaxed: '1.625',
  loose:   '2',
} as const;

// ─── Letter spacing ────────────────────────────────────────────────────────────

export const letterSpacing = {
  tighter: '-0.05em',
  tight:   '-0.025em',
  normal:  '0em',
  wide:    '0.025em',
  wider:   '0.05em',
  widest:  '0.1em',
} as const;

// ─── Aggregate export ──────────────────────────────────────────────────────────

export const typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} as const;
