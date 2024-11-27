import React, { useState } from 'react';

const Login = () => {
  const [activeForm, setActiveForm] = useState('login');

  const renderForm = () => {
    switch (activeForm) {
      case 'login':
        return (
          <LoginForm
            switchToSignUp={() => setActiveForm('signup')}
            switchToForgotPassword={() => setActiveForm('forgot')}
          />
        );
      case 'signup':
        return <SignUpForm switchToLogin={() => setActiveForm('login')} />;
      case 'forgot':
        return <ForgotPasswordForm switchToLogin={() => setActiveForm('login')} />;
      default:
        return (
          <LoginForm
            switchToSignUp={() => setActiveForm('signup')}
            switchToForgotPassword={() => setActiveForm('forgot')}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-50 overflow-hidden">
      {/* Rotating Wave */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[1000px] h-[1025px] bg-white opacity-75 rounded-[35%] animate-wave"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-96 bg-white rounded-lg shadow-lg p-8">
        {renderForm()}
      </div>
    </div>
  );
};

const LoginForm = ({ switchToSignUp, switchToForgotPassword }) => (
  <div>
    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>
    <form>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
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
  </div>
);

const SignUpForm = ({ switchToLogin }) => (
  <div>
    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Sign Up</h2>
    <form>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
      >
        Sign Up
      </button>
      <button
        type="button"
        onClick={switchToLogin}
        className="text-blue-500 hover:underline w-full text-center"
      >
        Back to Login
      </button>
    </form>
  </div>
);

const ForgotPasswordForm = ({ switchToLogin }) => (
  <div>
    <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Forgot Password</h2>
    <form>
      <div className="mb-4">
        <input
          type="email"
          placeholder="Enter your email"
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
      <button
        type="button"
        onClick={switchToLogin}
        className="text-blue-500 hover:underline w-full text-center"
      >
        Back to Login
      </button>
    </form>
  </div>
);

export default Login;
