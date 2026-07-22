import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { BaseShape, ShapeComponentProps } from "@/types/shapeTypes";

function applyAppearance(node: ReactNode, appearance: BaseShape["appearance"]): ReactNode {
  if (!appearance) return node;
  return Children.map(node, (child) => {
    if (!isValidElement<Record<string, unknown>>(child)) return child;
    const props: Record<string, unknown> = {
      style: {
        stroke: appearance.stroke,
        strokeWidth: appearance.strokeWidth,
        fill: child.props["data-fill"] === "stroke" ? appearance.stroke : appearance.fill,
      },
    };
    if (child.props.children) {
      props.children = applyAppearance(child.props.children as ReactNode, appearance);
    }
    return cloneElement(child, props);
  });
}

function applySelected(node: ReactNode, appearance: BaseShape["appearance"]): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement<Record<string, unknown>>(child)) return child;
    const props: Record<string, unknown> = {
      style: {
        fill: appearance.fill === "none" ? "none" : "transparent",
        stroke: appearance.stroke === "none" ? "none" : "transparent",
        strokeWidth: appearance.strokeWidth + 20,
      },
    };
    if (child.props.children) {
      props.children = applySelected(child.props.children as ReactNode, appearance);
    }
    return cloneElement(child, props);
  });
}

function ShapeWrapper(render: (coords: BaseShape) => ReactNode) {
  return function Shape({ shape, onClick }: ShapeComponentProps) {
    const fullChildren = applyAppearance(render(shape), shape.appearance);
    const hitArea = applySelected(fullChildren, shape.appearance);
    return (
      <g>
        {fullChildren}
        <g onClick={() => onClick(shape)}>
          {hitArea}
        </g>
      </g>
    );
  };
}

const Circle = ShapeWrapper(({ x1, y1, x2, y2 }) => {
  const rx = Math.abs((x2 - x1) / 2);
  const ry = Math.abs((y2 - y1) / 2);
  return <circle className="circle" r={(rx + ry) / 2} cx={(x2 + x1) / 2} cy={(y2 + y1) / 2} />;
});

const Ellipse = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <ellipse
    className="ellipse"
    rx={Math.abs((x2 - x1) / 2)}
    ry={Math.abs((y2 - y1) / 2)}
    cx={(x2 + x1) / 2}
    cy={(y2 + y1) / 2}
  />
));

const Rectangle = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <rect
    className="rectangle"
    x={x2 < x1 ? x2 : x1}
    y={y2 < y1 ? y2 : y1}
    width={Math.abs(x2 - x1)}
    height={Math.abs(y2 - y1)}
    rx={20}
    ry={20}
  />
));

const Triangle = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <polygon className="triangle" points={`${x1},${y1} ${x2},${y2} ${-(x2 - x1) + x1},${y2}`} />
));

const Line = ShapeWrapper(({ x1, y1, x2, y2 }) => (
  <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
));

const Arrow = ShapeWrapper(({ x1, y1, x2, y2 }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) return null;
  const headLength = 20;
  const headWidth = 20;
  const unitX = dx / length;
  const unitY = dy / length;
  const shaftEndX = x2 - unitX * (headLength - 1);
  const shaftEndY = y2 - unitY * (headLength - 1);
  const perpX = -unitY * (headWidth / 2);
  const perpY = unitX * (headWidth / 2);
  const baseX1 = shaftEndX + perpX;
  const baseY1 = shaftEndY + perpY;
  const baseX2 = shaftEndX - perpX;
  const baseY2 = shaftEndY - perpY;

  return (
    <g>
      <line className="line" x1={x1} y1={y1} x2={shaftEndX} y2={shaftEndY} />
      <polygon className="arrowHead" data-fill="stroke" points={`${x2},${y2} ${baseX1},${baseY1} ${baseX2},${baseY2}`} />
    </g>
  );
});

const XShape = ShapeWrapper(({ x1, x2, y1, y2 }) => (
  <>
    <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
    <line className="line" x1={x1} y1={y2} x2={x2} y2={y1} />
  </>
));

export { Circle, Ellipse, Rectangle, Triangle, Line, Arrow, XShape, ShapeWrapper };
