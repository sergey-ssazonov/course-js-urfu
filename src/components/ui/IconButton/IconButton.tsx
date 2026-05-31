import type { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import { Loader } from "../Loader";
import styles from "./IconButton.module.css";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  loading?: boolean;
}

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={styles.icon}
    focusable="false"
  >
    <path
      d="M17.5 15.8 21 19.3l-1.7 1.7-3.5-3.5a7.5 7.5 0 1 1 1.7-1.7Zm-6.5.2a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4Z"
      fill="currentColor"
    />
  </svg>
);

export const IconButton = ({
  children,
  loading = false,
  disabled,
  className,
  type = "button",
  ...props
}: IconButtonProps) => {
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
        },
        className,
      )}
    >
      {loading ? <Loader size="s" tone="light" aria-hidden="true" /> : children ?? <SearchIcon />}
    </button>
  );
};
