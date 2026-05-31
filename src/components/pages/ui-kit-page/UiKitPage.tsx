import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { Card } from "components/dummies/Card";
import { Button } from "components/ui/Button";
import { Checkbox } from "components/ui/Checkbox";
import { IconButton } from "components/ui/IconButton";
import { Input } from "components/ui/Input";
import { Loader } from "components/ui/Loader";
import {
  MultiDropdown,
  type MultiDropdownOption,
} from "components/ui/MultiDropdown";

import styles from "./UiKitPage.module.css";

const organizations: MultiDropdownOption[] = [
  { value: "org-1", label: "some-organization-name" },
  { value: "org-2", label: "git-repo-name" },
  { value: "org-3", label: "another-organization-name" },
  { value: "org-4", label: "one-more-organization" },
];

export const UiKitPage = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>([
    "org-2",
  ]);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [emailValue, setEmailValue] = useState("frontend@course-js.dev");

  return (
    <main className={styles.page}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <Link to="/" className={styles.backLink}>
            ← Back to repositories
          </Link>
          <h1 className={styles.title}>UI Kit</h1>
          <p className={styles.description}>
            Витрина самописных компонентов проекта с состояниями, которые можно
            задать кодом: `loading`, `disabled`, контролируемые значения и
            выбранные элементы.
          </p>
        </header>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Buttons</h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.itemLabel}>Primary Button</span>
              <div className={styles.stack}>
                <Button>Send</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.itemLabel}>Icon Button</span>
              <div className={styles.stack}>
                <IconButton aria-label="Search repositories" />
                <IconButton aria-label="Loading search" loading />
                <IconButton aria-label="Disabled search" disabled />
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.itemLabel}>Full Width</span>
              <Button fullWidth className={styles.fullWidth}>
                Continue
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Inputs & Selection</h2>
          </div>

          <div className={styles.grid}>
            <div className={styles.item}>
              <span className={styles.itemLabel}>Input</span>
              <div className={styles.column}>
                <Input
                  placeholder="Enter organization name"
                  value={organizationName}
                  onChange={(event) => setOrganizationName(event.target.value)}
                  fullWidth
                />
                <Input
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                  fullWidth
                />
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.itemLabel}>Input States</span>
              <div className={styles.column}>
                <Input value="syncing-repository" loading readOnly fullWidth />
                <Input value="git-repo-name" disabled readOnly fullWidth />
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.itemLabel}>Checkbox</span>
              <div className={styles.column}>
                <Checkbox
                  label="Выбрать репозиторий"
                  checked={checkboxValue}
                  onCheckedChange={setCheckboxValue}
                />
                <Checkbox label="Загрузка" loading />
                <Checkbox label="Недоступно" disabled defaultChecked />
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.itemLabel}>MultiDropdown</span>
              <div className={styles.column}>
                <MultiDropdown
                  options={organizations}
                  value={selectedOrganizations}
                  onChange={setSelectedOrganizations}
                  placeholder="Organizations"
                />
                <MultiDropdown
                  options={organizations}
                  defaultValue={["org-1", "org-3"]}
                  defaultOpen
                  placeholder="Open by default"
                />
                <MultiDropdown
                  options={organizations}
                  value={["org-2"]}
                  disabled
                  placeholder="Disabled"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Cards & Loaders</h2>
            <p className={styles.sectionDescription}>
              Контентные блоки, изображение, skeleton и индикаторы загрузки.
            </p>
          </div>

          <div className={styles.grid}>
            <div className={`${styles.item} ${styles.itemWide}`}>
              <span className={styles.itemLabel}>Card</span>
              <div className={styles.stack}>
                <Card
                  repositoryName="git-repo-name"
                  organizationName="git-user"
                  stars={123}
                  updatedAt="21 Jul"
                />
                <Card
                  repositoryName="very-long-repository-name-and-more"
                  organizationName="git-user"
                  stars={123}
                  updatedAt="21 Jul"
                  avatarUrl="https://placehold.co/80x80"
                />
                <Card
                  repositoryName="loading-repo"
                  organizationName="loading-user"
                  stars={0}
                  updatedAt="now"
                  loading
                />
              </div>
            </div>

            <div className={styles.item}>
              <span className={styles.itemLabel}>Loaders</span>
              <div className={styles.loaderRow}>
                <Loader size="l" />
                <Loader size="m" />
                <Loader size="s" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
