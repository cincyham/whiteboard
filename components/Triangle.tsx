import { ShapeObject } from "@/types/line";

interface TriangleComponentProps {
  line: ShapeObject;
  onClick: Function;
  index: number;
}

const Triangle: React.FC<TriangleComponentProps> = ({
  line,
  onClick,
  index,
}) => {
  const { x1, y1, x2, y2 } = line;

  const x3 = -(x2 - x1) + x1;
  const y3 = y2;

  return (
    <polygon
      onClick={() => onClick(line)}
      key={index}
      points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
      className='triangle'
    />
  );
};

export default Triangle;
