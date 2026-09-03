import { Suspense, lazy } from 'react'
import Container from '../common/Container.jsx'
import SectionTitle from '../common/SectionTitle.jsx'
import Button from '../common/Button.jsx'
import Mosaic from '../ui/Mosaic.jsx'
import { SITE_PHOTOS } from '../../data/gallery.js'
import { MEDIA } from '../../data/media-map.js'
import { EXHIBITIONS } from '../../data/exhibitions.js'

// Split out so framer-motion never lands in the homepage's first-paint chunk.
// Until it arrives the identical static Mosaic stands in, so the section is
// complete from the first render and only gains motion afterwards.
const ShuffleGrid = lazy(() => import('../ui/ShuffleGrid.jsx'))

/* Dark photo band on the homepage.

   Sits between two light card grids and carries no cards of its own — the
   subject is the photography itself: live sites, the manufacturing floor and
   the team. Every tile is a real Tobler asset from the Cloudinary library; the
   alt text stays descriptive rather than naming products, because these frames
   are not product photography. */

// Fixed height on both the static and animated grid so the lazy swap can't
// shift the page.
const MOSAIC_HEIGHT = 'h-[340px] sm:h-[420px] lg:h-[480px]'

// Sixteen tiles, no repeats: the plant, live towers and the exhibition stand,
// so the band reads as the whole company rather than one room. Drawn from the
// named slots in media-map where the frame matters and from the generated
// lists where any frame from that set will do.
const TILES = [
  { id: 1, publicId: MEDIA.plantLineWide, alt: 'The machining line inside the Tobler plant' },
  { id: 2, publicId: MEDIA.towerAerial, alt: 'Tower wrapped in Tobler protection screens' },
  { id: 3, publicId: EXHIBITIONS[0]?.publicId || 'DSC_6250_bgzv1h', alt: 'Tobler team at an industry exhibition' },
  { id: 4, publicId: MEDIA.weldingArc, alt: 'Welding a formwork component' },
  { id: 5, publicId: MEDIA.panelCrew, alt: 'Wider crew shot in the assembly bay' },
  { id: 6, publicId: EXHIBITIONS[5]?.publicId || 'DSC_6228_fjpevf', alt: 'Tobler professionals at an industry event' },
  { id: 7, publicId: MEDIA.pressBrake, alt: 'CNC press brake on the production floor' },
  { id: 8, publicId: MEDIA.panelStacks, alt: 'Finished aluminium panels banded and stacked' },
  { id: 9, publicId: SITE_PHOTOS[0]?.publicId || 'tobler/site/image-9', alt: 'Tobler team engagement at an event' },
  { id: 10, publicId: 'tobler/site/image-6', alt: 'Tower crane over a building under construction' },
  { id: 11, publicId: MEDIA.cncCentre, alt: 'CNC machining centre cutting profile' },
  { id: 12, publicId: EXHIBITIONS[10]?.publicId || 'DSC_6174_kci1wa', alt: 'Tobler exhibition stand and team' },
  { id: 13, publicId: 'tobler/site/image-1', alt: 'Scaffolding erected against a building facade' },
  { id: 14, publicId: MEDIA.panelHandover, alt: 'Two operators lifting a finished formwork panel' },
  { id: 15, publicId: MEDIA.towerAerialNight, alt: 'Lit tower under construction after dark' },
  { id: 16, publicId: MEDIA.assemblyBay, alt: 'Panels moving through the assembly bay' },
]

function SiteMosaicSection() {
  return (
    <section className="bg-shopify-surface-warm py-24 md:py-30">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <span className="text-sm font-semibold text-shopify-green">
              On site &amp; in production
            </span>

            <SectionTitle
              size="display"
              title="Engineering You Can See on the Ground"
              description="From our manufacturing floor to live infrastructure, high-rise and industrial sites, all our systems are erected, supervised and supported by the same team that engineered them."
            />

            <div className="flex flex-wrap gap-3">
              <Button to="/projects" variant="shopify" shape="pill" size="lg" icon={false}>
                View our projects
              </Button>
              <Button
                to="/contact"
                variant="shopify-outline"
                shape="pill"
                size="lg"
                icon={false}
              >
                Talk to an engineer
              </Button>
            </div>
          </div>

          <Suspense fallback={<Mosaic tiles={TILES} className={MOSAIC_HEIGHT} />}>
            <ShuffleGrid tiles={TILES} className={MOSAIC_HEIGHT} />
          </Suspense>
        </div>
      </Container>
    </section>
  )
}

export default SiteMosaicSection
