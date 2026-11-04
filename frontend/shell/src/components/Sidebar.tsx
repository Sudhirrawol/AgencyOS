import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListTodo,
  Receipt,
  ChartNoAxesColumn,
  Settings,
  Layers3,
} from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", path: "/clients", icon: Users },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Tasks", path: "/tasks", icon: ListTodo },
  { label: "Invoices", path: "/invoices", icon: Receipt },
  { label: "Reports", path: "/reports", icon: ChartNoAxesColumn },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Layers3 size={28} />
        <span>AgencyOS</span>
      </div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "nav-link active" : "nav-link"}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
