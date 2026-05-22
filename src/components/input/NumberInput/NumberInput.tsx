import { memo, type ChangeEvent } from "react";
import { clsx } from "clsx";
import styles from "../styles/Input.module.css";
import { useRawNumericInput } from "../hooks/useRawNumericInput";

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

/**
 * Returns a zero-padded placeholder string matching the width of max.
 * e.g. max=99 => "00", max=999 => "000"
 */
function getPlaceholderDisplay(max: number): string {
  return String(max).replace(/[0-9]/g, "0");
}

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
      [styles.glowingGraySky]: color === "graysky",
    },
    {
      [styles.variantBig]: size === "big",
      [styles.variantSmall]: size === "small",
    },
  );

  const placeholder = getPlaceholderDisplay(max);
  const { inputRef, displayValue, pendingValue, setRaw, handleFocus, handleBlur, handleKeyDown } =
    useRawNumericInput({
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^0-9]/g, "");
    setRaw(digits);
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
        />
      </div>
    </div>
  );
});

export default NumberInput;
