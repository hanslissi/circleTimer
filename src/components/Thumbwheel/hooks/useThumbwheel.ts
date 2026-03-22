import { useCallback, useEffect, useRef } from "react";
import { usePointerYDrag } from "../../../hooks/usePointerYDrag";
import { clamp } from "../../../utils/mathUtils";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  stepSize?: number;
};

export const useThumbwheel = ({
  value,
  onChange,
  min = 0,
  max = 100,
  stepSize = 10,
}: Props) => {
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
    const clampedTotalDeltaY = -clamp(-totalDeltaY, min * stepSize, max * stepSize);
    const newStep = -Math.round(clampedTotalDeltaY / stepSize);

    // only update value if it has changed (due to stepSize)
    if (newStep !== value) {
      onChange(newStep);
    }
    transformWheelY(clampedTotalDeltaY);
  };

  const handleDragEnd = (totalDeltaY: number) => {
    isDraggingRef.current = false;
    setTotalDeltaY(-clamp(-totalDeltaY, min * stepSize, max * stepSize));
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
