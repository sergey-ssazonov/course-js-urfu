import { useMemo } from "react";
import cn from "classnames";

import { Loader } from "components/ui/Loader";
import { useRepositoryCommitActivityQuery } from "hooks/useRepositoryQuery";

import styles from "./RepositoryContributions.module.css";

interface RepositoryContributionsProps {
  owner: string;
  repo: string;
}

type ContributionLevel = "none" | "low" | "medium" | "high";
const CONTRIBUTION_WEEKS = 52;

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const getContributionLevel = (count: number): ContributionLevel => {
  if (count === 0) {
    return "none";
  }

  if (count === 1) {
    return "low";
  }

  if (count <= 5) {
    return "medium";
  }

  return "high";
};

interface ChartData {
  weeks: {
    key: string | number;
    weekTimestamp: number;
    days: {
      key: string;
      count: number;
      title: string;
      level: ContributionLevel;
    }[];
  }[];
  monthLabels: string[];
  totalCommits: number;
  hasActivity: boolean;
}

interface ActivityWeekLike {
  week: number;
  days: number[];
}

const buildChart = (
  weeksSource: ActivityWeekLike[],
  titleFactory: (count: number, date: Date) => string,
): ChartData => {
  const weeks = weeksSource.map((week) => {
    return {
      key: week.week,
      weekTimestamp: week.week,
      days: week.days.map((count, dayIndex) => {
        const date = new Date(week.week * 1000);
        date.setUTCDate(date.getUTCDate() + dayIndex);

        return {
          key: `${week.week}-${dayIndex}`,
          count,
          title: titleFactory(count, date),
          level: getContributionLevel(count),
        };
      }),
    };
  });

  const monthLabels = weeks.map((week, index) => {
    const label = monthFormatter.format(new Date(week.weekTimestamp * 1000));

    if (index === 0) {
      return label;
    }

    const previousLabel = monthFormatter.format(
      new Date(weeks[index - 1].weekTimestamp * 1000),
    );

    return label === previousLabel ? "" : label;
  });

  return {
    weeks,
    monthLabels,
    totalCommits: weeks.reduce(
      (sum, week) => sum + week.days.reduce((acc, day) => acc + day.count, 0),
      0,
    ),
    hasActivity: weeks.some((week) => week.days.some((day) => day.count > 0)),
  };
};

const createPlaceholderWeeks = (): ActivityWeekLike[] => {
  const today = new Date();
  const currentSunday = new Date(today);
  currentSunday.setUTCDate(currentSunday.getUTCDate() - currentSunday.getUTCDay());
  currentSunday.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: CONTRIBUTION_WEEKS }, (_, index) => {
    const weekDate = new Date(currentSunday);
    weekDate.setUTCDate(currentSunday.getUTCDate() - (CONTRIBUTION_WEEKS - 1 - index) * 7);

    return {
      week: Math.floor(weekDate.getTime() / 1000),
      days: Array.from({ length: 7 }, (_, dayIndex) => {
        const pattern = (index * 3 + dayIndex * 5) % 11;

        if (pattern < 4) {
          return 0;
        }

        if (pattern < 7) {
          return 1;
        }

        if (pattern < 10) {
          return 3;
        }

        return 6;
      }),
    };
  });
};

const placeholderChart = buildChart(createPlaceholderWeeks(), (count) =>
  count === 1 ? "1 example commit" : `${count} example commits`,
);

const renderChart = (chart: ChartData, isTemplate = false) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${chart.weeks.length}, minmax(0, 1fr))`,
  };

  return (
    <div className={styles.chart} aria-hidden={isTemplate}>
      <div className={styles.months} style={gridStyle}>
        {chart.monthLabels.map((label, index) => (
          <span key={`${label}-${index}`} className={styles.monthLabel}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.weeks} style={gridStyle}>
        {chart.weeks.map((week) => (
          <div key={week.key} className={styles.weekColumn}>
            {week.days.map((day) => (
              <span
                key={day.key}
                className={cn(
                  styles.cell,
                  styles[`cell${day.level}`],
                  isTemplate && styles.templateCell,
                )}
                title={day.title}
                aria-label={day.title}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const RepositoryContributions = ({
  owner,
  repo,
}: RepositoryContributionsProps) => {
  const { data, isLoading, isError, error } = useRepositoryCommitActivityQuery(owner, repo);

  const chart = useMemo(() => {
    if (!data) {
      return null;
    }

    return buildChart(
      data.slice(-CONTRIBUTION_WEEKS),
      (count, date) =>
        count === 1
          ? `1 commit on ${dayFormatter.format(date)}`
          : `${count} commits on ${dayFormatter.format(date)}`,
    );
  }, [data]);

  if (isLoading || data === null) {
    return (
      <section className={styles.section}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Contributions</h2>
        </div>
        {renderChart(placeholderChart, true)}
        <div className={styles.pendingState}>
          <p className={styles.state}>
           Сейчас график заполнен тестовыми данными. Пока GitHub собирает аналитику
          </p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Contributions</h2>
        <p className={styles.state}>
          {error instanceof Error
            ? error.message
            : "Failed to load contribution activity."}
        </p>
      </section>
    );
  }

  if (data === null) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Contributions</h2>
        <p className={styles.state}>
          GitHub is still preparing commit activity for this repository.
        </p>
      </section>
    );
  }

  if (!chart || chart.weeks.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.title}>Contributions</h2>
        <p className={styles.state}>No contribution activity available.</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Contributions</h2>
        <p className={styles.subtitle}>
          {chart.hasActivity
            ? `${chart.totalCommits} commits over the last year`
            : "No commits during the last year"}
        </p>
      </div>
      {renderChart(chart)}
    </section>
  );
};
