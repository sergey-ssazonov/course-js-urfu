import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import cn from "classnames";

import { Loader } from "../Loader";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      loading = false,
      fullWidth = false,
      disabled,
      className,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled ?? false;

    return (
      <div
        className={cn(
          styles.root,
          {
            [styles.fullWidth]: fullWidth,
            [styles.disabled]: isDisabled,
            [styles.loading]: loading,
          },
          className,
        )}
      >
        <input
          {...props}
          ref={ref}
          className={styles.control}
          type={type}
          disabled={isDisabled}
        />

        {loading && (
          <span className={styles.adornment}>
            <Loader size="s" aria-hidden="true" />
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
