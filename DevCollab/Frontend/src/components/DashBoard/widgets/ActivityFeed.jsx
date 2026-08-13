import "./ActivityFeed.css";
import dashboardData from "../../Data/dashboardData";

function ActivityFeed() {

    const { activityFeed } = dashboardData;

    return (

        <section className="dashboard-widget activity-feed">

            <h2>Activity Feed</h2>

            <div className="activity-list">

                {

                    activityFeed.map((activity) => (

                        <div
                            className="activity-card"
                            key={activity.id}
                        >

                            <div className="activity-content">

                                <h4>

                                    <strong>{activity.user}</strong>{" "}
                                    {activity.action}

                                </h4>

                                <p>

                                    {activity.target}

                                </p>

                            </div>

                            <span className="activity-time">

                                {activity.time}

                            </span>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default ActivityFeed;