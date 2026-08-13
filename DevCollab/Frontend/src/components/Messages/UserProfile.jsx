import "./UserProfile.css";

import { Mail, Circle, User } from "lucide-react";

function UserProfile({ selectedUser }) {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {selectedUser.name?.charAt(0).toUpperCase()}
        </div>

        <h2>{selectedUser.name}</h2>

        <p>{selectedUser.role || "Developer"}</p>
      </div>

      <div className="profile-section">
        <h3>Contact</h3>

        <div className="profile-item">
          <Mail size={18} />

          <span>{selectedUser.email || "No email available"}</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Status</h3>

        <div className="profile-item">
          <Circle
            size={14}
            fill={selectedUser.isOnline ? "#2ea043" : "#8b949e"}
            color={selectedUser.isOnline ? "#2ea043" : "#8b949e"}
          />

          <span>{selectedUser.isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Profile</h3>

        <div className="profile-item">
          <User size={18} />

          <span>@{selectedUser.username}</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
