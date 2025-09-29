import Arrow from "@/components/shapes/Arrow";
import Circle from "@/components/shapes/Circle";
import Ellipse from "@/components/shapes/Ellipse";
import Line from "@/components/shapes/Line";
import Rectangle from "@/components/shapes/Rectangle";
import ShapeGroup from "@/components/shapes/ShapeGroup";
import Triangle from "@/components/shapes/Triangle";
import X from "@/components/shapes/X";
import { JSX } from "react";

type ShapeObject = {
  shape: Shapes;
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type ShapeGroupObject = {
  shape: Shapes;
  shapes: BaseShape[];
  id: string;
}

export class BaseShape {
  shape: Shapes;
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(obj: ShapeObject) {
    this.shape = obj.shape;
    this.id = obj.id;
    this.x1 = obj.x1;
    this.y1 = obj.y1;
    this.x2 = obj.x2;
    this.y2 = obj.y2;
  }
}

export class BaseShapeGroup {
  shape: Shapes;
  shapes: BaseShape[];
  id: string;

  constructor(obj: ShapeGroupObject) {
    this.shape = obj.shape;
    this.id = obj.id;
    this.shapes = obj.shapes;
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
    [Shapes.X]: X,
    [Shapes.Rectangle]: Rectangle,
    [Shapes.ShapeGroup]: ShapeGroup,
  };

export type ShapeComponentProps = {
  shape: BaseShape;
  onClick: Function;
  index: number;
  isSelected: boolean;
  onClickAway: Function;
};
