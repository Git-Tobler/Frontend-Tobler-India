import PageHero from '../../components/layout/PageHero.jsx'
import SEO from '../../components/common/SEO.jsx'
import LeadershipSection from '../../components/sections/LeadershipSection.jsx'
import { MEDIA } from '../../data/media-map.js'

export default function BoardMembers() {
  return (
    <>
      <SEO
        title="Board Members | Tobler India"
        description="Meet the board members guiding Tobler India's strategic direction and growth."
      />

      {/* Hero Section */}
      <PageHero
        title="Board Members"
        subtitle="Strategic leaders steering Tobler India's vision"
        imageId={MEDIA.plantAisle}
      />

      {/* Board Members Section */}
      <LeadershipSection
        groups={[{ id: 'board', label: 'Board Members', badge: 'Board' }]}
        title="Our Board"
        description="Experienced leaders from engineering, finance, and operations guiding Tobler India towards excellence and innovation."
      />
    </>
  )
}
