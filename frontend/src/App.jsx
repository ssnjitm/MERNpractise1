

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { Routes, Route } from 'react-router-dom'
function App() {
 

  return (
   
  <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    
    </Routes>
  )
}

export default App
