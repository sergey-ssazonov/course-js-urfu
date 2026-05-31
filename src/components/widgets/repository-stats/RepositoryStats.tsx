import type { GithubRepositoryDTO } from "models/github/api";

import styles from "./RepositoryStats.module.css";

interface RepositoryStatsProps {
  repository: Pick<
    GithubRepositoryDTO,
    "language" | "stargazers_count" | "forks_count" | "watchers_count" | "open_issues_count"
  >;
  compact?: boolean;
}

export const RepositoryStats = ({
  repository,
  compact = false,
}: RepositoryStatsProps) => {
  const items = [
    {
      label: "Language",
      value: repository.language ?? "Not set",
    },
    {
      label: "Stars",
      value: repository.stargazers_count,
    },
    {
      label: "Forks",
      value: repository.forks_count,
    },
    {
      label: "Watchers",
      value: repository.watchers_count,
    },
    {
      label: "Issues",
      value: repository.open_issues_count,
    },
  ];

  return (
    <dl className={compact ? styles.compactGrid : styles.grid}>
      {items.map((item) => (
        <div key={item.label} className={styles.item}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
};
