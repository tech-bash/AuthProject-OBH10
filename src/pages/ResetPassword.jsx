
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ResetPassword() {
    const {resetPassword, loading} = useAuth();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setSuccess("");
        try {
           const result = await resetPassword(
            email,
            newPassword
           );

           setSuccess(result.message);
           setTimeout(() =>  navigate(
        location.state?.from?.pathname || "/",
        { replace: true }
      ), 1500); // hold for 1.5 seconds and then send to login page
        }
        catch(err){
            console.log(setError(err) || "Something is wrong ")
        }
    }

  return (
    <section className="card auth-card">
      <h1>Reset password</h1>
      <p>Enter your registered email and new password.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Registered email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />

        <label htmlFor="new-password">New password</label>
        <input
          id="new-password"
          type="password"
          minLength={6}
          required
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="At least 6 characters"
        />

        <label htmlFor="confirm-password">
          Confirm new password
        </label>
        <input
          id="confirm-password"
          type="password"
          minLength={6}
          required
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          placeholder="Enter it again"
        />

        {error && (
          <p className="alert error" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="alert success" role="status">
            {success}
          </p>
        )}

        <button className="primary-button" disabled={loading}>
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>

      <p>
        <Link to="/login">Back to login</Link>
      </p>
    </section>
  );
}
