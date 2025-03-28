import { ShapeObject } from "@/types/line";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface XComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  deleteShape: Function;
}

const X: React.FC<XComponentProps> = ({
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
            <line
              onClick={() => onClick(shape)}
              className='line selected'
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
            <line
              onClick={() => onClick(shape)}
              className='line selected'
              x1={x1}
              y1={y2}
              x2={x2}
              y2={y1}
            />
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
      <line
        onClick={() => onClick(shape)}
        className='line'
        x1={x1}
        y1={y2}
        x2={x2}
        y2={y1}
      />
    </g>
  );
};

export default X;
