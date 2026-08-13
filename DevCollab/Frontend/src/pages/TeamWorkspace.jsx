import { useParams } from "react-router-dom";

import "./TeamWorkspace.css";

import TeamWorkspaceHeader from "../components/Teams/TeamWorkspaceHeader";

import MemberCard from "../components/Teams/widgets/MemberCard";
import InvitationCard from "../components/Teams/widgets/InvitationCard";
import RequestCard from "../components/Teams/widgets/RequestCard";
import ActivityCard from "../components/Teams/widgets/ActivityCard";

import teamData from "../components/Teams/Data/teamData";

function TeamWorkspace() {

    const { teamId } = useParams();

    const team = teamData.teams.find(

        team => team.id === Number(teamId)

    );

    if (!team) {

        return <h2>Team Not Found</h2>;

    }

    /* ==========================
            PERMISSIONS
    ========================== */

    const isOwner =

        team.currentUserRole === "owner";

    const isCoOwner =

        team.currentUserRole === "co-owner";

    return (

        <div className="team-workspace">

            <TeamWorkspaceHeader

                team={team}

            />



            {/* ==========================
                    MEMBERS
            ========================== */}

            <section className="workspace-section">

                <h2>

                    Members

                </h2>

                <div className="workspace-grid">

                    {

                        team.members.map(member => (

                            <MemberCard

                                key={member.id}

                                member={member}

                                isOwner={isOwner}

                                isCoOwner={isCoOwner}

                            />

                        ))

                    }

                </div>

            </section>



            {/* ==========================
                PENDING INVITATIONS
            ========================== */}

            {

                team.pendingInvitations.length > 0 && (

                    <section className="workspace-section">

                        <h2>

                            Pending Invitations

                        </h2>

                        <div className="workspace-grid">

                            {

                                team.pendingInvitations.map(invitation => (

                                    <InvitationCard

                                        key={invitation.id}

                                        invitation={invitation}

                                        onAccept={() => {}}

                                        onReject={() => {}}

                                    />

                                ))

                            }

                        </div>

                    </section>

                )

            }



            {/* ==========================
                PENDING REQUESTS
            ========================== */}

            {

                isOwner &&

                team.pendingRequests.length > 0 && (

                    <section className="workspace-section">

                        <h2>

                            Pending Requests

                        </h2>

                        <div className="workspace-grid">

                            {

                                team.pendingRequests.map(request => (

                                    <RequestCard

                                        key={request.id}

                                        request={request}

                                    />

                                ))

                            }

                        </div>

                    </section>

                )

            }



            {/* ==========================
                    ACTIVITY
            ========================== */}

            <section className="workspace-section">

                <h2>

                    Recent Activity

                </h2>

                <div className="workspace-grid">

                    {

                        team.activity.map(activity => (

                            <ActivityCard

                                key={activity.id}

                                activity={activity}

                            />

                        ))

                    }

                </div>

            </section>

        </div>

    );

}

export default TeamWorkspace;