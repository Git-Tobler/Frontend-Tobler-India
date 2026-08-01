import { Compass } from 'lucide-react'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import Button from '../../components/common/Button.jsx'

function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" path="/404" />
      <section className="min-h-[80vh] flex items-center py-24">
        <Container className="text-center max-w-lg mx-auto">
          <div className="w-16 h-16 border border-tobler-heading/15 flex items-center justify-center mx-auto mb-8">
            <Compass size={26} className="text-tobler-gold" strokeWidth={1.5} />
          </div>
          <p className="label-mono text-tobler-gold mb-3">
            Error 404
          </p>
          <h1 className="text-h3 mb-4">This Page Couldn&rsquo;t Be Found</h1>
          <p className="text-tobler-body leading-relaxed mb-10">
            The page you&rsquo;re looking for may have been moved or no longer exists. Let&rsquo;s get you
            back on track.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button to="/">Back to Home</Button>
            <Button to="/contact" variant="secondary" icon={false}>
              Contact Us
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}

export default NotFound
