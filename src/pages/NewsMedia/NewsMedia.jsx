import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import MediaBand from '../../components/ui/MediaBand.jsx'
import ResponsiveImage from '../../components/ui/ResponsiveImage.jsx'
import VideoPanel from '../../components/ui/VideoPanel.jsx'
import Container from '../../components/common/Container.jsx'
import { Calendar, User, ArrowRight, Newspaper, Video, Image as ImageIcon } from 'lucide-react'
import { MEDIA } from '../../data/media-map.js'

/* Media Gallery tiles. Two production clips against four stills so the block
   reads as a mixed press kit rather than another photo grid. */
const MEDIA_GALLERY = [
  { imageId: MEDIA.plantLineWide, label: 'Inside the Bhiwadi production hall' },
  { videoId: MEDIA.roboticWeldingVideo, label: 'Robotic welding cell' },
  { imageId: MEDIA.weldingArc, label: 'Welding a formwork component' },
  { imageId: MEDIA.panelStacks, label: 'Finished aluminium panels' },
  { videoId: MEDIA.laserCuttingVideo, label: 'Laser cutting' },
  { imageId: MEDIA.eventPhoto1, label: 'Tobler at an industry exhibition' },
]

function NewsMedia() {
  const newsItems = [
    {
      id: 1,
      type: 'press-release',
      title: 'Tobler Launches Next-Generation Formwork System in India',
      date: 'August 2026',
      author: '[Author to be added]',
      excerpt: '[Press release content to be added] - Describes the launch of new formwork technology tailored for Indian construction standards.',
      category: 'Product Launch',
      icon: '📢',
    },
    {
      id: 2,
      type: 'article',
      title: 'Swiss Engineering Meets Indian Construction: An Interview with Tobler Leadership',
      date: 'July 2026',
      author: '[Author to be added]',
      excerpt: '[Article content to be added] - Discusses how Tobler bridges Swiss precision with India\'s construction requirements.',
      category: 'Interview',
      icon: '📰',
    },
    {
      id: 3,
      type: 'news',
      title: 'Tobler Achieves ISO 9001:2015 Re-certification',
      date: 'June 2026',
      author: '[Author to be added]',
      excerpt: '[News content to be added] - Highlights quality management commitment and continued compliance with international standards.',
      category: 'Certification',
      icon: '🏆',
    },
    {
      id: 4,
      type: 'media',
      title: 'Factory Tour: Inside Tobler\'s State-of-the-Art Manufacturing Facility',
      date: 'May 2026',
      author: '[Author to be added]',
      excerpt: '[Video/Media description to be added] - An exclusive look at our production processes and quality control measures.',
      category: 'Video',
      icon: '🎥',
      hasMedia: true,
    },
    {
      id: 5,
      type: 'case-study',
      title: 'Case Study: Rapid Deployment Scaffolding for Metro Construction',
      date: 'April 2026',
      author: '[Author to be added]',
      excerpt: '[Case study to be added] - How Tobler systems enabled faster construction timelines on a major infrastructure project.',
      category: 'Case Study',
      icon: '📊',
    },
    {
      id: 6,
      type: 'award',
      title: '[Award/Recognition Name] - Tobler Recognized for Innovation',
      date: '[Date to be added]',
      author: '[Author to be added]',
      excerpt: '[Award content to be added] - Details about industry recognition and achievements.',
      category: 'Award',
      icon: '⭐',
    },
  ]

  const NewsCard = ({ item }) => {
    const isPlaceholder = item.excerpt.includes('[') && item.excerpt.includes(']')
    return (
      <article className={`group p-8 rounded-card border transition-all ${
        isPlaceholder
          ? 'bg-tobler-bg-light border-tobler-border/50'
          : 'bg-white border-tobler-border hover:border-tobler-border/60 hover:shadow-sm'
      }`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-3xl mb-3 block">{item.icon}</span>
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-tobler-blue/10 text-tobler-blue uppercase tracking-wide">
              {item.category}
            </span>
          </div>
          {item.hasMedia && (
            <Video size={20} className="text-tobler-gold" />
          )}
        </div>

        {/* Title */}
        <h3 className={`text-lg font-semibold mb-3 line-clamp-2 ${
          isPlaceholder ? 'text-tobler-body/60' : 'text-tobler-heading'
        }`}>
          {item.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
          isPlaceholder ? 'text-tobler-body/60 italic' : 'text-tobler-body'
        }`}>
          {item.excerpt}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-tobler-body/60 mb-6 pb-6 border-b border-tobler-border">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{item.date}</span>
          </div>
          {item.author !== '[Author to be added]' && (
            <div className="flex items-center gap-1.5">
              <User size={14} />
              <span>{item.author}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <a
          href="#"
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            isPlaceholder
              ? 'text-tobler-body/40 cursor-not-allowed'
              : 'text-tobler-blue hover:text-tobler-blue/80'
          }`}
        >
          Read More <ArrowRight size={14} />
        </a>
      </article>
    )
  }

  const completedItems = newsItems.filter(item => !item.excerpt.includes('['))

  return (
    <>
      <SEO
        title="News & Media | Tobler"
        description="Latest news, press releases, media coverage, and industry insights from Tobler."
        path="/news-media"
      />
      <PageHero
        title="News & Media"
        description="Stay updated with the latest from Tobler"
        breadcrumbItems={[{ label: 'News & Media' }]}
        imageId={MEDIA.eventPhoto2}
      />

      <section className="py-24 md:py-32">
        <Container>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {['All', 'Press Release', 'Video', 'Article', 'Award'].map((filter, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  idx === 0
                    ? 'bg-tobler-blue text-white'
                    : 'bg-tobler-border/30 text-tobler-body hover:bg-tobler-border/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* News Count */}
          <div className="mb-8">
            <p className="text-sm text-tobler-body/60">
              Showing {completedItems.length} of {newsItems.length} articles
            </p>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {newsItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>

          {/* Media Gallery Section */}
          <div className="mt-20 pt-16 border-t border-tobler-border">
            <h2 className="text-2xl font-semibold text-tobler-heading mb-8">Media Gallery</h2>
            {/* Four stills and two clips, all straight from the Cloudinary
                library — this grid used to be six empty boxes captioned
                "[Media item N]". */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MEDIA_GALLERY.map((item) =>
                item.videoId ? (
                  <VideoPanel
                    key={item.videoId}
                    publicId={item.videoId}
                    aspect="aspect-video"
                    label={item.label}
                    width={640}
                    className="rounded-card"
                  />
                ) : (
                  <figure key={item.imageId} className="group">
                    <ResponsiveImage
                      publicId={item.imageId}
                      alt={item.label}
                      className="aspect-video rounded-card"
                      displayWidth={520}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                    <figcaption className="mt-2 text-xs text-tobler-body/60">{item.label}</figcaption>
                  </figure>
                )
              )}
            </div>
          </div>

          {/* Subscription CTA */}
          <MediaBand imageId={MEDIA.eventPhoto4} className="mt-16 p-12">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold text-white mb-3">Stay Updated</h3>
              <p className="text-white/75 mb-6">
                Subscribe to our newsletter to receive the latest news, product updates, and industry insights.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-card border border-tobler-border bg-white text-tobler-heading placeholder:text-tobler-body/40 focus:outline-none focus:ring-2 focus:ring-tobler-blue/20"
                />
                <button className="px-6 py-3 rounded-card bg-tobler-gold text-tobler-heading font-medium hover:bg-tobler-gold-dark transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </MediaBand>
        </Container>
      </section>
    </>
  )
}

export default NewsMedia
