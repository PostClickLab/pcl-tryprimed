import { createContext, useContext, useState, type ReactNode } from 'react'

interface IntroState {
  /** True once the preloader has finished and the page is revealed. */
  ready: boolean
  setReady: (value: boolean) => void
}

const IntroContext = createContext<IntroState>({ ready: true, setReady: () => {} })

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>
}

export const useIntro = () => useContext(IntroContext)
