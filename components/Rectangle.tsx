import { ShapeObject } from "@/types/shape";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface RectangleComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  isOnlySelected: boolean;
  deleteShape: Function;
}

const Rectangle: React.FC<RectangleComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  isOnlySelected,
  deleteShape,
}) => {
  const { x1, x2, y1, y2 } = shape;

  let startX: number = x1;
  let startY: number = y1;

  const height = y2 - y1;
  const width = x2 - x1;
  if (width < 0) {
    startX = x2;
  }
  if (height < 0) {
    startY = y2;
  }

  return (
    <g key={index}>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g
            className='selected'
          >
            <rect
              height={Math.abs(height)}
              width={Math.abs(width)}
              x={startX}
              y={startY}
              className='rectangle selected'
            />
          </g>
        </ClickAwayListener>
      )}
      <rect
        onClick={() => onClick(shape)}
        height={Math.abs(height)}
        width={Math.abs(width)}
        x={startX}
        y={startY}
        className='rectangle'
      />
    </g>
  );
};

export default Rectangle;
