/**
 * @file animations.ts
 * @description Animation and transition tokens.
 */

export const duration = {
  instant:  '100ms',
  fast:     '150ms',
  normal:   '200ms',
  slow:     '300ms',
  slower:   '500ms',
} as const;

export const easing = {
  linear:      'linear',
  easeIn:      'cubic-bezier(0.4, 0, 1, 1)',
  easeOut:     'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut:   'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Named transitions para uso inline
export const transition = {
  base:    `all ${duration.fast} ${easing.easeInOut}`,
  colors:  `color ${duration.fast} ${easing.easeInOut}, background-color ${duration.fast} ${easing.easeInOut}, border-color ${duration.fast} ${easing.easeInOut}`,
  opacity: `opacity ${duration.normal} ${easing.easeInOut}`,
  shadow:  `box-shadow ${duration.normal} ${easing.easeOut}`,
  transform: `transform ${duration.normal} ${easing.easeOut}`,
} as const;

export const animations = { duration, easing, transition } as const;
