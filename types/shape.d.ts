import { Shapes } from "@/enums/shapeTypes";

export interface ShapeObject {
  shape: Shapes;
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};