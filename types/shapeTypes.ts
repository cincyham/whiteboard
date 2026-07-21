import { Arrow, Circle, Ellipse, Line, Rectangle, Triangle, XShape } from "@/components/shapes/shapes";
import ShapeGroup from "@/components/shapes/ShapeGroup";
import { JSX } from "react";

export type ShapeAppearance = {
  stroke: string;
  strokeWidth: number;
  fill: string;
};

export class BaseShape {
  shape: Shapes;
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  appearance: ShapeAppearance = {
    stroke: "#ffffff",
    strokeWidth: 4,
    fill: "transparent",
  };

  constructor({ shape, id, x1, y1, x2, y2, appearance }: Omit<BaseShape, 'appearance'> & { appearance?: ShapeAppearance }) {
    this.shape = shape;
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    if (appearance !== undefined) this.appearance = appearance;
  }
}

export class BaseShapeGroup {
  shape: Shapes;
  shapes: BaseShape[];
  id: string;

  constructor({ shape, shapes, id }: Readonly<BaseShapeGroup>) {
    this.shape = shape;
    this.shapes = shapes;
    this.id = id;
  }
}

export type ShapeElement = BaseShape | BaseShapeGroup;

export enum Shapes {
  Line,
  Arrow,
  Triangle,
  Circle,
  Ellipse,
  X,
  Rectangle,
  ShapeGroup,
}

export const shapeComponents: { [key in Shapes]: (props: any) => JSX.Element } =
  {
    [Shapes.Line]: Line,
    [Shapes.Arrow]: Arrow,
    [Shapes.Triangle]: Triangle,
    [Shapes.Circle]: Circle,
    [Shapes.Ellipse]: Ellipse,
    [Shapes.X]: XShape,
    [Shapes.Rectangle]: Rectangle,
    [Shapes.ShapeGroup]: ShapeGroup,
  };

export type ShapeComponentProps = {
  shape: BaseShape;
  onClick: Function;
  isSelected: boolean;
};
