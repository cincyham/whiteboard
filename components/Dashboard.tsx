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

type DashboardProps = {
  shape: Shapes;
  setShape: React.Dispatch<React.SetStateAction<Shapes>>;
};

export default function Dashboard({ shape, setShape }: DashboardProps) {
  return (
    <div className='dashboard'>
      <HorizontalRule
        onClick={() => setShape(Shapes.Line)}
        className={`icon ${shape === Shapes.Line ? "selected" : ""}`}
      />
      <ArrowRightAlt
        onClick={() => setShape(Shapes.Arrow)}
        className={`icon ${shape === Shapes.Arrow ? "selected" : ""}`}
      />
      <ChangeHistory
        onClick={() => setShape(Shapes.Triangle)}
        className={`icon ${shape === Shapes.Triangle ? "selected" : ""}`}
      />
      <RadioButtonUnchecked
        onClick={() => setShape(Shapes.Circle)}
        className={`icon ${shape === Shapes.Circle ? "selected" : ""}`}
      />
      <NightlightRound
        onClick={() => setShape(Shapes.Ellipse)}
        className={`icon ${shape === Shapes.Ellipse ? "selected" : ""}`}
      />
      <Clear
        onClick={() => setShape(Shapes.X)}
        className={`icon ${shape === Shapes.X ? "selected" : ""}`}
      />
      <Crop75
        onClick={() => setShape(Shapes.Rectangle)}
        className={`icon ${shape === Shapes.Rectangle ? "selected" : ""}`}
      />
    </div>
  );
}
