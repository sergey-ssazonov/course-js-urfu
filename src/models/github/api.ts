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
}

export interface RepositoriesRequest {
  username: string;
}

export interface RepositoryRequest {
  owner: string;
  repo: string;
}

export type RepositoryBranchesRequest = RepositoryRequest;

export type RepositoriesResponse = GithubRepositoryDTO[];

export type RepositoryResponse = GithubRepositoryDTO;

export type RepositoryBranchesResponse = GithubBranchDTO[];
