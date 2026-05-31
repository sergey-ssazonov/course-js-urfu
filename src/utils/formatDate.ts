const shortDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "short",
});

const longDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const formatShortDate = (date: string) =>
  shortDateFormatter.format(new Date(date));

export const formatDate = (date: string) =>
  longDateFormatter.format(new Date(date));
