import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ClientLayout from './layouts/client.layout'
import Home from './pages/Home' 
import DocumentPrintSetup from './pages/DocumentPrintSetup'

function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/document-print/setup" element={<DocumentPrintSetup/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
