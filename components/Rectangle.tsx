import { ShapeObject } from "@/types/line";

interface RectangleComponentProps {
  line: ShapeObject;
  onClick: Function;
  index: number;
}

const Rectangle: React.FC<RectangleComponentProps> = ({ line, onClick, index }) => {

    const { x1, x2, y1, y2 } = line;

    let startX: number = x1;
    let startY: number = y1;

    const height = y2 - y1;
    const width = x2 - x1;
    if (width < 0) {
        startX = x2;
    }
    if (height < 0) {
        startY = y2;
    }
    
  return <rect onClick={() => onClick(line)} height={Math.abs(height)} width={Math.abs(width)} x={startX} y={startY} className='rectangle' key={index}  />
};

export default Rectangle;