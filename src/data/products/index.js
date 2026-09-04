// Product catalog: family → subcategory → product.
//
// Modeled on Tobler AG's real global product architecture (tobler-in.com /
// tobler-ag.com — MATO scaffolding range, Tobler formwork range), reduced to
// two families so the whole catalog fits the "one page per family, dynamic
// grid, drawer for detail" architecture (see ProductFamilyPage.jsx). Add a
// product by editing this file only — no page/component changes needed.
//
// Subcategory slugs intentionally reuse the identifiers the rest of the site
// (src/data/industries.js → relatedProducts) already links to, so Industries
// cross-links keep working without touching that module.

import { MEDIA } from '../media-map.js'

const TOBLER_LIVE = 'https://www.tobler-in.com'
const SCAFFOLD_DOCS = `${TOBLER_LIVE}/assets/resources/Dateien/Produkte/Gerueste`
const FORMWORK_DOCS = `${TOBLER_LIVE}/assets/resources/Dateien/Produkte/Schalungen`

export const PRODUCT_FAMILIES = [
  {
    slug: 'scaffolding-systems',
    name: 'Scaffolding Systems',
    tagline: 'Access scaffolding engineered in Switzerland, built to the same standard in India.',
    summary:
      'Ringlock, cuplock, rolling and propping systems engineered for fast assembly, certified load ratings and site safety — from plant-scale rosette scaffolding to single-point props.',
    // `headline`/`intro` open the family page's system grid. Deliberately not
    // `tagline`/`summary`: those already carry the page hero, and repeating
    // them a screen later reads as a copy bug.
    headline: 'Engineered for Strength. Designed for Safety.',
    intro:
      'Our scaffolding systems are engineered to deliver outstanding performance across construction, industrial, infrastructure and maintenance projects.',
    heroImageId: MEDIA.scaffoldingThumbnail,
    videoId: MEDIA.productionVideo,
    videoLabel: 'Inside Tobler Manufacturing — Precision at Every Weld',
    
    subcategories: [
      {
        slug: 'all-in-one-scaffolding',
        name: 'Ringlock Modular Scaffolding',
        summary:
          "Rosette-node modular scaffolding for complex geometries, industrial plant and layouts standard frames can't reach.",
        imageId: MEDIA.ringlock,
        faqs: [
          {
            q: 'What makes MATO 8 different from a standard frame scaffold?',
            a: 'Its 8-way rosette node lets standards, ledgers and diagonals connect in any direction, so bay geometry is set on site rather than fixed at the factory — ideal for irregular plant and industrial layouts.',
          },
          {
            q: 'Is MATO 8 available in both steel and aluminium?',
            a: 'Yes — aluminium for lighter, faster manual handling; steel where heavier duty cycles are expected.',
          },
        ],
        products: [
          {
            slug: 'mato-8-modular-scaffolding',
            imageId: 'Mato_8_lmdhnw',
            model: 'MATO 8',
            name: 'MATO 8 Modular Scaffolding System',
            summary:
              'An eight-way rosette node system that builds and expands in every direction, for industrial, chemical and event-scale scaffolding.',
            description:
              'Modular scaffolding system designed for applications that are not possible with traditional systems. The MATO 8 features special connection technology with eight gratings on vertical stems allowing installation and expansion in all directions.',
            galleryImage: MEDIA.mato8Detail,
            gallery: ['Screenshot_2026-08-31_143905_gzdxaz'],
            mato8Details: [
              {
                title: "Everything's possible",
                content: "The MATO 8 modular scaffolding was developed for applications that are not at all possible with traditional systems or only when using elaborate special constructions. This became possible thanks to the special connection technology. The plates on the vertical stems have eight gratings that allow installation and expansion in all directions.",
              },
              {
                title: 'Versatile and very flexible',
                content: 'MATO 8 modular scaffoldings are used very frequently for special constructions in the industrial and chemical sectors, for works revisions but also across the events area. Another extremely interesting application are robust mobile scaffold towers, which adjust perfectly to each customer\'s individual requirements.\n\nAll components are available in both an aluminium and steel design.',
              },
              {
                title: 'Time and cost savings of up to 50%',
                content: 'The use of the MATO 8 aluminium system increases the efficiency of every single scaffolding fitter by 50% and more, as the installation is possible using one hand thanks to the low weight and the practical wedge head system.\n\nBut the lightweight design not only has significant benefits when installing the scaffolding. Less weight automatically also means more load volume during transport, hassle-free handling and easy storage.',
              },
              {
                title: 'Sophisticated range of accessories',
                content: 'From site access to stair tower and reinforcement. The range of accessories creates unique possibilities and turns your MATO 8 into an all-rounder for everyday use.',
              },
            ],
            features: [
              'Eight connection points per rosette for true multidirectional build-out',
              'Wedge-head fixings allow one-handed, tool-light assembly',
              'Aluminium build for lighter transport and easier manual handling, or steel for heavier duty cycles',
              'Reconfigures into mobile tower or wraparound geometries without custom fabrication',
            ],
            applications: [
              'Industrial and chemical plant scaffolding',
              'Shutdown and turnaround work with tight access windows',
              'Event and temporary structure build',
            ],
            specifications: [
              { label: 'Node System', value: '8-way rosette, vertical standard' },
              { label: 'Material', value: 'Aluminium or Steel' },
              { label: 'Assembly', value: 'Wedge-head, one-handed fixing' },
              { label: 'Compliance', value: 'EN 12810 / EN 12811' },
            ],
            certifications: ['EN 12810 / EN 12811'],
            downloads: [
              { label: 'MATO 8 Modular Scaffolding Catalogue', kind: 'brochure', href: `${SCAFFOLD_DOCS}/MATO-8/20260107-mato-8-ch-en-low.pdf` },
            ],
          },
        ],
        
      
      },
      {
        slug: 'cuplock-scaffolding',
        name: 'Cuplock Scaffolding',
        summary:
          'Cup-node modular scaffolding for general access, support and falsework work.',
        imageId: MEDIA.cuplock,
        faqs: [],
        products: [
          {
            slug: 'cuplock-system',
            imageId: 'Cuplock_System_home_screen_xbs2sg',
            model: 'Cuplock',
            name: 'Cuplock System',
            summary: 'Cup-node modular scaffolding for access and support work.',
            description:
              'The Tobler Heavy Duty Cuplock Scaffolding System is a state-of-the-art modular scaffolding solution engineered for demanding construction, infrastructure, industrial, and heavy-load applications. Designed around high load-bearing capacity, durability, precision manufacturing, and rapid erection, the system provides a robust and reliable alternative to conventional scaffolding systems.',
            features: [
              'Cup node locks up to four ledgers in a single connection',
              'Low loose-part count speeds assembly and stock control',
              'Suited to general access, support and falsework applications',
            ],
            applications: [
              'General access scaffolding',
              'Support and falsework applications',
            ],
            keyUSPs: [
              'Heavy-Duty Load Capacity: Engineered for high permissible loads, making it suitable for heavy-duty access, staging, shoring, and supporting applications.',
              '100% Hot-Dip Galvanized Components: All major system components are hot-dip galvanized with a minimum coating thickness of 70–90 microns, providing excellent corrosion resistance and extended service life.',
              'Forged Cups & Ledger Blades: High-strength forged top and bottom cups and forged ledger blades provide superior connection strength, dimensional accuracy, and resistance to deformation.',
              'High-Strength Steel Construction: Optimized steel grades and controlled manufacturing processes ensure consistent mechanical performance and durability.',
              'Positive & Rigid Connections: The unique Cuplock connection creates a secure, rigid node without the need for nuts and bolts, reducing erection time and improving structural stability',
              'Fast & Tool-Free Assembly: Ledgers and transoms can be locked into position quickly using the captive cup mechanism, resulting in faster installation and dismantling.',
              'Precision Manufacturing: Consistent component dimensions and tight manufacturing tolerances ensure excellent interchangeability and system reliability',
              'Longer Service Life: Heavy-duty construction combined with hot-dip galvanizing significantly improves resistance to corrosion, abrasion, and harsh site conditions.',
              'High Reusability: Robust forged connection components and durable galvanizing allow the system to withstand repeated erection, dismantling, transportation, and reuse.',
              'Versatile System: Suitable for scaffolding, heavy-duty staging, shoring, access platforms, industrial maintenance, infrastructure projects, and formwork support.',
              'Reduced Maintenance: Hot-dip galvanized components minimize painting and recurring anti-corrosion maintenance requirements.',
              'Engineered for Safety: Rigid node connections and high-strength components provide enhanced stability and predictable structural behaviour when the system is properly designed and erected',
            ],
            whyToblerCuplock: [
              'Compared with conventional Cuplock systems available in the market, Tobler focuses on combining heavy-duty structural performance with premium component manufacturing and superior corrosion protection. The use of forged cups and ledger blades, rather than relying on lower-grade connection components, enhances connection integrity and durability.',
              'The combination of 70–90 micron minimum hot-dip galvanizing, forged connection components, high permissible load capacity, precision manufacturing, and high reusability positions Tobler Heavy Duty Cuplock as a premium scaffolding solution for projects where strength, safety, longevity, and productivity are critical.',
            ],
            toblerAdvantage: [
              'Swiss Engineering | Heavy-Duty Performance | Forged Connections | 70–90 Micron HDG Protection | High Reusability | Faster Erection | Long Service Life',
              'Note: Load capacities should be stated project-wise based on the applicable design, component configuration, bay dimensions, height, bracing arrangement, and governing standards. Avoid claiming a specific load rating without the corresponding structural design certification',
            ],

            specifications: [
              { label: 'Node System', value: 'Cup node, four-way' },
              { label: 'Material', value: 'Galvanized steel' },
            ],
            certifications: [],
            downloads: [],
          },
        ],
      },
      {
        slug: 'mobile-scaffolding',
        name: 'Rolling Scaffolding Towers',
        summary:
          'Castor-mounted aluminium towers for short-duration access that needs to move across a floor plate or facade run.',
        imageId: MEDIA.rollingTowers,
        faqs: [
          {
            q: 'Can one person really assemble MATO R alone?',
            a: 'Yes, that\'s a core design goal of the system, and the folding variant further speeds setup and storage.',
          },
          {
            q: "What's the difference between MATO R and MATO R Eco?",
            a: 'R Eco trims height range and component count to reduce cost and weight for lower-height indoor work; MATO R covers the full 8–12 m range.',
          },
          {
            q: 'Are MATO R towers certified for outdoor use?',
            a: 'Yes, up to 8.0 m outdoor and 12.0 m indoor under DIN EN 1004/1298, subject to site wind conditions.',
          },
        ],
        products: [
          {
            slug: 'mato-r-rolling-scaffolding',
            imageId: 'MATO_R_cyjrdk',
            gallery: ['MATO_R_cyjrdk'],
            model: 'MATO R',
            name: 'MATO R Rolling Scaffolding',
            summary:
              'A fully aluminium, TÜV-certified rolling tower that one fitter can assemble, fold and move without a crew.',
            description:
              'You are already working at height when others are still erecting. The MATO R rolling tower / mobile scaffold tower can be assembled and dismantled in record time and is uniquely light and stable. Available as a practical folding version or with a single frame. Tested safety and certified electrical conductivity.',
            matorDetails: [
              {
                title: 'A system for every application',
                content: 'MATO R mobile scaffolding is used wherever the greatest possible versatility and efficiency is required, e.g. for cleaning and maintenance or for specialised construction work. The MATO R system is available in a collapsible version or as a single-frame structure in widths of 70 cm and 135 cm. Its ingenious collapsible structure means that it can be assembled and dismantled quickly and easily – by just one scaffolder.',
              },
              {
                title: 'Certified safety',
                content: 'Every part of the scaffolding is made of aluminium and is subject to strict quality and safety inspections. Special scaffolding can also easily be produced to meet individual client needs, depending upon requirements. MATO R is also compatible with various third-party systems.',
              },
              {
                title: 'Scaffolding work platforms and mobile work platforms',
                content: 'The MATO R system provides versatile solutions for both temporary work platforms and mobile access requirements across diverse applications.',
              },
            ],
            features: [
              'Assembled in a flash',
              'Lightweight aluminium structure',
              'Extremely stable',
              'Maximum safety certified according to EN 1004 2005/EN 1298 1996',
              'Extremely economical',
              'Electrical conductivity certified',
              'Foldable or as single frame',
            ],
 
            applications: [
              'Cleaning and facility maintenance',
              'Indoor and sheltered outdoor construction access',
              'Short-duration tasks that move across a floor plate',
            ],
            
            specifications: [
              { label: 'Scaffolding Group', value: 'Group 3' },
              { label: 'Permissible Load', value: '2.0 kN/m²' },
              { label: 'Width', value: '0.7 m – 1.35 m' },
              { label: 'Length', value: '1.90 m / 2.50 m' },
              { label: 'Height', value: 'Up to 8.0 m outdoor / 12.0 m indoor' },
              { label: 'Material', value: 'Aluminium alloy' },
            ],
            certifications: ['DIN EN 1004:2005', 'DIN EN 1298:1996', 'TÜV Certified — Nr. Z1A 12 12 56537 004'],
            downloads: [
              {
                label: 'MATO R Rolling Scaffolding Catalogue',
                kind: 'brochure',
                href: `${SCAFFOLD_DOCS}/MATO-R-Rollgerüste/20250401_MATO_R_Rollgerueste_CH_en.pdf`,
              },
            ],
          },
        ],
        
      },
      {
        slug: 'scaffolding-accessories',
        name: 'Scaffolding Accessories',
        summary:
          'Decking, safety and site-facility accessories that complete a compliant, fully-equipped scaffolding installation.',
        imageId: MEDIA.scaffoldingAccessories,
        faqs: [
          {
            q: 'Will MATO Z fit a scaffold from another manufacturer?',
            a: 'In most cases yes, the range is designed for compatibility with most third-party standard brands, not just MATO.',
          },
          {
            q: 'What does the MATO Z range cover?',
            a: 'Aluminium decking, couplings, threaded base plates, stairs, flat-roof railings and lift consoles — the fittings a scaffold installation needs beyond the core frame.',
          },
        ],
        products: [
          
          {
            slug: 'mato-z-scaffolding-accessories',
            imageId: 'MATO_Z_vvgwjl',
            model: 'MATO Z',
            name: 'MATO Z Scaffolding Accessories',
            summary:
              '"An accessories programme which leaves nothing to be desired" — decking, couplers, stairs and railings for any MATO or third-party scaffold.',
            description:
              'MATO Z covers the full range of fittings a scaffold installation needs beyond the core frame: aluminium decking with a non-tearable connecting claw, couplings, threaded base plates, stairs, flat-roof railings and lift consoles. The range is third-party monitored by the Karlsruhe Institute of Technology (KIT) and built to fit most third-party scaffolding brands, not just MATO.',
            matozoDetails: [
              {
                title: "Everything's possible",
                content: 'MATO Z stands for an accessories programme which leaves nothing to be desired. And this for both our own scaffolding systems and for most standard third-party brands.\n\nThe range includes coatings, bolting materials, fixtures, threaded base plates and couplings but also stairs, flat roof railings, lift consoles and much more.',
              },
              {
                title: 'Tested Swiss quality',
                content: 'When developing all MATO products, safety is the top priority. We adhere to strict safety regulations and place great importance on high-quality processing.\n\nOur products are consistently monitored by a third party, the Karlsruhe Institute of Technology (KIT).',
              },
            ],
            features: [
              'Limitless application possibilities for your MATO systems',
              'Your guarantee of success: the unbeatable aluminium decking with non-tearable connecting claw',
              'Tested Swiss quality',
              'Accessories for special applications such as bridge construction and construction site equipment',
              'Success accessories also for third-party systems',
              'Swiss engineering',
            ],
            applications: [
              'Completing compliance on any scaffold installation',
              'Bridge construction and special applications',
              'General construction-site equipment',
            ],
            specifications: [
              { label: 'Range', value: 'Decking, couplers, stairs, railings, lift consoles' },
              { label: 'Compatibility', value: 'MATO systems and most third-party brands' },
              { label: 'Quality', value: 'Third-party monitored (KIT)' },
            ],
            certifications: ['KIT third-party monitored', 'Swiss quality tested'],
            downloads: [
              { label: 'MATO Z Accessory Catalogue', kind: 'brochure', href: `${SCAFFOLD_DOCS}/MATO-Z/MATO Z_en_low.pdf` },
            ],
          },
        ],
      },
      {
        slug: 'light-duty-props',
        name: 'Light-Duty Props',
        summary:
          'Telescoping single-point props for slab, beam-soffit and infill support — the most economical option wherever a full shoring tower is not justified.',
        imageId: MEDIA.lightDutyProps,
        faqs: [
          {
            q: 'When should I use a Flex prop instead of a full tower?',
            a: "For infill areas around a tower grid or smaller bays that don't justify a full shoring tower — it's the more economical choice at that scale.",
          },
          {
            q: 'What does a Flex prop connect to?',
            a: 'Tobler Deck panels and standard H20 beam spans, so it drops into a slab-forming layout without proprietary adapters.',
          },
        ],
        products: [
          {
            slug: 'tobler-flex-adjustable-prop',
            imageId: MEDIA.extrusionStack,
            model: 'Tobler Flex',
            name: 'Flex Adjustable Prop',
            summary: "A telescoping single-point prop for slab, beam-soffit and infill support wherever a full tower isn't justified.",
            description:
              "Tobler props fulfil load class B, C, D or E in accordance with EN 1065. The galvanised props with forged and robust threaded nut guarantees a very long service life in accordance with EN 10346 and EN 2081. The quick release thread has a larger pitch than comparable products. Production is carried out using state-of-the-art production processes such as the rolling process for the thread. The usual welded connection at the transition from the threaded section to the outer tube is also eliminated.The patented foot reinforcement with additional protection against deformation ensures an even longer service life It pairs directly with Tobler Deck panels and H20 beam spans.",
            features: [
              'Telescoping tube with pinned fine-adjustment collar',
              'Standard choice for infill areas around a tower grid',
              'Compatible with Tobler Deck panels and H20 beam spans',
              'Economical for smaller slab bays and edge conditions',
            ],
            typicalApplications: [
              '● Slab and beam formwork',
              '● Supporting aluminium monolithic formwork',
              '● Conventional slab shuttering',
              '● Temporary structural support',
              '● Repair and renovation works',
              '●Construction and infrastructure projects',
              '● Propping during formwork erection and dismantling',
            ],
            whyChooseToblerProps: [
            'Tobler Props combine strength, adjustability and durability to deliver dependable temporary support on site. Their robust construction and practical design make them an economical and versatile solution for contractors looking for safe, reusable and high-performance propping equipment. Tobler – Swiss Engineering. Trusted Performance.',
            ],
            
            applications: [
              'Infill support around shoring towers',
              "Smaller slab bays not justifying a full tower",
              'Beam-soffit and edge-condition propping',
            ],
            specifications: [
              { label: 'Material', value: 'Steel tube, cast fittings' },
              { label: 'Adjustment', value: 'Pinned fine-adjustment collar' },
              { label: 'Compliance', value: 'EN 1065' },
            ],
            certifications: ['EN 1065'],
            downloads: [
              { label: 'Tobler Flex Catalogue', kind: 'brochure', href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-flex-in-en-low.pdf` },
            ],
          },
        ],
      },
      {
        slug: 'heavy-duty-props',
        name: 'Heavy-Duty Props',
        summary:
          'Tower-based heavy-duty propping for slab, transfer beam and bridge deck support where standard props run out of capacity.',
        imageId: MEDIA.heavyDutyProps,
        faqs: [
          {
            q: 'What is the difference between Type A and Type M props?',
            a: 'Type M carries a heavier-duty profile for higher leg loads and taller falsework, such as bridge decks; Type A covers general mid-rise slab and transfer support.',
          },
          {
            q: 'How is tower height determined for a project?',
            a: "Every configuration is verified by Tobler's engineering team against project-specific load cases before deployment.",
          },
          {
            q: 'Are these systems rated for bridge falsework?',
            a: 'Yes — Type M configurations are specifically used for bridge deck and heavy transfer-beam falsework.',
          },
        ],
        products: [
          {
            slug: 'heavy-duty-prop-type-a',
            imageId: 'tobler/site/image-9',
            model: 'Type A',
            name: 'Heavy-Duty Prop — Type A',
            summary: 'A robust, lightweight heavy-duty prop and frame combination for mid-rise slab and transfer-structure support.',
            description:
              'Heavy-Duty Prop Type A stacks pre-fabricated prop and frame sections into towers of variable height for mid-rise slab and beam-soffit support, where standard props alone cannot carry the load or reach the required height without excessive bracing. Matching Type A frames provide cross-bracing and stability, backed by a full accessory range for infill and edge conditions.',
            features: [
              'Safe, robust and lightweight tower construction',
              'Stacks into towers of variable height for slab and beam soffit support',
              'Matching Type A frames for cross-bracing and stability',
              'Full accessory range for infill and edge conditions',
            ],
            typicalApplications: [
              '● Slab and beam formwork',
              '● Supporting aluminium monolithic formwork',
              '● Conventional slab shuttering',
              '● Temporary structural support',
              '● Repair and renovation works',
              '●Construction and infrastructure projects',
              '● Propping during formwork erection and dismantling',
            ],
            whyChooseToblerProps: [
            'Tobler Props combine strength, adjustability and durability to deliver dependable temporary support on site. Their robust construction and practical design make them an economical and versatile solution for contractors looking for safe, reusable and high-performance propping equipment. Tobler – Swiss Engineering. Trusted Performance.',
            ],
            applications: [
              'Mid-rise slab and transfer beam support',
              'Falsework where standard single props lack capacity or reach',
              'General heavy-duty shoring towers',
            ],
            specifications: [
              { label: 'System', value: 'Heavy-Duty Prop + Frame, Type A' },
              { label: 'Material', value: 'High-grade steel' },
              { label: 'Compliance', value: 'EN 12812' },
            ],
            certifications: ['EN 12812'],
            downloads: [
              {
                label: 'Tobler Tower Heavy-Duty Props Catalogue',
                kind: 'brochure',
                href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-tower-schwerlaststuetzen-in-en-low.pdf`,
              },
            ],
          },
          {
            slug: 'heavy-duty-prop-type-m',
            imageId: 'tobler/site/image-10',
            model: 'Type M',
            name: 'Heavy-Duty Prop — Type M',
            summary: 'The higher-capacity Tower prop and frame combination for bridge deck and heavy transfer-beam falsework.',
            description:
              "Heavy-Duty Prop Type M steps up to a heavier prop and frame profile for bridge deck falsework and heavy transfer-beam support, where leg loads and total height exceed what Type A can carry safely. Every tower configuration is verified by Tobler's engineering team against project-specific load cases before deployment.",
            features: [
              'Heavier-duty prop and frame profile than Type A for higher leg loads',
              'Suited to bridge deck and long-height falsework',
              'Every configuration verified against project-specific load cases',
              'Shares accessories and site-handling practice with Type A',
            ],
            applications: [
              'Bridge deck and pier-cap falsework',
              'Heavy transfer beam support',
              'Tall, high-load shoring towers',
            ],
            specifications: [
              { label: 'System', value: 'Heavy-Duty Prop + Frame, Type M' },
              { label: 'Material', value: 'High-grade steel' },
              { label: 'Compliance', value: 'EN 12812' },
            ],
            typicalApplications: [
              '● Slab and beam formwork',
              '● Supporting aluminium monolithic formwork',
              '● Conventional slab shuttering',
              '● Temporary structural support',
              '● Repair and renovation works',
              '●Construction and infrastructure projects',
              '● Propping during formwork erection and dismantling',
            ],
            whyChooseToblerProps: [
            'Tobler Props combine strength, adjustability and durability to deliver dependable temporary support on site. Their robust construction and practical design make them an economical and versatile solution for contractors looking for safe, reusable and high-performance propping equipment. Tobler – Swiss Engineering. Trusted Performance.',
            ],
            certifications: ['EN 12812'],
            downloads: [
              {
                label: 'Tobler Tower Heavy-Duty Props Catalogue',
                kind: 'brochure',
                href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-tower-schwerlaststuetzen-in-en-low.pdf`,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'formwork-systems',
    name: 'Formwork Systems',
    tagline: 'Aluminium and steel formwork engineered in Switzerland, manufactured in India.',
    headline: 'Built for Precision. Made for Speed.',
  
    heroImageId: MEDIA.formworkThumbnail,
   
    subcategories: [
      {
        slug: 'monolithic-formwork',
        name: 'Monolithic Aluminium Formwork',
        summary:
          'Single-pour aluminium formwork for walls, slabs, beams and staircases, Swiss engineering combined with high-cycle reuse.',
        imageId: MEDIA.monolithicAluminiumFormwork,
        faqs: [
          {
            q: 'How many times can a monolithic panel be reused?',
            a: 'Up to 150 cycles with proper maintenance, which is the main driver of its per-cycle cost advantage on multi-tower projects.',
          },
          {
            q: 'What floor cycle time should we plan for?',
            a: 'Typical monolithic wall-slab cycles run around 7 days per floor once a crew is up to speed.',
          },
          {
            q: 'Is training provided?',
            a: "Yes, Tobler provides technical training and ongoing engineering assistance as part of after-sales support.",
          },
        ],
        products: [
          {
            slug: 'monolithic-aluminium-formwork',
            imageId: 'tobler/site/image-11',
            videoId: 'All_1_g17nro',
            galleryImage: MEDIA.panelTeam,
            gallery: [MEDIA.assemblyBay, MEDIA.panelStacks, MEDIA.weldingArc, MEDIA.pressBrake, MEDIA.plantLineWide, MEDIA.panelHandover],
            model: 'Monolithic System',
            name: 'Monolithic Aluminium Formwork',
            summary:
              'Walls, columns and slabs poured in a single monolithic cycle — the verticals and wall-slab halves of one integrated Swiss-engineered system.',
            description:
              'Swiss-Engineered Formwork for Faster, Safer & High-Quality Construction. The Tobler Monolithic Aluminium Formwork System is a high-performance, precision-engineered formwork solution designed for rapid construction of repetitive structures such as residential towers, hostels, mass housing, hotels and infrastructure projects.',
            keyUSPs: [
              'Class-Leading Load Capacity – Up to 80 kN/m². Designed to withstand high fresh-concrete pressures, providing excellent structural reliability and enabling demanding construction applications.',
              'Swiss Engineering & Technology. Developed with Swiss engineering expertise, combining precision manufacturing with robust formwork design.',
              'All Accessories Powder Coated. Tobler\'s MS accessories are powder coated for enhanced corrosion resistance, longer service life and improved appearance compared with conventional painted accessories.',
              'High-Strength Aluminium Panels. Precision-fabricated aluminium panels provide an optimum balance of strength, weight and durability, making the system easy to handle at site.',
              'Monolithic Construction. Walls, slabs, beams and columns can be cast in a single cycle, significantly reducing construction time and improving structural integrity.',
              'Precision Manufacturing. CNC/precision manufacturing ensures dimensional accuracy, consistent panel geometry and better alignment across repeated cycles.',
              'Excellent Concrete Finish. High-quality aluminium panels provide a smooth and uniform concrete surface, reducing the requirement for extensive plastering and finishing work.',
              'High Reusability & Long Service Life. Robust aluminium construction is designed for repeated use across multiple casting cycles, improving project economics over the life of the system.',
              'Fast Construction Cycles. Systematic erection, concreting and de-shuttering enables accelerated floor cycles, making Tobler particularly suitable for high-volume repetitive construction.',
              'Engineered for Site Efficiency. Lightweight components, standardized accessories and systematic assembly reduce handling time and improve overall site productivity.',
              'Complete Formwork Solution. Tobler provides a comprehensive system comprising wall, slab, beam, column and supporting accessories, engineered to work together as one integrated solution.',
            ],
            whyTobler: [
              'Higher Load Capacity. Better Protection. Faster Cycles. Longer Life. Tobler Monolithic Aluminium Formwork combines Swiss engineering, high-strength aluminium construction, 80 kN/m² class-leading load capacity and powder-coated accessories to deliver a dependable formwork solution for modern high-speed construction.',
            ],
            toblerAdvantage: [
              '80 kN/m² Load Capacity',
              'Swiss Engineering',
              'Powder-Coated Accessories',
              'Lightweight Aluminium',
              'Monolithic Casting',
              'Precision Manufacturing',
              'High Reusability',
              'Faster Construction',
            ],
            features: [
              'High-strength aluminium panels reduce on-site labour',
              'Rated for up to 150 reuse cycles with proper maintenance',
              'Customizable to diverse architectural wall and column geometries',
              'Backed by ongoing technical training and engineering support',
              'Wall and slab pour together on one fast cycle',
              'Fewer construction joints per floor improves finish and speed',
              'Suited to standardized residential tower layouts',
              'Shares components with the Tobler Verticals range',
            ],
            applications: [
              'Shear wall and core wall construction',
              'Column formwork on repetitive floor plates',
              'High-rise residential and commercial towers',
              'Repetitive residential tower construction',
              'Fast-cycle single-pour floors',
              'Projects prioritizing finish consistency and cycle speed',
            ],
            specifications: [
              { label: 'Material', value: 'Aluminium Alloy 6061 T6' },
              { label: 'Panel Load Capacity', value: '65 kN' },
              { label: 'Reuse Cycles', value: 'Up to 150' },
              { label: 'Typical Floor Cycle', value: '7 days' },
              { label: 'Compliance', value: 'EN 12812' },
            ],
            certifications: ['EN 12812'],
            downloads: [
              { label: 'Tobler Monolithic Formwork Catalogue', kind: 'brochure', href: `${FORMWORK_DOCS}/20250708-monolithic-formwork-en-low.pdf` },
            ],
          },
        ],
      },
      {
        slug: 'wall-formwork',
        name: 'Manu Wall Formwork',
        summary: 'Crane-free, hand-set wall formwork panels that fit any floor plan and height without heavy lifting equipment.',
        imageId: MEDIA.manuWallFormwork,
        faqs: [
          {
            q: 'Do Manu panels need a crane?',
            a: 'No, that\'s the point of the system; panels are sized for manual handling by a small crew.',
          },
          {
            q: 'How many uses does a Manu panel last?',
            a: 'The formwork shell is rated for up to 1,500 uses when maintained per the system guidelines.',
          },
          {
            q: 'What heights are available?',
            a: 'Four standard heights (75, 100, 150 and 300 cm), combined with three element widths to fit almost any floor plan.',
          },
        ],
        products: [
          {
            slug: 'manu-wall-element',
            imageId: MEDIA.panelHandover,
            model: 'Tobler Manu',
            name: 'Manu Wall Element',
            summary: 'A crane-free handset wall panel with a solid aluminium frame, built for up to 1,500 reuses.',
            description:
              "Manu Wall Element is Tobler's lightest, toughest handset formwork — fully hand-managed with no crane required. A solid aluminium frame profile with an ergonomic cross-section keeps handling comfortable through a full shift, and the formwork shell is rated for up to 1,500 uses. Openings at standard positions accept push-pull props for fast, secure connections.",
            features: [
              'No crane required — fully hand-managed installation',
              'Solid aluminium frame profile with ergonomic cross-section for grip',
              'Formwork shell withstands up to 1,500 uses',
              'Openings for push-pull props at standard positions',
            ],
            applications: [
              'Residential and commercial wall pours without crane access',
              'Repetitive unit layouts',
              'Sites prioritizing labour flexibility over crane-cycle speed',
            ],
            specifications: [
              { label: 'Standard Heights', value: '75 / 100 / 150 / 300 cm' },
              { label: 'Element Widths', value: '25 / 50 / 75 cm' },
              { label: 'Anchor Pitch', value: '5 cm increments' },
              { label: 'Reuse Rating', value: 'Up to 1,500 uses' },
            ],
            certifications: ['EN 12812'],
            downloads: [
              {
                label: 'Tobler Manu Handset Formwork Catalogue',
                kind: 'brochure',
                href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-manu-handschalung-in-en-low.pdf`,
              },
            ],
          },
          {
            slug: 'manu-levelling-corner-element',
            imageId: MEDIA.panelStacks,
            model: 'Tobler Manu',
            name: 'Manu Levelling & Corner Element',
            summary: 'Levelling and corner elements that complete a Manu wall installation on any layout, inside or outside corner.',
            description:
              "Levelling and corner elements complete a Manu installation on any layout: purpose-made corner pieces avoid site-fabricated fixes at internal and external corners, while levelling elements absorb slab-to-slab height variance. Both share the standard element's anchor and connection system and are compatible with Tobler Top wall formwork.",
            features: [
              'Purpose-made corner pieces avoid site-fabricated fixes',
              'Levelling elements absorb slab-to-slab height variance',
              "Shares the anchor and connection system with the standard Manu wall element",
              'Compatible with Tobler Top wall formwork',
            ],
            applications: [
              'Internal and external corners on any wall layout',
              'Levelling between floors of varying slab tolerance',
              'Completing a Manu Wall Element installation',
            ],
            specifications: [
              { label: 'Compatibility', value: 'Tobler Manu Wall Element' },
              { label: 'Material', value: 'Aluminium profile, steel-reinforced' },
              { label: 'Anchor System', value: 'Shared 5 cm pitch flex bar' },
            ],
            certifications: ['EN 12812'],
            downloads: [
              {
                label: 'Tobler Manu Handset Formwork Catalogue',
                kind: 'brochure',
                href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-manu-handschalung-in-en-low.pdf`,
              },
            ],
          },
        ],
      },
      {
        slug: 'slab-formwork',
        name: 'Alu Deck Slab Formwork',
        summary: 'Lightweight aluminium deck panels for slab pours, mounted from below by a single worker without a crane.',
        imageId: MEDIA.deckSlabFormwork,
        faqs: [
          {
            q: 'Can one person really install Tobler Deck panels?',
            a: "Yes, mounting from below by a single worker is the system's core design goal, at 45 kg per standard panel.",
          },
          {
            q: 'What is the maximum slab thickness supported?',
            a: 'Up to 50 cm ceiling thickness with standard configuration.',
          },
          {
            q: 'What finish options are available?',
            a: 'Phenolic resin, plastic-coated and Alkus formlining options, depending on the finish class required.',
          },
        ],
        products: [
          {
            slug: 'tobler-deck-alu-panel',
            imageId: MEDIA.panelYard,
            model: 'Tobler Deck',
            name: 'Tobler Alu Deck Slab Formwork System',
            summary: 'A 45 kg, single-person deck panel that mounts from below and fits almost any floor plan economically.',
            description:
              'Full Aluminium. Faster Cycles. Superior Finishes. The Tobler Alu Deck Slab Formwork System is a fully aluminium slab formwork solution engineered for high-speed construction, ease of handling, and consistently superior concrete surface finishes. Its lightweight yet robust design enables efficient assembly, dismantling, and repositioning, helping contractors achieve faster floor cycles and improved site productivity.',
            keyUSPs: [
              '100% Aluminium Deck System – Lightweight, durable and designed for repeated use across multiple projects.',
              'Faster Cycle Times – Optimized system design enables quick assembly, striking and shifting, supporting faster floor-to-floor cycles.',
              'Superior Surface Finish – Precision-engineered aluminium panels provide a smooth and uniform concrete finish, reducing the need for extensive finishing work.',
              '20 KN Heavy-Duty Props – Robust, powder-coated props provide reliable load-bearing performance and enhanced durability.',
              'Heavy-Duty Casted Drop Heads – Powder-coated cast drop heads ensure strength, durability and efficient early striking of the deck system.',
              'Ergonomic Design – Components are designed for easy handling and installation, reducing manual effort and improving productivity.',
              'Quick Assembly & Dismantling – Systemized components and optimized connections simplify erection and stripping operations.',
              'Durable Powder-Coated Components – Props and drop-head components receive a protective powder-coated finish for improved corrosion resistance and longer service life.',
              'High Reusability – Engineered for repeated construction cycles, offering excellent long-term value and reduced formwork costs.',
              'Reduced Labour Requirement – Lightweight aluminium components and ergonomic handling help optimize manpower deployment at site.',
            ],
            whyTobler: [
              'Tobler Alu Deck combines lightweight aluminium construction, heavy-duty support components and an ergonomic system design to deliver faster slab cycles with excellent concrete finishes. Faster Assembly | Faster Striking | Better Finishes | Higher Productivity | Longer System Life',
            ],
            features: [
              'Mounts from below by just one person — no crane, no propping crew',
              'Powder-coated frame minimizes concrete adhesion and cleaning effort',
              'High manufacturing precision keeps joints tight and consistent',
              'Connects directly to Tobler Flex props',
            ],
            applications: [
              'Slab formwork up to 50 cm ceiling thickness',
              'Industrial and residential floor plates',
              'Fast, single-crew slab cycles without crane dependency',
            ],
            specifications: [
              { label: 'Standard Panel', value: '180 × 180 cm' },
              { label: 'Panel Weight', value: '45 kg' },
              { label: 'Contact Area', value: '3.24 m² per panel' },
              { label: 'Max Slab Thickness', value: '50 cm' },
              { label: 'Formlining Options', value: 'Phenolic resin, plastic-coated, Alkus' },
            ],
            certifications: ['EN 12812'],
            downloads: [
              {
                label: 'Tobler Deck Slab Formwork Catalogue',
                kind: 'brochure',
                href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-deck-katalog-in-en-low.pdf`,
              },
            ],
          },
        ],
      },
      {
        slug: 'climbing-systems',
        name: 'Protection Screen System',
        summary:
          'Perimeter protection screens for climbing formwork and high-rise core construction, keeping crews and the public safe at height.',
        imageId: MEDIA.protectionScreens,
        faqs: [
          {
            q: 'Does the protection screen system work with any formwork?',
            a: "It's built to integrate with Tobler's monolithic and verticals formwork for a continuous perimeter as the core climbs.",
          },
          {
            q: 'Does the screen need rebuilding at every floor?',
            a: 'No, it cycles with the climbing formwork rather than being struck and rebuilt per level, which is the main safety and productivity advantage.',
          },
          {
            q: 'Is this suitable for bridge pylon construction?',
            a: 'Yes, alongside high-rise core and shear-wall work.',
          },
        ],
        products: [
          {
            slug: 'tobler-protection-screen-system',
            imageId: MEDIA.towerAerialTop,
            videoId: MEDIA.protectionScreenVideo,
            
            model: 'Protection Screen',
            name: 'Tobler Protection Screen System',
            summary:
              'Engineered perimeter protection that progresses with the building — guarding exposed edges, containing debris and carrying a working platform for façade and finishing work.',
            description:
              'The Tobler Protection Screen System is a purpose-engineered perimeter safety solution that creates a controlled protective envelope around a building during construction. It protects workers from exposed edges while containing tools, materials and debris within the protected work zone. Designed to progress with the building, the system is repositioned as construction advances, maintaining perimeter protection without unnecessarily obstructing ongoing site activities, and its integrated working platform provides controlled access for façade installation, formwork, external finishing and other perimeter work. It suits medium-rise, high-rise and super high-rise construction: the modular design can be configured around different building geometries, floor heights and structural layouts, and integrates with modern methods including climbing formwork and jump-form systems.',
            // The system ships in two lifting configurations rather than as two
            // separate products — same screen, different way of moving it up.
            variants: [
              {
                name: 'Hydraulic Auto-Climbing Protection Screen',
                description:
                  'An integrated hydraulic lifting mechanism moves the screen from one level to the next. The system climbs independently during normal climbing operations, reducing dependence on tower crane availability and supporting repetitive floor-to-floor construction cycles.',
              },
              {
                name: 'Guided Protection Screen',
                description:
                  'Repositioned using a tower crane or mobile crane. Vertical guide rails help maintain alignment and control movement during lifting, supporting accurate positioning while reducing swinging during repositioning.',
              },
            ],
            features: [
              'Controlled perimeter protection around exposed building edges',
              'Falling-object containment within the protected work zone',
              'Integrated working platform for perimeter construction work',
              'Hydraulic auto-climbing or crane-operated guided configuration',
              'Reduced tower crane dependency with the hydraulic system',
              'Controlled and accurate repositioning as the building rises',
              'Modular, adaptable system configuration',
              'Suits varying building geometries and floor configurations',
              'Designed for dismantling, transport and reuse',
              'Compatible with modern high-rise construction methods',
            ],
            applications: [
              'Medium-rise, high-rise and super high-rise construction',
              'Climbing formwork and jump-form platforms',
              'Façade installation, formwork and external finishing at the perimeter',
              'High-rise core and shear-wall construction',
              'Bridge pylon construction at height',
            ],
            specifications: [
              { label: 'Type', value: 'Perimeter Protection Screen' },
              { label: 'Configurations', value: 'Hydraulic auto-climbing or crane-guided' },
              { label: 'Building Types', value: 'Medium-rise, high-rise, super high-rise' },
              { label: 'Compatibility', value: 'Climbing / jump-form platforms' },
              { label: 'Project Engineering', value: 'Configured to building geometry, floor heights and structural layout' },
              { label: 'Compliance', value: 'EN 13374 (edge protection)' },
            ],
            certifications: ['EN 13374'],
            downloads: [],
          },
        ],
      },
      
    ],
  },
]

