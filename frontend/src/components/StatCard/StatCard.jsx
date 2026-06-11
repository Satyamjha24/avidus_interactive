import styles from "./StatCard.module.css";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={styles.card} style={{ borderLeftColor: color }}>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <h2 className={styles.value}>{value}</h2>
      </div>
      <div className={styles.iconWrapper} style={{ backgroundColor: color }}>
        <span className={styles.icon}>{icon}</span>
      </div>
    </div>
  );
};

export default StatCard;