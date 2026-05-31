import type { ReactNode } from "react";
import cn from "classnames";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";

import { Loader } from "../Loader";
import styles from "./Button.module.css";

export interface ButtonProps extends Omit<AriaButtonProps, "isDisabled"> {
  children?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
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
  return (
    <AriaButton
      {...props}
      type={type}
      isDisabled={disabled}
      isPending={loading}
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
    </AriaButton>
  );
};
