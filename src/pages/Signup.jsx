
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
    const {signup, loading} = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [rememberMe, setRememberMe] = useState(true);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await signup(
                {name, email, password},
                rememberMe
            );

            navigate("/login");
        }
        catch (err){
            console.log(err.message)
        }
    }
    

  return (
    <section className="card auth-card">
      <h1>Create account</h1>
      <p>Register a new account to get started.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />

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
          autoComplete="new-password"
          minLength={6}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 6 characters"
        />
          
        {error (
          <p className="alert error" role="alert">
            {error}
          </p>
        )}

        <button className="primary-button" disabled={loading}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p>
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}
