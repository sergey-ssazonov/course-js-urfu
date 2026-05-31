import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import { Loader } from "../Loader";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  loading?: boolean;
  forceChecked?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      loading = false,
      forceChecked = false,
      disabled,
      className,
      checked,
      defaultChecked,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const isChecked = forceChecked || checked || defaultChecked;

    return (
      <label
        className={cn(
          styles.root,
          {
            [styles.disabled]: isDisabled,
            [styles.loading]: loading,
          },
          className,
        )}
        data-force-checked={isChecked ? "true" : undefined}
      >
        <input
          {...props}
          ref={ref}
          className={styles.input}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={isDisabled}
        />

        <span className={styles.box} aria-hidden="true">
          {loading ? <Loader size="s" aria-hidden="true" /> : <span className={styles.checkmark} />}
        </span>

        {label ? <span className={styles.label}>{label}</span> : null}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
