import { memo, type ChangeEventHandler, type PointerEventHandler } from "react";
import { clsx } from "clsx";
import styles from "../styles/Input.module.css";
import { useRawNumericInput } from "../hooks/useRawNumericInput";
import { getPlaceholderDisplay } from "./utils/numberDisplayUtils";

type Props = {
  value: number;
  min?: number;
  max?: number;
  smallNudgeAmount?: number;
  bigNudgeAmount?: number;
  label?: string;
  size?: "big" | "small";
  color?: "teal" | "autumn" | "graysky";
  onChange?: (value: number) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};

const NumberInput = memo(function NumberInput({
  value,
  min = 0,
  max = 100,
  smallNudgeAmount = 1,
  bigNudgeAmount = 10,
  label = "value",
  size = "big",
  color = "teal",
  onChange,
  onFocus,
}: Props) {
  const themeClassNames = clsx(
    {
      [styles.glowingTeal]: color === "teal",
      [styles.glowingAutumn]: color === "autumn",
      [styles.glowingGraysky]: color === "graysky",
    },
    {
      [styles.variantBig]: size === "big",
      [styles.variantSmall]: size === "small",
    },
  );

  const placeholder = getPlaceholderDisplay(max);
  const {
    inputRef,
    displayValue,
    pendingValue,
    isFocused,
    setRaw,
    handleFocus,
    handleBlur,
    handleKeyDown,
  } = useRawNumericInput({
    value,
    min,
    max,
    smallNudgeAmount,
    bigNudgeAmount,
    maxVisibleCharacters: placeholder.length,
    onChange,
    onFocus,
    serialize: (value) => String(value),
    deserialize: (value) => Number(value),
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, "");
    setRaw(digits);
  };

  const handlePointerUp: PointerEventHandler<HTMLInputElement> = (e) => {
    const isTouchOrPen = e.pointerType === "touch" || e.pointerType === "pen";
    if (isTouchOrPen && !isFocused) {
      inputRef.current?.select();
    }
  };

  return (
    <div className={clsx(styles.metalSlant, "metalSlantIndent")}>
      <div className={clsx(styles.container, themeClassNames)}>
        <div className={styles.display} role="presentation">
          {placeholder}
        </div>
        <input
          className={styles.durationValue}
          ref={inputRef}
          aria-label={label}
          type="text"
          inputMode="numeric"
          value={displayValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={pendingValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPointerUp={handlePointerUp}
        />
      </div>
    </div>
  );
});

export default NumberInput;
