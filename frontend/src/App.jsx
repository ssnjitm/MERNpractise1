import { Navigate, Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    getCurrentUser();
  }, []);
  const { userData } = useSelector(state => state.user);

  return (
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
    </Routes>
  )
}

export default App