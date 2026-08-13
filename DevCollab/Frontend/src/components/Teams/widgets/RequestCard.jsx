import "./RequestCard.css";

import {

    UserRoundX

} from "lucide-react";

function RequestCard({

    request

}) {

    function handleAccept() {

        const confirmed = window.confirm(

            `Approve ${request.requestedBy}'s request to remove ${request.targetMember}?`

        );

        if (!confirmed) return;

        alert("Request Approved");

        // Backend Later
        // Remove Member
        // Delete Request

    }

    function handleReject() {

        const confirmed = window.confirm(

            `Reject ${request.requestedBy}'s request?`

        );

        if (!confirmed) return;

        alert("Request Rejected");

        // Backend Later
        // Delete Request

    }

    return (

        <div className="request-card">

            <div className="request-info">

                <div className="request-icon">

                    <UserRoundX size={22} />

                </div>

                <div>

                    <h3>

                        Remove Member Request

                    </h3>

                    <p>

                        <strong>

                            {request.requestedBy}

                        </strong>

                        {" wants to remove "}

                        <strong>

                            {request.targetMember}

                        </strong>

                    </p>

                </div>

            </div>



            <div className="request-actions">

                <button

                    className="reject-request-btn"

                    onClick={handleReject}

                >

                    Reject

                </button>

                <button

                    className="accept-request-btn"

                    onClick={handleAccept}

                >

                    Accept

                </button>

            </div>

        </div>

    );

}

export default RequestCard;