import "./ActivityCard.css";

import {

    Clock3

} from "lucide-react";

function ActivityCard({

    activity

}) {

    return (

        <div className="activity-card">

            <div className="activity-left">

                <div className="activity-icon">

                    <Clock3 size={18} />

                </div>

                <div>

                    <h3>

                        {activity.title}

                    </h3>

                    <p>

                        {activity.description}

                    </p>

                </div>

            </div>

            <span className="activity-time">

                {activity.time}

            </span>

        </div>

    );

}

export default ActivityCard;