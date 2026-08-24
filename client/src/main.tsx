import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { FileProvider } from './context/documentPrintContext'

createRoot(document.getElementById('root')!).render(
  <FileProvider>
    <App />
  </FileProvider>
)
