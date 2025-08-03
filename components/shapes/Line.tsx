import { ShapeObject } from "@/types/shape";
import { ClickAwayListener } from "@mui/material";

interface LineComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  onAdjustClick: (x: number, y: number, shape: ShapeObject) => void;
}

const Line: React.FC<LineComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  onAdjustClick,
}) => {
  const { x1, y1, x2, y2 } = shape;


  
  return (
    <g key={index}>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g>
            <line className='line selected' x1={x1} y1={y1} x2={x2} y2={y2} />
          </g>
        </ClickAwayListener>
      )}
      <line
        onClick={() => onClick(shape)}
        className='line'
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
    </g>
  );
};

export default Line;
