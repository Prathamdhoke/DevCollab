import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

import "./CalendarLayout.css";

function CalendarLayout() {

    return (

        <div className="calendar-layout-wrapper">

            <Sidebar />

            <div className="calendar-main">

                <main className="calendar-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default CalendarLayout;