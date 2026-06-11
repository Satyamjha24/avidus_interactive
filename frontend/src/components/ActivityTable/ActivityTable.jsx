import styles from "./ActivityTable.module.css";
import { formatDateTime } from "../../utils/formatDate";

const actionClass = {
  LOGIN: styles.login,
  TASK_CREATED: styles.created,
  TASK_UPDATED: styles.updated,
  TASK_DELETED: styles.deleted,
};

const actionLabel = {
  LOGIN: "Login",
  TASK_CREATED: "Task Created",
  TASK_UPDATED: "Task Updated",
  TASK_DELETED: "Task Deleted",
};

const ActivityTable = ({ logs }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Description</th>
            <th>IP Address</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" className={styles.noData}>
                No activity logs found
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>
                      {log.user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{log.user?.name}</span>
                      <span className={styles.userEmail}>{log.user?.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.action} ${actionClass[log.action]}`}
                  >
                    {actionLabel[log.action]}
                  </span>
                </td>
                <td className={styles.description}>{log.description}</td>
                <td className={styles.ipAddress}>
                  {log.ipAddress || "N/A"}
                </td>
                <td className={styles.time}>
                  {formatDateTime(log.createdAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;