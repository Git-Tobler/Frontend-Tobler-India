import { FileText, Download } from 'lucide-react'

/* Downloads live on tobler-in.com, not this site, so this is a plain outbound
   link rather than a file served from /public — `href` is required and opens
   in a new tab. `encodeURI` is safe to apply unconditionally: the source PDF
   paths contain raw spaces and one non-ASCII filename, and re-encoding an
   already-encoded URL is a no-op since `%` itself is left untouched. */
function DownloadCard({ title, href, size = 'PDF' }) {
  if (!href) return null

  return (
    <a
      href={encodeURI(href)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${title}`}
      className="group flex items-center justify-between gap-4 p-5 bg-white border border-tobler-border rounded-card transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 hover:border-tobler-heading/30"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 rounded-btn bg-tobler-heading/5 flex items-center justify-center shrink-0 border border-tobler-border">
          <FileText size={19} className="text-tobler-heading" strokeWidth={1.5} />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-tobler-heading text-sm truncate">{title}</p>
          <p className="label-mono text-tobler-body/70">{size} Document</p>
        </div>
      </div>
      <span className="w-9 h-9 flex items-center justify-center rounded-full bg-tobler-bg-light text-tobler-heading group-hover:bg-tobler-gold group-hover:text-tobler-heading transition-colors duration-200 shrink-0">
        <Download size={16} />
      </span>
    </a>
  )
}

export default DownloadCard
