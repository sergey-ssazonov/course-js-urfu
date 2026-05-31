import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
} from "react";
import cn from "classnames";

import { Loader } from "../Loader";
import styles from "./MultiDropdown.module.css";

export interface MultiDropdownOption {
  value: string;
  label: string;
}

export interface MultiDropdownProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "onChange"> {
  options: MultiDropdownOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  loading?: boolean;
  defaultOpen?: boolean;
}

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 12 8"
    aria-hidden="true"
    className={cn(styles.chevron, {
      [styles.chevronOpen]: open,
    })}
    focusable="false"
  >
    <path
      d="M1.41.59 6 5.17 10.59.59 12 2 6 8 0 2 1.41.59Z"
      fill="currentColor"
    />
  </svg>
);

export const MultiDropdown = ({
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Выберите организации",
  loading = false,
  defaultOpen = false,
  disabled,
  className,
  onClick,
  ...props
}: MultiDropdownProps) => {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const isDisabled = disabled || loading;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  const selectedLabels = useMemo(
    () =>
      options
        .filter((option) => selectedValue.includes(option.value))
        .map((option) => option.label),
    [options, selectedValue],
  );

  const displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;

  const toggleOption = (optionValue: string) => {
    const nextValue = selectedValue.includes(optionValue)
      ? selectedValue.filter((item) => item !== optionValue)
      : [...selectedValue, optionValue];

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        styles.root,
        {
          [styles.disabled]: isDisabled,
        },
        className,
      )}
    >
      <button
        {...props}
        type="button"
        disabled={isDisabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listId}
        className={styles.trigger}
        onClick={(event) => {
          onClick?.(event);

          if (!isDisabled) {
            setIsOpen((open) => !open);
          }
        }}
      >
        <span
          className={cn(styles.value, {
            [styles.placeholder]: selectedLabels.length === 0,
          })}
        >
          {displayValue}
        </span>

        <span className={styles.endAdornment}>
          {loading ? <Loader size="s" aria-hidden="true" /> : <ChevronIcon open={isOpen} />}
        </span>
      </button>

      {isOpen && !isDisabled ? (
        <div id={listId} className={styles.menu} role="listbox" aria-multiselectable="true">
          {options.map((option) => {
            const isSelected = selectedValue.includes(option.value);

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(styles.option, {
                  [styles.optionSelected]: isSelected,
                })}
                onClick={() => toggleOption(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
