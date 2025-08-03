import { ShapeObject } from "@/types/shape";
import { ClickAwayListener } from "@mui/material";

interface XComponentProps {
  shape: ShapeObject;
  onClick: Function;
  index: number;
  onClickAway: Function;
  isSelected: boolean;
  isOnlySelected: boolean;
}

const X: React.FC<XComponentProps> = ({
  shape,
  onClick,
  index,
  onClickAway,
  isSelected,
}) => {

  const { x1, x2, y1, y2 } = shape;

  return (
    <g key={index}>
      {isSelected && (
        <ClickAwayListener onClickAway={() => onClickAway(shape)}>
          <g
            className='selected'
          >
            <line
              className='line selected'
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
            />
            <line
              className='line selected'
              x1={x1}
              y1={y2}
              x2={x2}
              y2={y1}
            />
          </g>
        </ClickAwayListener>
      )}
      <line
        onClick={() => onClick(shape)}
        className='line'
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
      <line
        onClick={() => onClick(shape)}
        className='line'
        x1={x1}
        y1={y2}
        x2={x2}
        y2={y1}
      />
    </g>
  );
};

export default X;
