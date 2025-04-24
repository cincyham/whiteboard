"use client";
import { useEffect, useState } from "react";
import {
  HorizontalRule,
  ArrowRightAlt,
  ChangeHistory,
  RadioButtonUnchecked,
  NightlightRound,
  Clear,
  Crop75,
} from "@mui/icons-material";
import { PositionObject } from "@/types/defaults";
import { ShapeObject } from "@/types/shape";
import { Shapes } from "@/enums/shapeTypes";
import { shapeComponents } from "@/enums/shapeTypes";
import "./page.css";

export default function Home() {
  const [start, setStart] = useState<PositionObject | null>(null);
  const [end, setEnd] = useState<PositionObject | null>(null);
  const [shapes, setShapes] = useState<ShapeObject[]>([]);
  const [shape, setShape] = useState<Shapes>(Shapes.Line);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [isShiftHeld, setIsShiftHeld] = useState<boolean>(false);

  const whiteboardClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!start && !end) {
      setStart({ x: event.pageX, y: event.pageY });
    }
  };

  const handleSelect = (shape: ShapeObject) => {
    setSelectedShapes([...selectedShapes, shape.id]);
  };

  const handleDeselect = (shapeToDeselect: ShapeObject) => {
    if (!isShiftHeld) setSelectedShapes(selectedShapes.filter(id => id !== shapeToDeselect.id));
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
    return (
      <Component
        shape={shapeObject}
        onClick={() => handleDeleteShape(shapeObject)}
        key={1}
      />
    );
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey) setIsShiftHeld(true);
      if (['Backspace', 'Delete'].includes(event.key) && selectedShapes.length > 0) {
        let newShapes = [...shapes];
        selectedShapes.forEach(shapeID => {
          
          newShapes = newShapes.filter(shape => shape.id !== shapeID);

        });
        setShapes(newShapes)
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.shiftKey) setIsShiftHeld(false);
    }

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
        Math.abs(event.pageX - start.x) > 5 &&
        Math.abs(event.pageY - start.y) > 5
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
      <div className='dashboard'>
        <HorizontalRule
          onClick={() => setShape(Shapes.Line)}
          className={`icon ${shape === Shapes.Line ? "selected" : ""}`}
        />
        <ArrowRightAlt
          onClick={() => setShape(Shapes.Arrow)}
          className={`icon ${shape === Shapes.Arrow ? "selected" : ""}`}
        />
        <ChangeHistory
          onClick={() => setShape(Shapes.Triangle)}
          className={`icon ${shape === Shapes.Triangle ? "selected" : ""}`}
        />
        <RadioButtonUnchecked
          onClick={() => setShape(Shapes.Circle)}
          className={`icon ${shape === Shapes.Circle ? "selected" : ""}`}
        />
        <NightlightRound
          onClick={() => setShape(Shapes.Ellipse)}
          className={`icon ${shape === Shapes.Ellipse ? "selected" : ""}`}
        />
        <Clear
          onClick={() => setShape(Shapes.X)}
          className={`icon ${shape === Shapes.X ? "selected" : ""}`}
        />
        <Crop75
          onClick={() => setShape(Shapes.Rectangle)}
          className={`icon ${shape === Shapes.Rectangle ? "selected" : ""}`}
        />
      </div>
      <svg className='svg'>
        {shapes.map((shape, index) => {
          const Component = shapeComponents[shape.shape];
          return (
            <Component
              shape={shape}
              onClick={handleSelect}
              key={index}
              onClickAway={handleDeselect}
              isSelected={selectedShapes.includes(shape.id)}
              deleteShape={handleDeleteShape}
            />
          );
        })}
        {start && end && getActiveLine(start, end, shape)}
      </svg>
    </div>
  );
}
