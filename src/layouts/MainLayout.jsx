import Header from '../components/navigation/Header.jsx'
import Footer from '../components/navigation/Footer.jsx'
import CookieConsent from '../components/common/CookieConsent.jsx'
import { useFooter } from '../contexts/FooterContext.jsx'

function MainLayout({ children }) {
  const { showFooter } = useFooter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
      <CookieConsent />
    </div>
  )
}

export default MainLayout
