import { CheckSquare, ContactRound, Inbox, Plus, Search, Settings, StickyNote } from "lucide-react";
import { NavLink } from "react-router-dom";

const navClass = ({ isActive }: { isActive: boolean }) => `sidebar-link${isActive ? " nav-active" : ""}`;

export default function AppSidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" end className="brand"><span className="brand-mark">C</span><span>ContactHub</span></NavLink>
      <nav className="nav-main" aria-label="Main navigation">
        {/* <NavLink to="/search" className={navClass}><Search size={16} />Search</NavLink> */}
        <NavLink to="/inbox" className={navClass}><Inbox size={16} />Inbox</NavLink>
        <NavLink to="/settings" className={navClass}><Settings size={16} />Settings</NavLink>
      </nav>
      <div className="workspace-label">Workspace</div>
      <nav className="nav-main" aria-label="Workspace">
        <NavLink to="/" end className={navClass}><ContactRound size={17} />Contacts</NavLink>
        <NavLink to="/tasks" className={navClass}><CheckSquare size={16} />Tasks</NavLink>
        <NavLink to="/notes" className={navClass}><StickyNote size={16} />Notes</NavLink>
      </nav>
      <div className="sidebar-bottom"><span className="mini-avatar">A</span><span><strong>Alex Morgan</strong><small>Personal workspace</small></span></div>
    </aside>
  );
}
