import { ShapeComponentProps } from "@/types/shapeTypes";

export default function Triangle ({
  shape,
  onClick,
  isSelected = false,
}: ShapeComponentProps) {
  const { x1, y1, x2, y2 } = shape;

  const x3 = -(x2 - x1) + x1;
  const y3 = y2;

  return (
    <g>
      {isSelected && (
          <g
            className='selected'
          >
            <polygon
              points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
              className='triangle selected'
            />
          </g>
      )}
      <polygon
        onClick={() => onClick(shape)}
        points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
        className='triangle'
      />
    </g>
  );
};
