import SEO from '../../components/common/SEO.jsx'
import PageHero from '../../components/layout/PageHero.jsx'
import MediaBand from '../../components/ui/MediaBand.jsx'
import Container from '../../components/common/Container.jsx'
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { MEDIA } from '../../data/media-map.js'

function Blogs() {
  const [selectedTag, setSelectedTag] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const blogPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Scaffolding Safety: Best Practices & Compliance',
      excerpt: 'Learn essential safety protocols and compliance requirements for scaffolding systems in Indian construction projects.',
      author: '[Author Name]',
      date: 'August 2026',
      category: 'Safety',
      tags: ['Safety', 'Compliance', 'Construction'],
      readTime: '8 min read',
      image: '🛡️',
      featured: true,
    },
    {
      id: 2,
      title: 'Swiss Engineering in India: How Precision Meets Local Demands',
      excerpt: '[Content to be added] - Explores how Swiss manufacturing standards are adapted for Indian construction challenges.',
      author: '[Author Name]',
      date: 'July 2026',
      category: 'Industry Insights',
      tags: ['Engineering', 'Manufacturing', 'Innovation'],
      readTime: '7 min read',
      image: '🇨🇭',
      featured: false,
    },
    {
      id: 3,
      title: 'Formwork Systems: Choosing the Right Solution for Your Project',
      excerpt: '[Content to be added] - A detailed comparison guide for different formwork systems and their applications.',
      author: '[Author Name]',
      date: 'June 2026',
      category: 'Product Guide',
      tags: ['Formwork', 'Product Selection', 'Project Planning'],
      readTime: '10 min read',
      image: '📐',
      featured: true,
    },
    {
      id: 4,
      title: 'Reducing Construction Timelines: The Impact of Modern Scaffolding',
      excerpt: '[Content to be added] - Data-driven insights on how modern scaffolding solutions accelerate project timelines.',
      author: '[Author Name]',
      date: 'May 2026',
      category: 'Industry Insights',
      tags: ['Efficiency', 'Construction', 'Technology'],
      readTime: '6 min read',
      image: '⏱️',
      featured: false,
    },
    {
      id: 5,
      title: 'Sustainability in Construction: Tobler\'s Eco-Friendly Initiatives',
      excerpt: '[Content to be added] - Discover how sustainable manufacturing practices reduce environmental impact.',
      author: '[Author Name]',
      date: 'April 2026',
      category: 'Sustainability',
      tags: ['Sustainability', 'Environment', 'Manufacturing'],
      readTime: '7 min read',
      image: '🌱',
      featured: false,
    },
    {
      id: 6,
      title: '[Blog Post Title]',
      excerpt: '[Blog content to be added]',
      author: '[Author Name]',
      date: '[Date]',
      category: '[Category]',
      tags: ['[Tags to be added]'],
      readTime: '[Read time]',
      image: '📝',
      featured: false,
    },
  ]

  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))]
  const categories = [...new Set(blogPosts.map(post => post.category))]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  const BlogCard = ({ post, isFeatured = false }) => {
    const isComplete = !post.excerpt.includes('[')
    return (
      <article className={`rounded-card border transition-all ${
        isFeatured
          ? isComplete
            ? 'bg-gradient-to-br from-tobler-blue/5 to-tobler-gold/5 border-tobler-border hover:border-tobler-border/60'
            : 'bg-tobler-bg-light border-tobler-border/50'
          : isComplete
          ? 'bg-white border-tobler-border hover:border-tobler-border/60'
          : 'bg-tobler-bg-light border-tobler-border/50'
      } overflow-hidden ${isFeatured ? 'p-8' : 'p-6'}`}>
        {/* Icon */}
        <div className={`${isFeatured ? 'text-5xl' : 'text-3xl'} mb-4`}>
          {post.image}
        </div>

        {/* Category Badge */}
        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-tobler-blue/10 text-tobler-blue uppercase tracking-wide mb-4">
          {post.category}
        </span>

        {/* Title */}
        <h3 className={`font-semibold mb-3 line-clamp-2 ${
          isFeatured ? 'text-2xl' : 'text-lg'
        } ${isComplete ? 'text-tobler-heading' : 'text-tobler-body/60'}`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-sm mb-6 line-clamp-2 ${
          isComplete ? 'text-tobler-body' : 'text-tobler-body/60 italic'
        }`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`text-xs px-2 py-1 rounded-full transition-colors ${
                selectedTag === tag
                  ? 'bg-tobler-blue text-white'
                  : 'bg-tobler-border/50 text-tobler-body/60 hover:bg-tobler-border'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-tobler-body/60 pt-6 border-t border-tobler-border mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} />
            <span>{post.author === '[Author Name]' ? 'Tobler Team' : post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* CTA */}
        {isComplete && (
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-tobler-blue hover:text-tobler-blue/80 transition-colors"
          >
            Read Article <ArrowRight size={14} />
          </a>
        )}
      </article>
    )
  }

  return (
    <>
      <SEO
        title="Blog | Tobler"
        description="Read articles about scaffolding, construction insights, safety tips, and industry trends."
        path="/blogs"
      />
      <PageHero
        title="Tobler Blog"
        description="Industry insights, product guides, and construction best practices"
        breadcrumbItems={[{ label: 'Blog' }]}
        imageId={MEDIA.assemblyBay}
      />

      <section className="py-24 md:py-32">
        <Container>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-tobler-blue/40" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-card border border-tobler-border bg-white text-tobler-heading placeholder:text-tobler-body/40 focus:outline-none focus:ring-2 focus:ring-tobler-blue/20 focus:border-tobler-blue"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-tobler-blue text-white'
                    : 'bg-tobler-border/30 text-tobler-body hover:bg-tobler-border/50'
                }`}
              >
                All Topics
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-tobler-blue text-white'
                      : 'bg-tobler-border/30 text-tobler-body hover:bg-tobler-border/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-tobler-heading mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} isFeatured={true} />
                ))}
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="text-2xl font-semibold text-tobler-heading mb-8">
              {filteredPosts.length > featuredPosts.length ? 'Latest Articles' : 'All Articles'}
            </h2>
            {regularPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-tobler-body mb-2">No articles found matching your search.</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedTag(null)
                  }}
                  className="text-sm font-medium text-tobler-blue hover:text-tobler-blue/80"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 pt-16 border-t border-tobler-border">
            <MediaBand imageId={MEDIA.plantAisle} className="p-12">
              <h3 className="text-2xl font-semibold text-white mb-3">Subscribe to Our Blog</h3>
              <p className="text-white/75 mb-6">
                Get the latest articles, industry insights, and construction tips delivered to your inbox.
              </p>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-card border border-tobler-border bg-white text-tobler-heading placeholder:text-tobler-body/40 focus:outline-none focus:ring-2 focus:ring-tobler-blue/20"
                />
                <button className="px-6 py-3 rounded-card bg-tobler-gold text-tobler-heading font-medium hover:bg-tobler-gold-dark transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </MediaBand>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Blogs
