
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";



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
