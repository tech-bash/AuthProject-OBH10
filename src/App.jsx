
import { Navigate, Route, Routes, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const { user, loading } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          AuthLab
        </Link>

        <span className="topbar-caption">
          React Authentication Demo
        </span>

        {!loading && user && (
          <span className="signed-in">Signed in</span>
        )}
      </header>

      <main className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={user ? "/dashboard" : "/login"}
                replace
              />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
          </Route>

          <Route
            path="*"
            element={
              <section className="card auth-card">
                <h1>Page not found</h1>
                <Link to="/">Go home</Link>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        Built for learning · React authentication project
      </footer>
    </div>
  );
}
