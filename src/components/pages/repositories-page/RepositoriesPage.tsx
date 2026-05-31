import { useDeferredValue, useMemo, useState } from "react";

import { GITHUB_USERNAME } from "app/constants/github";
import { IconButton } from "components/ui/IconButton";
import { Input } from "components/ui/Input";
import { MultiDropdown } from "components/ui/MultiDropdown";
import { RepositoryCard } from "components/widgets/repository-card/RepositoryCard";
import { useRepositoriesQuery } from "hooks/useRepositoriesQuery";

import styles from "./RepositoriesPage.module.css";
import { Link } from "@tanstack/react-router";
import { Button } from "components/ui/Button";

export const RepositoriesPage = () => {
  const { data, isLoading, isError, error } = useRepositoriesQuery();
  const [searchValue, setSearchValue] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const deferredSearchValue = useDeferredValue(searchValue);

  const languageOptions = useMemo(() => {
    if (!data) {
      return [];
    }

    return Array.from(
      new Set(
        data
          .map((repository) => repository.language)
          .filter((language): language is string => Boolean(language)),
      ),
    )
      .sort((left, right) => left.localeCompare(right))
      .map((language) => ({
        value: language,
        label: language,
      }));
  }, [data]);

  const filteredRepositories = useMemo(() => {
    if (!data) {
      return [];
    }

    const normalizedSearch = deferredSearchValue.trim().toLowerCase();
    const hasLanguageFilter = selectedLanguages.length > 0;

    return data.filter((repository) => {
      const matchesLanguage =
        !hasLanguageFilter ||
        (repository.language !== null &&
          selectedLanguages.includes(repository.language));

      const searchableText = [
        repository.name,
        repository.description ?? "",
        repository.language ?? "",
        repository.owner.login,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return matchesLanguage && matchesSearch;
    });
  }, [data, deferredSearchValue, selectedLanguages]);

  return (
    <main className={styles.page}>
      <Link to="/ui-kit">UI Kit</Link>
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
          <div>
            <h2 className={styles.panelTitle}>Repositories</h2>
            <p className={styles.panelSubtitle}>@{GITHUB_USERNAME}</p>
          </div>

          <div className={styles.dropdownWrap}>
            <MultiDropdown
              aria-label="Filter repositories by language"
              options={languageOptions}
              value={selectedLanguages}
              onChange={setSelectedLanguages}
              placeholder="Languages"
              disabled={languageOptions.length === 0}
            />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.stateBox}>Loading repositories...</div>
        ) : null}

        {isError ? (
          <div className={styles.stateBox}>
            {error instanceof Error
              ? error.message
              : "Failed to load repositories"}
          </div>
        ) : null}

        {!isLoading && !isError && data?.length === 0 ? (
          <div className={styles.stateBox}>
            No repositories found for user `{GITHUB_USERNAME}`.
          </div>
        ) : null}

        {!isLoading && !isError && data && filteredRepositories.length === 0 ? (
          <div className={styles.stateBox}>
            Ничего не нашлось, попробуйте поменять запрос или фильтр
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
