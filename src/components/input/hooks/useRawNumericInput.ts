import { useRef, useState } from "react";
import { clamp } from "@utils/mathUtils";
import { useShiftToggle } from "@hooks/useShiftToggle";
import { nudge as nudgeDetent } from "@utils/inputUtils";
import type { KeyboardEvent } from "react";

type Params = {
  value: number;
  min: number;
  max: number;
  maxVisibleCharacters: number;
  smallNudgeAmount: number;
  bigNudgeAmount: number;
  /** Serialize a committed number value into the raw display string. */
  serialize: (value: number) => string;
  /** Deserialize the current raw string into a number to commit. */
  deserialize: (raw: string) => number;
  onChange?: (value: number) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};

type RawInputHandlers = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  displayValue: string;
  pendingValue: number;
  raw: string;
  setRaw: (raw: string) => void;
  handleFocus: React.FocusEventHandler<HTMLInputElement>;
  handleBlur: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export function useRawNumericInput({
  value,
  min,
  max,
  smallNudgeAmount,
  bigNudgeAmount,
  maxVisibleCharacters,
  serialize,
  deserialize,
  onChange,
  onFocus,
}: Params): RawInputHandlers {
  const inputRef = useRef<HTMLInputElement>(null);
  const isShiftToggledRef = useShiftToggle();
  const [isFocused, setIsFocused] = useState(false);
  const [raw, setRaw] = useState(() => serialize(value));

  const displayValue = isFocused ? raw : serialize(value);
  const displayValueVisible = displayValue.substring(
    displayValue.length - maxVisibleCharacters,
    displayValue.length,
  );
  const pendingValue = isFocused ? clamp(deserialize(displayValueVisible), min, max) : value;

  const commit = (v: number) => {
    onChange?.(v);
  };

  const nudge = (delta: number) => {
    const newValue = clamp(nudgeDetent(pendingValue, delta), min, max);
    setRaw(serialize(newValue));
    commit(newValue);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    onFocus?.(event);
    setIsFocused(true);
    setRaw(serialize(value));
  };

  const handleBlur = () => {
    setIsFocused(false);
    commit(pendingValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const nudgeAmount = isShiftToggledRef.current ? bigNudgeAmount : smallNudgeAmount;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      nudge(nudgeAmount);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nudge(-nudgeAmount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(pendingValue);
      inputRef.current?.blur();
    }
  };

  return {
    inputRef,
    displayValue,
    pendingValue,
    raw,
    setRaw,
    handleFocus,
    handleBlur,
    handleKeyDown,
  };
}
