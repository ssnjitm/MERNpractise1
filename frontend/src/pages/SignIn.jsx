import React, { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";

function SignIn() {
  const [form, setForm] = useState({
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
      const res = await fetch('http://localhost:8000/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Sign in failed');
      } else {
        setSuccess('Sign in successful!');
        // You can redirect or save token here
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex overflow-hidden border-2 border-[#1a1f23]'>

        {/* Left Side - Info Panel (hide on small screens) */}
        <div className='hidden lg:flex w-[50%] h-full flex-col items-center p-[10px] gap-[20px] justify-center bg-white'>
          <span className="text-xl font-semibold text-gray-700">
           Sign in to 
          </span>
          <img src="src/assets/logo.png" alt="Logo" className="w-40 h-40 rounded-full mb-4" />
          <p className="text-center text-base text-gray-600 leading-relaxed">
            Welcome to <span className="font-bold text-red-500">RamailoNepal</span><br />
            Nepali heart, global fun!
          </p>
        </div>

        {/* Right Side - Form Panel (always visible) */}
        <div className='w-full lg:w-[50%] h-full flex flex-col justify-center items-center bg-black gap-[10px] text-white text-[16px] font-semibold shadow-2xl shadow-black'>
          <div className='flex flex-col items-center mb-4'>
            <img src="src/assets/signin.png" alt="image" className="w-35 h-35 rounded-full mb-2" />
            <span className="ml-2 text-1xl">Hmmm! Let's check Your Account !! </span>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <form className="flex flex-col gap-4 w-full max-w-xs" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-3 border rounded-full  "
              value={form.username}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="p-3 border rounded-full w-full pr-12 "
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
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-sm mt-2">
            Don't have an account? <a href="/signup" className="text-blue-600 underline">Sign Up</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SignIn;