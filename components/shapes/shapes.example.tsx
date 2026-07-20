/**
 * EXAMPLE FILE — not used by the app, do not import from here.
 *
 * Shows a proposed pattern to reduce boilerplate across shape components.
 * Every shape currently duplicates the selected/unselected rendering logic.
 * ShapeWrapper is a factory that handles selected state, onClick, and
 * ShapeComponentProps for every shape — single or multi-element.
 */

import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { BaseShape, ShapeComponentProps } from "@/types/shapeTypes";

// ---------------------------------------------------------------------------
// ShapeWrapper
// ---------------------------------------------------------------------------
// Pass a render function that receives coordinates and returns JSX.
// ShapeWrapper produces a full React component — no prop declarations needed.
// When isSelected, it renders a ghost copy with " selected" appended to every
// element's className, then the interactive copy with onClick.

function addSelected(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement<Record<string, unknown>>(child)) return child;
    const props: Record<string, unknown> = {};
    if (typeof child.props.className === "string") {
      props.className = `${child.props.className} selected`;
    }
    if (child.props.children) {
      props.children = addSelected(child.props.children as ReactNode);
    }
    return cloneElement(child, props);
  });
}

function ShapeWrapper(render: (coords: BaseShape) => ReactNode) {
  return function Shape({ shape, onClick, isSelected = false }: ShapeComponentProps) {
    const children = render(shape);
    return (
      <g>
        {isSelected && addSelected(children)}
        <g onClick={() => onClick(shape)}>{children}</g>
      </g>
    );
  };
}

// ---------------------------------------------------------------------------
// Circle
// ---------------------------------------------------------------------------

const Circle = ShapeWrapper(({ x1, y1, x2, y2 }) => {
  const rx = Math.abs((x2 - x1) / 2);
  const ry = Math.abs((y2 - y1) / 2);
  return <circle className="circle" r={(rx + ry) / 2} cx={(x2 + x1) / 2} cy={(y2 + y1) / 2} />;
});

// ---------------------------------------------------------------------------
// Ellipse
// ---------------------------------------------------------------------------

const Ellipse = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <ellipse
    className="ellipse"
    rx={Math.abs((x2 - x1) / 2)}
    ry={Math.abs((y2 - y1) / 2)}
    cx={(x2 + x1) / 2}
    cy={(y2 + y1) / 2}
  />
));

// ---------------------------------------------------------------------------
// Rectangle
// ---------------------------------------------------------------------------

const Rectangle = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <rect
    className="rectangle"
    x={x2 < x1 ? x2 : x1}
    y={y2 < y1 ? y2 : y1}
    width={Math.abs(x2 - x1)}
    height={Math.abs(y2 - y1)}
  />
));

// ---------------------------------------------------------------------------
// Triangle
// ---------------------------------------------------------------------------

const Triangle = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <polygon className="triangle" points={`${x1},${y1} ${x2},${y2} ${-(x2 - x1) + x1},${y2}`} />
));

// ---------------------------------------------------------------------------
// Line
// ---------------------------------------------------------------------------

const Line = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
));

// ---------------------------------------------------------------------------
// Arrow
// ---------------------------------------------------------------------------

const Arrow = ShapeWrapper(({ x1, y1, x2, y2 }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const arrowSize = 20;
  const arrowWidth = 20;
  const unitX = dx / len;
  const unitY = dy / len;
  const newX2 = x2 - unitX * (arrowSize - 1);
  const newY2 = y2 - unitY * (arrowSize - 1);
  const perpX = -unitY * (arrowWidth / 2);
  const perpY = unitX * (arrowWidth / 2);

  return (
    <>
      <line className="line" x1={x1} y1={y1} x2={newX2} y2={newY2} />
      <polygon
        className="arrowHead"
        points={`${x2},${y2} ${newX2 + perpX},${newY2 + perpY} ${newX2 - perpX},${newY2 - perpY}`}
      />
    </>
  );
});

// ---------------------------------------------------------------------------
// X
// ---------------------------------------------------------------------------

const XShape = ShapeWrapper(({ x1, x2, y1, y2 }) => (
  <>
    <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
    <line className="line" x1={x1} y1={y2} x2={x2} y2={y1} />
  </>
));

export { Circle, Ellipse, Rectangle, Triangle, Line, Arrow, XShape, ShapeWrapper };
