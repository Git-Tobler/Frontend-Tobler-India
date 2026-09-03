import { useEffect } from 'react'
import SEO from '../../components/common/SEO.jsx'
import Container from '../../components/common/Container.jsx'
import { useFooter } from '../../contexts/FooterContext.jsx'

function PrivacyPolicy() {
  const { setShowFooter } = useFooter()

  useEffect(() => {
    setShowFooter(false)
    return () => setShowFooter(true)
  }, [setShowFooter])
  const lastUpdated = 'August 2026'

  const sections = [
    {
      id: 'Who We Are',
      title: 'Who We Are',
      
      content: `Tobler Scaffolding and Formwork Pvt. Ltd. ("Tobler", "we", "our" or "us") values your privacy and is committed to protecting the 
     personal information you share with us. This Privacy Policy explains 
how we collect, use, store, and protect your information when you 
visit our website, submit an enquiry, request a quotation, download 
our resources or communicate with our team.
By using this website, you acknowledge that you have read and understood this Privacy Policy. If you have any questions regarding 
the way your information is handled, you may contact us using the 
details provided at the end of this page..`,
    },
    {
      id: 'information-collection',
      title: 'Sharing Your Information',
      content: `We respect your privacy and do not sell, rent, or trade your personal information to third parties.
In certain situations, your information may be shared with trusted service providers, technology partners, logistics providers, or professional advisors who assist us in operating our business or delivering our services. These organisations are permitted to use your information only for the purpose of providing services on our behalf and are expected to maintain appropriate confidentiality and security measures.
We may also disclose information where required to comply with applicable laws, legal proceedings, government requests, or to protect the rights, property, and safety of Tobler Scaffolding and Formwork Pvt. Ltd., our customers, or others.`,
    },
    {
      id: 'information-use',
      title: 'Information We Collect',
      content: `When you interact with our website, we may collect information you voluntarily provide. This may include your name, company name, email address, phone number, project details, city and country, product interests, and any additional information you choose to share when contacting us or requesting a quotation.
In addition to the information you provide directly, our website may automatically collect certain technical information such as your IP address, browser type, device information, operating system, pages visited, referring website, and the date and time of your visit. This information helps us understand how visitors use our website and allows us to improve its performance and user experience.
Please do not submit confidential, financial, or other sensitive personal information through our website unless specifically requested.`,
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: `Protecting your personal information is important to us. We implement reasonable administrative, technical, and organisational security measures designed to safeguard your information against unauthorised access, misuse, disclosure, alteration, or destruction.
While we take every reasonable precaution to protect the information we collect, no method of data transmission over the internet or electronic storage can guarantee complete security. We therefore encourage users to exercise caution when sharing information online.
`,
    },
    {
      id: 'cookies',
      title: 'Cookies and Website Technologies',
      content: `Our website may use cookies and similar technologies to improve 
your browsing experience and ensure that the website functions efficiently. Cookies are small text files stored on your device that help remember your preferences and provide a more personalised browsing experience.
These cookies may also help us understand how visitors interact with 
our website so that we can improve its functionality, navigation, and overall performance. Most web browsers allow you to manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of some features on our website.`,
    },
    {
      id: 'third-parties',
      title: 'Your Rights',
      content: `Depending on the laws applicable to your location, you may have the right to request access to the personal information we hold about you, request corrections to inaccurate information, ask for the deletion of your personal information, object to certain processing activities, or withdraw your consent where consent forms the basis of processing.
If you wish to exercise any of these rights, please contact us using the details provided below. We will review your request and respond within a reasonable period in accordance with applicable legal requirements.
`,
    },
    {
      id: 'your-rights',
      title: 'Your Rights & Choices',
      content: `Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete your information. You can also opt-out of marketing communications at any time by clicking the unsubscribe link in our emails.`,
    },
    {
      id: 'international-transfers',
      title: 'Third Party Websites',
      content: `Our website may contain links to external websites operated by third parties for your convenience and reference. Once you leave our website, this Privacy Policy no longer applies. We are not responsible for the privacy practices, security measures, or content of any third-party websites, and we encourage you to review their privacy policies before providing any personal information.
`,
    },
    {
      id: 'policy-changes',
      title: 'Changes to this Privacy Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our business operations, website functionality, legal requirements, or industry practices. Any updates will be published on this page along with the revised effective date. We encourage visitors to review this page periodically to stay informed about how we protect their information.
`,
    },
    {
      id: 'contact-us',
      title: 'Third Party Websites',
      content: `If you have any questions, concerns, or requests relating to this Privacy Policy or the way your personal information is handled, please contact us.
      Tobler Scaffolding and Formwork Pvt. Ltd.
Email: info@tobler.co.in
Phone: +91 
Address:`,
    },
  ]

  return (
    <>
      <SEO
        title="Privacy Policy | Tobler"
        description="Learn how Tobler collects, uses, and protects your personal information."
        path="/privacy-policy"
      />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Page Heading */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-tobler-heading mb-3">Privacy Policy</h1>
              <p className="text-lg text-tobler-body">Your privacy matters to us. Learn how we protect your data.</p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-2 text-sm text-tobler-body mb-12 pb-8 border-b border-tobler-border">
              
              <span>Last updated: {lastUpdated}</span>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, idx) => {
                const Icon = section.icon
                return (
                  <div key={section.id} className="scroll-mt-20" id={section.id}>
                    <div className="flex items-start gap-4 mb-4">
                      {Icon && (
                        <div className="p-2.5 rounded-lg bg-tobler-blue/10 shrink-0">
                          <Icon size={20} className="text-tobler-blue" />
                        </div>
                      )}
                      <div>
                        <span className="inline-block text-xs font-semibold text-tobler-blue/60 mb-2">
                          Section {idx + 1}
                        </span>
                        <h3 className="text-xl font-semibold text-tobler-heading">{section.title}</h3>
                      </div>
                    </div>
                    <p className="text-tobler-body leading-relaxed ml-12">{section.content}</p>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="mt-16 p-8 rounded-card bg-tobler-blue/5 border border-tobler-blue/20">
              <h4 className="font-semibold text-tobler-heading mb-2">Questions About Your Data?</h4>
              <p className="text-sm text-tobler-body mb-4">
                Our privacy team is here to help. Reach out with any concerns or requests regarding your personal information.
              </p>
              <a
                href="mailto:info@gezu-impex.nl?subject=Privacy%20Policy%20Inquiry"
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

export default PrivacyPolicy
