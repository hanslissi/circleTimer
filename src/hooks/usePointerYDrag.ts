import { usePointerDrag } from "./usePointerDrag";

type Props = {
  onDrag?: (deltaY: number, totalDeltaY: number) => void;
  onDragEnd?: (totalDeltaY: number) => void;
};

export const usePointerYDrag = ({ onDrag, onDragEnd }: Props) => {
  const { handlePointerDown, setTotalDelta } = usePointerDrag({
    onDrag: onDrag ? (delta, total) => onDrag(delta.y, total.y) : undefined,
    onDragEnd: onDragEnd ? (total) => onDragEnd(total.y) : undefined,
  });

  const setTotalDeltaY = (y: number) => setTotalDelta({ y });

  return {
    handlePointerDown,
    setTotalDeltaY,
  };
};
