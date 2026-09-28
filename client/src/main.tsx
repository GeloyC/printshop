import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { FileProvider } from './context/fileContext.tsx'
import { CartProvider } from './context/cartContext.tsx'
import { NotificationProvider } from './context/notificationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
    <CartProvider>
      <FileProvider>
        <App />
      </FileProvider>
    </CartProvider>
  </NotificationProvider>
)
