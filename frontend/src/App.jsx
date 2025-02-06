import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignupPage from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/signup"  element={<SignupPage/>} />
        <Route path="/login"  element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App