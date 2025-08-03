import { ShapeObject } from "@/types/shape";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface LineComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  isOnlySelected: boolean;
  onAdjustClick: (x: number, y: number, shape: ShapeObject) => void;
  deleteShape: Function;
}

const Line: React.FC<LineComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  isOnlySelected,
  onAdjustClick,
  deleteShape,
}) => {
  const { x1, y1, x2, y2 } = shape;


  
  return (
    <g key={index}>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g>
            <line className='line selected' x1={x1} y1={y1} x2={x2} y2={y2} />
            {isOnlySelected && <circle onMouseDown={() => onAdjustClick(x1, y1, shape)} className='selected-adjust-circle' cx={x2} cy={y2} r={6} />}
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
