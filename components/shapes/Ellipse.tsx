import { ShapeComponentProps } from "@/types/shapeTypes";

export default function Ellipse ({
  shape,
  onClick,
  isSelected = false,
}: ShapeComponentProps) {
  const { x1, y1, x2, y2 } = shape;

  const rx = Math.abs((x2 - x1) / 2);
  const ry = Math.abs((y2 - y1) / 2);

  const cx = (x2 + x1) / 2;
  const cy = (y2 + y1) / 2;

  return (
    <g>
      {isSelected && (
          <g
            className='selected'
          >
            <ellipse
              className='ellipse selected'
              rx={rx}
              ry={ry}
              cx={cx}
              cy={cy}
            />
          </g>
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
