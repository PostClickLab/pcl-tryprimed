import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { IntroProvider } from '@/providers/IntroProvider'
import { SmoothScroll } from '@/providers/SmoothScroll'
import { routes } from '@/routes'
import './index.css'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntroProvider>
      <SmoothScroll>
        <RouterProvider router={router} />
      </SmoothScroll>
    </IntroProvider>
  </StrictMode>,
)
