import "./TeamsHeader.css";

function TeamsHeader() {

    return (

        <section className="teams-header">

            <div className="teams-header-left">

                <h1>

                    Teams Workspace

                </h1>

                <p>

                    Manage your teams, collaborate with members, and organize every project from one central workspace.

                </p>

            </div>

            <button className="create-team-btn">

                + Create Team

            </button>

        </section>

    );

}

export default TeamsHeader;