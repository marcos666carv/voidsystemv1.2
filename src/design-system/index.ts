/**
 * @file design-system/index.ts
 * @description Master barrel — ponto único de importação do Design System.
 *
 * ════════════════════════════════════════════════════════════
 *  VOID SYSTEM — Design System v1.0
 *  Alias: @ds  →  src/design-system/
 * ════════════════════════════════════════════════════════════
 *
 * Uso:
 *   import { Button, colors, cn, typography } from '@ds'
 *
 * Ou por módulo (mais legível em arquivos grandes):
 *   import { Button, Input }    from '@ds'   // componentes
 *   import { colors, spacing }  from '@ds'   // tokens
 *   import { cn }               from '@ds'   // utils
 */

// ─── Tokens ────────────────────────────────────────────────────────────────────
export {
  colors, lilac, void_, site, semantic,
  typography, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing,
  spacing, spacingExtended, siteContainer, componentSpacing,
  radius,
  animations, duration, easing, transition,
} from './tokens';

// ─── Components ───────────────────────────────────────────────────────────────
export {
  // Primitivos
  Avatar, AvatarImage, AvatarFallback,
  Badge, badgeVariants,
  Button, buttonVariants,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogClose,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
  Input,
  Label,
  Popover, PopoverTrigger, PopoverContent,
  ScrollArea, ScrollBar,
  Separator,
  Sheet, SheetTrigger, SheetPortal, SheetOverlay, SheetClose,
  SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription,
  Slider,
  Switch,
  Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Textarea,
  Calendar,
  ErrorBoundary,
  // Site
  Typography,
  SitePricingCard,
  ReasonsCarousel,
  SiteAccordion,
} from './components';

// ─── Utils ────────────────────────────────────────────────────────────────────
export { cn } from './utils';
