import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { SettingsProvider } from './context/SettingsContext'
import { LibraryProvider } from './context/LibraryContext'
import { SessionProvider } from './context/SessionContext'
import { SholawatProvider } from './context/SholawatContext'
import { ToastProvider } from './context/ToastContext'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <LibraryProvider>
        <SessionProvider>
          <SholawatProvider>
            <ToastProvider>
              <HashRouter>
                <App />
              </HashRouter>
            </ToastProvider>
          </SholawatProvider>
        </SessionProvider>
      </LibraryProvider>
    </SettingsProvider>
  </StrictMode>,
)
