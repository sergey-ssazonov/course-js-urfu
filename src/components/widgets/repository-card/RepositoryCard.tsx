import { Link } from "@tanstack/react-router";
import type { GithubRepositoryDTO } from "models/github/api";
import { formatShortDate } from "utils/formatDate";

import styles from "./RepositoryCard.module.css";

interface RepositoryCardProps {
  repository: GithubRepositoryDTO;
}

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const repositoryInitial = repository.name.charAt(0).toUpperCase();

  return (
    <Link
      to="/repos/$owner/$repo"
      params={{
        owner: repository.owner.login,
        repo: repository.name,
      }}
      className={styles.card}
    >
      <div className={styles.avatarWrap}>
        <div className={styles.avatarFallback}>{repositoryInitial}</div>
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>{repository.name}</h2>
          <span
            className={repository.private ? styles.badgePrivate : styles.badgePublic}
          >
            {repository.private ? "private" : "public"}
          </span>
        </div>

        <p className={styles.owner}>{repository.owner.login}</p>
        <p className={styles.description}>
          {repository.description ?? "Repository description is not available."}
        </p>

        <div className={styles.meta}>
          <span className={styles.language}>
            {repository.language ?? "No language"}
          </span>
          <span>★ {repository.stargazers_count}</span>
          <span>⑂ {repository.forks_count}</span>
          <span>Updated {formatShortDate(repository.updated_at)}</span>
        </div>
      </div>
    </Link>
  );
};
