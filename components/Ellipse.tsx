import { ShapeObject } from "@/types/line";

interface EllipseComponentProps {
    line: ShapeObject;
    onClick: Function;
    index: number;
  }

const Ellipse: React.FC<EllipseComponentProps> = ({ line, onClick, index }) => {
    const { x1, y1, x2, y2 } = line;

    const rx = Math.abs((x2 - x1) / 2);
    const ry = Math.abs((y2 - y1) / 2);

    const cx = (x2 + x1) / 2;
    const cy = (y2 + y1) / 2;
    
    return <ellipse onClick={() => onClick(line)} className='ellipse' rx={rx} ry={ry} cx={cx} cy={cy} />;
}

export default Ellipse;