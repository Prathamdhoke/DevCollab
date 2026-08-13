import { useEffect, useState } from "react";

import api from "../../api/axios.js";

import "./EditProfile.css";

function EditProfile({ profile, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: "",

    bio: "",

    location: "",

    website: "",

    role: "",

    skills: "",

    github: "",

    linkedin: "",

    portfolio: "",

    twitter: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  /* =====================================================
                    LOAD PROFILE DATA
    ===================================================== */

  useEffect(() => {
    if (!profile) {
      return;
    }

    setFormData({
      name: profile.name || "",

      bio: profile.bio || "",

      location: profile.location || "",

      website: profile.website || "",

      role: profile.role || "",

      skills: profile.skills ? profile.skills.join(", ") : "",

      github: profile.socialLinks?.github || "",

      linkedin: profile.socialLinks?.linkedin || "",

      portfolio: profile.socialLinks?.portfolio || "",

      twitter: profile.socialLinks?.twitter || "",
    });
  }, [profile]);

  /* =====================================================
                    HANDLE INPUT
    ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,

      [name]: value,
    }));
  };

  /* =====================================================
                    UPDATE PROFILE
    ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      const response = await api.put(
        "/profile",

        {
          name: formData.name,

          bio: formData.bio,

          location: formData.location,

          website: formData.website,

          role: formData.role,

          skills: skills,

          socialLinks: {
            github: formData.github,

            linkedin: formData.linkedin,

            portfolio: formData.portfolio,

            twitter: formData.twitter,
          },
        },
      );

      console.log("Profile Updated:", response.data);

      if (onUpdated) {
        onUpdated(response.data.data);
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.log("Profile Update Error:", error);

      setError(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-overlay">
      <div className="edit-profile-modal">
        {/* ===========================
                        HEADER
                =========================== */}

        <div className="edit-profile-header">
          <h2>Edit Profile</h2>

          <button
            type="button"
            className="edit-profile-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* ===========================
                        ERROR
                =========================== */}

        {error && <div className="edit-profile-error">{error}</div>}

        {/* ===========================
                        FORM
                =========================== */}

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="edit-form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-form-group">
            <label>Role</label>

            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Software Developer"
            />
          </div>

          <div className="edit-form-group">
            <label>Bio</label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell other developers about yourself..."
              rows="4"
            />
          </div>

          <div className="edit-form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="India"
            />
          </div>

          <div className="edit-form-group">
            <label>Website</label>

            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="edit-form-group">
            <label>Skills</label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB, C++"
            />

            <small>Separate skills using commas.</small>
          </div>

          <div className="edit-profile-section">
            <h3>Social Links</h3>

            <div className="edit-form-group">
              <label>GitHub</label>

              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
              />
            </div>

            <div className="edit-form-group">
              <label>LinkedIn</label>

              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="edit-form-group">
              <label>Portfolio</label>

              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div className="edit-form-group">
              <label>Twitter</label>

              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          {/* ===========================
                            ACTIONS
                    =========================== */}

          <div className="edit-profile-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-profile-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
