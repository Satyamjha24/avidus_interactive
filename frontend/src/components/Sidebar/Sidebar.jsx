import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { user } = useAuth();

  const userLinks = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/tasks", label: "My Tasks", icon: "📋" },
  ];

  const adminLinks = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/admin/users", label: "User Management", icon: "👥" },
    { path: "/admin/tasks", label: "Task Monitoring", icon: "📋" },
    { path: "/admin/activity", label: "Activity Logs", icon: "📜" },
  ];

  const links = user?.role === "Admin" ? adminLinks : userLinks;

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.active}`
                  : styles.navLink
              }
            >
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.label}>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;