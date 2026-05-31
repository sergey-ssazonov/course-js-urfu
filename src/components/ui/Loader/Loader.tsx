import type { HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Loader.module.css";

export interface LoaderProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "s" | "m" | "l";
  tone?: "accent" | "light" | "muted";
}

export const Loader = ({
  size = "m",
  tone = "accent",
  className,
  ...props
}: LoaderProps) => (
  <span
    {...props}
    className={cn(styles.loader, styles[size], styles[tone], className)}
  />
);
