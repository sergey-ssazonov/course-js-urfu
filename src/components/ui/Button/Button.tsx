import type { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import { Loader } from "../Loader";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  loading = false,
  fullWidth = false,
  disabled,
  className,
  type = "button",
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        styles.button,
        {
          [styles.loading]: loading,
          [styles.fullWidth]: fullWidth,
        },
        className,
      )}
    >
      {loading && <Loader size="s" tone="light" aria-hidden="true" />}

      <span className={styles.content}>{children}</span>
    </button>
  );
};
