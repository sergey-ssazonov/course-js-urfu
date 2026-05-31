import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

import { RepositoriesPage } from "components/pages/repositories-page/RepositoriesPage";
import { RepositoryPage } from "components/pages/repository-page/RepositoryPage";
import { RootLayout } from "components/pages/root-layout/RootLayout";
import { UiKitPage } from "components/pages/ui-kit-page/UiKitPage";
import "app/styles/app-shell.css";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RepositoriesPage,
});

const repositoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/repos/$owner/$repo",
  component: RepositoryPage,
});

const uiKitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ui-kit",
  component: UiKitPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  repositoryRoute,
  uiKitRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
