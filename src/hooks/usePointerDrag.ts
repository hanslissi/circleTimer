import { useEffect, useRef, type PointerEventHandler } from "react";

type PointerPosition = {
  x: number;
  y: number;
};

type Props = {
  onDrag?: (delta: PointerPosition, total: PointerPosition) => void;
  onDragEnd?: (total: PointerPosition) => void;
};

export const usePointerDrag = ({ onDrag, onDragEnd }: Props) => {
  const startPosRef = useRef<PointerPosition | null>(null);
  const currentDragDeltaRef = useRef<PointerPosition>({ x: 0, y: 0 });
  const totalDeltaRef = useRef<PointerPosition>({ x: 0, y: 0 });
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (
        startPosRef.current !== null &&
        pointerIdRef.current === e.pointerId
      ) {
        currentDragDeltaRef.current = {
          x: e.clientX - startPosRef.current.x,
          y: e.clientY - startPosRef.current.y,
        };

        const totalDelta = {
          x: totalDeltaRef.current.x + currentDragDeltaRef.current.x,
          y: totalDeltaRef.current.y + currentDragDeltaRef.current.y,
        };

        if (onDrag) {
          onDrag(currentDragDeltaRef.current, totalDelta);
        }
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (pointerIdRef.current === e.pointerId) {
        totalDeltaRef.current = {
          x: totalDeltaRef.current.x + currentDragDeltaRef.current.x,
          y: totalDeltaRef.current.y + currentDragDeltaRef.current.y,
        };

        if (onDragEnd) {
          onDragEnd(totalDeltaRef.current);
        }

        startPosRef.current = null;
        currentDragDeltaRef.current = { x: 0, y: 0 };
        pointerIdRef.current = null;
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [onDrag, onDragEnd]);

  const handlePointerDown: PointerEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    startPosRef.current = { x: e.clientX, y: e.clientY };
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  return {
    handlePointerDown,
  };
};
