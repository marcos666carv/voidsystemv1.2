/**
 * @file spacing.ts
 * @description Spacing tokens — escala base e valores estendidos.
 * Mirrors tailwind.config.js `theme.extend.spacing`.
 *
 * Uso:
 *   import { spacing } from '@ds/tokens'
 */

// ─── Custom extended spacing (rem) ─────────────────────────────────────────────
// Espelha tailwind.config.js. Qualquer adição deve ir nos dois arquivos.

export const spacingExtended = {
  '13':  '3.25rem',   '15':  '3.75rem',  '18':  '4.5rem',
  '22':  '5.5rem',    '26':  '6.5rem',   '30':  '7.5rem',
  '34':  '8.5rem',    '38':  '9.5rem',   '42':  '10.5rem',
  '46':  '11.5rem',   '50':  '12.5rem',  '54':  '13.5rem',
  '58':  '14.5rem',   '66':  '16.5rem',  '68':  '17rem',
  '70':  '17.5rem',   '74':  '18.5rem',  '76':  '19rem',
  '78':  '19.5rem',   '82':  '20.5rem',  '84':  '21rem',
  '86':  '21.5rem',   '88':  '22rem',    '90':  '22.5rem',
  '92':  '23rem',     '94':  '23.5rem',  '100': '25rem',
  '104': '26rem',     '108': '27rem',    '112': '28rem',
  '116': '29rem',     '120': '30rem',    '128': '32rem',
  '132': '33rem',     '136': '34rem',    '140': '35rem',
  '144': '36rem',     '160': '40rem',    '176': '44rem',
} as const;

// ─── Site container padding ────────────────────────────────────────────────────
// Deve estar em sincronia com .site-container em src/index.css

export const siteContainer = {
  paddingMobile: '2rem',    // px-8
  paddingDesktop: '7.5rem', // px-30 (≥ 1280px)
} as const;

// ─── Common component spacing ──────────────────────────────────────────────────

export const componentSpacing = {
  cardPadding:   '1.5rem',  // p-6
  buttonPaddingX: '1rem',   // px-4
  buttonPaddingY: '0.5rem', // py-2
  inputHeight:   '2.5rem',  // h-10
  navHeight:     '4rem',    // h-16
} as const;

// ─── Aggregate export ──────────────────────────────────────────────────────────

export const spacing = { extended: spacingExtended, siteContainer, component: componentSpacing } as const;
