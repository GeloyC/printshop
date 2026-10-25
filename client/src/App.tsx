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
import Folder from './pages/client/Folder/Folder'


const router = createBrowserRouter([
    {
        element: <ClientLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/service/:slug', element: <ServiceClient /> },
            { path: '/cart', element: <Cart /> },
            { path: '/order-confirmation', element: <OrderConfirmation /> },
            { path: '/folder', element: <Folder /> },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            { path: '/admin/service', element: <ServiceAdmin /> },
            { path: '/admin/service/:slug', element: <SelectedService /> },
            { path: '/admin/service/create', element: <CreateService /> },
        ],
    },
]);



// function App() {

//   return (
//     <BrowserRouter>
    //   <Routes >
    //     <Route element={<ClientLayout />}>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/service/:slug' element={<ServiceClient />} /> 
    //       <Route path='/cart' element={<Cart />} />
    //       <Route path='/order-confirmation' element={<OrderConfirmation />} />
    //       <Route path='/folder' element={<Folder />} />
    //     </Route>

    //     <Route element={<AdminLayout />}>
    //       <Route path="/admin/service" element={<ServiceAdmin />}/>
    //       <Route path='/admin/service/:slug' element={<SelectedService />}/> 
    //       <Route path='/admin/service/create' element={<CreateService />} />
    //     </Route>
    //   </Routes>
//     </BrowserRouter>
//   )
// }



function App() {
    return <RouterProvider router={router}/>
}

export default App
