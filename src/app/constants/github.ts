export const GITHUB_USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME ?? "sergey-ssazonov";

export const GITHUB_API_BASE_URL = "https://api.github.com";

export const GITHUB_API_HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
} as const;
