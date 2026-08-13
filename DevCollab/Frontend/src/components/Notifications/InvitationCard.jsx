import "./InvitationCard.css";

import { Check, X, Users } from "lucide-react";

function InvitationCard({ invitation, onAccept, onReject, loading }) {
  const project = invitation.project;

  const invitedBy = invitation.invitedBy;

  return (
    <div className="invitation-card">
      {/* =========================
                    PROJECT ICON
            ========================= */}

      <div className="invitation-icon">
        <Users size={24} />
      </div>

      {/* =========================
                    INVITATION INFO
            ========================= */}

      <div className="invitation-info">
        <h3>{project?.name}</h3>

        <p>
          {invitedBy?.name || invitedBy?.username} invited you to join this
          project.
        </p>

        {project?.description && (
          <span className="invitation-description">{project.description}</span>
        )}
      </div>

      {/* =========================
                    ACTIONS
            ========================= */}

      <div className="invitation-actions">
        <button
          className="accept-invitation-btn"
          onClick={() => onAccept(invitation._id)}
          disabled={loading}
        >
          <Check size={17} />
          Accept
        </button>

        <button
          className="reject-invitation-btn"
          onClick={() => onReject(invitation._id)}
          disabled={loading}
        >
          <X size={17} />
          Reject
        </button>
      </div>
    </div>
  );
}

export default InvitationCard;
