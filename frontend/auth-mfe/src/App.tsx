
import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './app/store';
import { loginSuccess } from './features/auth/authSlice'
import { useLoginMutation, useRegisterMutation, useLazyProfileQuery } from './services/authApi';

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [getProfile] = useLazyProfileQuery();
  console.log('Authenticated', isAuthenticated);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')
    setApiError("");
    setSuccessMessage("");

    if (!isLogin && !name.trim()) {
      setApiError('Full name is required');
      return;
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }
    setIsLoading(true);

    try {
      if (isLogin) {
        const response = await login({
          email: email.trim(),
          password,
        }).unwrap();
        const profile = await getProfile().unwrap();
        console.log("Authenticated user :", profile);

        dispatch(loginSuccess());
        setSuccessMessage(response.message || 'Login successful');
      } else {
        const response = await register({
          name: name.trim(),
          email: email.trim(),
          password,
        }).unwrap();
        setSuccessMessage(response.message || 'Registration successful');
      }


    } catch (error: unknown) {
      console.error('Authentication error:', error);
      setApiError('Unable to complete the request. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <aside className="brand-panel">
          <a className="brand" href="/" aria-label="AgencyOS home">
            <span className="brand-icon">A</span>
            <span>AgencyOS</span>
          </a>

          <div className="brand-copy">
            <span className="eyebrow">YOUR WORKSPACE, REIMAGINED</span>
            <h2>
              Build something
              <span> great.</span>
            </h2>
            <p>
              Your workspace, organized and ready to grow.
              Everything you need, all in one place.
            </p>
          </div>

          <div className="orbit-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />

            <div className="orbit-center">A</div>
            <div className="orbit-tile tile-one">✦</div>
            <div className="orbit-tile tile-two">&lt;/&gt;</div>
            <div className="orbit-tile tile-three">▥</div>
            <div className="orbit-tile tile-four">⚙</div>
          </div>

          <p className="brand-footer">
            A better way to build, manage and grow.
          </p>
        </aside>

        <section className="form-panel">
          <div className="form-content">
            <div className="mobile-brand">
              <span className="brand-icon">A</span>
              <span>AgencyOS</span>
            </div>

            <div className="form-heading">
              <div className="form-mark">A</div>
              <h1>{isLogin ? 'Welcome back' : 'Create your account'}</h1>
              <p>
                {isLogin
                  ? 'Sign in to your AgencyOS account'
                  : 'Get started with your free account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              {!isLogin && (
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              )}

              <div className="field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
                {emailError && <p className="field-error">{emailError}</p>}
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="password-wrap">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={
                      isLogin ? 'current-password' : 'new-password'
                    }
                    required
                    minLength={8}
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                {passwordError && <p className="field-error">{passwordError}</p>}
              </div>

              {isLogin && (
                <div className="form-options">
                  <label className="remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <button
                    className="text-button"
                    type="button"
                    onClick={() =>
                      alert('Password reset will be added next.')
                    }
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              {apiError && (<p className='field-error' role="alert">{apiError}</p>)}
              {successMessage && (
                <p role="status">{successMessage}</p>
              )}
              <button className="primary-button" type="submit" disabled={isLoginLoading || isRegisterLoading}>
                {isLoading
                  ? 'Please wait...'
                  : isLogin
                    ? 'Sign in'
                    : 'Create account'}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="separator">
              <span />
              <p>Secure authentication</p>
              <span />
            </div>

            <p className="switch-copy">
              {isLogin
                ? "Don't have an account?"
                : 'Already have an account?'}
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setShowPassword(false)
                }}
              >
                {isLogin ? 'Create account' : 'Sign in'}
              </button>
            </p>

            <p className="legal">
              By continuing, you agree to our
              {' '}<a href="#terms">Terms of Service</a> and
              {' '}<a href="#privacy">Privacy Policy</a>.
            </p>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
