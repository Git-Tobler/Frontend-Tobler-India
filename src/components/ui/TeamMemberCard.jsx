import { User, Mail, Linkedin } from 'lucide-react'
import { MEDIA_BY_ID } from '../../data/media.js'
import { buildCloudinaryUrl } from '../../lib/cloudinary.js'

function TeamMemberCard({ member }) {
  const photoMedia = member.photo ? MEDIA_BY_ID[member.photo] : null
  const photoUrl = photoMedia ? buildCloudinaryUrl(member.photo, { w: 200, h: 200, c: 'fill', g: 'face' }) : null

  return (
    <div className="group bg-white border border-tobler-border rounded-card p-7 text-center transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-tobler-heading/30">
      <div className="w-24 h-24 rounded-full bg-tobler-bg-light border border-tobler-border mx-auto mb-5 flex items-center justify-center overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={34} aria-hidden="true" className="text-tobler-blue/35" strokeWidth={1.25} />
        )}
      </div>

      <h3 className="text-base">{member.name}</h3>

      <p className="label-mono text-tobler-blue mb-3">
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