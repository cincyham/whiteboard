import { ShapeComponentProps } from "@/types/shapeTypes";
import { ClickAwayListener } from "@mui/material";

export default function X ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected = false,
}: ShapeComponentProps) {

  const { x1, x2, y1, y2 } = shape;

  return (
    <g key={index}>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g
            className='selected'
          >
            <line
              className='line selected'
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
            <line
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
