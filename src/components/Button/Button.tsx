import { clsx } from "clsx";
import styles from "./Button.module.css";

type Button = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Button = ({ onClick, disabled, className, children }: Button) => {
  const buttonContent =
    typeof children === "string" ? <span className={"shinyTextDark"}>{children}</span> : children;
  return (
    <button onClick={onClick} disabled={disabled} className={clsx(styles.button, className)}>
      {buttonContent}
    </button>
  );
};

export default Button;
