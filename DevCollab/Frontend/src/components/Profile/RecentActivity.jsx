import "./RecentActivity.css";

import { Activity, Clock3 } from "lucide-react";

function RecentActivity({ profile }) {
  return (
    <section>
      <h2>Recent Activity</h2>

      <div className="activity-list">
        <div className="activity-card">
          <div className="activity-icon">
            <Activity size={22} />
          </div>

          <div className="activity-info">
            <h3>Profile Updated</h3>

            <p>{profile?.name || "User"} updated their profile information.</p>
          </div>

          <div className="activity-time">
            <Clock3 size={15} />

            <span>Recently</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentActivity;
