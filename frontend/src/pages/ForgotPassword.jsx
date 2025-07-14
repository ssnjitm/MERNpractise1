import { useState } from "react";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    
    // Password reset logic here
    setStep(4); // Success step
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center p-4'>
      {step === 1 && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h2>
              <p className="text-gray-600">Enter your email to receive an OTP</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-400 transition duration-200"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Send OTP
              </button>
            </form>
            
            <div className="text-center mt-6">
              <a href="/login" className="text-blue-500 hover:text-blue-600 text-sm transition duration-200">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify OTP</h2>
              <p className="text-gray-600">
                We've sent a 6-digit code to <span className="text-gray-800 font-medium">{email}</span>
              </p>
            </div>
            
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-6">
                <label htmlFor="otp" className="block text-gray-700 text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-400 transition duration-200 text-center text-xl tracking-widest"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 mb-4"
              >
                Verify & Continue
              </button>
              
              <div className="text-center text-sm text-gray-500">
                Didn't receive code? <button type="button" className="text-blue-500 hover:text-blue-600 font-medium">Resend OTP</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Set New Password</h2>
              <p className="text-gray-600">Create a strong, new password for your account</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-400 transition duration-200"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-400 transition duration-200"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
      
      {step === 4 && (
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your password has been updated successfully. You can now login with your new password.
            </p>
            
            <a
              href="/login"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Back to Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;