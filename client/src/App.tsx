import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ClientLayout from './layouts/client.layout'
import Home from './pages/client/Home' 
import DocumentPrintSetup from './pages/client/DocumentPrintSetup'
import AdminLayout from './layouts/admin.layout'
import Service from './pages/admin/Service'
import CreateService from './pages/admin/CreateService'

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/document-print/setup" element={<DocumentPrintSetup/>} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/service" element={<Service />}/>
          <Route path='/admin/service/create' element={<CreateService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
