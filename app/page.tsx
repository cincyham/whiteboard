"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PositionObject } from "@/types/defaults";
import { BaseShape, ShapeElement, BaseShapeGroup } from "@/types/shapeTypes";
import { Shapes, shapeComponents } from "@/types/shapeTypes";
import "./page.scss";
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
    () => new Set(selectedShapes.map(shp => shp.id)),
    [selectedShapes]
  );

  const whiteboardClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!start && !end && selectedShapes.length === 0) {
      setStart({ x: event.pageX, y: event.pageY });
    }
  };

  const handleSelect = useCallback(
    (shape: ShapeElement) => {
      if (isShiftHeld) setSelectedShapes(prev => [...prev, shape]);
      else setSelectedShapes([shape]);
      setShapes(prev => prev.filter(shp => shp.id !== shape.id));
    },
    [isShiftHeld]
  );

  const handleSelectedClickAway = useCallback(() => {
    setShapes(prev => [...prev, ...selectedShapes]);
    setSelectedShapes([]);
  }, [selectedShapes]);

  // Handle Key Presses when Shapes are selected
  useEffect(() => {
    if (selectedShapes.length > 0) {
      const handleKeyDown = (event: KeyboardEvent) => {
        setIsShiftHeld(event.shiftKey);
        if (["Backspace", "Delete"].includes(event.key)) {
          const newShapes = shapes.filter(
            shape => !selectedShapeIds.has(shape.id)
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
    }
  }, [selectedShapes, shapes]);

  // Handle Creating a new shape.
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setEnd({ x: event.clientX, y: event.clientY });
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
        const x1 = start.x;
        const x2 = event.pageX;
        const y1 = start.y;
        const y2 = event.pageY;
        setShapes([
          ...shapes,
          new BaseShape({
            shape,
            id: crypto.randomUUID(),
            x1,
            y1,
            x2,
            y2,
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
        if (selectedShapeIds.has(shape.id)) {
          return null;
        }
        const Component = shapeComponents[shape.shape];
        return <Component shape={shape} onClick={handleSelect} key={index} />;
      }),
    [shapes, selectedShapeIds, handleSelect]
  );

  const activeLine = useMemo(() => {
    if (!start || !end || typeof shape !== "number") return null;
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
  }, [start, end, shape]);

  return (
    <div onMouseDown={whiteboardClickHandler} className='whiteboard'>
      <Dashboard shape={shape} setShape={setShape} />
      <svg className='svg'>
        <g style={{ pointerEvents: (selectedShapes.length > 0 && !isShiftHeld) ? 'none' : 'revert' }}>{shapeList}</g>
        {selectedShapes.length > 0 && (
          <ClickAwayListener
            onClickAway={() => (isShiftHeld ? null : handleSelectedClickAway())}
          >
            <g>
              <ShapeGroup
                shapes={selectedShapes}
                setShapes={setSelectedShapes}
                onClick={() => null}
                isSelected
              />
            </g>
          </ClickAwayListener>
        )}
        {activeLine}
      </svg>
    </div>
  );
}
