import { useRef } from "react";
import { usePointerYDrag } from "../../../hooks/usePointerYDrag";

type Props = {
  onChange?: (value: number) => void;
  stepSize?: number;
};

export const useThumbwheel = ({ onChange, stepSize = 10 }: Props) => {
  const indentsRef = useRef<HTMLDivElement>(null);

  const updateWheelTransform = (_: number, totalDeltaY: number) => {
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
      if (onChange) {
        const currentStepValue = Math.floor(totalDeltaY / stepSize);
        onChange(-currentStepValue); // invert, because translateY is inverted (+) is down
      }
    });
  };

  const { handlePointerDown } = usePointerYDrag({
    onDrag: updateWheelTransform,
  });

  return {
    indentsRef,
    handlePointerDown,
  };
};
