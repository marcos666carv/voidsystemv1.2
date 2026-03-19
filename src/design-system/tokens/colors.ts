/**
 * @file colors.ts
 * @description Color tokens — typed wrappers over palette.js.
 * Importe daqui no código TypeScript. Nunca hardcode hex no app.
 *
 * Uso:
 *   import { colors } from '@ds/tokens'
 *   const bg = colors.site.alabaster
 *   const brand = colors.lilac[500]
 */

import { lilac as lilacRaw, void_ as voidRaw, site as siteRaw } from './palette';

// ─── Lilac scale ───────────────────────────────────────────────────────────────

export const lilac = lilacRaw as {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string; 950: string;
};

// ─── Void scale ────────────────────────────────────────────────────────────────

export const void_ = voidRaw as {
  50: string; 100: string; 200: string; 300: string; 400: string;
  500: string; 600: string; 700: string; 800: string; 900: string; 950: string;
};

// ─── Site palette ──────────────────────────────────────────────────────────────

export const site = siteRaw as {
  alabaster: string;
  gunmetal: string;
  tiffany: string;
  rust: string;
  ocean: string;
  mauve: string;
  silver: string;
  deepOcean: string;
  electricViolet: string;
};

// ─── Semantic CSS variable references (app/admin) ──────────────────────────────
// Use estas strings diretamente no Tailwind ou em style={{ color: semantic.primary }}

export const semantic = {
  background:          'hsl(var(--background))',
  foreground:          'hsl(var(--foreground))',
  card:                'hsl(var(--card))',
  cardForeground:      'hsl(var(--card-foreground))',
  popover:             'hsl(var(--popover))',
  popoverForeground:   'hsl(var(--popover-foreground))',
  primary:             'hsl(var(--primary))',
  primaryForeground:   'hsl(var(--primary-foreground))',
  secondary:           'hsl(var(--secondary))',
  secondaryForeground: 'hsl(var(--secondary-foreground))',
  muted:               'hsl(var(--muted))',
  mutedForeground:     'hsl(var(--muted-foreground))',
  accent:              'hsl(var(--accent))',
  accentForeground:    'hsl(var(--accent-foreground))',
  destructive:         'hsl(var(--destructive))',
  destructiveForeground: 'hsl(var(--destructive-foreground))',
  border:              'hsl(var(--border))',
  input:               'hsl(var(--input))',
  ring:                'hsl(var(--ring))',
} as const;

// ─── Aggregate export ──────────────────────────────────────────────────────────

export const colors = { lilac, void: void_, site, semantic } as const;
