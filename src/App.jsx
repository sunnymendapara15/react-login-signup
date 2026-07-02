import { useState } from 'react';
import './App.css';

const initialFormState = {
  name: '',
  email: '',
  password: ''
};

function App() {
  const [mode, setMode] = useState('login');
  const [formState, setFormState] = useState(initialFormState);
  const [message, setMessage] = useState('');

  const isLoginMode = mode === 'login';
  const isSignupMode = mode === 'signup';
  const isForgotMode = mode === 'forgot';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isForgotMode) {
      if (!formState.email.trim()) {
        setMessage('Please enter your email to receive the reset link.');
        return;
      }

      setMessage(
        `If an account exists for ${formState.email}, we just emailed a reset link.`
      );
      setFormState(initialFormState);
      return;
    }

    const requiresName = isSignupMode;

    if (
      !formState.email.trim() ||
      !formState.password.trim() ||
      (requiresName && !formState.name.trim())
    ) {
      setMessage('Please complete all required fields.');
      return;
    }

    setMessage(
      isLoginMode
        ? `Welcome back! You are logged in as ${formState.email}.`
        : `Account created! Signed up as ${formState.email}.`
    );
    setFormState(initialFormState);
  };

  const handleModeChange = (nextMode) => {
    setMode(nextMode);
    setFormState(initialFormState);
    setMessage('');
  };

  return (
    <div className="page">
      <div className={`card ${isForgotMode ? 'forgot-card' : ''}`}>
        {!isForgotMode ? (
          <>
            <div className="toggle">
              <button
                type="button"
                className={isLoginMode ? 'active' : ''}
                onClick={() => handleModeChange('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={!isLoginMode ? 'active' : ''}
                onClick={() => handleModeChange('signup')}
              >
                Sign up
              </button>
            </div>
            <h1>{isLoginMode ? 'Welcome back!' : 'Create your account'}</h1>
            <form onSubmit={handleSubmit}>
              {!isLoginMode && (
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </label>
              )}
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                />
              </label>
              <button type="submit" className="primary">
                {isLoginMode ? 'Log in' : 'Create account'}
              </button>
            </form>
            <p className="prompt">
              <button
                type="button"
                className="text-link"
                onClick={() => handleModeChange('forgot')}
              >
                Forgot your password?
              </button>
            </p>
            <p className="note">
              Tip: Connect this form to your backend API, Firebase, or another auth provider
              to make it production-ready.
            </p>
          </>
        ) : (
          <>
            <h1>Reset your password</h1>
            <p className="description">
              Enter the email address associated with your account and we will send you a password
              reset link right away.
            </p>
            <form onSubmit={handleSubmit} className="forgot-form">
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />
              </label>
              <button type="submit" className="primary">
                Send reset link
              </button>
            </form>
            <button
              type="button"
              className="text-link back-link"
              onClick={() => handleModeChange('login')}
            >
              Back to login
            </button>
            <p className="note small">
              This is a client-side demo. Plug in your email provider or identity platform to send real
              reset emails.
            </p>
          </>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
