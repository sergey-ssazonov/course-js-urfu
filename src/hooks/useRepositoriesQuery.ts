import { useQuery } from "@tanstack/react-query";

import { getRepositories } from "api/github";
import { GITHUB_USERNAME } from "app/constants/github";

export const useRepositoriesQuery = () =>
  useQuery({
    queryKey: ["repositories", GITHUB_USERNAME],
    queryFn: () => getRepositories({ username: GITHUB_USERNAME }),
  });
