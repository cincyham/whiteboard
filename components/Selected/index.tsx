import styles from "./Selected.module.scss";

export default function Selected({
  hide,
  selectedColor,
  setSelectedColor,
}: {
  hide: boolean;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  if (hide) return null;

  return (
    <div className={styles.selected}>
      <input type='color' onChange={e => setSelectedColor(e.target.value)} />
    </div>
  );
}
