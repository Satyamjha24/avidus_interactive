import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Layout from "../../components/Layout/Layout";
import TaskCard from "../../components/TaskCard/TaskCard";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import styles from "./Tasks.module.css";

const initialFormState = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
      const fetchTasks = async () => {
        try {
          const { data } = await axiosInstance.get("/api/tasks");
          setTasks(data);
        } catch (err) {
          setError(`Failed to load tasks: ${err.response?.data?.message || "Something went wrong"}`);
        } finally {
          setLoading(false);
        }
      };
    fetchTasks();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setFormData(initialFormState);
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setFormData(initialFormState);
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      if (selectedTask) {
        const { data } = await axiosInstance.put(
          `/api/tasks/${selectedTask._id}`,
          formData
        );
        setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
      } else {
        const { data } = await axiosInstance.post("/api/tasks", formData);
        setTasks([data, ...tasks]);
      }
      handleCloseModal();
    } catch (err) {
      setFormError(err.response?.data?.message || "Something went wrong");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      setError(`Failed to delete task: ${err.response?.data?.message || "Something went wrong"}`);
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.heading}>My Tasks</h1>
            <p className={styles.subheading}>
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <button className={styles.createBtn} onClick={handleOpenCreate}>
            + New Task
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.filters}>
          {["All", "Pending", "In Progress", "Completed"].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${
                filter === f ? styles.activeFilter : ""
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredTasks.length === 0 ? (
          <div className={styles.empty}>
            <p>No tasks found</p>
            {filter === "All" && (
              <button className={styles.createBtn} onClick={handleOpenCreate}>
                Create your first task
              </button>
            )}
          </div>
        ) : (
          <div className={styles.taskGrid}>
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedTask ? "Edit Task" : "Create Task"}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            {formError && (
              <div className={styles.formError}>{formError}</div>
            )}

            <div className={styles.field}>
              <label className={styles.label}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
                placeholder="Task title"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Task description (optional)"
                rows={3}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Status</label>
                <select
                 name="status"
                 value={formData.status}
                 onChange={handleChange}
                 className={styles.select}
               >
                 {selectedTask ? (
                   <>
                     <option>Pending</option>
                     <option>In Progress</option>
                     <option>Completed</option>
                   </>
                 ) : (
                   <>
                     <option>Pending</option>
                     <option>In Progress</option>
                   </>
                 )}
               </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Due Date (optional)</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={formLoading}
              >
                {formLoading
                  ? "Saving..."
                  : selectedTask
                  ? "Update Task"
                  : "Create Task"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Tasks;