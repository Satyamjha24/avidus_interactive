import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Layout from "../../../components/Layout/Layout";
import StatCard from "../../../components/StatCard/StatCard";
import Loader from "../../../components/Loader/Loader";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await axiosInstance.get("/api/admin/analytics");
        setAnalytics(data);
      } catch (err) {
        setError(`Failed to load analytics: ${err.response?.data?.message || "Something went wrong"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.heading}>Admin Dashboard</h1>
          <p className={styles.subheading}>
            Overview of all users and tasks in the system
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {analytics && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>User Analytics</h2>
              <div className={styles.statsGrid}>
                <StatCard
                  title="Total Users"
                  value={analytics.totalUsers}
                  icon="👥"
                  color="#6366f1"
                />
                <StatCard
                  title="Active Users"
                  value={analytics.activeUsers}
                  icon="✅"
                  color="#10b981"
                />
                <StatCard
                  title="Inactive Users"
                  value={analytics.inactiveUsers}
                  icon="🚫"
                  color="#ef4444"
                />
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Task Analytics</h2>
              <div className={styles.statsGrid}>
                <StatCard
                  title="Total Tasks"
                  value={analytics.totalTasks}
                  icon="📋"
                  color="#6366f1"
                />
                <StatCard
                  title="Pending"
                  value={analytics.pendingTasks}
                  icon="⏳"
                  color="#f59e0b"
                />
                <StatCard
                  title="In Progress"
                  value={analytics.inProgressTasks}
                  icon="🔄"
                  color="#3b82f6"
                />
                <StatCard
                  title="Completed"
                  value={analytics.completedTasks}
                  icon="✅"
                  color="#10b981"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;