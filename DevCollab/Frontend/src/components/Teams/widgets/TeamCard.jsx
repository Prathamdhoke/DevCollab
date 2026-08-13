import "./TeamCard.css";

import { useNavigate } from "react-router-dom";

import {

    Users,
    FolderKanban,
    Crown,
    ArrowRight

} from "lucide-react";

function TeamCard({ team }) {

    const navigate = useNavigate();

    function openTeam() {

        navigate(`/teams/${team.id}`);

    }

    return (

        <div className="team-card">

            <div className="team-top">

                <h3>

                    {team.name}

                </h3>

                <span className="team-role">

                    {team.currentUserRole}

                </span>

            </div>



            <p className="team-description">

                {team.description}

            </p>



            <div className="team-stats">

                <div>

                    <Users size={16} />

                    <span>

                        {team.members.length} Members

                    </span>

                </div>

                <div>

                    <FolderKanban size={16} />

                    <span>

                        {team.projects.length} Projects

                    </span>

                </div>

                <div>

                    <Crown size={16} />

                    <span>

                        {team.owner}

                    </span>

                </div>

            </div>



            <button

                className="open-team-btn"

                onClick={openTeam}

            >

                Open Team

                <ArrowRight size={18} />

            </button>

        </div>

    );

}

export default TeamCard;