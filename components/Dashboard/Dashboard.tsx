import { Shapes } from "@/types/shapeTypes";
import {
  HorizontalRule,
  ArrowRightAlt,
  ChangeHistory,
  RadioButtonUnchecked,
  NightlightRound,
  Clear,
  Crop75,
} from "@mui/icons-material";
import styles from "./Dashboard.module.scss";
import { FormControlLabel } from "@mui/material";

type DashboardProps = {
  shape: Shapes;
  setShape: React.Dispatch<React.SetStateAction<Shapes>>;
  isSelected: boolean;
};

export default function Dashboard({
  shape,
  setShape,
  isSelected,
}: DashboardProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Allow color input to work normally
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName === 'INPUT' && target.getAttribute('type') === 'color') {
      event.stopPropagation();
      return;
    }
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <div onClick={handleClick} className={styles.dashboard}>
      <div className={styles.iconWrapper}>
        <HorizontalRule
          onClick={() => setShape(Shapes.Line)}
          className={`${styles.icon} ${
            shape === Shapes.Line ? styles.selected : ""
          }`}
        />
        <ArrowRightAlt
          onClick={() => setShape(Shapes.Arrow)}
          className={`${styles.icon} ${
            shape === Shapes.Arrow ? styles.selected : ""
          }`}
        />
        <ChangeHistory
          onClick={() => setShape(Shapes.Triangle)}
          className={`${styles.icon} ${
            shape === Shapes.Triangle ? styles.selected : ""
          }`}
        />
        <RadioButtonUnchecked
          onClick={() => setShape(Shapes.Circle)}
          className={`${styles.icon} ${
            shape === Shapes.Circle ? styles.selected : ""
          }`}
        />
        <NightlightRound
          onClick={() => setShape(Shapes.Ellipse)}
          className={`${styles.icon} ${
            shape === Shapes.Ellipse ? styles.selected : ""
          }`}
        />
        <Clear
          onClick={() => setShape(Shapes.X)}
          className={`${styles.icon} ${
            shape === Shapes.X ? styles.selected : ""
          }`}
        />
        <Crop75
          onClick={() => setShape(Shapes.Rectangle)}
          className={`${styles.icon} ${
            shape === Shapes.Rectangle ? styles.selected : ""
          }`}
        />
      </div>
      {isSelected && <div>
        <FormControlLabel label='Color:' labelPlacement="start" control={<input type='color' />} />
        </div>}
    </div>
  );
}
