import { useMemo, useState } from "react";

import { GITHUB_USERNAME } from "app/constants/github";
import { IconButton } from "components/ui/IconButton";
import { Input } from "components/ui/Input";
import { RepositoryCard } from "components/widgets/repository-card/RepositoryCard";
import { useRepositoriesQuery } from "hooks/useRepositoriesQuery";

import styles from "./RepositoriesPage.module.css";

export const RepositoriesPage = () => {
  const { data, isLoading, isError, error } = useRepositoriesQuery();
  const [searchValue, setSearchValue] = useState("");

  const filteredRepositories = useMemo(() => {
    if (!data) {
      return [];
    }

    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return data;
    }

    return data.filter((repository) => {
      const searchableText = [
        repository.name,
        repository.description ?? "",
        repository.language ?? "",
        repository.owner.login,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [data, searchValue]);

  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.searchRow}>
          <Input
            aria-label="Search repositories"
            placeholder="Enter repository name"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            fullWidth
          />
          <IconButton
            aria-label="Search repositories"
            onPress={() => undefined}
          />
        </div>

        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Repositories</h2>
          <p className={styles.panelSubtitle}>@{GITHUB_USERNAME}</p>
        </div>

        {isLoading ? (
          <div className={styles.stateBox}>Loading repositories...</div>
        ) : null}

        {isError ? (
          <div className={styles.stateBox}>
            {error instanceof Error ? error.message : "Failed to load repositories"}
          </div>
        ) : null}

        {!isLoading && !isError && data?.length === 0 ? (
          <div className={styles.stateBox}>
            No repositories found for user `{GITHUB_USERNAME}`.
          </div>
        ) : null}

        {!isLoading && !isError && data && filteredRepositories.length === 0 ? (
          <div className={styles.stateBox}>
            Nothing found for `{searchValue}`.
          </div>
        ) : null}

        {!isLoading && !isError && filteredRepositories.length > 0 ? (
          <div className={styles.list}>
            {filteredRepositories.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
};
