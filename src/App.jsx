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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const shouldRequireName = !isLoginMode;

    if (
      !formState.email.trim() ||
      !formState.password.trim() ||
      (shouldRequireName && !formState.name.trim())
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
    setMessage('');
  };

  return (
    <div className="page">
      <div className="card">
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
        {message && <p className="message">{message}</p>}
        <p className="note">
          Tip: Connect this form to your backend API, Firebase, or another auth provider
          to make it production-ready.
        </p>
      </div>
    </div>
  );
}

export default App;
