"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PositionObject } from "@/types/defaults";
import { BaseShape, ShapeElement, BaseShapeGroup } from "@/types/shapeTypes";
import { Shapes, shapeComponents } from "@/types/shapeTypes";
import "./page.css";
import Dashboard from "@/components/Dashboard";
import { ClickAwayListener } from "@mui/material";
import ShapeGroup from "@/components/shapes/ShapeGroup";

export default function Home() {
  const [start, setStart] = useState<PositionObject | null>(null);
  const [end, setEnd] = useState<PositionObject | null>(null);
  const [shapes, setShapes] = useState<ShapeElement[]>([]);
  const [shape, setShape] = useState<Shapes>(Shapes.Line);
  const [selectedShapes, setSelectedShapes] = useState<ShapeElement[]>([]);
  const [isShiftHeld, setIsShiftHeld] = useState<boolean>(false);

  const selectedShapeIds = useMemo(
    () => selectedShapes.map(shp => shp.id),
    [selectedShapes]
  );

  const whiteboardClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!start && !end && selectedShapes.length === 0) {
      setStart({ x: event.pageX, y: event.pageY });
    }
  };

  const onAdjustClickHandler = (x: number, y: number, shape: ShapeElement, event: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    if (!start && !end) {
      setStart({ x, y });
      setEnd({ x: event.clientX, y: event.clientY });
      setShape(shape.shape);
      setShapes(oldShapes => oldShapes.filter(shp => shp.id !== shape.id));
      setSelectedShapes(oldShapes => oldShapes.filter(shp => shp.id !== shape.id));
    }
  };

  const handleSelect = useCallback((shape: ShapeElement) => {
    if (isShiftHeld) setSelectedShapes(prev => [...prev, shape]);
    else setSelectedShapes([shape]);
  }, [isShiftHeld]);

  const handleDeselect = useCallback((shapeToDeselect: ShapeElement) => {
    if (!isShiftHeld)
      setSelectedShapes(
        prev => prev.filter(shp => shp.id !== shapeToDeselect.id)
      );
  }, [isShiftHeld]);

  const handleDeleteShape = (shapeToDelete: ShapeElement) => {
    const newShapes = shapes.filter(shp => shp.id !== shapeToDelete.id);
    handleDeselect(shapeToDelete);
    setShapes(newShapes);
  };

  const getActiveLine = (
    start: PositionObject,
    end: PositionObject,
    shape: Shapes
  ) => {
    const Component = shapeComponents[shape];
    const ShapeType: BaseShape = {
      shape,
      id: crypto.randomUUID(),
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
    };
    return <Component shape={ShapeType} key={1} />;
  };

  const getSelectedAdjustCircle = () => {
    if (selectedShapes.length <= 0) return null;

    if (selectedShapes.length === 1 && selectedShapes[0] instanceof BaseShape) {
      const selectedShape = selectedShapes[0];
      if (!selectedShape) {
        setSelectedShapes([]);
        return;
      }
      return (
        <circle
          onMouseDown={(event: React.MouseEvent<SVGCircleElement, MouseEvent>) =>
            onAdjustClickHandler(
              selectedShape.x1,
              selectedShape.y1,
              selectedShape,
              event
            )
          }
          className='selected-adjust-circle'
          cx={selectedShape.x2}
          cy={selectedShape.y2}
          r={6}
        />
      );
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
          shape => !selectedShapeIds.includes(shape.id)
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
          new BaseShape({
            shape,
            id: crypto.randomUUID(),
            x1: start.x,
            y1: start.y,
            x2: event.pageX,
            y2: event.pageY,
          }),
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

  const shapeList = useMemo(
    () =>
      shapes.map((shape, index) => {
        if (selectedShapeIds.includes(shape.id)) {
          return null;
        }
        const Component = shapeComponents[shape.shape];
        return (
          <Component
            shape={shape}
            onClick={handleSelect}
            key={index}
            onClickAway={handleDeselect}
          />
        );
      }),
    [shapes, selectedShapeIds, handleSelect, handleDeselect]
  );

  return (
    <div onMouseDown={whiteboardClickHandler} className='whiteboard'>
      <Dashboard shape={shape} setShape={setShape} />
      <svg className='svg'>
        {shapeList}
        {selectedShapes.map((shape, index) => {
          const Component = shapeComponents[shape.shape];
          const isSelected = selectedShapeIds.includes(shape.id);
          return (
            <ClickAwayListener
              key={index}
              onClickAway={() => handleDeselect(shape)}
            >
              <g>
                <Component
                  shape={shape}
                  onClick={handleSelect}
                  key={index}
                  onClickAway={handleDeselect}
                  isSelected={isSelected}
                />
              </g>
            </ClickAwayListener>
          );
        })}
        {/* {selectedShapes.length > 0 && (
          <ShapeGroup
            shapes={selectedShapes}
            onClick={() => null}
            isSelected
            onClickAway={handleDeselect}
          />
        )} */}
        {/* ^  Starting code to make selected shapes group shapes */}
        {getSelectedAdjustCircle()}
        {start && end && getActiveLine(start, end, shape)}
      </svg>
    </div>
  );
}
