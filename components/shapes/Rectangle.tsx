import { ShapeComponentProps } from "@/types/shapeTypes";
import { ClickAwayListener } from "@mui/material";

export default function Rectangle ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected = false,
}: ShapeComponentProps) {
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
