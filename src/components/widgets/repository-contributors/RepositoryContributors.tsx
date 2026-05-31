import { useRepositoryContributorsQuery } from "hooks/useRepositoryQuery";

import styles from "./RepositoryContributors.module.css";

interface RepositoryContributorsProps {
  owner: string;
  repo: string;
}

const getInitial = (login: string) => login.charAt(0).toUpperCase();

export const RepositoryContributors = ({
  owner,
  repo,
}: RepositoryContributorsProps) => {
  const { data, isLoading, isError, error } = useRepositoryContributorsQuery(owner, repo);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Contributors</h2>

      {isLoading ? <p className={styles.state}>Loading contributors...</p> : null}

      {isError ? (
        <p className={styles.state}>
          {error instanceof Error ? error.message : "Failed to load contributors."}
        </p>
      ) : null}

      {!isLoading && !isError && data?.length === 0 ? (
        <p className={styles.state}>No contributors available.</p>
      ) : null}

      {!isLoading && !isError && data && data.length > 0 ? (
        <div className={styles.list}>
          {data.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noreferrer"
              className={styles.avatarLink}
              title={`${contributor.login} • ${contributor.contributions} contributions`}
              aria-label={`${contributor.login}, ${contributor.contributions} contributions`}
            >
              <span className={styles.fallback} aria-hidden="true">
                {getInitial(contributor.login)}
              </span>
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className={styles.avatar}
              />
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
};
