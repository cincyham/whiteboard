import { ShapeObject } from "@/types/line";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface EllipseComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  deleteShape: Function;
}

const Ellipse: React.FC<EllipseComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  deleteShape,
}) => {
  const ref = useRef<SVGLineElement>(null);
  const { x1, y1, x2, y2 } = shape;

  const rx = Math.abs((x2 - x1) / 2);
  const ry = Math.abs((y2 - y1) / 2);

  const cx = (x2 + x1) / 2;
  const cy = (y2 + y1) / 2;

  const keyDownHandler = (event: KeyboardEvent<SVGLineElement>) => {
    if (["Backspace", "Delete"].includes(event.key)) {
      deleteShape(shape);
    }
  };

  useEffect(() => {
    if (isSelected && ref.current) {
      ref.current.focus(); // Automatically focus when component loads
    }
  }, [isSelected]);

  return (
    <g>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g
            className='selected'
            ref={ref}
            tabIndex={0}
            onKeyDown={keyDownHandler}
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
