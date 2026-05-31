import {
  GITHUB_API_BASE_URL,
  GITHUB_API_HEADERS,
} from "app/constants/github";
import type {
  RepositoriesRequest,
  RepositoriesResponse,
  RepositoryBranchesRequest,
  RepositoryBranchesResponse,
  RepositoryCommitActivityRequest,
  RepositoryCommitActivityResponse,
  RepositoryContributorsRequest,
  RepositoryContributorsResponse,
  RepositoryRequest,
  RepositoryResponse,
} from "models/github/api";

const createGithubHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  return {
    ...GITHUB_API_HEADERS,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

interface RequestOptions {
  acceptPending?: boolean;
}

const request = async <T>(path: string, options?: RequestOptions) => {
  const response = await fetch(`${GITHUB_API_BASE_URL}${path}`, {
    headers: createGithubHeaders(),
  });

  if (options?.acceptPending && response.status === 202) {
    return null as T;
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Ресурс не найден");
    }

    throw new Error(`GitHub API error: ${response.status}`);
  }

  return (await response.json()) as T;
};

export const getRepositories = ({ username }: RepositoriesRequest) =>
  request<RepositoriesResponse>(`/users/${username}/repos?per_page=100`);

export const getRepository = ({ owner, repo }: RepositoryRequest) =>
  request<RepositoryResponse>(`/repos/${owner}/${repo}`);

export const getRepositoryBranches = ({
  owner,
  repo,
}: RepositoryBranchesRequest) =>
  request<RepositoryBranchesResponse>(`/repos/${owner}/${repo}/branches`);

export const getRepositoryCommitActivity = ({
  owner,
  repo,
}: RepositoryCommitActivityRequest) =>
  request<RepositoryCommitActivityResponse>(
    `/repos/${owner}/${repo}/stats/commit_activity`,
    {
      acceptPending: true,
    },
  );

export const getRepositoryContributors = ({
  owner,
  repo,
}: RepositoryContributorsRequest) =>
  request<RepositoryContributorsResponse>(`/repos/${owner}/${repo}/contributors`);
