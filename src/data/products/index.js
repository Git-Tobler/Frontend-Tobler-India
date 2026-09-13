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

// import { Italic } from 'lucide-react'
import { MEDIA } from '../media-map.js'

const TOBLER_LIVE = 'https://www.tobler-in.com'
const SCAFFOLD_DOCS = `${TOBLER_LIVE}/assets/resources/Dateien/Produkte/Gerueste`
const FORMWORK_DOCS = `${TOBLER_LIVE}/assets/resources/Dateien/Produkte/Schalungen`

export const PRODUCT_FAMILIES = [
  {
    slug: 'scaffolding-systems',
    name: 'Scaffolding Systems',
    tagline: 'Access scaffolding engineered in Switzerland, built to the same standard in India.',
    headline: 'Engineered for Strength. Designed for Safety.',
    heroImageId: 'WhatsApp_Image_2026-09-08_at_5.08.49_PM_1_tivyxl',
    
    subcategories: [
      {
        slug: 'all-in-one-scaffolding',
        name: 'Ringlock Modular Scaffolding',
        summary:
          "Rosette-node modular scaffolding for complex geometries, industrial plant and layouts standard frames can't reach.",
        imageId: '4_d7nw70',
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
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: '4_d7nw70',
              gallery: ['2_eo1c69','3_wmdlkr', '1_qzomrq', '5_nvvzmz', '6_swx5th', '7_fdpqa7', '8_cgsdk8', '9_nznugm', '10_y2yc1i', '11_szedkq', '20_xpl2ap', '13_l5lp1o', '14_ir2kbt', '15_d3uyw6', '28_alov96', '29_ysm6mk', '23_sxopre', '24_m34iho'],
              showcase: ['22_pbcq0b', '25_psbq6y','26_fqwq1r', '27_wn32se', ],
              video: MEDIA.roboticWeldingVideo,
              videoLabel: '',
              inUse: 'MEDIA.towerAerial',
              inUseCaption: '',
            },
            model: 'MATO 8',
            name: 'MATO 8 Modular Scaffolding System',
            summary:
              'An eight-way rosette node system that builds and expands in every direction, for industrial, chemical and event-scale scaffolding.',
            description:
              'Modular scaffolding system designed for applications that are not possible with traditional systems. The MATO 8 features special connection technology with eight gratings on vertical stems allowing installation and expansion in all directions.',
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
        imageId: 'Scaffolding_-_Board_brackets_-_Cuplock_rqtnc5',
        faqs: [],
        products: [
          {
            slug: 'cuplock-system',
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: 'Scaffolding_-_Board_brackets_-_Cuplock_rqtnc5',
              gallery: ['16_hn8sur', '17_ncnl1g', '18_ohtdnh', '19_x0enhs', '20_xpl2ap', MEDIA.plantLineWide],
              showcase: ['30_litgdm', '17_ncnl1g', '20_xpl2ap', MEDIA.warehouse],
              video: MEDIA.productionVideo,
              videoLabel: '',
              inUse: MEDIA.rituSamrudhiThane,
              inUseCaption: '',
            },
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
        imageId: 'ChatGPT_Image_Sep_10_2026_05_37_34_PM_vhcwv8',
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
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: 'ChatGPT_Image_Sep_10_2026_05_37_34_PM_vhcwv8',
              gallery: [MEDIA.rollingTowers, MEDIA.warehouse],
              showcase: [MEDIA.rollingTowers, MEDIA.hardHat],
              video: MEDIA.packagingVideo,
              videoLabel: '',
              inUse: MEDIA.palikaInfratech,
              inUseCaption: '',
            },
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
        imageId: 'MATO_Z_vvgwjl',
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
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: 'ChatGPT_Image_Sep_10_2026_05_46_55_PM_tanpdj',
              gallery: ['ChatGPT_Image_Sep_10_2026_05_47_55_PM_klasd9', 'Screenshot_2026-09-10_175319_mwasfl', 'ChatGPT_Image_Sep_10_2026_05_54_09_PM_woxt9x'],
              showcase: ['ChatGPT_Image_Sep_10_2026_05_50_29_PM_ynoiuz', 'ChatGPT_Image_Sep_10_2026_05_50_29_PM_ynoiuz'],
              video: MEDIA.componentSequenceVideo,
              videoLabel: '',
              inUse: MEDIA.towerAerialTop,
              inUseCaption: '',
            },
            model: 'MATO Z',
            name: 'MATO Z Scaffolding Accessories',
            summary:
              'An accessories programme which leaves nothing to be desired" — decking, couplers, stairs and railings for any MATO or third-party scaffold.',
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
        slug: 'low-heavy-duty-props',
        name: 'Light/Heavy-Duty Props',
        summary:
          'One propping range: telescoping single-point props for infill and small bays, and tower-based heavy-duty systems for mid-rise slabs and bridge-deck falsework.',
        imageId: 'IMG_0376_gklxqf',
        faqs: [
          {
            q: 'Which prop do I need — Flex, Type A or Type M?',
            a: 'Flex for infill areas and smaller bays that do not justify a full tower. Type A for mid-rise slab and transfer-structure support. Type M where leg loads or height exceed Type A, such as bridge decks and heavy transfer beams.',
          },
          {
            q: 'What does a Flex prop connect to?',
            a: 'Tobler Deck panels and standard H20 beam spans, so it drops into a slab-forming layout without proprietary adapters.',
          },
          {
            q: 'What is the difference between Type A and Type M?',
            a: 'Type M carries a heavier prop and frame profile for higher leg loads and taller falsework; Type A covers general mid-rise slab and transfer support. They share accessories and site-handling practice.',
          },
          {
            q: 'How is tower height determined for a project?',
            a: "Every configuration is verified by Tobler's engineering team against project-specific load cases before deployment.",
          },
        ],
        products: [
          {
            slug: 'low-heavy-duty-props',
            media: {
              main: 'IMG_0376_gklxqf',
              gallery: [
                '31_dnelwn',
                '32_wwfgxf',
                '33_ctkgkg',
                '34_fxncuu',
                MEDIA.lightDutyProps,
                // 'tobler/site/image-9',
                // 'tobler/site/image-10',
                MEDIA.heavyDutyProps,
                MEDIA.extrusionStack,
                // MEDIA.loadTestRig,
                // MEDIA.pressBrake,
                // MEDIA.shearingLine,
              ],
              showcase: ['35_swjkqo', '36_tcvcai', '37_m3tlzm', MEDIA.hardHat],
              video: [MEDIA.drillingCenterVideo, MEDIA.laserCuttingVideo, MEDIA.weldingRobotVideo],
              videoLabel: '',
              inUse: MEDIA.suryaconOpusTower,
              inUseCaption: '',
            },
            model: 'Flex / Type A / Type M',
            name: 'Light/Heavy-Duty Props',
            summary:
              'The full Tobler propping range in one system — from a telescoping single-point prop to stacked heavy-duty towers for bridge-deck falsework.',
            description:
              "Tobler props fulfil load class B, C, D or E in accordance with EN 1065 and EN 12812. The galvanised props with forged and robust threaded nut guarantee a very long service life in accordance with EN 10346 and EN 2081. The quick release thread has a larger pitch than comparable products, and production uses state-of-the-art processes such as thread rolling, which eliminates the usual welded connection at the transition from the threaded section to the outer tube. The patented foot reinforcement with additional protection against deformation ensures an even longer service life. Flex pairs directly with Tobler Deck panels and H20 beam spans; Type A and Type M stack pre-fabricated prop and frame sections into towers of variable height where single props cannot carry the load or reach the required height.",
            features: [
              'Telescoping tube with pinned fine-adjustment collar (Flex)',
              'Stacks into towers of variable height for slab and beam soffit support (Type A and M)',
              'Compatible with Tobler Deck panels and H20 beam spans',
              'Matching frames for cross-bracing and stability',
              'Heavier prop and frame profile on Type M for higher leg loads',
              'Full accessory range for infill and edge conditions',
              'Every tower configuration verified against project-specific load cases',
              'Economical for smaller slab bays through to bridge-deck falsework',
            ],
            typicalApplications: [
              '● Slab and beam formwork',
              '● Supporting aluminium monolithic formwork',
              '● Conventional slab shuttering',
              '● Temporary structural support',
              '● Repair and renovation works',
              '● Construction and infrastructure projects',
              '● Propping during formwork erection and dismantling',
            ],
            whyChooseToblerProps: [
              'Tobler Props combine strength, adjustability and durability to deliver dependable temporary support on site. Their robust construction and practical design make them an economical and versatile solution for contractors looking for safe, reusable and high-performance propping equipment. Tobler – Swiss Engineering. Trusted Performance.',
            ],
            applications: [
              'Infill support around shoring towers',
              'Smaller slab bays not justifying a full tower',
              'Beam-soffit and edge-condition propping',
              'Mid-rise slab and transfer beam support',
              'Falsework where standard single props lack capacity or reach',
              'General heavy-duty shoring towers',
              'Bridge deck and pier-cap falsework',
              'Tall, high-load shoring towers',
            ],
            specifications: [
              { label: 'Range', value: 'Flex (light-duty), Type A and Type M (heavy-duty)' },
              { label: 'Material', value: 'Galvanised steel tube with cast fittings; high-grade steel on Type A and M' },
              { label: 'Adjustment', value: 'Pinned fine-adjustment collar, rolled quick-release thread' },
              { label: 'Compliance', value: 'EN 1065 (Flex), EN 12812 (Type A and M)' },
            ],
            variants: [
              {
                name: 'Flex Adjustable',
                description:
                  "A telescoping single-point prop for slab, beam-soffit and infill support wherever a full tower isn't justified. Pairs directly with Tobler Deck panels and H20 beam spans.",
              },
              {
                name: 'Type A Heavy-Duty',
                description:
                  'A robust, lightweight prop and frame combination for mid-rise slab and transfer-structure support, with matching frames for cross-bracing and stability.',
              },
              {
                name: 'Type M Heavy-Duty',
                description:
                  'The higher-capacity prop and frame combination for bridge deck and heavy transfer-beam falsework, where leg loads and total height exceed what Type A can carry safely.',
              },
            ],
            certifications: ['EN 1065', 'EN 12812'],
            downloads: [
              { label: 'Tobler Flex Catalogue', kind: 'brochure', href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-flex-in-en-low.pdf` },
              {
                label: 'Tobler Tower Heavy-Duty Props Catalogue',
                kind: 'brochure',
                href: `${FORMWORK_DOCS}/Produktkataloge/20250922-tobler-tower-schwerlaststuetzen-in-en-low.pdf`,
              },
            ],
          },
        ],
      },
      {
        slug: 'event-solutions',
        name: 'Event Solutions',
        summary:
          'High-performance modular systems for concerts, grandstands, exhibitions and touring.',
        imageId: '9_xsqgke',

        // `q`/`a`, not `question`/`answer` — FAQAccordion reads the short keys,
        // and the long ones rendered four blank rows.
        faqs: [
          {
            q: 'What are Tobler Event Solutions?',
            a: 'Tobler Event Solutions are high-performance modular systems designed for concerts, grandstands, exhibitions and touring applications.',
          },
          {
            q: 'What event systems does Tobler offer?',
            a: 'The Event Solutions range includes Event Stage Decks, Modular Grandstands & Seating, Aluminium Truss Systems, and FOH & Specialist Towers.',
          },
          {
            q: 'Are the systems suitable for indoor and outdoor events?',
            a: 'The Event Stage Deck system is specified for indoor and outdoor applications including halls, marquees and festivals.',
          },
          {
            q: 'Are the systems designed for rapid installation?',
            a: 'The catalogue specifies crane-free rapid manual erection for the Event Stage Deck system and rapid crane-free assembly for PA towers and video screen frames.',
          },
        ],

    
        products: [
          {
            slug: 'tobler-event-systems',
            model: 'Event Solutions',
            name: 'Tobler Event Solutions',
            summary:
              'Stage decking, grandstands, truss and front-of-house towers — one modular event range, erected without a crane.',

            /* Media slots for the whole range. Every id lives in media-map.js
               under the EVENT SOLUTIONS block, so a picture is pasted in one
               place and follows everywhere it appears. Any slot left null falls
               back to the blueprint placeholder, so these fill in one at a time.

               `showcase` is positional — entry N pairs with `details` block N
               below, so the two lists have to stay in the same order. */
            media: {
              main: '9_xsqgke',           // card tile + gallery lead frame
              gallery: [
                '12_fymyb0',
                '14_ni3ywu',
                '11_xokoe6',
                '7_egsafb',
                '1_lypi79',
                '11_xokoe6',
                '4_zxbttl',

 ],
              showcase: [
                '2_ef9ndq',               // 1 — Event Stage Decks
                '6_h1f0vx',           // 2 — Modular Grandstands & Seating
                '10_jvrpyb',               // 3 — Aluminium Truss Systems
                '13_u7wbwz',                    // 4 — FOH & Specialist Towers
              ],
              video: MEDIA.eventSolutionsVideo,     // leads the gallery when set
              videoLabel: '',
              inUse: MEDIA.eventSolutionsBand,      // wide full-bleed band
              inUseCaption: '',
            },

            description:
              'Tobler Event Solutions cover the four systems an event build needs: weather-resistant stage decking, modular grandstands and seating, aluminium truss for rigging, and turnkey front-of-house, PA and video-screen towers. All four share the bolt-free MATO 8 ringlock language used across the Tobler scaffolding range, so they erect by hand without a crane and level off on uneven ground.',

            /* One block per system — these are what the showcase renders, image
               and text trading sides down the page. */
            details: [
              {
                title: 'Event Stage Decks',
                content:
                  'Weather-resistant aluminium framing over a hot-dip galvanized steel sub-structure, decked with anti-slip phenolic-coated panels and sealed at the edges against the weather. The bolt-free Quick-Lock MATO 8 ringlock connection means a full stage goes up by hand, without a crane, and levels off across sloped ground.\n\nFive bay formats are catalogued — EV 86, EV 86+, EV 86Q, EV 100 and EV 104 — carrying 5.0 to 7.5 kN/m², indoors or out: halls, marquees, festivals and touring productions.',
              },
              {
                title: 'Modular Grandstands & Seating',
                content:
                  'Standardised modular units on a metric 2.00 m / 2.57 m bay grid, with three rise increments (16.6, 25 and 33.3 cm) and a choice of high-durability phenolic non-slip plywood or textured aluminium plate decking.\n\nChild-safe vertical bar railings at a 110 mm gap, heavy-duty crowd barriers, integrated guardrails and kickplates are part of the system rather than an add-on. Seating is either UV-stabilized polypropylene bucket seats or continuous bench tiers.',
              },
              {
                title: 'Aluminium Truss Systems',
                content:
                  'Engineered from 6082-T6 high-tensile structural aluminium in two duties: medium-duty H30V at 287 mm outer dimension and 239 mm axis on Ø16 × 2.0 mm diagonals, and heavy-duty H40V at 387 mm outer and 339 mm axis on Ø20 × 2.0 mm.\n\nStraight lengths run 0.50 m to 4.00 m, joined by conical connectors and spigots, with 2-way and 3-way 90° corners and box corners for lighting, audio, video and stage rigging.',
              },
              {
                title: 'FOH & Specialist Towers',
                content:
                  'Turnkey modular towers for front-of-house, PA and video-screen work, in one, two and three storeys on a 4.00 × 4.00 m two-bay or 6.00 × 4.00 m three-bay footprint, with a column-free front opening.\n\nWeather protection is integrated: keder rail holders with heavy-duty side and roof tarpaulins, optional entrance steps and overhang canopy roofs. PA towers erect self-standing or guyed on counterweighted ground frames, crane-free, referencing DIN EN 13814 for heavy-load support at Wind Zone 4.',
              },
            ],

            features: [
              'Bolt-free Quick-Lock MATO 8 ringlock connection across the range',
              'Weather-resistant aluminium framing on hot-dip galvanized steel sub-structures',
              'Anti-slip phenolic coated decking, or textured aluminium plate',
              'Crane-free rapid manual erection',
              'Level adjustment across sloped and uneven ground',
              'Child-safe vertical bar railings, crowd barriers, guardrails and kickplates',
              '6082-T6 high-tensile aluminium truss in medium-duty and heavy-duty',
              'Straight, 2-way, 3-way and box corner truss configurations',
              'Integrated weather protection with keder rail holders and tarpaulins',
              'Self-standing, guyed or counterweighted tower configurations',
            ],

            applications: [
              'Concert stages',
              'Festivals and outdoor events',
              'Event halls and marquees',
              'Touring productions',
              'Temporary spectator seating',
              'Event and stadium venues',
              'Stage and lighting rigging',
              'Audio and PA systems',
              'Video and production installations',
              'Front-of-house towers',
              'Video screen frames',
              'Festival infrastructure',
              'Temporary event structures',
            ],

            keyUSPs: [
              '7.5 kN/m² maximum permissible deck load',
              'Bolt-free Quick-Lock MATO 8 ringlock connection',
              'Crane-free rapid manual erection',
              'Indoor and outdoor suitability',
              'EN 13814 standard reference',
              'Three grandstand rise options on a 2.00 / 2.57 m grid',
              '6082-T6 structural aluminium truss, medium and heavy duty',
              'Column-free FOH front opening with integrated weather protection',
              'Wind Zone 4 specification stated in catalogue',
            ],

            /* One flat table, so every label carries its system — SpecTable keys
               on the label and renders no group headings of its own. */
            specifications: [
              { label: 'Stage Deck — EV 86', value: 'Bay 2.07 × 2.57 m | Deck 0.86 × 2.07 m | 3 decks | 5.0 kN/m²' },
              { label: 'Stage Deck — EV 86+', value: 'Bay 2.07 × 2.57 m | Deck 0.86 × 2.07 m | 3 decks | 7.5 kN/m²' },
              { label: 'Stage Deck — EV 86Q', value: 'Bay 2.57 × 2.57 m | Deck 0.86 × 2.57 m | 3 decks | 5.0 kN/m²' },
              { label: 'Stage Deck — EV 100', value: 'Bay 2.00 × 2.00 m | Deck 1.00 × 2.00 m | 2 decks | 7.5 kN/m²' },
              { label: 'Stage Deck — EV 104', value: 'Bay 2.07 × 2.07 m | Deck 1.04 × 2.07 m | 2 decks | 7.5 kN/m²' },

              { label: 'Grandstand — Grid System', value: 'Standard metric — 2.00 m / 2.57 m bays' },
              { label: 'Grandstand — Rise per Tier', value: '16.6 cm / 25 cm / 33.3 cm step increments' },
              { label: 'Grandstand — Deck Surfaces', value: 'High-durability phenolic non-slip plywood or textured aluminium plate' },
              { label: 'Grandstand — Railing Types', value: 'Child-safe vertical bars with 110 mm gap and heavy-duty crowd barriers' },
              { label: 'Grandstand — Seat Types', value: 'UV-stabilized polypropylene bucket seats or continuous bench tiers' },

              { label: 'Truss — H30V', value: '287 mm outer dimension | 239 mm axis | Diagonal brace Ø16 × 2.0 mm' },
              { label: 'Truss — H40V', value: '387 mm outer dimension | 339 mm axis | Diagonal brace Ø20 × 2.0 mm' },
              { label: 'Truss — Material', value: '6082-T6 high tensile structural aluminium' },
              { label: 'Truss — 0.50 m', value: 'H30V 4.0 kg | H40V 4.7 kg' },
              { label: 'Truss — 1.00 m', value: 'H30V 6.8 kg | H40V 8.1 kg' },
              { label: 'Truss — 2.00 m', value: 'H30V 12.5 kg | H40V 15.2 kg' },
              { label: 'Truss — 3.00 m', value: 'H30V 18.9 kg | H40V 20.8 kg' },
              { label: 'Truss — 4.00 m', value: 'H30V 23.9 kg | H40V 26.8 kg' },

              { label: 'FOH Tower — Storeys', value: '1 / 2 / 3 storeys' },
              { label: 'FOH Tower — 2-Bay Footprint', value: '4.00 × 4.00 m or 4.14 × 4.14 m' },
              { label: 'FOH Tower — 3-Bay Footprint', value: '6.00 × 4.00 m or 6.21 × 4.14 m' },
              { label: 'FOH Tower — Weather Protection', value: 'Keder rail holders with heavy-duty side and roof tarpaulins' },
              { label: 'PA Towers', value: 'Self-standing or guyed' },
              { label: 'Ground Frames', value: 'Counterweighted ground frames with heavy-load support specification' },
            ],

            // DIN EN 13814 is the German adoption of the same standard the stage
            // deck cites, so the range carries it once rather than twice.
            certifications: ['EN 13814'],

            downloads: [],
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
  
    heroImageId: 'ChatGPT_Image_Sep_10_2026_02_58_00_PM_grkohb',
    
   
    subcategories: [
      {
        slug: 'monolithic-formwork',
        name: 'Monolithic Aluminium Formwork',
        summary:
          'Single-pour aluminium formwork for walls, slabs, beams and staircases, Swiss engineering combined with high-cycle reuse.',
        imageId: '_1_11_1_w20ogy',
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
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: '_1_11_1_w20ogy',
              gallery: ['_5_7_1_fjmhpf', '_3_10_aqezv6', '_6_8_1_j4ylyo'],
              // showcase: [MEDIA.monolithicAluminiumFormwork, MEDIA.panelBench, MEDIA.panelTeam, MEDIA.panelHandover],
              video: 'All_1_g17nro',
              inUse: MEDIA.suryaconOpusTower1,
              inUseCaption: '',
            },
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
        imageId: 'ChatGPT_Image_Sep_13_2026_11_46_53_AM_uowzmb',
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
            slug: 'manu-wall-formwork-system',
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: 'ChatGPT_Image_Sep_13_2026_11_46_53_AM_uowzmb',
              gallery: [MEDIA.panelStacks, MEDIA.componentDetail],
              showcase: [MEDIA.panelHandover, MEDIA.panelStacks, MEDIA.componentDetail, MEDIA.panelBench],
              video: [MEDIA.laserWeldingVideo, MEDIA.productionVideo],
              videoLabel: '',
              inUse: MEDIA.panelYard,
             
            },
            model: 'Tobler Manu',
            name: 'Manu Wall Formwork System',
            summary: 'A complete crane-free handset wall formwork system with standard wall elements, levelling and corner elements — built for up to 1,500 reuses.',
            description:
              "Tobler Manu Wall Formwork is the complete, lightest, toughest handset formwork system — fully hand-managed with no crane required. The system comprises standard wall elements with solid aluminium frame profiles featuring ergonomic cross-sections for grip, plus purpose-made levelling and corner elements that complete installations on any floor plan and layout. The formwork shell is rated for up to 1,500 uses. Openings at standard positions accept push-pull props for fast, secure connections. Levelling elements absorb slab-to-slab height variance, and corner pieces avoid site-fabricated fixes at internal and external corners.",
            features: [
              'No crane required — fully hand-managed installation',
              'Solid aluminium frame profile with ergonomic cross-section for grip',
              'Formwork shell withstands up to 1,500 uses',
              'Openings for push-pull props at standard positions',
              'Purpose-made corner pieces avoid site-fabricated fixes at inside and outside corners',
              'Levelling elements absorb slab-to-slab height variance',
              'Integrated anchor and connection system across all element types',
              'Compatible with Tobler Top wall formwork',
            ],
            applications: [
              'Residential and commercial wall pours without crane access',
              'Repetitive unit layouts',
              'Internal and external corners on any wall layout',
              'Levelling between floors of varying slab tolerance',
              'Sites prioritizing labour flexibility over crane-cycle speed',
              'Multi-storey wall and core construction',
            ],
            specifications: [
              { label: 'Standard Heights', value: '75 / 100 / 150 / 300 cm' },
              { label: 'Element Widths', value: '25 / 50 / 75 cm' },
              { label: 'Anchor Pitch', value: '5 cm increments' },
              { label: 'Reuse Rating', value: 'Up to 1,500 uses' },
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
        name: 'Deck Slab Formwork',
        summary: 'Lightweight aluminium deck panels for slab pours, mounted from below by a single worker without a crane.',
        imageId: '2_jewlbe',
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
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: '2_jewlbe',
              gallery: [MEDIA.deckSlabFormwork, MEDIA.extrusionStack],
              showcase: ['6_e25a2u', '2_jewlbe', '4_ohimxc', '5_ch7ovo', MEDIA.warehouse],
              video: MEDIA.siteDroneVideoDeck,
              videoLabel: '',
              inUse: MEDIA.rituSamrudhiThane1,
            },
            model: 'Tobler Deck',
            name: 'Tobler Deck Slab Formwork System',
            summary: 'A 45 kg, single-person deck panel that mounts from below and fits almost any floor plan economically.',
            description:
              'The ultra-fast slab formwork from lightweight construction specialist Tobler AG can be assembled by just one person. Thanks to our lightweight construction expertise, a single person can assemble Tobler Deck formwork elements. Hanging into the Tobler Flex props and swivelling upwards is done with ease. A standard 180 × 180 cm aluminium panel with a formwork surface of 3.24 m² weighs only 45 kg. The particularly low weight ensures a high working speed and significant economic advantage. Tobler Deck guarantees maximum economic efficiency and an important competitive advantage.',
            yourAdvantages: [
              'Mounting from below by just one person',
              'Maximum manufacturing precision for perfect joint alignment',
              'Great load-bearing capacity, up to 50 cm ceiling thickness',
              'Maximum efficiency in industrial and residential building',
              'Powder-coated frame for unique longevity',
              'Minimum cleaning effort',
            ],
            deckDetails: [
              {
                title: 'Unrivalled Working Pace',
                content: 'The aluminium panel measuring 180 × 180 cm (3.24 m² contact form area) is an absolute lightweight. Weighing just 45 kg, it enables a consistently brisk working speed – and thus unique cost effectiveness. Thanks to the optimised ergonomics of the formwork panels and props, the Tobler Deck system is extremely pleasant to handle. The panels can also be perfectly stacked. For safe transport, matching edge protectors are available.',
              },
              {
                title: 'Ideal Results',
                content: 'Dimensional precision ensures exact positioning and perfect joint pattern. The 180 × 180 cm format is recommended for shuttering larger areas. This allows to realize slab thicknesses of up to 50 cm. Tobler Deck is characterised by the highest manufacturing quality. This dimensional precision ensures exact positioning and ensures a perfect joint pattern.',
              },
              {
                title: 'Powder Coating with Multiple Benefits',
                content: 'The powder-coated frame guarantees a long service life. The extremely robust and protected formlining ensures exceptionally long service lives without refurbishment. The powder coating necessitates only minimal cleaning, as adherence of concrete is minimized by the coating. The particularly robust construction ensures an important competitive advantage.',
              },
              {
                title: 'Ergonomically Shaped',
                content: 'Thanks to the optimised ergonomics of the formwork panels and props, the Tobler Deck system is extremely pleasant to handle. The panels can be perfectly stacked and safely transported with matching edge protectors. System components are designed for maximum ease of handling and installation.',
              },
              {
                title: 'The Right Element for Every Geometry',
                content: 'In addition to the standard formats, custom sizes can also be ordered. Take profit from Tobler\'s flexibility and customer focus. Standard lengths available: 90 | 180 cm. Standard widths available: 45 | 60 | 75 | 90 | 180 cm. Flexible formwork elements: 55–90 × 90 cm | 55–90 × 180 cm.',
              },
              {
                title: 'Tobler Care – Formwork Renovation',
                content: 'Regular cleaning and maintenance is essential for the long-term preservation of the formwork material and high-quality results. Tobler offers full renovation in Swiss quality, including removal of plates, cleaning of profiles with up to 1,000 bar water pressure, removal of concrete residues, covering of frames with desired plate (phenolic resin, plastic coating, Alkus) and sealing with high-quality joint sealant. Benefits: Save time and money with extended formwork life, competent inspection by professionals, crediting of residual value when trading in, full renovation in Switzerland, and guarantee of professional renovation.',
              },
              {
                title: 'System Replacement – New for Old',
                content: 'Tobler offers the option to exchange used or no longer cost-effective formwork and scaffolding systems for new material. Expert advisers are your competent contacts for system replacement. Trade in your old system and receive credit towards new Tobler formwork solutions.',
              },
            ],
            panelOptions: [
              { category: 'Standard Lengths', value: '90 cm | 180 cm' },
              { category: 'Standard Widths', value: '45 cm | 60 cm | 75 cm | 90 cm | 180 cm' },
              { category: 'Flexible Elements', value: '55–90 × 90 cm | 55–90 × 180 cm' },
              { category: 'Custom Sizes', value: 'Available on request' },
            ],
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
              'Available in multiple standard and custom sizes to fit any floor plan',
              'Professional renovation and system replacement services available',
            ],
            applications: [
              'Slab formwork up to 50 cm ceiling thickness',
              'Industrial and residential floor plates',
              'Fast, single-crew slab cycles without crane dependency',
              'Large-area shuttering with 180 × 180 cm standard format',
              'Projects requiring custom panel geometries',
            ],
            specifications: [
              { label: 'Standard Panel', value: '180 × 180 cm' },
              { label: 'Panel Weight', value: '45 kg' },
              { label: 'Contact Area', value: '3.24 m² per panel' },
              { label: 'Max Slab Thickness', value: '50 cm' },
              { label: 'Standard Lengths', value: '90 / 180 cm' },
              { label: 'Standard Widths', value: '45 / 60 / 75 / 90 / 180 cm' },
              { label: 'Flexible Elements', value: '55–90 × 90 cm | 55–90 × 180 cm' },
              { label: 'Formlining Options', value: 'Phenolic resin, plastic-coated, Alkus' },
              { label: 'Surface Finish', value: 'Powder-coated frame for durability and minimal adhesion' },
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
        imageId: 'Thumbnail_-_2_d7f5ai',
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
            /* The one place this product pictures live. Paste a Cloudinary key on any
               line below and it changes everywhere the product appears. `showcase` is
               positional: entry N pairs with feature block N. */
            media: {
              main: 'Thumbnail_-_2_d7f5ai',
              gallery: ['Safety_Screen_Protection_-_High-quality_neoprene_rubber_sheets_k4ofpm', 'Safety_Screen_Protection_-_High-Tensile_Structural_Steel_t3aouv', 'Safety_Screen_Protection_-_Intelligent_Hydraulic_Power_Pack_bdjjlt', 'Safety_Screen_Protection_-_Forged_Combination_Plate_gzrwz7', 'Safety_Screen_Protection_-_Grade_10.9_Fasteners_jmg00m', 'Safety_Screen_Protection_-_High-Strength_Climbing_Anchorage_Components_ptdyul', 'Safety_Screen_Protection_-_Hot-Dip_Galvanized_Components_unxbmq'],
              video: [ MEDIA.protectionScreenVideoAlt],
              videoLabel: '',
              inUse: MEDIA.towerAerialNight,
              
            },
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
      {
        slug: 'alu-deck-formwork',
        name: 'Alu Deck Formwork',
        summary: 'Modular monolithic deck formwork for repetitive flat-slab construction — form faster, strip earlier, reuse faster.',
        imageId: '_3_5_dzcnjw',
        faqs: [
          {
            q: 'What is the maximum slab thickness supported?',
            a: 'The Tobler Alu Deck System supports monolithic flat-slab casting up to 500 mm ceiling thickness.',
          },
          {
            q: 'How many panel sizes are available?',
            a: 'Five standard panel sizes are catalogued, from 0.9 × 0.9 m up to 1.8 × 1.2 m, covering 0.81 to 2.16 m² per panel.',
          },
          {
            q: 'What is the key advantage of this system?',
            a: 'The integrated workflow enables early striking without prop removal, reducing floor-to-floor cycle times significantly.',
          },
        ],
        products: [
          {
            slug: 'tobler-alu-deck-system',
            /* Media placeholders — add Cloudinary keys here as images become available */
            media: {
              main: '_3_5_dzcnjw',
              gallery: ['7__cjzhrw', '6__a9nynp', '2__mgebzr', '_3_5_dzcnjw', '_1_6_biqtj2'],
              showcase: ['_1_6_biqtj2', '_4_7_gvv07w', '', ''],
              video: '',
              videoLabel: '',
              inUse: '',
              inUseCaption: '',
            },
            model: 'Tobler Alu Deck',
            name: 'Tobler Alu Deck System',
            summary: 'Modular monolithic deck formwork for repetitive flat-slab construction — form faster, strip earlier, reuse faster.',
            description:
              'Full Aluminium. Faster Cycles. Superior Finishes. The Tobler Alu Deck Slab Formwork System is a fully aluminium slab formwork solution engineered for high-speed construction, ease of handling, and consistently superior concrete surface finishes. Its lightweight yet robust design enables efficient assembly, dismantling, and repositioning, helping contractors achieve faster floor cycles and improved site productivity.',
            systemWorkflow: [
              {
                step: 'Erect',
                description: 'Position adjustable props and set aluminium panels to height with precision drophead alignment.',
              },
              {
                step: 'Align',
                description: 'Fine-adjust using drophead screw jacks for perfect flatness and levelness across the slab.',
              },
              {
                step: 'Pour',
                description: 'Cast concrete up to 500 mm ceiling thickness across the modular panel layout.',
              },
              {
                step: 'Strike',
                description: 'Early striking capability — dropheads lower to release concrete; reset for next floor without removing props.',
              },
              {
                
                step: 'Reposition',
                description: 'Lift props and reposition panels for the next floor level in sequence.',
              },
              {
                step: 'Reuse',
                description: 'High panel reusability across repetitive construction cycles reduces long-term formwork costs.',
              },
            ],
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
            panelSizes: [
              { size: '1.8 × 1.2 m', coverage: '2.16 m²', weight: '41.0 kg' },
              { size: '1.8 × 0.9 m', coverage: '1.62 m²', weight: '32.2 kg' },
              { size: '1.2 × 1.2 m', coverage: '1.44 m²', weight: '27.0 kg' },
              { size: '1.2 × 0.9 m', coverage: '1.08 m²', weight: '21.6 kg' },
              { size: '0.9 × 0.9 m', coverage: '0.81 m²', weight: '16.1 kg' },
            ],
            features: [
              'Modular aluminium panels in five standard sizes covering up to 2.16 m² per panel',
              'Adjustable prop system with screw-jack fine-tuning for precise flatness',
              'Integrated drophead striking system for early concrete release',
              'Monolithic flat-slab casting up to 500 mm ceiling thickness',
              'High reusability across repetitive floor construction cycles',
              'Rapid erection and repositioning workflow optimized for speed',
              'Compatible with standard site equipment and lifting methods',
              'Precision-engineered components ensure consistent alignment and joint quality',
            ],
            applications: [
              'Repetitive flat-slab construction in residential towers',
              'Commercial building multi-storey floor plates',
              'Institutional and hospitality projects with modular floor design',
              'Fast-track construction prioritizing rapid floor cycles',
              'Projects requiring monolithic slab casting and early formwork removal',
              'Floor systems up to 500 mm thickness',
            ],
            specifications: [
              { label: 'System Type', value: 'Modular Monolithic Deck Formwork' },
              { label: 'Application', value: 'Flat-slab construction' },
              { label: 'Support System', value: 'Adjustable prop + drophead' },
              { label: 'Striking Method', value: 'Drophead screw-jack' },
              { label: 'Max Slab Thickness', value: 'Up to 500 mm' },
              { label: 'Panel 1', value: '1.8 × 1.2 m | 2.16 m² | 41.0 kg' },
              { label: 'Panel 2', value: '1.8 × 0.9 m | 1.62 m² | 32.2 kg' },
              { label: 'Panel 3', value: '1.2 × 1.2 m | 1.44 m² | 27.0 kg' },
              { label: 'Panel 4', value: '1.2 × 0.9 m | 1.08 m² | 21.6 kg' },
              { label: 'Panel 5', value: '0.9 × 0.9 m | 0.81 m² | 16.1 kg' },
              { label: 'Material', value: 'Aluminium alloy with precision engineering' },
              { label: 'Compliance', value: 'EN 12812' },
            ],
            faqs: [
              {
                q: 'What is the maximum slab thickness the Tobler Alu Deck System supports?',
                a: 'The system is engineered for monolithic flat-slab casting up to 500 mm ceiling thickness with adjustable prop and drophead support.',
              },
              {
                q: 'How quickly can I strike the formwork after pouring?',
                a: 'The integrated drophead striking system allows early concrete release without removing props. Strike timing depends on concrete strength gain per your project schedule.',
              },
              {
                q: 'What panel sizes are available?',
                a: 'Five standard panel sizes are catalogued: 1.8 × 1.2 m (2.16 m²), 1.8 × 0.9 m (1.62 m²), 1.2 × 1.2 m (1.44 m²), 1.2 × 0.9 m (1.08 m²), and 0.9 × 0.9 m (0.81 m²). Panels combine to fit any floor layout.',
              },
              {
                q: 'How many reuse cycles does a panel support?',
                a: 'The system is engineered for high reusability across repetitive construction cycles. Exact cycle ratings depend on maintenance and site conditions; contact Tobler for project-specific cycle performance data.',
              },
              {
                q: 'How do I achieve perfect flatness across the slab?',
                a: 'The drophead screw-jack system provides precise height and levelness adjustment on site. Erect panels, engage dropheads with micro-adjustment capability, and dial in flatness before pouring.',
              },
              {
                q: 'Can the system adapt to irregular floor perimeters?',
                a: 'Yes, the modular panel range and standard edge trim allow configuration around most building geometries. Consult Tobler engineering for complex perimeter conditions.',
              },
              {
                q: 'What floor-to-floor cycle time should I plan for?',
                a: 'Typical cycles on multi-storey projects range from 5–7 days per floor once crews are trained and the system is in rhythm, depending on concrete strength, striking strategy, and site logistics.',
              },
              {
                q: 'Do you offer technical training and support?',
                a: 'Yes, Tobler provides technical training, engineering consultation and on-site support as part of system deployment and ongoing project assistance.',
              },
            ],
            certifications: ['EN 12812'],
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
