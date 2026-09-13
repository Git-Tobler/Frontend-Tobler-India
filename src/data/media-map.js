// The one place that maps a site slot to a Cloudinary public ID.
//
// Slots left null fall back to the MediaTile blueprint placeholder, so this file
// can be filled in one asset at a time without touching a component. Run
// `npm run media` to refresh the available IDs in src/data/media.js.
//
// Note on the two source sets: tobler/site/image-* are construction-site stills,
// tobler/site/screenshot-* are frames pulled from factory video (letterboxed —
// src/lib/cloudinary.js trims them automatically).

export const MEDIA = {
  // Wide site panorama with open sky at the top, which is what gives the hero
  // headline somewhere to sit without fighting the building for attention.
  hero: 'tobler/site/image-13',

  // Manufacturing floor, wide enough to read as a room rather than a detail.
  manufacturing: 'tobler/site/screenshot-2025-09-13-at-4-02-51-pm',
  manufacturingWide: 'tobler/site/screenshot-2025-09-13-at-4-04-28-pm',

  // Macro of a stamped component carrying the embossed Tobler mark — the
  // closest thing in the library to a proof-of-quality shot.
  componentDetail: 'tobler/site/screenshot-2025-09-16-at-11-40-37-pm',
  welding: 'tobler/site/screenshot-2025-09-10-at-3-11-04-pm',
  brandedMachine: 'tobler/site/screenshot-2025-09-13-at-4-20-24-pm',

  // Team on site, hard hats on — used where people belong rather than product.
  team: 'tobler/site/site-visit-picture',

  // Production film. Natively 480x848 vertical, so it is only ever shown in a
  // portrait frame — never stretched across a full-width band.
  productionVideo: 'tobler/projects/7-berflug-fertigungsstationen-integralkonsole-20230617-serienfertigung-mato-pro-integralkonsole-swiss-quality',

  // Homepage hero footage. The 2026 website banner cut — 4072x2036 landscape,
  // 32s, flying over live high-rise sites. Same native size as the DJI_0008
  // drone clip it replaces, so the hero still delivers it at 1920 with
  // q_auto:best rather than the 720-wide default the portrait clips get; that
  // lands at ~18MB webm, slightly under the 26MB the previous cut shipped.
  //
  // Where it differs from DJI_0008 is exposure. Long stretches of this clip are
  // bare, near-white concrete deck filling the entire frame, so the headline
  // cannot sit on the footage alone the way it could on the old cut's darkened
  // lower edge — HeroSection carries its own navy scrim instead.
  //
  // Frame 0 is clean here (no white fade), so the shared 1s clip start in
  // lib/cloudinary.js costs a beat of the opening wide rather than saving it.
  heroVideo: 'website_banner_video_2_1_1_qpiulb',

  // Process-matched clips for the Manufacturing "Facility" capability carousel —
  // picked by filename content (schweissroboter = welding robot, bohrzentrum =
  // drilling center) rather than assigned arbitrarily.
  weldingRobotVideo: 'tobler/projects/2-20230218-serienfertigung-mato-3-stiel-t-rkei-schweissroboter-assymetrisch',
  drillingCenterVideo: 'tobler/projects/6-bohrzentrum-20230525-serienfertigung-mato-pro-einschubrohr',
  packagingVideo: 'WhatsApp_Video_2026-09-10_at_5.54.00_PM_lqjeru',

  // Portrait replacement for the homepage video showcase now that the welding
  // clip leads the hero. "diverse einzelteilesequenzen" = various individual-part
  // sequences (hooks, toe boards, sawing).
  componentSequenceVideo: 'tobler/projects/4-diverse-einzelteilesequenzen-20230531-serienfertigung-mato-1-haken-und-bordbrett-mato-2-saegen',

  // Process clips for the homepage "Manufacturing in Motion" row. IDs are the
  // Cloudinary public IDs verbatim, spaces and casing included — note the
  // lower-case w in "Laser welding". Cutting and robotic welding are 480x848
  // portrait like the rest of the library; laser welding is the exception at
  // 1920x1080 landscape, which is why it carries its own aspect below.
  laserCuttingVideo: 'Laser Cutting5555',
  laserWeldingVideo: 'Laser welding',
  roboticWeldingVideo: 'robotic_welding_g0ujsn',

  // ---------------------------------------------------------------------
  // "Tobler Journey" timeline circles — About page, #timeline.
  //
  // One key per milestone, keyed by the `year` string in TIMELINE
  // (src/data/team.js). This is the swap point: change an ID here and that
  // circle changes, with no component edit. Keys must stay in step with the
  // years in TIMELINE — a year with no key here renders the MediaTile
  // placeholder rather than breaking.
  //
  // `null` means "no suitable asset in the library yet". The reference design
  // uses stock imagery for these (a Swiss flag, a Bulgarian cathedral, a map
  // of Europe, a handshake, an Indian flag) and none of it exists in the
  // Tobler Cloudinary — upload the real asset and drop its public ID in.
  //
  // The non-null defaults below are genuine Tobler photography chosen as the
  // nearest match, not final art direction. Swap freely.
  // ---------------------------------------------------------------------
  journey: {
    '1995': 'Martin Tobler_quccxh',           // stand-in for the Swiss flag
    '2004': 'ChatGPT_Image_Sep_10_2026_05_37_34_PM_vhcwv8',                    // aluminium scaffolding
    '2006': null,                                     // Bulgaria — no asset yet
    '2011': 'Thumbnail_-_1_d0gzy0', // embossed Tobler mark
    '2012-2021': null,                                // Europe map — no asset yet
    '2023': 'tobler/site/site-visit-picture',         // stand-in for the handshake
    '2024': 'tobler/site/screenshot-2025-09-13-at-4-20-24-pm',  // branded machine
    '2025': 'factory_1_v4ki98',                       // plant exterior
    '2026': 'tobler/site/screenshot-2025-09-13-at-4-02-51-pm',  // production floor
  },

  // Exhibition and event photography — used in galleries and team showcases
  eventPhoto1: 'tobler/event/dsc-6806',
  eventPhoto2: 'tobler/event/dsc-6470',
  eventPhoto3: 'tobler/event/dsc-6468',
  eventPhoto4: 'tobler/event/dsc-6463',

  // All 89 exhibition photos — sample key ones for easy reference
  exhibitionPhoto1: 'DSC_6250_bgzv1h',
  exhibitionPhoto2: 'DSC_6231_atpull',
  exhibitionPhoto3: 'DSC_6149_xnftsr',
  exhibitionPhoto4: 'DSC_6078_rqgsbl',
  exhibitionPhoto5: 'DSC_6228_fjpevf',

  // Client logos — 16 total; the full list lives in data/clients.js
  clientLogo1: 'Vihang_q8gvsi',
  clientLogo2: 'Venus_sky_city_1_licz43',
  clientLogo3: 'Shreeji_fuakns',
  clientLogo4: 'Shirke_group_logo_l0qo1r',
  clientLogo5: 'Sattva_sqtbux',
  clientLogo6: 'JP_Infra_cm7ssd',
  clientLogo7: 'Dynamix_ffcs9d',
  clientLogo8: 'Arwade_ttmi4t',

  // Certification logos — 15 total
  certificationLogo1: 'Screenshot_2026-08-05_123443_nrgwgl',
  certificationLogo2: 'Screenshot_2026-08-05_123431_dhdc1s',
  certificationLogo3: 'Screenshot_2026-08-05_123409_enrlmw',

  // Gallery images — 23 total
  galleryImg1: '_35_5_1_iacjgq',
  galleryImg2: 'IMG_0376_gklxqf',
  galleryImg3: 'IMG_0235_gqe2ia',

  // Hero section corner image. Full path, not the bare `swiss-engineer-1` this
  // used to carry — that id 404s, so the homepage hero shipped a broken <img>.
  swissEngineer: 'Untitled_design_9_panavf',

  /* ------------------------------------------------------------------------
     DRONE / AERIAL — live towers wrapped in Tobler-blue safety screens.

     The only assets in the library that show a finished system at building
     scale rather than a component or a factory bay, which is why they carry
     the page heroes where the subject is the project rather than the plant.
     ------------------------------------------------------------------------ */
  towerAerial: 'safety_net_6_mfqpr2',       // Daylight, tower + crane, Tobler screens
  towerAerialTop: 'safety_net_2_totvmy',    // Looking down the tower onto the slab
  towerAerialNight: 'safety_net_8_k6tvjo', 

  /* 4K landscape footage (3840x2160) over live Indian sites. Every other clip
     in the library is 480x848 portrait, so these are the only videos that can
     back a full-width band without being cropped to a strip. */
  siteDroneVideo: 'DJI_0012_bztyrk',        // Fly-in over the whole site, tower crane
  siteDroneVideoDeck: 'DJI_0008_wkw2sn',    // Low over the deck — crew, rebar, formwork
  siteDroneVideoWide: 'DJI_0003_pspx2t',    // Across the wall formwork and mesh

  /* CAD animation of the protection screen's bracket and spacer head, Tobler
     branded and callout-labelled. The only product animation in the library —
     it belongs to the climbing/protection screen system and nowhere else. */
  protectionScreenVideo: 'Safety_screen1',
  protectionScreenVideoAlt: 'Safety_screen2',

  /* ------------------------------------------------------------------------
     BHIWADI PLANT — the 2026 shoot (tobler-resources/Gallery).

     Named by what is in the frame, because the source filenames (IMG_3798…)
     say nothing. These carry the pages that used to repeat the same six
     screenshot stills over and over.
     ------------------------------------------------------------------------ */
  plantLineWide: 'IMG_3798_lqffls',         // Full length of the machining line
  plantAisle: 'IMG_3806_au0ihj',            // Down the aisle between stations
  cncCentre: 'IMG_3777_cv3l3v',             // Long CNC machining centre
  cncOperator: 'IMG_3936_ylwphz',           // Operator at the control panel
  pressBrake: 'IMG_3787_cr4rs5',            // CNC press brake
  pressBrakeOperator: 'IMG_3785_zw5pt2',    // Operator setting the brake
  shearingLine: 'IMG_3805_eokfjg',          // Guillotine shear
  assemblyBay: 'IMG_3820_utkfv7',           // Panels moving through assembly
  panelBench: 'IMG_3824_mye0qx',            // Rows of assembly benches
  panelTeam: 'IMG_3907_tyjvsb',             // Crew working a panel on the bench
  panelCrew: 'IMG_3906_pewdjm',             // Wider crew shot, same bay
  grinding: 'IMG_3921_hcvyw7',              // Deburring a panel edge
  drillingPanel: 'IMG_3935_aodvzs',         // Hand-drilling a panel (portrait)
  weldingArc: 'IMG_3964_u1puhc',            // MIG arc, close
  weldingArcWide: 'IMG_3943_ziiu58',        // Welding bay, wider
  weldingSparks: 'IMG_3951_er1nbc',         // Sparks, portrait
  weldingSuit: 'IMG_3955_weov7k',           // Full protective suit at the bench
  weldingBench: 'welding_2_iaf7bw',         // Welder under the Tobler banner
  weldingTable: 'welding_m3k59d',           // Fixture table, close
  extrusionStack: 'IMG_0376_gklxqf',        // Raw aluminium profile stack
  panelStacks: 'IMG_4030_aojrap',           // Finished panels, banded and stacked
  panelHandover: 'IMG_4026_akapiw',         // Two operators lifting a finished panel
  panelYard: 'IMG_4024_jtqk8l',             // Stacked panels ready to load
  profileCarry: 'IMG_4027_fazgwx',          // Carrying profiles to the next station
  loadTestRig: 'IMG_0158_gucmvp',           // Universal test machine — proof loading
  warehouse: 'factory_1_v4ki98',            // Racked stores
  hardHat: 'helmet_wuytll',                 // Branded helmet on a desk
  siteTeam: 'tobler/site/site-visit-picture', // Crew on site, hard hats on

  /* Extreme macro of a milled aluminium face. Reads as texture rather than
     subject, which is what the policy pages want behind their headings. */
  aluminiumMacro: 'tobler/site/screenshot-2025-09-17-at-1-44-46-pm',
  aluminiumMacroAlt: 'tobler/site/screenshot-2025-09-17-at-1-43-48-pm',

  /* Suryacon Opus Site Tower — 7 project photography assets and 3 videos */
  suryaconOpusTower: 'Suryacon Opus...site tower',
  suryaconOpusTower1: 'Suryacon Opus...site tower1',
  suryaconOpusTower2: 'Suryacon Opus...site tower2',
  suryaconOpusTower3: 'Suryacon Opus...site tower3',
  suryaconOpusTowerVideo1: 'Suryacon Opus...site tower4',
  suryaconOpusTowerVideo2: 'video_20260818_101908_flpmbf',
  suryaconOpusTowerVideo3: 'Suryacon Opus...site tower5',

  /* Mehta Legend Project, Thane — 2 project photography assets */
  mehtalLegendThane: 'mehta-legend-thane',
  mehtalLegendThane1: 'mehta-legend-thane1',

  /* Palika Infratech LLP — 2 project photography assets */
  palikaInfratech: 'palika-infratech',
  palikaInfratech1: 'palika-infratech1',

  /* Ritu Samruddhi, Thane — 7 project photography assets */
  rituSamrudhiThane: 'ritu-samruddhi-thane',
  rituSamrudhiThane1: 'ritu-samruddhi-thane1',
  rituSamrudhiThane2: 'ritu-samruddhi-thane2',
  rituSamrudhiThane3: 'ritu-samruddhi-thane3',
  rituSamrudhiThane4: 'ritu-samruddhi-thane4',
  rituSamrudhiThane5: 'ritu-samruddhi-thane5',
  rituSamrudhiThane6: 'ritu-samruddhi-thane6',

  /* Product category home screen thumbnails — Cloudinary home screen images */
  ringlock: 'Ringlock_Modular_Scaffolding_home_screen_wfobcd',
  cuplock: 'Cuplock_System_home_screen_xbs2sg',
  rollingTowers: 'Rolling_Scaffolding_Towers_mlzbfe',
  heavyDutyProps: 'Heavy_Duty_Props_wriwud',
  lightDutyProps: 'Light_Duty_Props_cyw7jb',
  scaffoldingAccessories: 'Scaffolding_Accesories_pbsy8w',
  protectionScreens: 'Protection_Screen_System_qxcwxe',
  deckSlabFormwork: 'Deck_Slab_Formwork_urn07u',
  manuWallFormwork: 'Manu_Wall_Formwork_hiuui3',
  monolithicAluminiumFormwork: 'Monolithic_Aluminium_Formwork_qdmzjc',

  /* Industry sector thumbnails — Cloudinary industry sector images */
  infrastructureIndustry: 'Infrastructure_pobcyw',
  residentialIndustry: 'Residential_Construction_vkv7rv',
  commercialIndustry: 'Commercial_Construction_ascofh',
  highRiseIndustry: 'High_Rise_building_ftr8r9',

  /* ------------------------------------------------------------------------
     EVENT SOLUTIONS — stage decks, grandstands, truss, FOH/PA towers.

     Every slot below is empty and waiting for a Cloudinary public id. Paste one
     in and it appears on the Event Solutions product page immediately; a slot
     left null falls back to the blueprint placeholder, so they can be filled in
     one asset at a time. The four `showcase` frames are positional — each pairs
     with the matching `details` block in data/products/index.js, so keep them
     in this order.
     ------------------------------------------------------------------------ */
  eventSolutions: null,        // Thumbnail — card tile on the family grid + gallery lead
  eventSolutionsVideo: null,   // Clip; leads the product gallery when set
  eventSolutionsBand: null,    // Wide full-bleed "in use" band under the showcase

  eventStageDeck: null,        // Showcase 1 — Event Stage Decks
  modularGrandstands: null,    // Showcase 2 — Modular Grandstands & Seating
  aluminiumTruss: null,        // Showcase 3 — Aluminium Truss Systems
  fohTowers: null,             // Showcase 4 — FOH & Specialist Towers

  eventGallery1: null,         // Extra gallery stills, in display order
  eventGallery2: null,
  eventGallery3: null,
  eventGallery4: null,

  /* Product family solution page thumbnails */
  scaffoldingThumbnail: 'Scaffolding_Thumbnail_ty6nmw',
  formworkThumbnail: 'Formwork_Thumbnail_jllg4a',

  /* Product detail images */
  mato8Detail: 'Screenshot_2026-08-31_143905_gzdxaz',

  /* Contact page hero image */
  contactPageHero: 'contactushero',
}
