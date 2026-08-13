import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

import "./ProfileLayout.css";

function ProfileLayout() {

    return (

        <div className="profile-layout">

            <Sidebar />

            <div className="profile-main">

                <main className="profile-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default ProfileLayout;