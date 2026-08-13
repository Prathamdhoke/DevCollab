import "./MemberCard.css";

import {

    Crown,
    Shield,
    User

} from "lucide-react";

function MemberCard({

    member,

    isOwner,

    isCoOwner

}) {

    function getRoleIcon() {

        switch (member.role) {

            case "owner":

                return <Crown size={18} />;

            case "co-owner":

                return <Shield size={18} />;

            default:

                return <User size={18} />;

        }

    }

    function getRoleName() {

        switch (member.role) {

            case "owner":

                return "Owner";

            case "co-owner":

                return "Co-Owner";

            default:

                return "Member";

        }

    }

    return (

        <div className="member-card">

            <div className="member-left">

                <div className="member-avatar">

                    {member.name.charAt(0)}

                </div>

                <div className="member-info">

                    <h3>

                        {member.name}

                    </h3>

                    <p>

                        {member.email}

                    </p>

                </div>

            </div>



            <div className="member-right">

                <div className="member-role">

                    {getRoleIcon()}

                    <span>

                        {getRoleName()}

                    </span>

                </div>



                {

                    isOwner &&

                    member.role !== "owner" && (

                        <div className="member-actions">

                            {

                                member.role === "member" && (

                                    <button>

                                        Make Co-Owner

                                    </button>

                                )

                            }



                            {

                                member.role === "co-owner" && (

                                    <button>

                                        Remove Co-Owner

                                    </button>

                                )

                            }



                            <button className="danger-btn">

                                Remove

                            </button>

                        </div>

                    )

                }



                {

                    isCoOwner &&

                    member.role === "member" && (

                        <button className="request-btn">

                            Request Remove

                        </button>

                    )

                }

            </div>

        </div>

    );

}

export default MemberCard;