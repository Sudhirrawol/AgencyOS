import { Bell, Search, Menu, LogOut } from "lucide-react";

import "./Navbar.css";

interface NavbarProps {
  onLogout: () => void;
  loading: boolean;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

function Navbar({ onLogout, loading, onMenuToggle, sidebarOpen }: NavbarProps) {
  return (
    <header className="navbar">
      <button
        type="button"
        className="navbar-menu"
        onClick={onMenuToggle}
        aria-expanded={sidebarOpen}
        aria-controls="agencyos-sidebar"
      >
        <Menu size={22} />
      </button>
      <div className="navbar-search">
        <Search size={22} />
        <input
          type="search"
          placeholder="Search clients, projects, tasks..."
          aria-label="Search workspace"
        />
      </div>
      <div className="navbar-actions">
        <button
          type="button"
          className="navbar-icon-btn"
          aria-label="Notifications"
          disabled
          title="Notifications coming soon"
        >
          <Bell size={20} />
        </button>
        <div className="navbar-avatar" aria-label="User profile">
          AD
        </div>

        <button
          type="button"
          className="navbar-logout"
          onClick={onLogout}
          disabled={loading}
        >
          <LogOut size={17} />
          <span>{loading ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
