import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

import "./MessagesLayout.css";

function MessagesLayout() {

    return (

        <div className="messages-layout">

            <Sidebar />

            <div className="messages-main">

                <main className="messages-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MessagesLayout;