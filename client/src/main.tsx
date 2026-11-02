import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { CartProvider } from './context/cartContext.tsx'
import { NotificationProvider } from './context/notificationContext.tsx'
import { UserContextProvider } from './context/userContext.tsx'
import { LoginProvider } from './context/loginContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient} >
    <LoginProvider>
      <UserContextProvider>
        <NotificationProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </NotificationProvider>
      </UserContextProvider>
    </LoginProvider>
  </QueryClientProvider>
)
