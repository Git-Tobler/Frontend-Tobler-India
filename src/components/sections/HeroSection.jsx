import { ShieldCheck, Award } from 'lucide-react'
import Container from '../common/Container.jsx'
import Button from '../common/Button.jsx'
import CornerMarks from '../ui/CornerMarks.jsx'

function HeroSection() {
  return (
    <section className="relative min-h-[94vh] flex items-center bg-blueprint overflow-hidden pt-24">
      <CornerMarks always className="text-white/20 hidden md:block" />

      {/* vertical dimension rule, right edge — desktop only */}
      <div className="hidden lg:flex absolute right-10 top-32 bottom-32 w-px bg-white/10 flex-col justify-between items-center">
        <span className="w-2 h-px bg-white/30 -ml-[3.5px]" />
        <span className="label-mono text-white/25 [writing-mode:vertical-rl] rotate-180 tracking-[0.2em]">
          EN 12810 &mdash; EN 12812
        </span>
        <span className="w-2 h-px bg-white/30 -ml-[3.5px]" />
      </div>

      <Container className="relative py-20">
        <div className="max-w-3xl animate-fadeInUp">

          <h1 className="text-h1 text-white mb-7">
            The Strength Behind Every Successful Build
          </h1>

          <p className="text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl mb-10 normal-case font-sans">
            Swiss engineered scaffolding and formwork solution designed for projects that demand precision, safety, and dependable performance.
            
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            <Button to="/contact" variant="accent" size="lg">
              Request a Quotation
            </Button>
            </div>

          
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
