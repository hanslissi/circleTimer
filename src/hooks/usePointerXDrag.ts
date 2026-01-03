import { usePointerDrag } from "./usePointerDrag";

type Props = {
  onDrag?: (deltaX: number, totalDeltaX: number) => void;
  onDragEnd?: (totalDeltaX: number) => void;
};

export const usePointerXDrag = ({
  onDrag,
  onDragEnd,
}: Props) => {
  const { handlePointerDown } = usePointerDrag({
    onDrag: onDrag ? (delta, total) => onDrag(delta.x, total.x) : undefined,
    onDragEnd: onDragEnd ? (total) => onDragEnd(total.x) : undefined,
  });

  return {
    handlePointerDown,
  };
};
