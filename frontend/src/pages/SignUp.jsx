import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { setUserData } from '../redux/userSlice';

function SignUp() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const override = {
    display: "block",
    margin: "0 auto",
  };

  // Example action for signup (replace with your actual action)
  // const signupAction = (userData) => ({
  //   type: "SIGNUP",
  //   payload: userData,
  // });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Sign up failed');
      } else {
        setSuccess('Sign up successful! You can now sign in.');
        setForm({ name: '', email: '', username: '', password: '' });
        // Dispatch signup action with user data (you can adjust as needed)
        dispatch(setUserData(result.data));
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex overflow-hidden border-2 border-[#1a1f23]'>

        {/* Left Side - Form Panel */}
        <div className='hidden lg:flex w-[50%] h-full flex-col items-center p-[10px] gap-[20px] justify-center bg-white'>
          <span className="text-xl font-semibold text-gray-700">
            Sign up to
          </span>
          <img src="src/assets/logo.png" alt="Logo" className="w-40 h-40 mb-4 rounded-full" />
          <p className="text-center text-base text-gray-600 leading-relaxed">
            Welcome to <span className="font-bold text-red-500">RamailoNepal</span><br />
            Nepali heart, global fun!
          </p>
        </div>

        {/* Right Side - Info Panel */}
        <div className='w-full lg:w-[50%] h-full flex flex-col justify-center items-center bg-black gap-[10px] text-white text-[16px] font-semibold shadow-2xl shadow-black'>
          <div className=' flex flex-col items-center'>
            <img src="src/assets/signin.png" alt="image"  className="w-35 h-35  rounded-full" />
            <span className="ml-6 text-1xl ">I'm Registering you to RamailoNepal</span>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-3 border rounded-full"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="p-3 border rounded-full"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-3 border rounded-full"
              value={form.username}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="p-3 border rounded-full w-full pr-12"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className="bg-gray text-white p-3 rounded-full hover:bg-gray-800 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={24}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <div className="text-sm mt-2">
            Already have an account? <a href="/signin" className="text-blue-600 underline">Sign In</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignUp;