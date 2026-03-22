import { clsx } from "clsx";
import styles from "./Button.module.css";

type Button = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: string;
};

const Button = ({ onClick, disabled, className, children }: Button) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.button, className)}
    >
      <div className={styles.innerButton}>
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;