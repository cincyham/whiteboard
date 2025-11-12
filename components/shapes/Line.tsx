import { ShapeComponentProps } from "@/types/shapeTypes";

export default function Line({
  shape,
  onClick,
  isSelected = false,
}: ShapeComponentProps) {
  const { x1, y1, x2, y2 } = shape;


  
  return (
    <g>
      {isSelected && (
        <g>
          <line className='line selected' x1={x1} y1={y1} x2={x2} y2={y2} />
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
    </g>
  );
};
