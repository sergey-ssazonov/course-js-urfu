import type { ButtonHTMLAttributes } from "react";
import cn from "classnames";

import { Loader } from "../../ui/Loader";
import styles from "./Card.module.css";

export interface CardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  repositoryName: string;
  organizationName: string;
  stars: number;
  updatedAt: string;
  avatarUrl?: string;
  loading?: boolean;
}

const StarIcon = () => (
  <svg
    viewBox="0 0 14 14"
    aria-hidden="true"
    className={styles.star}
    focusable="false"
  >
    <path
      d="m7 0 2.16 4.37L14 5.08l-3.5 3.42.83 4.84L7 11.08l-4.33 2.26.83-4.84L0 5.08l4.84-.71L7 0Z"
      fill="currentColor"
    />
  </svg>
);

export const Card = ({
  repositoryName,
  organizationName,
  stars,
  updatedAt,
  avatarUrl,
  loading = false,
  disabled,
  className,
  type = "button",
  ...props
}: CardProps) => {
  const isDisabled = disabled || loading;
  const firstLetter = repositoryName.charAt(0).toUpperCase() || "G";

  return (
    <button
      {...props}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        styles.card,
        {
          [styles.loading]: loading,
        },
        className,
      )}
    >
      <span className={styles.avatarSlot} aria-hidden="true">
        {loading ? (
          <Loader size="m" tone="muted" aria-hidden="true" />
        ) : avatarUrl ? (
          <img className={styles.avatar} src={avatarUrl} alt="" />
        ) : (
          firstLetter
        )}
      </span>

      <span className={styles.body}>
        {loading ? (
          <>
            <span className={cn(styles.skeleton, styles.titleSkeleton)} />
            <span className={cn(styles.skeleton, styles.orgSkeleton)} />
            <span className={cn(styles.skeleton, styles.metaSkeleton)} />
          </>
        ) : (
          <>
            <span className={styles.title}>{repositoryName}</span>
            <span className={styles.organization}>{organizationName}</span>
            <span className={styles.meta}>
              <StarIcon />
              <span>{stars}</span>
              <span>Updated {updatedAt}</span>
            </span>
          </>
        )}
      </span>
    </button>
  );
};
