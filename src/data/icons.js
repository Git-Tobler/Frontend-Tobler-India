import {
  Building2,
  Briefcase,
  Home,
  Route,
  Warehouse,
  Layers,
  LayoutGrid,
  PanelsTopLeft,
  TrendingUp,
  MoveUp,
  Grid3x3,
  ShieldCheck,
  Boxes,
  Wrench,
} from 'lucide-react'

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

/* Keyed by product-family and product-subcategory slug (src/data/products) —
   one flat map since the two slug sets never collide. */
export const PRODUCT_ICONS = {
  // Families
  'scaffolding-systems': Building2,
  'formwork-systems': Layers,

  // Scaffolding subcategories
  'all-in-one-scaffolding': Grid3x3,
  'cuplock-scaffolding': Building2,
  'mobile-scaffolding': MoveUp,
  'scaffolding-accessories': Wrench,
  'low-heavy-duty-props': TrendingUp,

  // Formwork subcategories
  'monolithic-formwork': LayoutGrid,
  'wall-formwork': PanelsTopLeft,
  'slab-formwork': Boxes,
  'climbing-systems': ShieldCheck,
}

export const DEFAULT_ICON = Layers
