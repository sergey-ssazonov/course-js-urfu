import {
  useMemo,
  useState,
} from "react";
import cn from "classnames";
import {
  Button as AriaButton,
  DialogTrigger,
  ListBox,
  ListBoxItem,
  Popover,
  type ButtonProps as AriaButtonProps,
  type Selection,
} from "react-aria-components";
import type { Key } from "@react-types/shared";

import { Loader } from "../Loader";
import styles from "./MultiDropdown.module.css";

export interface MultiDropdownOption {
  value: string;
  label: string;
}

export interface MultiDropdownProps
  extends Omit<
    AriaButtonProps,
    "children" | "value" | "defaultValue" | "onChange" | "isDisabled"
  > {
  options: MultiDropdownOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  loading?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
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
  ...props
}: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const isDisabled = disabled || loading;

  const selectedLabels = useMemo(
    () =>
      options
        .filter((option) => selectedValue.includes(option.value))
        .map((option) => option.label),
    [options, selectedValue],
  );

  const displayValue = selectedLabels.length > 0 ? selectedLabels.join(", ") : placeholder;

  const handleSelectionChange = (keys: Selection) => {
    if (keys === "all") {
      return;
    }

    const nextValue = Array.from(keys) as string[];

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  };

  return (
    <DialogTrigger isOpen={isOpen && !isDisabled} onOpenChange={setIsOpen}>
      <AriaButton
        {...props}
        type="button"
        isDisabled={isDisabled}
        className={cn(
          styles.trigger,
          {
            [styles.open]: isOpen,
            [styles.disabled]: isDisabled,
          },
          className,
        )}
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
      </AriaButton>

      <Popover offset={8} className={styles.popover}>
        <ListBox
          aria-label={placeholder}
          className={styles.menu}
          selectionMode="multiple"
          selectionBehavior="toggle"
          selectedKeys={new Set<Key>(selectedValue)}
          onSelectionChange={handleSelectionChange}
        >
          {options.map((option) => (
            <ListBoxItem
              key={option.value}
              id={option.value}
              textValue={option.label}
              className={styles.option}
            >
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </DialogTrigger>
  );
};
