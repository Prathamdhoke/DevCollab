import { NavLink } from "react-router-dom";

function SidebarItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        isActive ? "sidebar-item active" : "sidebar-item"
      }
    >
      <Icon size={20} strokeWidth={2} />

      <span>{item.title}</span>
    </NavLink>
  );
}

export default SidebarItem;
