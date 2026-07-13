import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './css/base.css'
import App from './App.jsx'
import ErrorBoundary from './app/ErrorBoundary.jsx'

import { DocumentProvider } from './context/DocumentContext'

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
