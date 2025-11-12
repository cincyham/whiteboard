import { ShapeComponentProps } from "@/types/shapeTypes";

export default function X ({
  shape,
  onClick,
  isSelected = false,
}: ShapeComponentProps) {

  const { x1, x2, y1, y2 } = shape;

  return (
    <g>
      {isSelected && (
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
