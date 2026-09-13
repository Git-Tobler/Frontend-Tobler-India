import { createContext, useContext, useState } from 'react'

const FooterContext = createContext()

export function FooterProvider({ children }) {
  const [showFooter, setShowFooter] = useState(true)

  return (
    <FooterContext.Provider value={{ showFooter, setShowFooter }}>
      {children}
    </FooterContext.Provider>
  )
}

// The consumer hook ships alongside its provider on purpose — splitting it into
// its own module would only move the import churn onto every consumer.
// eslint-disable-next-line react-refresh/only-export-components
export function useFooter() {
  return useContext(FooterContext)
}
