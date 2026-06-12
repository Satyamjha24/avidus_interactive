import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Layout from "../../../components/Layout/Layout";
import ActivityTable from "../../../components/ActivityTable/ActivityTable";
import Loader from "../../../components/Loader/Loader";
import styles from "./ActivityLogs.module.css";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("All");

  useEffect(() => {
      const fetchLogs = async () => {
        try {
          const { data } = await axiosInstance.get("/activity");
          setLogs(data);
        } catch (err) {
          setError(`Failed to load activity logs: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };
    fetchLogs();
  }, []);


  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      log.description?.toLowerCase().includes(search.toLowerCase());

    const matchesAction =
      actionFilter === "All" || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.heading}>Activity Logs</h1>
            <p className={styles.subheading}>
              {logs.length} total activit{logs.length !== 1 ? "ies" : "y"} recorded
            </p>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search by user or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filters}>
            {["All", "LOGIN", "TASK_CREATED", "TASK_UPDATED", "TASK_DELETED"].map(
              (action) => (
                <button
                  key={action}
                  className={`${styles.filterBtn} ${
                    actionFilter === action ? styles.activeFilter : ""
                  }`}
                  onClick={() => setActionFilter(action)}
                >
                  {action === "All"
                    ? "All"
                    : action === "LOGIN"
                    ? "Login"
                    : action === "TASK_CREATED"
                    ? "Created"
                    : action === "TASK_UPDATED"
                    ? "Updated"
                    : "Deleted"}
                </button>
              )
            )}
          </div>
        </div>

        <ActivityTable logs={filteredLogs} />
      </div>
    </Layout>
  );
};

export default ActivityLogs;