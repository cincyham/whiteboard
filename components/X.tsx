import { ShapeObject } from "@/types/line";

interface XComponentProps {
  line: ShapeObject;
  onClick: Function;
  index: number;
}

const X: React.FC<XComponentProps> = ({ line, onClick, index }) => {

    const { x1, x2, y1, y2 } = line;
    
  return <g key={index}>
    <line
      onClick={() => onClick(line)}
      className='line'
      key={index}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}/>
    <line
      onClick={() => onClick(line)}
      className='line'
      key={index}
      x1={x1}
      y1={y2}
      x2={x2}
      y2={y1}/>
  </g>;
};

export default X;