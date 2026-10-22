
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await login({ email, password }, rememberMe);

      navigate(
        location.state?.from?.pathname || "/dashboard",
        { replace: true }
      );
    } catch (err) {
      setError(err.message || "Unable to log in.");
    }
  }

  return (
    <section className="card auth-card">
      <h1>Welcome back</h1>
      <p>Sign in to your account.</p>

      <div className="demo-note">
        <strong>Demo account</strong>
        <p>Email: bhavy@example.com</p>
        <p>Password: Demo123</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(event) =>
              setRememberMe(event.target.checked)
            }
          />
          Remember me
        </label>

        {error && (
          <p className="alert error" role="alert">
            {error}
          </p>
        )}

        <button className="primary-button" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p>
        <Link to="/reset-password">Forgot password?</Link>
      </p>

      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
}
