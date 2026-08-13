import "./Dashboard.css";

import DashboardGrid from "../components/DashBoard/DashboardGrid";

import PriorityTasks from "../components/DashBoard/widgets/PriorityTasks";

import ContinueWorking from "../components/DashBoard/widgets/ContinueWorking";

import WorkspaceOverview from "../components/DashBoard/widgets/WorkspaceOverview";

import UpcomingDeadlines from "../components/DashBoard/widgets/UpcomingDeadlines";

function Dashboard() {
  return (
    <div className="dashboard">
      <DashboardGrid>
        <ContinueWorking />

        <WorkspaceOverview />

        <PriorityTasks />

        <UpcomingDeadlines />
      </DashboardGrid>
    </div>
  );
}

export default Dashboard;