export const getFamilyBySlug = (familySlug) => PRODUCT_FAMILIES.find((f) => f.slug === familySlug)

// Flattened subcategory list, each tagged with its parent family — used by
// Home/Industries teasers that link into a family page's subcategory anchor
// without needing to know the full family/subcategory tree.
export const PRODUCT_SUBCATEGORIES = PRODUCT_FAMILIES.flatMap((family) =>
  family.subcategories.map((subcategory) => ({
    ...subcategory,
    familySlug: family.slug,
    familyName: family.name,
  }))
)

export const getSubcategoryBySlug = (subcategorySlug) =>
  PRODUCT_SUBCATEGORIES.find((s) => s.slug === subcategorySlug)

export const findProduct = (familySlug, productSlug) => {
  const family = getFamilyBySlug(familySlug)
  if (!family) return null
  for (const subcategory of family.subcategories) {
    const product = subcategory.products.find((p) => p.slug === productSlug)
    if (product) return { family, subcategory, product }
  }
  return null
}

// Same-subcategory products first, then the rest of the family, excluding
// the current product — always returns entries paired with their own
// subcategory so callers never lose the context needed for icon/eyebrow.
export const getRelatedProducts = ({ family, subcategory, product }, limit = 3) => {
  const wrap = (s) => s.products.map((p) => ({ product: p, subcategory: s }))
  const ordered = [subcategory, ...family.subcategories.filter((s) => s.slug !== subcategory.slug)].flatMap(wrap)
  return ordered.filter((entry) => entry.product.slug !== product.slug).slice(0, limit)
}

export const familyPath = (familySlug) => `/products/${familySlug}`
export const productPath = (familySlug, productSlug) => `/products/${familySlug}/${productSlug}`
// A subcategory is a URL segment in the same position as a product slug —
// ProductFamilyPage resolves the segment against both sets. It used to be a
// `#anchor` on the family page; that changed when the family page became a
// grid of subcategory cards rather than one long stack of sections.
export const subcategoryPath = (subcategorySlug) => {
  const subcategory = getSubcategoryBySlug(subcategorySlug)
  return subcategory ? `/products/${subcategory.familySlug}/${subcategory.slug}` : '/products'
}
