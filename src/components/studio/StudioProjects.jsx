import { Link } from 'react-router-dom'
import { useInViewAnimation } from '../../hooks/useInViewAnimation.js'
import { cldImage } from '../../lib/cloudinary.js'
import { PROJECTS } from '../../data/projects.js'

/* Project showcase: name and one line offset to the left, full-bleed image
   underneath. Each row observes itself, so they fade in as the visitor reaches
   them rather than all at once when the section's top edge appears. */

/* The frame comes off the project itself. It used to come from a parallel
   PROJECT_IMAGE_IDS array indexed by position, which meant reordering or
   inserting a project silently put someone else's photograph under its name —
   and had already left a shop-floor still under a residential tower. */
function ProjectRow({ project }) {
  const [ref, inView] = useInViewAnimation()

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={ref}
      className={`block ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <div className="ml-20 md:ml-28">
        <h3 className="font-mondwest text-2xl font-semibold text-[#051A24] md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 max-w-xl text-sm text-[#051A24]/70 md:text-base">{project.summary}</p>
      </div>

      <img
        src={cldImage(project.imageId, { w: 1280 })}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className="mt-6 h-[280px] w-full rounded-2xl object-cover shadow-lg md:h-[460px]"
      />
    </Link>
  )
}

function StudioProjects() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-16 px-6 py-12 md:gap-20">
      {PROJECTS.slice(0, 3).map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </section>
  )
}

export default StudioProjects
