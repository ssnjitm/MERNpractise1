

import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
function App() {
 

  return (
   
  <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    
    </Routes>
  )
}

export default App
