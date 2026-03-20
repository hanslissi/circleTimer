import { useCallback, useEffect, useRef } from "react";
import { usePointerYDrag } from "../../../hooks/usePointerYDrag";

type Props = {
  value: number;
  onChange: (value: number) => void;
  stepSize?: number;
};

export const useThumbwheel = ({ value, onChange, stepSize = 10 }: Props) => {
  const isDraggingRef = useRef(false);
  const indentsRef = useRef<HTMLDivElement>(null);

  const transformWheelY = useCallback((totalDeltaY: number) => {
    if (indentsRef.current === null) {
      return;
    }

    const segmentHeight = indentsRef.current.getBoundingClientRect().height;
    const numSegmentTurns = Math.floor(totalDeltaY / segmentHeight);
    const segmentTurnOffsetY =
      numSegmentTurns > 0
        ? -segmentHeight
        : numSegmentTurns < 0
          ? segmentHeight
          : 0;
    const transformY = segmentTurnOffsetY + (totalDeltaY % segmentHeight);

    requestAnimationFrame(() => {
      if (indentsRef.current === null) {
        return;
      }
      indentsRef.current.style.transform = `translateY(${transformY}px)`;
    });
  }, []);

  const handleDrag = (_: number, totalDeltaY: number) => {
    isDraggingRef.current = true;
    transformWheelY(totalDeltaY);

    const newStep = -Math.round(totalDeltaY / stepSize);

    // only update value if it has changed (due to stepSize)
    if (newStep !== value) {
      onChange(newStep);
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
  };

  const { handlePointerDown, setTotalDeltaY } = usePointerYDrag({
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  });

  useEffect(() => {
    if (isDraggingRef.current) {
      return;
    }

    const totalDeltaY = -(value * stepSize);
    transformWheelY(totalDeltaY);
    setTotalDeltaY(totalDeltaY);
  }, [value, stepSize, transformWheelY, setTotalDeltaY]);

  return {
    indentsRef,
    handlePointerDown,
  };
};
