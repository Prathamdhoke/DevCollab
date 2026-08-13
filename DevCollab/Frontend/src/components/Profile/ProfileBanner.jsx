import { useState } from "react";

import "./ProfileBanner.css";

import { MapPin, Pencil, LogOut } from "lucide-react";

function ProfileBanner({ profile, onEdit, onLogout }) {
  const [imageError, setImageError] = useState(false);

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <section className="profile-banner">
      <div className="banner-image">
        <div className="banner-overlay">
          <div className="profile-avatar">
            {profile?.avatar && !imageError ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                onError={() => setImageError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <h1>{profile?.name || "User"}</h1>

          <h3>{profile?.role || "Developer"}</h3>

          {profile?.location && (
            <div className="profile-location">
              <MapPin size={16} />

              <span>{profile.location}</span>
            </div>
          )}

          <div className="profile-actions">
            <button className="edit-profile-btn" onClick={onEdit}>
              <Pencil size={16} />
              Edit Profile
            </button>

            <button className="logout-btn" onClick={onLogout}>
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileBanner;
