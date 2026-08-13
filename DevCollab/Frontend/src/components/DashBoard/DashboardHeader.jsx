import "./DashboardHeader.css";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

function DashboardHeader() {
  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <header className="dashboard-header">
      <div className="dashboard-actions">
        {/* ==========================
                        NOTIFICATIONS
                ========================== */}

        <button
          className="icon-btn"
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          🔔
        </button>

        {/* ==========================
                            PROFILE
                ========================== */}

        <div
          className="profile-section"
          onClick={() => navigate("/profile")}
          title="View Profile"
        >
          <div className="profile-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <div className="profile-info">
            <span className="profile-name">{user?.name || "User"}</span>

            <span className="profile-role">{user?.role || "Developer"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
