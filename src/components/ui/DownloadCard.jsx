import { FileText, Download } from 'lucide-react'

function DownloadCard({ title, size = 'PDF' }) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 bg-white border border-tobler-border rounded-card transition-all duration-300 hover:shadow-card hover:-translate-y-0.5 hover:border-tobler-heading/30">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-btn bg-tobler-heading/5 flex items-center justify-center shrink-0 border border-tobler-border">
          <FileText size={19} className="text-tobler-heading" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-semibold text-tobler-heading text-sm">{title}</p>
          <p className="label-mono text-tobler-body/70">{size} Document</p>
        </div>
      </div>
      <button
        aria-label={`Download ${title}`}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-tobler-bg-light text-tobler-heading hover:bg-tobler-gold hover:text-white transition-colors duration-200 shrink-0"
      >
        <Download size={16} />
      </button>
    </div>
  )
}

export default DownloadCard
