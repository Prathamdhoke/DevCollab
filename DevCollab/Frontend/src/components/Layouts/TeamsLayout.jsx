import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import TeamsHeader from "../Teams/TeamsHeader";

import "./TeamsLayout.css";

function TeamsLayout() {

    return (

        <div className="teams-layout">

            <Sidebar />

            <div className="teams-main">

                <TeamsHeader />

                <main className="teams-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default TeamsLayout;