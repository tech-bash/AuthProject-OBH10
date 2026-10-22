
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        logout();

        navigate('/login');
    }

  return (
    <section className="card dashboard-card">
      <h1>Welcome, {user?.name}!</h1>

      <p>You have successfully logged in.</p>

      <div className="profile-row">
        <span>Name</span>
        <strong>{user?.name}</strong>
      </div>

      <div className="profile-row">
        <span>Email</span>
        <strong>{user?.email}</strong>
      </div>

      <button
        className="secondary-button"
        onClick={handleLogout}
      >
        Log out
      </button>
    </section>
  );
}
