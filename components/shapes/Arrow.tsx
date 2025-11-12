import { ShapeComponentProps } from "@/types/shapeTypes";

export default function Arrow({
  shape,
  onClick,
  isSelected = false,
}: ShapeComponentProps) {
  const { x1, y1, x2, y2 } = shape;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy); // Line length
  const arrowSize = 20; // Arrowhead length
  const arrowWidth = 20; // Arrowhead width
  const correctionFactor = 1; // Tiny correction to eliminate gap

  // Normalize direction vector
  const unitX = dx / length;
  const unitY = dy / length;

  // Slightly adjust arrow base positioning to remove the gap
  const newX2 = x2 - unitX * (arrowSize - correctionFactor);
  const newY2 = y2 - unitY * (arrowSize - correctionFactor);

  // Perpendicular offsets for arrowhead base
  const perpX = -unitY * (arrowWidth / 2);
  const perpY = unitX * (arrowWidth / 2);

  // Arrowhead base points
  const arrowX1 = newX2 + perpX;
  const arrowY1 = newY2 + perpY;
  const arrowX2 = newX2 - perpX;
  const arrowY2 = newY2 - perpY;

  return (
    <g>
      {isSelected && (
          <g className='selected'>
            <line
              className='line selected'
              x1={x1}
              y1={y1}
              x2={newX2}
              y2={newY2}
            />
            <polygon
              points={`${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
              className='arrowHead selected'
            />
          </g>
      )}
      <line
        onClick={() => onClick(shape)}
        className='line'
        x1={x1}
        y1={y1}
        x2={newX2}
        y2={newY2}
      />
      <polygon
        onClick={() => onClick(shape)}
        points={`${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        className='arrowHead'
      />
    </g>
  );
};
