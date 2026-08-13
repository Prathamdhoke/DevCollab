import { useState } from "react";

import api from "../../api/axios.js";

import "./InviteMember.css";

function InviteMember({ project, onClose, onInvited }) {
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);

  /* =====================================================
                    SEND INVITATION
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      alert("Please enter a username.");

      return;
    }

    try {
      setLoading(true);

      const response = await api.post(`/projects/${project._id}/invitations`, {
        username: cleanUsername,
      });

      if (response.data.success) {
        alert("Project invitation sent successfully.");

        if (onInvited) {
          onInvited(response.data.data);
        }

        onClose();
      }
    } catch (error) {
      console.log("Invite Member Error:", error);

      alert(
        error.response?.data?.message || "Failed to send project invitation.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invite-member-overlay">
      <div className="invite-member-modal">
        {/* =========================
                    HEADER
        ========================= */}

        <div className="invite-member-header">
          <div>
            <h2>Invite Member</h2>

            <p>Invite a user to join this project.</p>
          </div>

          <button
            type="button"
            className="invite-member-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* =========================
                    FORM
        ========================= */}

        <form className="invite-member-form" onSubmit={handleSubmit}>
          <div className="invite-form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="e.g. testdeveloper"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div className="invite-member-actions">
            <button
              type="button"
              className="cancel-invite-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="send-invite-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InviteMember;
