import { useQuery } from "@tanstack/react-query";

import {
  getRepository,
  getRepositoryBranches,
  getRepositoryCommitActivity,
  getRepositoryContributors,
} from "api/github";

export const useRepositoryQuery = (owner: string, repo: string) =>
  useQuery({
    queryKey: ["repository", owner, repo],
    queryFn: () => getRepository({ owner, repo }),
    enabled: owner.trim().length > 0 && repo.trim().length > 0,
  });

export const useRepositoryBranchesQuery = (owner: string, repo: string) =>
  useQuery({
    queryKey: ["repository-branches", owner, repo],
    queryFn: () => getRepositoryBranches({ owner, repo }),
    enabled: owner.trim().length > 0 && repo.trim().length > 0,
  });

export const useRepositoryCommitActivityQuery = (owner: string, repo: string) =>
  useQuery({
    queryKey: ["repository-commit-activity", owner, repo],
    queryFn: () => getRepositoryCommitActivity({ owner, repo }),
    enabled: owner.trim().length > 0 && repo.trim().length > 0,
    // refetchInterval: (query) => (query.state.data === null ? 3000 : false),
  });

export const useRepositoryContributorsQuery = (owner: string, repo: string) =>
  useQuery({
    queryKey: ["repository-contributors", owner, repo],
    queryFn: () => getRepositoryContributors({ owner, repo }),
    enabled: owner.trim().length > 0 && repo.trim().length > 0,
  });
