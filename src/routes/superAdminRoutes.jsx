import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./rootRoutes";
import Dashboard from "../pages/superAdmin/Dashboard";

// App layout after authentication
export const appLayoutRoute = createRoute({
  path: "/superAdmin",
  getParentRoute: () => rootRoute,
  component: Dashboard,
});

// Protected routes
// export const dashboardRoute = createRoute({
//   path: "/dashboard",
//   getParentRoute: () => appLayoutRoute,
//   component: Dashboard,
// });

// appLayoutRoute.addChildren([dashboardRoute]);
