"use client";
import { useEffect, useState } from "react";
import { PositionObject } from "@/types/defaults";
import { ShapeObject } from "@/types/shape";
import { Shapes, shapeComponents } from "@/enums/shapeTypes";
import "./page.css";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [start, setStart] = useState<PositionObject | null>(null);
  const [end, setEnd] = useState<PositionObject | null>(null);
  const [shapes, setShapes] = useState<ShapeObject[]>([]);
  const [shape, setShape] = useState<Shapes>(Shapes.Line);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [isShiftHeld, setIsShiftHeld] = useState<boolean>(false);

  console.log("selectedShapes", selectedShapes);

  const whiteboardClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!start && !end && selectedShapes.length === 0) {
      setStart({ x: event.pageX, y: event.pageY });
    }
  };

  const onAdjustClickHandler = (x: number, y: number, shape: ShapeObject) => {
    if (!start && !end) {
      setStart({ x, y });
      setShape(shape.shape);
      setShapes(oldShapes => oldShapes.filter(shp => shp.id !== shape.id));
    }
  };

  const handleSelect = (shape: ShapeObject) => {
    if (isShiftHeld) setSelectedShapes([...selectedShapes, shape.id]);
    else setSelectedShapes([shape.id]);
  };

  const handleDeselect = (shapeToDeselect: ShapeObject) => {
    if (!isShiftHeld)
      setSelectedShapes(selectedShapes.filter(id => id !== shapeToDeselect.id));
  };

  const handleDeleteShape = (shapeToDelete: ShapeObject) => {
    const newShapes = shapes.filter(shape => shape.id !== shapeToDelete.id);
    handleDeselect(shapeToDelete);
    setShapes(newShapes);
  };

  const getActiveLine = (
    start: PositionObject,
    end: PositionObject,
    shape: Shapes
  ) => {
    const Component = shapeComponents[shape];
    const shapeObject: ShapeObject = {
      shape,
      id: crypto.randomUUID(),
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
    };
    return <Component shape={shapeObject} key={1} />;
  };

  const getSelectedAdjustCircle = () => {
    if (selectedShapes.length <= 0) return null;

    if (selectedShapes.length === 1) {
      const selectedShape = shapes.find(shp => shp.id === selectedShapes[0]);
      if (!selectedShape) {
        setSelectedShapes([]);
        return;
      }
      return (
        <circle
          onMouseDown={() =>
            onAdjustClickHandler(
              selectedShape.x1,
              selectedShape.y1,
              selectedShape
            )
          }
          className='selected-adjust-circle'
          cx={selectedShape.x2}
          cy={selectedShape.y2}
          r={6}
        />
      );
    } else {
      let x1: number = 0;
      let y1: number = 0;
      let x2: number = 0;
      let y2: number = 0;
      const selectedShapeObjects = shapes.filter(shp => selectedShapes.includes(shp.id));
      selectedShapeObjects.forEach(shp => {
        if (!x1 || shp.x1 < x1) x1 = shp.x1;
        if (!y1 || shp.y1 < y1) y1 = shp.y1;
        if (!x2 || shp.x2 > x2) x2 = shp.x2;
        if (!y2 || shp.y2 > y2) y2 = shp.y2;
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
          <circle
            className='selected-adjust-circle'
            cx={x2}
            cy={y2}
            r={6}
          />
        </g>
      )
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setIsShiftHeld(event.shiftKey);
      if (
        ["Backspace", "Delete"].includes(event.key) &&
        selectedShapes.length > 0
      ) {
        const newShapes = shapes.filter(
          shape => !selectedShapes.includes(shape.id)
        );
        setShapes(newShapes);
        setSelectedShapes([]);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setIsShiftHeld(event.shiftKey);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedShapes, shapes]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (start) {
        setEnd({ x: event.clientX, y: event.clientY });
      }
    };
    const handleMouseUp = (event: MouseEvent) => {
      if (
        start &&
        (selectedShapes.length > 1 ||
          (Math.abs(event.pageX - start.x) > 5 &&
            Math.abs(event.pageY - start.y) > 5))
      ) {
        setStart(null);
        setEnd(null);
        setShapes([
          ...shapes,
          {
            shape,
            id: crypto.randomUUID(),
            x1: start.x,
            y1: start.y,
            x2: event.pageX,
            y2: event.pageY,
          },
        ]);
        setSelectedShapes([]);
      } else {
        setStart(null);
        setEnd(null);
      }
    };

    if (start) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [start]);

  return (
    <div onMouseDown={whiteboardClickHandler} className='whiteboard'>
      <Dashboard shape={shape} setShape={setShape} />
      <svg className='svg'>
        {shapes.map((shape, index) => {
          const Component = shapeComponents[shape.shape];
          const isSelected = selectedShapes.includes(shape.id);
          return (
            <Component
              shape={shape}
              onClick={handleSelect}
              key={index}
              onClickAway={handleDeselect}
              isSelected={isSelected}
              isOnlySelected={isSelected && selectedShapes.length === 1}
              onAdjustClick={onAdjustClickHandler}
            />
          );
        })}
        {getSelectedAdjustCircle()}
        {start && end && getActiveLine(start, end, shape)}
      </svg>
    </div>
  );
}
