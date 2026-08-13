import "./ProfileStats.css";

import {
  FolderKanban,
  Users,
  CheckCircle2,
  Clock3,
  TrendingUp,
  Trophy,
} from "lucide-react";

function ProfileStats({ profile }) {
  const projects =
    (profile?.ownedProjects?.length || 0) +
    (profile?.joinedProjects?.length || 0);

  const teams =
    (profile?.ownedTeams?.length || 0) + (profile?.joinedTeams?.length || 0);

  const assignedTasks = profile?.assignedTasks?.length || 0;

  const stats = [
    {
      icon: FolderKanban,
      title: "Projects",
      value: projects,
    },

    {
      icon: Users,
      title: "Teams",
      value: teams,
    },

    {
      icon: CheckCircle2,
      title: "Assigned Tasks",
      value: assignedTasks,
    },

    {
      icon: Clock3,
      title: "Conversations",
      value: profile?.conversations?.length || 0,
    },

    {
      icon: TrendingUp,
      title: "Completion Rate",
      value: "—",
    },

    {
      icon: Trophy,
      title: "Contribution Score",
      value: "—",
    },
  ];

  return (
    <section>
      <h2>Statistics</h2>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <Icon size={24} />
              </div>

              <h3>{stat.value}</h3>

              <p>{stat.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProfileStats;
