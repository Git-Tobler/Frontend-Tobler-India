import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Mail, Linkedin, User, ChevronLeft, ChevronRight, X } from 'lucide-react'
import ResponsiveImage from '../ui/ResponsiveImage.jsx'
import { LEADERSHIP, LEADERSHIP_GROUPS } from '../../data/team.js'

/* Executive showcase: displays board members and leadership team in separate sections
   with horizontal, snapping rails. Each section shows 6 cards on desktop, 3 on tablet, 1 on mobile */

function LeaderCard({ member, isActive, scalable, onReadMore }) {
  const isBoardMember = member.group === 'board'

  return (
    <article
      className={`group h-full overflow-hidden rounded-lg border bg-white transition-all duration-300 ease-premium flex flex-col ${
        isActive
          ? 'border-tobler-blue/20 shadow-card'
          : 'border-tobler-border-light shadow-soft hover:shadow-card'
      } ${scalable ? (isActive ? 'scale-[1.04] md:scale-[1.08]' : 'scale-[0.98]') : ''}`}
    >
      {/* Photo Section */}
      <div className="relative overflow-hidden bg-tobler-bg-light">
        <div className="aspect-square overflow-hidden group-hover:scale-105 transition-transform duration-500 ease-premium cursor-pointer">
          <ResponsiveImage
            publicId={member.photo}
            alt={`${member.name}, ${member.role}`}
            title=""
            icon={User}
            iconSize={48}
            className="w-full h-full bg-tobler-bg-light object-cover"
            displayWidth={400}
            crop="thumb"
            gravity="face"
            aspectRatio="1:1.2"
            sizes="(min-width: 1280px) 15vw, (min-width: 768px) 25vw, 75vw"
          />
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-tobler-blue/0 group-hover:bg-tobler-blue/10 transition-colors duration-500 ease-premium pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col px-4 py-5 pt-8 text-center flex-grow">
        <h3 className="text-sm font-display font-bold text-tobler-heading leading-snug">{member.name}</h3>

        <p className="mt-1.5 text-xs font-medium text-tobler-muted uppercase tracking-wider">{member.role}</p>

        <div className="mt-auto pt-4 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-3">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-tobler-border text-tobler-body transition-all duration-300 hover:border-tobler-blue hover:bg-tobler-blue hover:text-white"
              >
                <Mail size={14} />
              </a>
            )}

            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${member.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-tobler-border text-tobler-body transition-all duration-300 hover:border-tobler-blue hover:bg-tobler-blue hover:text-white"
              >
                <Linkedin size={14} />
              </a>
            )}
          </div>

          {isBoardMember && member.bio && (
            <button
              onClick={onReadMore}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-tobler-blue hover:text-tobler-blue/80 transition-colors duration-300"
            >
              View Profile <span>→</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

function RailButton({ direction, disabled, onClick }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Previous leaders' : 'Next leaders'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-tobler-border bg-white text-tobler-heading shadow-soft transition-all duration-300 hover:border-tobler-blue hover:text-tobler-blue disabled:pointer-events-none disabled:opacity-30"
    >
      <Icon size={18} />
    </button>
  )
}

function BioModal({ member, isOpen, onClose }) {
  if (!isOpen || !member) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
      {/* Height follows the bio instead of being pinned to 16/9. The aspect lock
          used to freeze this box at ~506px tall while `overflow-hidden` silently
          cut whatever did not fit — every board bio is 515-706 characters, so
          all six were losing their last lines. Now it grows to the content and
          only stops at the viewport, where the copy column takes over scrolling. */}
      <div className="relative flex max-h-[90vh] w-full max-w-[900px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-tobler-bg-light text-tobler-heading hover:bg-tobler-border transition-colors duration-300"
        >
          <X size={22} />
        </button>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-0 md:grid-cols-2">
          <div className="relative flex h-56 items-center justify-center overflow-hidden bg-tobler-bg-light md:h-full">
            <ResponsiveImage
              publicId={member.photo}
              alt={`${member.name}, ${member.role}`}
              title=""
              icon={User}
              iconSize={80}
              className="w-full h-full bg-tobler-bg-light"
              objectFit="contain"
              displayWidth={600}
              sizes="50vw"
            />
          </div>

          {/* min-h-0 is what lets this column actually scroll: without it a grid
              item refuses to shrink below its content and the overflow escapes
              the modal again rather than scrolling inside it. */}
          <div className="flex min-h-0 flex-col overflow-y-auto p-8 md:p-10">
            <div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-tobler-heading leading-tight">
                {member.name}
              </h2>
              <p className="label-mono mt-4 text-sm font-semibold text-tobler-blue">{member.role}</p>
              <div className="mt-7">
                <p className="text-base leading-relaxed text-tobler-body">{member.bio}</p>
              </div>
            </div>

            {/* mt-auto pins this to the bottom when the bio is short and simply
                follows the copy when it is long. */}
            <div className="mt-auto flex items-center gap-4 border-t border-tobler-border-light pt-8">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-tobler-border text-tobler-body transition-all duration-300 hover:border-tobler-blue hover:bg-tobler-blue hover:text-white hover:shadow-lg"
                >
                  <Mail size={20} />
                </a>
              )}

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn profile of ${member.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-tobler-border text-tobler-body transition-all duration-300 hover:border-tobler-blue hover:bg-tobler-blue hover:text-white hover:shadow-lg"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeadershipSection({
  members = LEADERSHIP,
  groups = LEADERSHIP_GROUPS,
  title = "The team behind the growth",
  description = "Board and leadership team",
}) {
  /* Only offer tabs that actually have people behind them. */
  const tabs = useMemo(
    () => groups.filter((group) => members.some((member) => member.group === group.id)),
    [groups, members],
  )

  const [selectedMember, setSelectedMember] = useState(null)

  if (!tabs.length) return null

  // Render each group separately
  return (
    <section id="leadership" className="scroll-mt-28 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mx-auto max-w-reading space-y-4 text-center mb-16">
          <h2 className="text-[32px] leading-[1.1] tracking-tight text-tobler-heading md:text-[40px] lg:text-[44px]">
            {title}
          </h2>
          <p className="text-tobler-body">{description}</p>
        </div>
      </div>

      {/* Board Members Section */}
      {members.some((m) => m.group === 'board') && (
        <GroupSection
          members={members.filter((m) => m.group === 'board')}
          title="Board Members"
          onReadMore={setSelectedMember}
        />
      )}

      {/* Team Members Section */}
      {members.some((m) => m.group === 'leadership') && (
        <GroupSection
          members={members.filter((m) => m.group === 'leadership')}
          title="Team Members"
          onReadMore={setSelectedMember}
        />
      )}

      <BioModal member={selectedMember} isOpen={!!selectedMember} onClose={() => setSelectedMember(null)} />
    </section>
  )
}

