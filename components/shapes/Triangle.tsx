import { ShapeComponentProps } from "@/types/shapeTypes";
import { ClickAwayListener } from "@mui/material";

export default function Triangle ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected = false,
}: ShapeComponentProps) {
  const { x1, y1, x2, y2 } = shape;

  const x3 = -(x2 - x1) + x1;
  const y3 = y2;

  return (
    <g>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g
            className='selected'
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
