import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { FileProvider } from './context/fileContext.tsx'
import { CartProvider } from './context/cartContext.tsx'
import { NotificationProvider } from './context/notificationContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient} >
    <NotificationProvider>
      <CartProvider>
        <FileProvider>
          <App />
        </FileProvider>
      </CartProvider>
    </NotificationProvider>
  </QueryClientProvider>
)
