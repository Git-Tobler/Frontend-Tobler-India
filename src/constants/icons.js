import { Building2, Briefcase, Home, Route, Warehouse, Layers, LayoutGrid, PanelsTopLeft, TrendingUp, MoveUp } from 'lucide-react'

/* Keyed by industry `name` (not slug) so the same map serves IndustryCard,
   IndustryDetail and ProjectCard/ProjectDetail — projects only store the
   industry's display name, not its slug. */
export const INDUSTRY_ICONS = {
  'High-Rise Buildings': Building2,
  'Commercial Construction': Briefcase,
  'Residential Construction': Home,
  Infrastructure: Route,
  'Industrial Facilities': Warehouse,
}

export const PRODUCT_ICONS = {
  'facade-scaffolding': Building2,
  'shoring-systems': Layers,
  'slab-formwork': LayoutGrid,
  'wall-formwork': PanelsTopLeft,
  'climbing-systems': TrendingUp,
  'staircase-access': MoveUp,
}

export const DEFAULT_ICON = Layers
