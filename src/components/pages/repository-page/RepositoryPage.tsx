import { Link, useParams } from "@tanstack/react-router";

import { useRepositoryBranchesQuery, useRepositoryQuery } from "hooks/useRepositoryQuery";
import { formatDate } from "utils/formatDate";

import styles from "./RepositoryPage.module.css";

export const RepositoryPage = () => {
  const { owner, repo } = useParams({ from: "/repos/$owner/$repo" });
  const {
    data: repository,
    isLoading,
    isError,
    error,
  } = useRepositoryQuery(owner, repo);
  const { data: branches } = useRepositoryBranchesQuery(owner, repo);

  if (isLoading) {
    return <section className={styles.panel}>Loading repository...</section>;
  }

  if (isError) {
    return (
      <section className={styles.panel}>
        {error instanceof Error ? error.message : "Failed to load repository"}
      </section>
    );
  }

  if (!repository) {
    return <section className={styles.panel}>Repository not found.</section>;
  }

  const repositoryInitial = repository.name.charAt(0).toUpperCase();

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ←
        </Link>

        <div className={styles.repositoryAvatar}>{repositoryInitial}</div>

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>{repository.name}</h1>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Description</h2>
        <div className={styles.divider} />
        <p>{repository.description ?? "Repository description is not available."}</p>
        <div className={styles.metaList}>
          <p>
            Visibility:{" "}
            <strong>{repository.private ? "private" : "public"}</strong>
          </p>
          <p>
            Language: <strong>{repository.language ?? "Not set"}</strong>
          </p>
          <p>
            Stars: <strong>{repository.stargazers_count}</strong>
          </p>
          <p>
            Forks: <strong>{repository.forks_count}</strong>
          </p>
          <p>
            Watchers: <strong>{repository.watchers_count}</strong>
          </p>
          <p>
            Open issues: <strong>{repository.open_issues_count}</strong>
          </p>
          <p>
            Full name: <strong>{repository.full_name}</strong>
          </p>
          <p>
            GitHub:{" "}
            <a href={repository.html_url} target="_blank" rel="noreferrer">
              {repository.html_url}
            </a>
          </p>
          <p>
            Created: <strong>{formatDate(repository.created_at)}</strong>
          </p>
          <p>
            Updated: <strong>{formatDate(repository.updated_at)}</strong>
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Branches List</h2>
        <div className={styles.divider} />
        <div className={styles.branches}>
          {branches && branches.length > 0 ? (
            branches.slice(0, 8).map((branch) => (
              <p key={branch.name}>{branch.name}</p>
            ))
          ) : (
            <p>Branches are not available.</p>
          )}
        </div>
      </div>
    </section>
  );
};
