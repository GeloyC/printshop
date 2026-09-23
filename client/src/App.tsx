import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ClientLayout from './layouts/client.layout'
import Home from './pages/client/Home/Home' 
import AdminLayout from './layouts/admin.layout'
import ServiceClient from './pages/client/Service/ServiceClient'
import ServiceAdmin from './pages/admin/ServiceAdmin'
import CreateService from './pages/admin/CreateService/CreateService'
import SelectedService from './pages/admin/SelectedService/SelectedService'
import Cart from './pages/client/Cart/Cart'

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path='/service/slug' element={<ServiceClient />} /> {/* change path to /service/:slug later*/}
          <Route path='/cart' element={<Cart />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/service" element={<ServiceAdmin />}/>
          <Route path='/admin/service/service_name' element={<SelectedService />}/> {/* Change this later to :service_name */}
          <Route path='/admin/service/create' element={<CreateService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
