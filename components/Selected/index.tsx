import styles from "./Selected.module.scss";

export default function Selected({ hide }: { hide: boolean }) {
  if (hide) return null;

  return (
    <div className={styles.selected}>
      <input type='color' />
    </div>
  );
}
