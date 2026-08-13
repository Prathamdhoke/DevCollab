import "./TeamGrid.css";

import TeamCard from "./widgets/TeamCard";

function TeamGrid({ teams }) {

    return (

        <div className="team-grid">

            {

                teams.map(team => (

                    <TeamCard

                        key={team.id}

                        team={team}

                    />

                ))

            }

        </div>

    );

}

export default TeamGrid;