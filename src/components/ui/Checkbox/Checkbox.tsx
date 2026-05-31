import { forwardRef, useImperativeHandle, useRef } from "react";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import { Checkbox as AriaCheckbox } from "react-aria-components";

import { Loader } from "../Loader";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  loading?: boolean;
  forceChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
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
      onChange,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const isChecked = forceChecked || checked || defaultChecked;
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

    const emitChange = (selected: boolean) => {
      onCheckedChange?.(selected);

      if (onChange) {
        const syntheticEvent = {
          target: { checked: selected },
          currentTarget: { checked: selected },
        } as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }
    };

    return (
      <AriaCheckbox
        isDisabled={isDisabled}
        isSelected={checked}
        defaultSelected={defaultChecked}
        onChange={emitChange}
        name={props.name}
        value={typeof props.value === "string" ? props.value : undefined}
        isReadOnly={props.readOnly}
        isRequired={props.required}
        autoFocus={props.autoFocus}
        inputRef={inputRef}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        aria-describedby={props["aria-describedby"]}
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
        <span className={styles.box} aria-hidden="true">
          {loading ? <Loader size="s" aria-hidden="true" /> : <span className={styles.checkmark} />}
        </span>

        {label ? <span className={styles.label}>{label}</span> : null}
      </AriaCheckbox>
    );
  },
);

Checkbox.displayName = "Checkbox";
