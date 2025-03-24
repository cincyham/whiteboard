import Arrow from "@/components/Arrow";
import Circle from "@/components/Circle";
import Ellipse from "@/components/Ellipse";
import Line from "@/components/Line";
import Rectangle from "@/components/Rectangle";
import Triangle from "@/components/Triangle";
import X from "@/components/X";

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