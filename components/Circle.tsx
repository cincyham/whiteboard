import { ShapeObject } from "@/types/line";

interface CircleComponentProps {
    line: ShapeObject;
    onClick: Function;
    index: number;
  }

const Circle: React.FC<CircleComponentProps> = ({ line, onClick, index }) => {
    const { x1, y1, x2, y2 } = line;

    const rx = Math.abs((x2 - x1) / 2);
    const ry = Math.abs((y2 - y1) / 2);

    const radius = (rx + ry) / 2;

    const cx = (x2 + x1) / 2;
    const cy = (y2 + y1) / 2;
    
    return <circle onClick={() => onClick(line)} className='circle' r={radius} cx={cx} cy={cy} />;
}

export default Circle;