import { useEffect, useState } from "react";

import api from "../api/axios.js";

import InvitationCard from "../components/Notifications/InvitationCard";

import "./Notifications.css";

function Notifications() {
  const [invitations, setInvitations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  /* =========================================
                GET INVITATIONS
    ========================================= */

  const getInvitations = async () => {
    try {
      setLoading(true);

      const response = await api.get("/invitations");

      if (response.data.success) {
        setInvitations(response.data.data);
      }
    } catch (error) {
      console.log("Get Invitations Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
                LOAD ON PAGE OPEN
    ========================================= */

  useEffect(() => {
    getInvitations();
  }, []);

  /* =========================================
                ACCEPT INVITATION
    ========================================= */

  const handleAccept = async (invitationId) => {
    try {
      setActionLoading(true);

      const response = await api.patch(`/invitations/${invitationId}/accept`);

      if (response.data.success) {
        setInvitations((prevInvitations) =>
          prevInvitations.filter(
            (invitation) => invitation._id !== invitationId,
          ),
        );
      }
    } catch (error) {
      console.log("Accept Invitation Error:", error);

      alert(error.response?.data?.message || "Failed to accept invitation.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================
                REJECT INVITATION
    ========================================= */

  const handleReject = async (invitationId) => {
    try {
      setActionLoading(true);

      const response = await api.patch(`/invitations/${invitationId}/reject`);

      if (response.data.success) {
        setInvitations((prevInvitations) =>
          prevInvitations.filter(
            (invitation) => invitation._id !== invitationId,
          ),
        );
      }
    } catch (error) {
      console.log("Reject Invitation Error:", error);

      alert(error.response?.data?.message || "Failed to reject invitation.");
    } finally {
      setActionLoading(false);
    }
  };

  /* =========================================
                    RENDER
    ========================================= */

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>

          <p>Manage your project invitations and collaboration requests.</p>
        </div>
      </div>

      <div className="notifications-content">
        <h2>Project Invitations</h2>

        {loading ? (
          <div className="notifications-state">Loading invitations...</div>
        ) : invitations.length === 0 ? (
          <div className="notifications-state">
            <h3>No pending invitations</h3>

            <p>You don't have any project invitations right now.</p>
          </div>
        ) : (
          <div className="invitations-list">
            {invitations.map((invitation) => (
              <InvitationCard
                key={invitation._id}
                invitation={invitation}
                onAccept={handleAccept}
                onReject={handleReject}
                loading={actionLoading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
