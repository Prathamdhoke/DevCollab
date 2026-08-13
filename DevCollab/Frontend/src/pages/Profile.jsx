import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios.js";

import { useAuth } from "../context/AuthContext.jsx";

import "./Profile.css";

import ProfileBanner from "../components/Profile/ProfileBanner";
import PersonalInfo from "../components/Profile/PersonalInfo";
import Skills from "../components/Profile/Skills";
import RecentActivity from "../components/Profile/RecentActivity";
import EditProfile from "../components/Profile/EditProfile";

function Profile() {
  const { updateUser, logout } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showEditProfile, setShowEditProfile] = useState(false);

  const getProfile = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await api.get("/profile");

      setProfile(response.data.data);
    } catch (error) {
      console.log("Profile Error:", error);

      setError(error.response?.data?.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleProfileUpdated = (updatedProfile) => {
    setProfile(updatedProfile);

    updateUser(updatedProfile);
  };

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <ProfileBanner
        profile={profile}
        onEdit={() => setShowEditProfile(true)}
        onLogout={handleLogout}
      />

      <div className="profile-card">
        <PersonalInfo profile={profile} />
      </div>

      <div className="profile-card">
        <Skills profile={profile} />
      </div>

      <div className="profile-card">
        <RecentActivity profile={profile} />
      </div>

      {showEditProfile && (
        <EditProfile
          profile={profile}
          onClose={() => setShowEditProfile(false)}
          onUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
}

export default Profile;
