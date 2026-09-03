import { useEffect } from 'react'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import { Clock, FileText, AlertCircle } from 'lucide-react'
import { useFooter } from '../../contexts/FooterContext.jsx'

function TermsConditions() {
  const { setShowFooter } = useFooter()

  useEffect(() => {
    setShowFooter(false)
    return () => setShowFooter(true)
  }, [setShowFooter])
  const lastUpdated = 'August 2026'

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      content: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      id: 'use-license',
      title: 'Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on Tobler's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title. Under this license, you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials.`,
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer of Warranties',
      content: `The materials on Tobler's website are provided on an 'as is' basis. Tobler makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`,
    },
    {
      id: 'limitations',
      title: 'Limitations of Liability',
      content: `In no event shall Tobler or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Tobler's website, even if Tobler or a Tobler authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      id: 'accuracy',
      title: 'Accuracy of Materials',
      content: `The materials appearing on Tobler's website could include technical, typographical, or photographic errors. Tobler does not warrant that any of the materials on its website are accurate, complete, or current. Tobler may make changes to the materials contained on its website at any time without notice.`,
    },
    {
      id: 'materials',
      title: 'Materials on Website',
      content: `Tobler has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Tobler of the site. Use of any such linked website is at the user's own risk.`,
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      content: `Tobler may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.`,
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`,
    },
    {
      id: 'contact-terms',
      title: 'Contact for Terms Inquiries',
      content: `If you have questions about these Terms and Conditions, please contact us at info@gezu-impex.nl. We will respond to your inquiry within 10 business days.`,
    },
  ]

  return (
    <>
      <SEO
        title="Terms & Conditions | Tobler"
        description="Review Tobler's terms and conditions for website use and services."
        path="/terms-conditions"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Page Heading */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-tobler-heading mb-3">Terms & Conditions</h1>
              <p className="text-lg text-tobler-body">Legal terms governing your use of our website and services</p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-2 text-sm text-tobler-body mb-12 pb-8 border-b border-tobler-border">
              <Clock size={16} className="text-tobler-blue" />
              <span>Last updated: {lastUpdated}</span>
            </div>


            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, idx) => (
                <div key={section.id} className="scroll-mt-20" id={section.id}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-tobler-blue/10 shrink-0">
                      <FileText size={18} className="text-tobler-blue" />
                    </div>
                    <div>
                      <span className="inline-block text-xs font-semibold text-tobler-blue/60 mb-2">
                        Section {idx + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-tobler-heading">{section.title}</h3>
                    </div>
                  </div>
                  <p className="text-tobler-body leading-relaxed ml-12">{section.content}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 rounded-card bg-tobler-blue/5 border border-tobler-blue/20">
              <h4 className="font-semibold text-tobler-heading mb-2">Questions About These Terms?</h4>
              <p className="text-sm text-tobler-body mb-4">
                If you have any concerns or questions about our Terms and Conditions, please reach out to our legal team.
              </p>
              <a
                href="mailto:info@gezu-impex.nl?subject=Terms%20and%20Conditions%20Inquiry"
                className="inline-flex items-center gap-2 text-sm font-medium text-tobler-blue hover:text-tobler-blue/80 transition-colors"
              >
                Contact Us →
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default TermsConditions
