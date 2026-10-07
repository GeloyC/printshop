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
import { UserContextProvider } from './context/userContext.tsx'
import { getUser } from './api/user.ts'

const queryClient = new QueryClient();
const currentUser = await getUser();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient} >
    <UserContextProvider>
      <NotificationProvider>
        <CartProvider>
          <FileProvider>
            <App />
          </FileProvider>
        </CartProvider>
      </NotificationProvider>
    </UserContextProvider>
  </QueryClientProvider>
)
