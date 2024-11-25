import React, { useState } from 'react';

const Login = () => {
  const [activeForm, setActiveForm] = useState('login');

  const renderForm = () => {
    switch(activeForm) {
      case 'login':
        return <LoginForm switchToSignUp={() => setActiveForm('signup')} switchToForgotPassword={() => setActiveForm('forgot')} />;
      case 'signup':
        return <SignUpForm switchToLogin={() => setActiveForm('login')} />;
      case 'forgot':
        return <ForgotPasswordForm switchToLogin={() => setActiveForm('login')} />;
      default:
        return <LoginForm switchToSignUp={() => setActiveForm('signup')} switchToForgotPassword={() => setActiveForm('forgot')} />;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-blue-50">
      {/* Wave Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <svg 
          className="wave-animation" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
        >
          <path 
            fill="rgba(59, 130, 246, 0.3)" 
            fillOpacity="1" 
            d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,186.7C672,160,768,128,864,133.3C960,139,1056,181,1152,192C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <svg 
          className="wave-animation" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
        >
          <path 
            fill="rgba(59, 130, 246, 0.2)" 
            fillOpacity="1" 
            d="M0,256L48,250.7C96,245,192,235,288,229.3C384,224,480,224,576,202.7C672,181,768,139,864,138.7C960,139,1056,181,1152,202.7C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-96 bg-white rounded-lg shadow-lg p-8">
        {renderForm()}
      </div>
    </div>
  );
};

const LoginForm = ({ switchToSignUp, switchToForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md" 
            required 
          />
        </div>
        <div className="mb-4">
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Login
        </button>
        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={switchToForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
          <button 
            type="button" 
            onClick={switchToSignUp}
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

const SignUpForm = ({ switchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Sign up logic
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md" 
            required 
          />
        </div>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md" 
            required 
          />
        </div>
        <div className="mb-4">
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Create Account
        </button>
        <div className="text-center">
          <button 
            type="button" 
            onClick={switchToLogin}
            className="text-blue-500 hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </>
  );
};

const ForgotPasswordForm = ({ switchToLogin }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Forgot password logic
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          Reset Password
        </button>
        <div className="text-center">
          <button 
            type="button" 
            onClick={switchToLogin}
            className="text-blue-500 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
