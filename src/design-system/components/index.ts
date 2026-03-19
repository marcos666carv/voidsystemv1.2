/**
 * @file components/index.ts
 * @description Re-exporta todos os componentes UI do sistema.
 * Importe componentes a partir daqui — nunca diretamente de @/components/ui/*.
 *
 * Uso:
 *   import { Button, Input, Card } from '@ds/components'
 *   // ou via master barrel:
 *   import { Button } from '@ds'
 */

// ─── Primitivos ────────────────────────────────────────────────────────────────

export { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
export { Badge, badgeVariants } from '@/components/ui/badge';
export { Button, buttonVariants } from '@/components/ui/button';
export {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter,
} from '@/components/ui/card';
export {
  Dialog, DialogTrigger, DialogPortal, DialogOverlay, DialogClose,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
export { Input } from '@/components/ui/input';
export { Label } from '@/components/ui/label';
export { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
export { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
export { Separator } from '@/components/ui/separator';
export {
  Sheet, SheetTrigger, SheetPortal, SheetOverlay, SheetClose,
  SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
export { Slider } from '@/components/ui/slider';
export { Switch } from '@/components/ui/switch';
export {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption,
} from '@/components/ui/table';
export { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
export { Textarea } from '@/components/ui/textarea';
export { Calendar } from '@/components/ui/calendar';
export { ErrorBoundary } from '@/components/ui/error-boundary';

// ─── Componentes de site (público) ────────────────────────────────────────────

export { Typography } from '@/components/site/Typography';
export { SitePricingCard } from '@/components/site/PricingCard';
export { ReasonsCarousel } from '@/components/site/ReasonsCarousel';
export { SiteAccordion } from '@/components/site/SiteAccordion';
