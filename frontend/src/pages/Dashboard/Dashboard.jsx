import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";
import Layout from "../../components/Layout/Layout";
import StatCard from "../../components/StatCard/StatCard";
import Loader from "../../components/Loader/Loader";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/tasks");
        const total = data.length;
        const pending = data.filter((t) => t.status === "Pending").length;
        const inProgress = data.filter((t) => t.status === "In Progress").length;
        const completed = data.filter((t) => t.status === "Completed").length;
        setStats({ total, pending, inProgress, completed });
      } catch (err) {
        setError(`Failed to load dashboard data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <h1 className={styles.heading}>Welcome back, {user?.name} 👋</h1>
          <p className={styles.subheading}>
            Here is a summary of your tasks
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.statsGrid}>
          <StatCard
            title="Total Tasks"
            value={stats.total}
            icon="📋"
            color="#6366f1"
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            icon="⏳"
            color="#f59e0b"
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon="🔄"
            color="#3b82f6"
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon="✅"
            color="#10b981"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;