import "./InvitationCard.css";

import { Users } from "lucide-react";

function InvitationCard({

    invitation,

    onAccept,

    onReject

}) {

    return (

        <div className="invitation-card">

            <div className="invitation-content">

                <h3>

                    {invitation.teamName}

                </h3>

                <p>

                    <strong>

                        {invitation.invitedBy}

                    </strong>

                    {" invited you to join this team."}

                </p>

                <div className="invitation-members">

                    <Users size={16} />

                    <span>

                        {invitation.members} Members

                    </span>

                </div>

            </div>



            <div className="invitation-actions">

                <button

                    className="reject-btn"

                    onClick={() => onReject(invitation.id)}

                >

                    Reject

                </button>

                <button

                    className="accept-btn"

                    onClick={() => onAccept(invitation.id)}

                >

                    Accept

                </button>

            </div>

        </div>

    );

}

export default InvitationCard;