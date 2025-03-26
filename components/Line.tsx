import { ShapeObject } from "@/types/line";
import { ClickAwayListener } from "@mui/material";
import { KeyboardEvent, useEffect, useRef } from "react";

interface LineComponentProps {
  line: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  deleteShape: Function;
}

const Line: React.FC<LineComponentProps> = ({
  line,
  onClick,
  index,
  onClickAway,
  isSelected,
  deleteShape,
}) => {
  const ref = useRef<SVGLineElement>(null);
  const { x1, y1, x2, y2 } = line;

  const keyDownHandler = (event: KeyboardEvent<SVGLineElement>) => {
    if (['Backspace', 'Delete'].includes(event.key)) {
      console.log('onKeyDown');
      deleteShape(line);
    }
  }

  useEffect(() => {
    console.log('isSelected:', isSelected);
    if (isSelected && ref.current) {
      ref.current.focus(); // Automatically focus when component loads
    }
  }, [isSelected])

  return (
    <g key={index}>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(line)}>
          <line ref={ref} tabIndex={0} onKeyDown={keyDownHandler} className='line selected' x1={x1} y1={y1} x2={x2} y2={y2} />
        </ClickAwayListener>
      )}
      <line
        onClick={() => onClick(line)}
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
