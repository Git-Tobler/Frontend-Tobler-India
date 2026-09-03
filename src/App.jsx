import { Outlet, useNavigation } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'
import { FooterProvider } from './contexts/FooterContext.jsx'

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading page">
      <div className="w-10 h-10 border-2 border-tobler-border border-t-tobler-blue rounded-full animate-spin" />
    </div>
  )
}

function App() {
  const navigation = useNavigation()

  return (
    <FooterProvider>
      <MainLayout>
        <ScrollToTop />
        {navigation.state === 'loading' ? <PageLoader /> : <Outlet />}
      </MainLayout>
    </FooterProvider>
  )
}

export default App
