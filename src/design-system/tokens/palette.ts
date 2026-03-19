/**
 * @file palette.ts
 * @description Raw color palette — fonte primária de verdade para cores no TypeScript.
 *
 * ⚠️  Qualquer mudança de cor deve ser aplicada AQUI e em tailwind.config.js (sincronizado manualmente).
 *     tailwind.config.js não pode importar .ts diretamente (processado pelo Node.js sem transpile).
 */

// ─── Brand scales ──────────────────────────────────────────────────────────────

export const lilac = {
  50:  '#F5F0FA',
  100: '#EDE4F7',
  200: '#DCC8F0',
  300: '#CCB0F0',
  400: '#B898E0',
  500: '#A880D0',
  600: '#9060C0',
  700: '#7548A0',
  800: '#5A3580',
  900: '#3F2460',
  950: '#241440',
};

export const void_ = {
  50:  '#E8F0F4',
  100: '#C8DBE3',
  200: '#9BBCC9',
  300: '#6E9DAF',
  400: '#4A7E95',
  500: '#2E5F7A',
  600: '#1A4560',
  700: '#103549',
  800: '#08283B',
  900: '#051C2A',
  950: '#030F18',
};

// ─── Site palette (public pages) ───────────────────────────────────────────────

export const site = {
  alabaster:      '#e3e3d9',
  gunmetal:       '#082b3b',
  tiffany:        '#b0d6cf',
  rust:           '#ab542b',
  ocean:          '#008cff',
  mauve:          '#ccb0f0',
  silver:         '#86868b',
  deepOcean:      '#07162b',
  electricViolet: '#896dad',
};
