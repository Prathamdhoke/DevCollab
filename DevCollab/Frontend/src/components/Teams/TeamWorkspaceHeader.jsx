import "./TeamWorkspaceHeader.css";

import {

    Users,
    FolderKanban,
    Crown

} from "lucide-react";

function TeamWorkspaceHeader({ team }) {

    return (

        <section className="team-workspace-header">

            <div className="team-header-left">

                <h1>

                    {team.name}

                </h1>

                <p>

                    {team.description}

                </p>

            </div>



            <div className="team-header-right">

                <div className="team-stat">

                    <Users size={18} />

                    <span>

                        {team.members.length} Members

                    </span>

                </div>



                <div className="team-stat">

                    <FolderKanban size={18} />

                    <span>

                        {team.projects.length} Projects

                    </span>

                </div>



                <div className="team-stat">

                    <Crown size={18} />

                    <span>

                        {team.owner}

                    </span>

                </div>

            </div>

        </section>

    );

}

export default TeamWorkspaceHeader;