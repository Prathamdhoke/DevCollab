import "./ActiveProjects.css";
import dashboardData from "../../Data/dashboardData";

function ActiveProjects() {

    const { projects } = dashboardData;

    return (

        <section className="dashboard-widget active-projects">

            <h2>
                Active Projects
            </h2>

            <div className="projects-list">

                {

                    projects.map(project => (

                        <div
                            className="project-item"
                            key={project.id}
                        >

                            <div className="project-top">

                                <div>

                                    <h3>{project.name}</h3>

                                    <p>

                                        {project.members} Members

                                    </p>

                                </div>

                                <span className={`project-status ${project.status}`}>

                                    {project.status}

                                </span>

                            </div>



                            <div className="project-progress">

                                <div className="progress-track">

                                    <div

                                        className="progress-value"

                                        style={{

                                            width: `${project.progress}%`

                                        }}

                                    >

                                    </div>

                                </div>

                                <span>

                                    {project.progress}%

                                </span>

                            </div>



                            <button className="open-project">

                                Open Project →

                            </button>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default ActiveProjects;