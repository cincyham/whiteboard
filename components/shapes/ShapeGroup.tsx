import { shapeComponents, BaseShape, Shapes, ShapeElement } from "@/types/shapeTypes";
import { useEffect } from "react";

type ShapeGroupComponentProps = {
  shapes: ShapeElement[];
  onClick: Function;
  // index: number;
  onClickAway: Function;
  isSelected: boolean;
};

export default function ShapeGroup({
  shapes,
  onClick,
  // index,
  onClickAway,
  isSelected,
}: ShapeGroupComponentProps) {
  
  const getAdjustCircle = () => {
    let x1: number = 0;
    let y1: number = 0;
    let x2: number = 0;
    let y2: number = 0;
    const getExtremeXY = (shp: BaseShape) => {
      if (!x1 || shp.x1 < x1) x1 = shp.x1;
      if (!y1 || shp.y1 < y1) y1 = shp.y1;
      if (!x2 || shp.x2 > x2) x2 = shp.x2;
      if (!y2 || shp.y2 > y2) y2 = shp.y2;
    }
    shapes.forEach(shp => {
      if (shp instanceof BaseShape) getExtremeXY(shp);
      else shp.shapes.forEach(subShp => getExtremeXY(subShp));
    });
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
      <g>
        <rect
          height={Math.abs(height)}
          width={Math.abs(width)}
          x={startX}
          y={startY}
          className='rectangle surround'
        />
        <circle className='selected-adjust-circle' cx={x2} cy={y2} r={6} />
      </g>
    );
  };

  useEffect(() => console.log('shapes', shapes), [shapes]);

  return (
    <div>
      {shapes.map((shape, index) => {
        const Component = Array.isArray(shape)
          ? shapeComponents[Shapes.ShapeGroup]
          : shapeComponents[shape.shape];
        return (
          <Component
            shape={shape}
            onClick={onClick}
            key={index}
            onClickAway={onClickAway}
            isSelected={isSelected}
          />
        );
      })}
      {isSelected && getAdjustCircle()}
    </div>
  );
}
