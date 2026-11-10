import './App.css'
import { createBrowserRouter, BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom'

import ClientLayout from './layouts/client.layout'
import Home from './pages/client/Home/Home' 
import AdminLayout from './layouts/admin.layout'
import ServiceClient from './pages/client/Service/ServiceClient'
import ServiceAdmin from './pages/admin/Services/ServiceAdmin'
import CreateService from './pages/admin/CreateService/CreateService'
import SelectedService from './pages/admin/SelectedService/SelectedService'
import Cart from './pages/client/Cart/Cart'
import OrderConfirmation from './pages/client/OrderConfirmation/OrderConfirmation'
import Orders from './pages/client/Orders/Orders'
import OrdersAdmin from './pages/admin/Orders/OrdersAdmin'

const router = createBrowserRouter([
    {
        element: <ClientLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/service/:slug', element: <ServiceClient /> },
            { path: '/cart', element: <Cart /> },
            { path: '/order-confirmation', element: <OrderConfirmation /> },
            { path: '/order', element: <Orders /> },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            { path: '/admin/service', element: <ServiceAdmin /> },
            { path: '/admin/service/:slug', element: <SelectedService /> },
            { path: '/admin/service/create', element: <CreateService /> },
            { path: '/admin/orders', element: <OrdersAdmin /> },
        ],
    },
]);



function App() {
    return <RouterProvider router={router}/>
}

export default App
