import Header from '../components/navigation/Header.jsx'
import Footer from '../components/navigation/Footer.jsx'

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
