import { ShapeObject } from "@/types/line";
import React from "react";

interface ArrowComponentProps {
  line: ShapeObject;
  onClick: Function;
  index: number; // This should probably be 'key' passed down by React, but I'll leave it as is for now
}

const Arrow: React.FC<ArrowComponentProps> = ({ line, onClick, index }) => {
  const { x1, y1, x2, y2 } = line;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy); // Line length
  if (length === 0) {
    return;
  }
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

  console.log(
    JSON.stringify([
      x1,
      y1,
      x2,
      y2,
      newX2,
      newY2,
      arrowX1,
      arrowX2,
      arrowY1,
      arrowY2,
      perpX,
      perpY,
    ])
  );

  return (
    <g key={index}>
      <line
        onClick={() => onClick(line)}
        className='line'
        x1={x1}
        y1={y1}
        x2={newX2}
        y2={newY2}
      />
      <polygon
        onClick={() => onClick(line)}
        points={`${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        className='arrowHead'
      />
    </g>
  );
};

export default Arrow;