function GroupSection({ members, title, onReadMore }) {
  const railRef = useRef(null)
  const [centred, setCentred] = useState(0)
  const [edges, setEdges] = useState({ scrollable: false, start: true, end: false })

  const sync = useCallback(() => {
    const rail = railRef.current
    if (!rail) return

    const cards = Array.from(rail.children)
    const railCentre = rail.scrollLeft + rail.clientWidth / 2

    let nearest = 0
    let shortest = Infinity
    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - railCentre)
      if (distance < shortest) {
        shortest = distance
        nearest = index
      }
    })

    const overflow = rail.scrollWidth - rail.clientWidth
    setCentred(nearest)
    setEdges({
      scrollable: overflow > 8,
      start: rail.scrollLeft <= 8,
      end: rail.scrollLeft >= overflow - 8,
    })
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    rail.scrollTo({ left: 0 })
    sync()

    const observer = new ResizeObserver(sync)
    observer.observe(rail)
    return () => observer.disconnect()
  }, [sync])

  const step = (direction) => {
    const rail = railRef.current
    if (!rail) return
    const card = rail.firstElementChild
    const distance = card ? card.offsetWidth + 24 : rail.clientWidth
    rail.scrollBy({ left: direction * distance, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 mb-20">
      <div className="mb-10 text-center">
        <h3 className="text-2xl md:text-3xl font-display font-bold text-tobler-heading">{title}</h3>
      </div>

      <div
        ref={railRef}
        onScroll={sync}
        className={`flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-1 py-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          edges.scrollable ? 'justify-start' : 'justify-center'
        }`}
      >
        {members.map((member, index) => (
          <div
            key={member.name}
            className="w-[80%] shrink-0 snap-center sm:w-[calc((100%-3rem)/3)] xl:w-[calc((100%-7.5rem)/6)]"
          >
            <LeaderCard
              member={member}
              isActive={index === centred}
              scalable={edges.scrollable}
              onReadMore={() => onReadMore(member)}
            />
          </div>
        ))}
      </div>

      {edges.scrollable && (
        <div className="flex justify-center gap-3">
          <RailButton direction="prev" disabled={edges.start} onClick={() => step(-1)} />
          <RailButton direction="next" disabled={edges.end} onClick={() => step(1)} />
        </div>
      )}
    </div>
  )
}

export default LeadershipSection
