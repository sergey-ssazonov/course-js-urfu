import { Link, useParams } from "@tanstack/react-router";

import { RepositoryContributions } from "components/widgets/repository-contributions/RepositoryContributions";
import { RepositoryContributors } from "components/widgets/repository-contributors/RepositoryContributors";
import { useRepositoryBranchesQuery, useRepositoryQuery } from "hooks/useRepositoryQuery";
import { formatDate } from "utils/formatDate";

import styles from "./RepositoryPage.module.css";

const StarIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.metricIcon}>
    <path
      d="m10 1.6 2.47 5 5.53.8-4 3.9.95 5.5L10 14.2 5.05 16.8 6 11.3l-4-3.9 5.53-.8L10 1.6Z"
      fill="currentColor"
    />
  </svg>
);

const WatchersIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.metricIcon}>
    <path
      d="M10 4.5c4.6 0 7.9 4.4 8.7 5.5-.8 1.1-4.1 5.5-8.7 5.5S2.1 11.1 1.3 10c.8-1.1 4.1-5.5 8.7-5.5Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
      fill="currentColor"
    />
  </svg>
);

const ForksIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.metricIcon}>
    <path
      d="M6 3.5a2.5 2.5 0 1 1-1 4.8V9c0 1.7 1.3 3 3 3h1V8.3a2.5 2.5 0 1 1 2 0v3.7h1c1.7 0 3-1.3 3-3v-.7a2.5 2.5 0 1 1 1 0V9a5 5 0 0 1-5 5h-1v1.7a2.5 2.5 0 1 1-2 0V14H8a5 5 0 0 1-5-5v-.7A2.5 2.5 0 0 1 6 3.5Z"
      fill="currentColor"
    />
  </svg>
);

const IssuesIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.metricIcon}>
    <path
      d="M10 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm1 11.5H9v2h2v-2Zm0-8H9v6h2V5Z"
      fill="currentColor"
    />
  </svg>
);

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
  const metrics = [
    {
      label: "Stars",
      value: repository.stargazers_count,
      icon: <StarIcon />,
    },
    {
      label: "Watchers",
      value: repository.watchers_count,
      icon: <WatchersIcon />,
    },
    {
      label: "Forks",
      value: repository.forks_count,
      icon: <ForksIcon />,
    },
    {
      label: "Open issues",
      value: repository.open_issues_count,
      icon: <IssuesIcon />,
    },
  ];

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

      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metric}>
            {metric.icon}
            <span className={styles.metricValue}>{metric.value}</span>
            <span className={styles.metricLabel}>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Description</h2>
        <p>{repository.description ?? "Repository description is not available."}</p>
        <div className={styles.metaList}>
          <span>{repository.language ?? "Language not specified"}</span>
          <span>{repository.private ? "Private" : "Public"}</span>
          <span>Updated {formatDate(repository.updated_at)}</span>
          <a href={repository.html_url} target="_blank" rel="noreferrer">
            Open on GitHub
          </a>
        </div>
      </div>

      <RepositoryContributions owner={owner} repo={repo} />

      <RepositoryContributors owner={owner} repo={repo} />

      <div className={styles.section}>
        <h2>Branches List</h2>
        <div className={styles.branches}>
          {branches && branches.length > 0 ? (
            branches.slice(0, 8).map((branch) => (
              <div key={branch.name} className={styles.branchRow}>
                <span>{branch.name}</span>
                {branch.protected ? (
                  <>
                    <span className={styles.branchDivider} aria-hidden="true" />
                    <span className={styles.branchBadge}>Protected</span>
                  </>
                ) : null}
              </div>
            ))
          ) : (
            <p>Branches are not available.</p>
          )}
        </div>
      </div>
    </section>
  );
};
