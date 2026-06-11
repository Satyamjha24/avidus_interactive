import styles from "./UserTable.module.css";
import { formatDate } from "../../utils/formatDate";

const UserTable = ({ users, onDelete, onStatusChange }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className={styles.noData}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className={styles.nameCell}>
                    <div className={styles.avatar}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={styles.role}>{user.role}</span>
                </td>
                <td>
                  <span
                    className={`${styles.status} ${
                      user.status === "Active"
                        ? styles.active
                        : styles.inactive
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={`${styles.statusBtn} ${
                        user.status === "Active"
                          ? styles.deactivateBtn
                          : styles.activateBtn
                      }`}
                      onClick={() =>
                        onStatusChange(
                          user._id,
                          user.status === "Active" ? "Inactive" : "Active"
                        )
                      }
                    >
                      {user.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onDelete(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;