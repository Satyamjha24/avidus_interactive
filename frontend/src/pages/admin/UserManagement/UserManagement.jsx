import { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Layout from "../../../components/Layout/Layout";
import UserTable from "../../../components/UserTable/UserTable";
import Loader from "../../../components/Loader/Loader";
import styles from "./UserManagement.module.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
      const fetchUsers = async () => {
        try {
          const { data } = await axiosInstance.get("/api/admin/users");
          setUsers(data);
        } catch (err) {
          setError(`Failed to load users: ${err.response?.data?.message || "Something went wrong"}`);
        } finally {
          setLoading(false);
        }
      };
    fetchUsers();
  }, []);


  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosInstance.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await axiosInstance.patch(`/api/admin/users/${userId}/status`, {
        status: newStatus,
      });
      setUsers(
        users.map((u) =>
          u._id === userId ? { ...u, status: newStatus } : u
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.heading}>User Management</h1>
            <p className={styles.subheading}>
              {users.length} registered user{users.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <UserTable
          users={filteredUsers}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>
    </Layout>
  );
};

export default UserManagement;