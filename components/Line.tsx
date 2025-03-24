import { ShapeObject } from "@/types/line";

interface LineComponentProps {
  line: ShapeObject;
  onClick: Function;
  index: number;
}

const Line: React.FC<LineComponentProps> = ({ line, onClick, index }) => {
  const { x1, y1, x2, y2 } = line;

  return (
    <line
      onClick={() => onClick(line)}
      className='line'
      key={index}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
    />
  );
};

export default Line;
