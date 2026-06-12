import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Layout from "../../../components/Layout/Layout";
import Loader from "../../../components/Loader/Loader";
import { formatDate } from "../../../utils/formatDate";
import styles from "./TaskMonitoring.module.css";

const priorityClass = {
  Low: styles.low,
  Medium: styles.medium,
  High: styles.high,
};

const statusClass = {
  Pending: styles.pending,
  "In Progress": styles.inProgress,
  Completed: styles.completed,
};

const TaskMonitoring = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
      const fetchTasks = async () => {
        try {
          const { data } = await axiosInstance.get("/admin/tasks");
          setTasks(data);
        } catch (err) {
          setError(`Failed to load tasks: ${err.response?.data?.message || "Something went wrong"}`);
        } finally {
          setLoading(false);
        }
      };
    fetchTasks();
  }, []);


  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosInstance.delete(`/admin/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      setError(`Failed to delete task: ${err.response?.data?.message || "Something went wrong"}`);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.createdBy?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.heading}>Task Monitoring</h1>
            <p className={styles.subheading}>
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} across all
              users
            </p>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search by task title or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.filters}>
            {["All", "Pending", "In Progress", "Completed"].map((s) => (
              <button
                key={s}
                className={`${styles.filterBtn} ${
                  statusFilter === s ? styles.activeFilter : ""
                }`}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Created By</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.noData}>
                    No tasks found
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr key={task._id}>
                    <td>
                      <div className={styles.titleCell}>
                        <span className={styles.taskTitle}>{task.title}</span>
                        {task.description && (
                          <span className={styles.taskDesc}>
                            {task.description.length > 50
                              ? task.description.substring(0, 50) + "..."
                              : task.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}>
                          {task.createdBy?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>
                            {task.createdBy?.name}
                          </span>
                          <span className={styles.userEmail}>
                            {task.createdBy?.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${statusClass[task.status]}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${styles.badge} ${priorityClass[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className={styles.dateCell}>
                      {formatDate(task.dueDate)}
                    </td>
                    <td className={styles.dateCell}>
                      {formatDate(task.createdAt)}
                    </td>
                    <td>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TaskMonitoring;