import { MultiPositionObject, PositionObject } from "@/types/defaults";
import {
  shapeComponents,
  BaseShape,
  Shapes,
  ShapeElement,
  BaseShapeGroup,
} from "@/types/shapeTypes";
import { useEffect, useRef, useState } from "react";

type ShapeGroupComponentProps = {
  shapes: ShapeElement[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeElement[]>>;
  onClick: Function;
  isSelected: boolean;
};

export default function ShapeGroup({
  shapes,
  setShapes,
  onClick,
  isSelected,
}: ShapeGroupComponentProps) {
  const [position, setPosition] = useState<MultiPositionObject | null>(null);
  const [end, setEnd] = useState<PositionObject | null>(null);
  const ref = useRef<SVGGElement>(null);

  const setNewShapes = (newEnd: PositionObject | null) => {
    if (newEnd && end) {
      const x2Change = newEnd.x - end.x;
      const y2Change = newEnd.y - end.y;
      console.log('x2Change: ', x2Change);
      console.log('y2Change: ', y2Change);
      const adjustShapeXYValues = (
        shape: BaseShape,
      ): BaseShape => {
        console.log('shape.x2 + x2Change', shape.x2 + x2Change);
        console.log('shape.y2 + y2Change', shape.y2 + y2Change);
        return new BaseShape({
          ...shape,
          x2: shape.x2 + x2Change,
          y2: shape.y2 + y2Change,
        });
      };
      setShapes(prev =>
        prev.map(shp => {
          if (shp instanceof BaseShapeGroup)
            return new BaseShapeGroup({
              ...shp,
              shapes: shp.shapes.map(subShp =>
                adjustShapeXYValues(subShp)
              ),
            });
          else return adjustShapeXYValues(shp);
        })
      );

      setEnd(newEnd);
    }
  };

  useEffect(() => {
    if (ref.current) {
      const el = ref.current.getBoundingClientRect();
      const x1: number = el.x;
      const y1: number = el.y;
      const x2: number = el.right;
      const y2: number = el.bottom;
      setPosition({ x1, y1, x2, y2 });
    }
  }, [ref, shapes]);

  useEffect(() => {
    if (end) {
      const handleMouseMove = (event: MouseEvent) => {
        setNewShapes({ x: event.pageX, y: event.pageY });
      };
      const handleMouseUp = (event: MouseEvent) => {
        setEnd(null);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [end, setNewShapes]);

  return (
    <>
    <g ref={ref}>
      {shapes.map((shape, index) => {
        console.log('shape', shape);
        const Component = Array.isArray(shape)
          ? shapeComponents[Shapes.ShapeGroup]
          : shapeComponents[shape.shape];
        return (
          <Component shape={shape} onClick={onClick} key={index} isSelected />
        );
      })}
      
    </g>{isSelected && <AdjustCircle position={position} setEnd={setEnd} />}</>
  );
}

function AdjustCircle({
  setEnd,
  position,
}: {
  position: MultiPositionObject | null;
  setEnd: React.Dispatch<React.SetStateAction<PositionObject | null>>;
}) {
  if (!position) return null;
  const { x1, y1, x2, y2 } = position;
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
      <circle
        onMouseDown={event => setEnd({ x: event.pageX, y: event.pageY })}
        className='selected-adjust-circle'
        cx={x2}
        cy={y2}
        r={6}
      />
    </g>
  );
}
