import { createRoute } from "@tanstack/react-router";
import Dashboard from "../pages/superAdmin/Dashboard";
import { rootRoute } from "./rootRoutes";

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
