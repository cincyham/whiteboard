import Arrow from "@/components/shapes/Arrow";
import Circle from "@/components/shapes/Circle";
import Ellipse from "@/components/shapes/Ellipse";
import Line from "@/components/shapes/Line";
import Rectangle from "@/components/shapes/Rectangle";
import Triangle from "@/components/shapes/Triangle";
import X from "@/components/shapes/X";

export enum Shapes {
  Line,
  Arrow,
  Triangle,
  Circle,
  Ellipse,
  X,
  Rectangle,
}

export const shapeComponents: { [key in Shapes]: React.FC<any> } = {
    [Shapes.Line]: Line,
    [Shapes.Arrow]: Arrow,
    [Shapes.Triangle]: Triangle,
    [Shapes.Circle]: Circle,
    [Shapes.Ellipse]: Ellipse,
    [Shapes.X]: X,
    [Shapes.Rectangle]: Rectangle,
}