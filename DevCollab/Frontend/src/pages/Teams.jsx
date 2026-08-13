import { useState } from "react";

import "./Teams.css";

import SearchBar from "../components/Teams/widgets/SearchBar";
import InvitationCard from "../components/Teams/widgets/InvitationCard";
import TeamGrid from "../components/Teams/TeamGrid";

import teamData from "../components/Teams/Data/teamData";

function Teams() {

    const [invitations, setInvitations] = useState(
        teamData.invitations
    );

    const [teams, setTeams] = useState(
        teamData.teams
    );

    function handleAccept(invitationId) {

        const invitation = invitations.find(

            invite => invite.id === invitationId

        );

        if (!invitation) return;

        const confirmed = window.confirm(

            `Accept invitation to join "${invitation.teamName}" ?`

        );

        if (!confirmed) return;

        setTeams(previous => [

            ...previous,

            {

                id: invitation.teamId,

                name: invitation.teamName,

                description: invitation.description,

                members: invitation.members,

                projects: invitation.projects,

                leader: invitation.leader

            }

        ]);

        setInvitations(previous =>

            previous.filter(

                invite => invite.id !== invitationId

            )

        );

    }

    function handleReject(invitationId) {

        const invitation = invitations.find(

            invite => invite.id === invitationId

        );

        if (!invitation) return;

        const confirmed = window.confirm(

            `Reject invitation from "${invitation.invitedBy}" ?`

        );

        if (!confirmed) return;

        setInvitations(previous =>

            previous.filter(

                invite => invite.id !== invitationId

            )

        );

    }

    return (

        <div className="teams-page">

            <SearchBar />



            {

                invitations.length > 0 && (

                    <section className="teams-section">

                        <h2>

                            Pending Invitations

                        </h2>

                        <div className="invitation-list">

                            {

                                invitations.map(invitation => (

                                    <InvitationCard

                                        key={invitation.id}

                                        invitation={invitation}

                                        onAccept={handleAccept}

                                        onReject={handleReject}

                                    />

                                ))

                            }

                        </div>

                    </section>

                )

            }



            <section className="teams-section">

                <h2>

                    My Teams

                </h2>

                <TeamGrid

                    teams={teams}

                />

            </section>

        </div>

    );

}

export default Teams;