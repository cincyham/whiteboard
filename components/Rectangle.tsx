import { ShapeObject } from "@/types/line";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface RectangleComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  deleteShape: Function;
}

const Rectangle: React.FC<RectangleComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  deleteShape,
}) => {
  const ref = useRef<SVGLineElement>(null);
  const { x1, x2, y1, y2 } = shape;

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
            ref={ref}
            tabIndex={0}
            onKeyDown={keyDownHandler}
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
