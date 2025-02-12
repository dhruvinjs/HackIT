import React, { useEffect } from 'react'
import { AllRoutes } from './routes/AllRoutes';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
function App() {
  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    const func = async () => {
      await checkAuth();
    }
    func();
  }, [checkAuth])
  return (
    <div>
      <AllRoutes />
    </div>
  )
}

export default App