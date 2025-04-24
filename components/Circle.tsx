import { ShapeObject } from "@/types/shape";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface CircleComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  deleteShape: Function;
}

const Circle: React.FC<CircleComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  deleteShape,
}) => {
  const { x1, y1, x2, y2 } = shape;

  const rx = Math.abs((x2 - x1) / 2);
  const ry = Math.abs((y2 - y1) / 2);

  const radius = (rx + ry) / 2;

  const cx = (x2 + x1) / 2;
  const cy = (y2 + y1) / 2;

  return (
    <g>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g
            className='selected'
          >
            <circle
              className='circle selected'
              r={radius}
              cx={cx}
              cy={cy}
            />
          </g>
        </ClickAwayListener>
      )}
      <circle
        onClick={() => onClick(shape)}
        className='circle'
        r={radius}
        cx={cx}
        cy={cy}
      />
    </g>
  );
};

export default Circle;
