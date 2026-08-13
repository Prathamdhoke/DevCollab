import "./Sidebar.css";

import sidebarData from "./sidebarData";

import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* ==========================
                    BRAND
            ========================== */}

      <div className="sidebar-brand">
        <div className="brand-logo">DC</div>

        <div className="brand-info">
          <h2>DevCollab</h2>

          <p>Build Together</p>
        </div>
      </div>

      {/* ==========================
                NAVIGATION
            ========================== */}

      <nav className="sidebar-navigation">
        {sidebarData.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </nav>

      {/* ==========================
                ACTIVE WORKSPACE
            ========================== */}

      <div className="workspace-card">
        <span className="workspace-label">Active Workspace</span>

        <h3>DevCollab Team</h3>

        <p>5 Members</p>
      </div>
    </aside>
  );
}

export default Sidebar;
