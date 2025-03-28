import { ShapeObject } from "@/types/line";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface TriangleComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  deleteShape: Function;
}

const Triangle: React.FC<TriangleComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
  deleteShape,
}) => {
  const ref = useRef<SVGLineElement>(null);
  const { x1, y1, x2, y2 } = shape;

  const x3 = -(x2 - x1) + x1;
  const y3 = y2;

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
            <polygon
              key={index}
              points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
              className='triangle selected'
            />
          </g>
        </ClickAwayListener>
      )}
      <polygon
        onClick={() => onClick(shape)}
        key={index}
        points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
        className='triangle'
      />
    </g>
  );
};

export default Triangle;
