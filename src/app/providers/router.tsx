import { RouterProvider } from "@tanstack/react-router";

import { router } from "./routerTree";

export const AppRouterProvider = () => <RouterProvider router={router} />;
