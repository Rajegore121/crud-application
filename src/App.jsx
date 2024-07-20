import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Adduser from './components/Adduser'
import EditUser from './components/Edituser'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-user' element={<Adduser/>}/>
        <Route path="/edit-user/:id" element={<EditUser/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App