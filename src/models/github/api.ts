export interface GithubOwnerDTO {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface GithubRepositoryDTO {
  id: number;
  name: string;
  full_name: string;
  owner: GithubOwnerDTO;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
}

export interface GithubBranchDTO {
  name: string;
  protected: boolean;
}

export interface GithubCommitActivityWeekDTO {
  days: number[];
  total: number;
  week: number;
}

export interface GithubContributorDTO {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface RepositoriesRequest {
  username: string;
}

export interface RepositoryRequest {
  owner: string;
  repo: string;
}

export type RepositoryBranchesRequest = RepositoryRequest;

export type RepositoryCommitActivityRequest = RepositoryRequest;

export type RepositoryContributorsRequest = RepositoryRequest;

export type RepositoriesResponse = GithubRepositoryDTO[];

export type RepositoryResponse = GithubRepositoryDTO;

export type RepositoryBranchesResponse = GithubBranchDTO[];

export type RepositoryCommitActivityResponse = GithubCommitActivityWeekDTO[] | null;

export type RepositoryContributorsResponse = GithubContributorDTO[];
