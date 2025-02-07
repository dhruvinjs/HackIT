import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignupPage from './pages/Signup'
import Login from './pages/Login'
import { AllRoutes } from './routes/AllRoutes';
function App() {
  return (
    <div>
      <AllRoutes />
    </div>
  )
}

export default App