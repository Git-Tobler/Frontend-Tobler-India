import { User, Mail, Linkedin } from 'lucide-react'

function TeamMemberCard({ member }) {
  return (
    <div className="group bg-white border border-tobler-border rounded-card p-7 text-center transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-tobler-heading/30">
      <div className="w-24 h-24 rounded-full bg-tobler-bg-light border border-tobler-border mx-auto mb-5 flex items-center justify-center overflow-hidden">
        <User size={34} className="text-tobler-blue/35" strokeWidth={1.25} />
      </div>

      <h3 className="text-base">{member.name}</h3>

      <p className="label-mono text-tobler-gold mb-3">
        {member.role}
      </p>

      {member.bio && (
        <p className="text-sm text-tobler-body leading-relaxed normal-case">
          {member.bio}
        </p>
      )}

      <div className="mt-4 flex items-center justify-center gap-3">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="text-tobler-body hover:text-tobler-blue transition-colors duration-300"
          >
            <Mail size={18} />
          </a>
        )}

        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn ${member.name}`}
            className="text-tobler-body hover:text-tobler-blue transition-colors duration-300"
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>
    </div>
  )
}

export default TeamMemberCard