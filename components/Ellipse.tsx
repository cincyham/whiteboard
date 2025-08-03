import { ShapeObject } from "@/types/shape";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface EllipseComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  isOnlySelected: boolean;
  deleteShape: Function;
}

const Ellipse: React.FC<EllipseComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  isOnlySelected,
  deleteShape,
}) => {
  const { x1, y1, x2, y2 } = shape;

  const rx = Math.abs((x2 - x1) / 2);
  const ry = Math.abs((y2 - y1) / 2);

  const cx = (x2 + x1) / 2;
  const cy = (y2 + y1) / 2;

  return (
    <g>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g
            className='selected'
          >
            <ellipse
              className='ellipse selected'
              rx={rx}
              ry={ry}
              cx={cx}
              cy={cy}
            />
          </g>
        </ClickAwayListener>
      )}
      <ellipse
        onClick={() => onClick(shape)}
        className='ellipse'
        rx={rx}
        ry={ry}
        cx={cx}
        cy={cy}
      />
    </g>
  );
};

export default Ellipse;
