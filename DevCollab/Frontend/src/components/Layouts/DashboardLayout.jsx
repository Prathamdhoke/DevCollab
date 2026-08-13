import { Outlet } from "react-router-dom";
import DashboardHeader from "../DashBoard/DashboardHeader.jsx";
import "./DashboardLayout.css";
import Sidebar from "../Sidebar/Sidebar.jsx";

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <DashboardHeader />

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;