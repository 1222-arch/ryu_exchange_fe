import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './contexts/LanguageContext'
import './i18n';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
    <App />
    </LanguageProvider>
  </StrictMode>,
)
