import { MEDIA } from './media-map.js'

/* Content for /manufacturing. `publicId: null` deliberately falls through to
   the blueprint placeholder — the frame is already sized, so dropping the real
   asset in later is a one-line change here and nothing else moves. */

/* The hero conveyor's five cards, in belt order. Shape, scale and motion are
   position-driven inside FactoryPanels, so a panel here is content only. */
export const HERO_PANELS = [
  {
    key: 'exterior',
    label: 'Factory Exterior',
    caption: 'Bhiwadi, Rajasthan',
    publicId: 'tobler/site/image-9',
  },
  {
    key: 'robotics',
    label: 'Advanced Manufacturing',
    caption: 'Robotic cells & CNC',
    publicId: MEDIA.cncCentre,
  },
  {
    key: 'welding',
    label: 'Welding & Fabrication',
    caption: 'Certified weld procedures',
    publicId: MEDIA.weldingArc,
  },
  {
    key: 'inspection',
    label: 'Quality Inspection',
    caption: 'Dimensional & load testing',
    publicId: MEDIA.loadTestRig,
  },
  {
    key: 'finished',
    label: 'Finished Systems',
    caption: 'Scaffolding & formwork',
    publicId: MEDIA.panelStacks,
  },
]

export const FACILITY_STATS = [
  { figure: '1,00,000', unit: 'sq ft', label: 'Production floor' },
  { figure: '2011', unit: '', label: 'Manufacturing in India since' },
  { figure: '100%', unit: '', label: 'Swiss-specified tooling' },
  { figure: '24', unit: 'hrs', label: 'Typical dispatch readiness' },
]

export const CAPABILITIES = [
  {
    id: 'robotic-welding',
    title: 'Robotic Welding Cells',
    description:
      'Programmed weld paths repeat the same geometry on every component, so a ledger made this month matches one made three years ago.',
    media: {
      images: [MEDIA.weldingArc, MEDIA.weldingSuit, MEDIA.weldingArcWide],
      video: MEDIA.weldingRobotVideo,
      imageDuration: 1400,
      videoDuration: 5000,
    },
  },
  {
    id: 'cnc-cutting',
    title: 'CNC Cutting & Drilling',
    description:
      'Tube, plate and section are cut and drilled to Swiss drawings, holding hole positions within the tolerance the system was designed around.',
    media: {
      images: [MEDIA.cncCentre, MEDIA.cncOperator, MEDIA.plantLineWide],
      video: MEDIA.drillingCenterVideo,
      imageDuration: 1400,
      videoDuration: 5000,
    },
  },
  {
    id: 'press-forming',
    title: 'Press & Forming Lines',
    description:
      'Rosettes, wedges and couplers are pressed from certified steel, then dimensionally checked before they ever reach an assembly station.',
    media: {
      images: [MEDIA.pressBrake, MEDIA.pressBrakeOperator, MEDIA.shearingLine],
      video: MEDIA.productionVideo,
      imageDuration: 1400,
      videoDuration: 5000,
    },
  },
  {
    id: 'galvanising',
    title: 'Hot-Dip Galvanising',
    description:
      'Every load-bearing part is galvanised for site life in Indian conditions — coastal humidity, monsoon exposure and repeated reuse.',
    media: {
      images: [MEDIA.panelStacks, MEDIA.panelYard, MEDIA.warehouse],
      video: MEDIA.packagingVideo,
      imageDuration: 1400,
      videoDuration: 5000,
    },
  },
]

export const QUALITY_CHECKS = [
  {
    stage: 'Incoming material',
    detail: 'Mill certificates verified against the grade and section the drawing calls for. Non-conforming steel never enters the floor.',
  },
  {
    stage: 'In-process',
    detail: 'Weld inspection, fixture checks and dimensional sampling at each station, logged against the batch.',
  },
  {
    stage: 'Load testing',
    detail: 'Sample components are proof-loaded to confirm capacity against EN 12810 / EN 12811 design values.',
  },
  {
    stage: 'Final & dispatch',
    detail: 'Coating thickness, marking and batch traceability confirmed before the consignment is released.',
  },
]

export const PROCESS_STEPS = [
  {
    step: 'Engineering release',
    description: 'Swiss drawings and specifications are released to the floor with the tolerances that make the system interchangeable worldwide.',
  },
  {
    step: 'Material intake',
    description: 'Certified steel is received, tested and traced to the batch it will end up in.',
  },
  {
    step: 'Cutting & forming',
    description: 'CNC cutting, drilling and pressing bring raw section to component geometry.',
  },
  {
    step: 'Robotic welding',
    description: 'Fixtured, programmed welding builds the assemblies that carry load on site.',
  },
  {
    step: 'Galvanising',
    description: 'Hot-dip coating protects every surface, inside and out, for a long service life.',
  },
  {
    step: 'Inspection & testing',
    description: 'Dimensional, coating and load checks close the loop before anything is packed.',
  },
  {
    step: 'Packing & dispatch',
    description: 'Systems are marked, bundled and dispatched to site ready for immediate assembly.',
  },
]

export const GALLERY = [
  { publicId: MEDIA.plantLineWide, label: 'Production floor' },
  { publicId: MEDIA.weldingArc, label: 'Welding station' },
  { publicId: MEDIA.cncCentre, label: 'Machining' },
  { publicId: MEDIA.componentDetail, label: 'Component detail' },
  { publicId: MEDIA.assemblyBay, label: 'Assembly bay' },
  { publicId: MEDIA.panelCrew, label: 'Production team' },
]

/* Longer than GALLERY on purpose — the carousel keeps moving, so a repeat
   inside one pass is visible in a way it isn't in a fixed six-up grid. */
export const GALLERY_CAROUSEL = [
  { publicId: MEDIA.plantLineWide, label: 'Production floor' },
  { publicId: MEDIA.weldingArc, label: 'Welding station' },
  { publicId: MEDIA.cncCentre, label: 'Machining station' },
  { publicId: MEDIA.componentDetail, label: 'Component detail' },
  { publicId: MEDIA.assemblyBay, label: 'Assembly bay' },
  { publicId: MEDIA.panelCrew, label: 'Production team' },
  { publicId: MEDIA.pressBrake, label: 'Press brake' },
  { publicId: MEDIA.shearingLine, label: 'Shearing line' },
  { publicId: MEDIA.grinding, label: 'Finishing & deburring' },
  { publicId: MEDIA.loadTestRig, label: 'Load testing' },
  { publicId: MEDIA.panelStacks, label: 'Finished panels' },
  { publicId: MEDIA.warehouse, label: 'Stores & dispatch' },
]

export const VIDEOS_CAROUSEL = [
  {
    publicId: MEDIA.weldingRobotVideo,
    label: 'Robotic welding cells — Swiss precision',
  },
  {
    publicId: MEDIA.drillingCenterVideo,
    label: 'CNC drilling center — automated accuracy',
  },
  {
    publicId: MEDIA.packagingVideo,
    label: 'Packaging & dispatch — quality assurance',
  },
  {
    publicId: MEDIA.componentSequenceVideo,
    label: 'Component sequences — individual parts',
  },
  {
    publicId: MEDIA.productionVideo,
    label: 'Series production — integral console',
  },
  {
    publicId: MEDIA.laserCuttingVideo,
    label: 'Laser cutting — profile accuracy',
  },
  {
    publicId: MEDIA.roboticWeldingVideo,
    label: 'Robotic welding — repeatable joints',
  },
]
