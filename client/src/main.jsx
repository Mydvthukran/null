import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './css/base.css'
import App from './App.jsx'
import ErrorBoundary from './app/ErrorBoundary.jsx'
import { initInspectProtection } from './utils/antiInspect.js'

import { DocumentProvider } from './context/DocumentContext'

// Initialize production inspect and shortcut protection
initInspectProtection();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <DocumentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DocumentProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
