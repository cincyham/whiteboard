/**
 * EXAMPLE FILE — not used by the app, do not import from here.
 *
 * Shows a proposed pattern to reduce boilerplate across shape components.
 * Every shape currently duplicates the selected/unselected rendering logic.
 * This file demonstrates two helpers that eliminate that duplication:
 *
 *   makeShape    — factory for single-element shapes (circle, rect, line, etc.)
 *   ShapeWrapper — render-prop wrapper for multi-element shapes (arrow, x)
 */

import { JSX, SVGAttributes } from "react";
import { BaseShape, ShapeComponentProps } from "@/types/shapeTypes";

// ---------------------------------------------------------------------------
// makeShape
// ---------------------------------------------------------------------------
// Takes:
//   cssClass     — the base CSS class string, e.g. "circle"
//   computeAttrs — derives SVG attributes from the BaseShape coordinates
//   renderEl     — renders the actual SVG element given merged attributes
//
// Returns a fully-formed React component with identical behaviour to today's
// individual files, but with the selected/unselected branching handled once.

function makeShape<TAttrs extends Omit<SVGAttributes<SVGElement>, "onClick">>(
  cssClass: string,
  computeAttrs: (shape: BaseShape) => TAttrs,
  renderEl: (attrs: TAttrs & { className: string; onClick?: () => void }) => JSX.Element
) {
  return function Shape({ shape, onClick, isSelected = false }: ShapeComponentProps) {
    const attrs = computeAttrs(shape);
    return (
      <g>
        {isSelected && renderEl({ ...attrs, className: `${cssClass} selected` })}
        {renderEl({ ...attrs, className: cssClass, onClick: () => onClick(shape) })}
      </g>
    );
  };
}

// ---------------------------------------------------------------------------
// ShapeWrapper
// ---------------------------------------------------------------------------
// For shapes made of multiple SVG elements (Arrow, X), a render-prop wrapper
// that calls children twice — once for the selected ghost, once for the real
// interactive element — so you never write the branching by hand.

type ShapeWrapperOpts = {
  selected: boolean;
  cls: (base: string) => string;
};

function ShapeWrapper({
  isSelected,
  children,
}: {
  isSelected: boolean;
  children: (opts: ShapeWrapperOpts) => JSX.Element;
}) {
  const makeOpts = (selected: boolean): ShapeWrapperOpts => ({
    selected,
    cls: (base) => (selected ? `${base} selected` : base),
  });

  return (
    <g>
      {isSelected && children(makeOpts(true))}
      {children(makeOpts(false))}
    </g>
  );
}

// ---------------------------------------------------------------------------
// Circle  (was ~40 lines, now ~8)
// ---------------------------------------------------------------------------

const Circle = makeShape(
  "circle",
  ({ x1, y1, x2, y2 }) => {
    const rx = Math.abs((x2 - x1) / 2);
    const ry = Math.abs((y2 - y1) / 2);
    return { r: (rx + ry) / 2, cx: (x2 + x1) / 2, cy: (y2 + y1) / 2 };
  },
  (attrs) => <circle {...attrs} />
);

// ---------------------------------------------------------------------------
// Ellipse  (was ~40 lines, now ~8)
// ---------------------------------------------------------------------------

const Ellipse = makeShape(
  "ellipse",
  ({ x1, y1, x2, y2 }) => ({
    rx: Math.abs((x2 - x1) / 2),
    ry: Math.abs((y2 - y1) / 2),
    cx: (x2 + x1) / 2,
    cy: (y2 + y1) / 2,
  }),
  (attrs) => <ellipse {...attrs} />
);

// ---------------------------------------------------------------------------
// Rectangle  (was ~47 lines, now ~10)
// ---------------------------------------------------------------------------

const Rectangle = makeShape(
  "rectangle",
  ({ x1, y1, x2, y2 }) => ({
    x: x2 < x1 ? x2 : x1,
    y: y2 < y1 ? y2 : y1,
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1),
  }),
  (attrs) => <rect {...attrs} />
);

// ---------------------------------------------------------------------------
// Triangle  (was ~32 lines, now ~8)
// ---------------------------------------------------------------------------

const Triangle = makeShape(
  "triangle",
  ({ x1, y1, x2, y2 }) => ({
    points: `${x1},${y1} ${x2},${y2} ${-(x2 - x1) + x1},${y2}`,
  }),
  (attrs) => <polygon {...attrs} />
);

// ---------------------------------------------------------------------------
// Line  (was ~29 lines, now ~5)
// ---------------------------------------------------------------------------

const Line = makeShape(
  "line",
  ({ x1, y1, x2, y2 }) => ({ x1, y1, x2, y2 }),
  (attrs) => <line {...attrs} />
);

// ---------------------------------------------------------------------------
// Arrow  — multi-element shape, uses ShapeWrapper instead
// ---------------------------------------------------------------------------

function Arrow({ shape, onClick, isSelected = false }: ShapeComponentProps) {
  const { x1, y1, x2, y2 } = shape;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const arrowSize = 20;
  const arrowWidth = 20;
  const correctionFactor = 1;

  const unitX = dx / length;
  const unitY = dy / length;
  const newX2 = x2 - unitX * (arrowSize - correctionFactor);
  const newY2 = y2 - unitY * (arrowSize - correctionFactor);
  const perpX = -unitY * (arrowWidth / 2);
  const perpY = unitX * (arrowWidth / 2);
  const arrowX1 = newX2 + perpX;
  const arrowY1 = newY2 + perpY;
  const arrowX2 = newX2 - perpX;
  const arrowY2 = newY2 - perpY;

  return (
    <ShapeWrapper isSelected={isSelected}>
      {({ selected, cls }) => (
        <g onClick={selected ? undefined : () => onClick(shape)}>
          <line className={cls("line")} x1={x1} y1={y1} x2={newX2} y2={newY2} />
          <polygon
            className={cls("arrowHead")}
            points={`${x2},${y2} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
          />
        </g>
      )}
    </ShapeWrapper>
  );
}

// ---------------------------------------------------------------------------
// X  — multi-element shape, uses ShapeWrapper instead
// ---------------------------------------------------------------------------

function XShape({ shape, onClick, isSelected = false }: ShapeComponentProps) {
  const { x1, x2, y1, y2 } = shape;

  return (
    <ShapeWrapper isSelected={isSelected}>
      {({ selected, cls }) => (
        <g onClick={selected ? undefined : () => onClick(shape)}>
          <line className={cls("line")} x1={x1} y1={y1} x2={x2} y2={y2} />
          <line className={cls("line")} x1={x1} y1={y2} x2={x2} y2={y1} />
        </g>
      )}
    </ShapeWrapper>
  );
}

export { Circle, Ellipse, Rectangle, Triangle, Line, Arrow, XShape, makeShape, ShapeWrapper };
