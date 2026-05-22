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
  const prevPosRef = useRef<PointerPosition>({ x: 0, y: 0 });
  const totalDeltaRef = useRef<PointerPosition>({ x: 0, y: 0 });
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (
        startPosRef.current === null ||
        pointerIdRef.current !== e.pointerId
      ) {
        return;
      }

      const delta: PointerPosition = {
        x: e.clientX - prevPosRef.current.x,
        y: e.clientY - prevPosRef.current.y,
      };

      totalDeltaRef.current = {
        x: totalDeltaRef.current.x + delta.x,
        y: totalDeltaRef.current.y + delta.y,
      };

      prevPosRef.current = { x: e.clientX, y: e.clientY };

      if (onDrag) {
        onDrag(delta, { ...totalDeltaRef.current });
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (pointerIdRef.current !== e.pointerId) {
        return;
      }

      if (onDragEnd) {
        onDragEnd({ ...totalDeltaRef.current });
      }

      startPosRef.current = null;
      prevPosRef.current = { x: 0, y: 0 };
      pointerIdRef.current = null;
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
    prevPosRef.current = { x: e.clientX, y: e.clientY };
    pointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const setTotalDelta = (partial: Partial<PointerPosition>) => {
    totalDeltaRef.current = { ...totalDeltaRef.current, ...partial };
  };

  return {
    handlePointerDown,
    setTotalDelta,
  };
};
