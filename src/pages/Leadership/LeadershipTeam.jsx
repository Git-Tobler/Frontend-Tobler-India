import PageHero from '../../components/layout/PageHero.jsx'
import SEO from '../../components/common/SEO.jsx'
import LeadershipSection from '../../components/sections/LeadershipSection.jsx'
import { MEDIA } from '../../data/media-map.js'

export default function LeadershipTeam() {
  return (
    <>
      <SEO
        title="Leadership Team | Tobler India"
        description="Meet the leadership team driving Tobler India's operational excellence and growth."
      />

      {/* Hero Section */}
      <PageHero
        title="Leadership Team"
        subtitle="Dedicated professionals driving operational excellence"
        imageId={MEDIA.panelHandover}
      />

      {/* Leadership Team Section */}
      <LeadershipSection
        groups={[{ id: 'leadership', label: 'Leadership Team', badge: 'Leadership' }]}
        title="Our Leadership"
        description="Talented managers and specialists across engineering, sales, operations, and quality managing day-to-day excellence."
      />
    </>
  )
}
