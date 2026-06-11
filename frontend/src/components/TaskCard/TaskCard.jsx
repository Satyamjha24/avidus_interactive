import styles from "./TaskCard.module.css";
import { formatDate } from "../../utils/formatDate";

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

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{task.title}</h3>
        <span className={`${styles.priority} ${priorityClass[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.meta}>
          <span className={`${styles.status} ${statusClass[task.status]}`}>
            {task.status}
          </span>
          {task.dueDate && (
            <span className={styles.dueDate}>
              📅 {formatDate(task.dueDate)}
            </span>
          )}
        </div>
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => onEdit(task)}>
            Edit
          </button>
          <button className={styles.deleteBtn} onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;