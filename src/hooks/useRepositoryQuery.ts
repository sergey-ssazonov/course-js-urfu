import { useQuery } from "@tanstack/react-query";

import { getRepository, getRepositoryBranches } from "api/github";

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
