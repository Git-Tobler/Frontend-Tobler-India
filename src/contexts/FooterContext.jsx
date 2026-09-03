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

export function useFooter() {
  return useContext(FooterContext)
}
