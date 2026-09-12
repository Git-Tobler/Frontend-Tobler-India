import Container from '../common/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'

/* The long-form copy, one block per idea, image and text trading sides down the
   page. A block whose `media.showcase` slot is empty centres its prose at
   reading width instead of leaving half the row blank. */
function ProductShowcase({ blocks = [], icon }) {
  if (blocks.length === 0) return null

  return (
    <section className="bg-tobler-surface py-20 md:py-28">
      <Container>
        <div className="space-y-16 md:space-y-24">
          {blocks.map((block, index) => (
            <Reveal
              key={index}
              className={`grid items-center gap-8 ${block.publicId ? 'lg:grid-cols-2 lg:gap-16' : ''}`}
            >
              {block.publicId && (
                <ResponsiveImage
                  publicId={block.publicId}
                  alt=""
                  icon={icon}
                  iconSize={56}
                  className={`aspect-[4/3] w-full rounded-card ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  displayWidth={860}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              )}

              <div className={block.publicId ? 'min-w-0' : 'mx-auto max-w-reading text-center'}>
                {block.title && <h3 className="text-h4 text-tobler-heading">{block.title}</h3>}

                <p className="mt-4 whitespace-pre-line text-base leading-relaxed normal-case text-tobler-body">
                  {block.content}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProductShowcase
