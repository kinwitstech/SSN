import { createRoute } from "@tanstack/react-router";
import { lazy } from "react";

import { rootRoute } from "./rootRoutes";
const Layout = lazy(() => import("../pages/superAdmin/Layout.jsx"));
const Dashboard = lazy(() => import("../pages/superAdmin/Dashboard.jsx"));

// App layout after authentication
export const appLayoutRoute = createRoute({
  path: "/super-admin",
  getParentRoute: () => rootRoute,
  component: Layout,
});

export const dashboardRoute = createRoute({
  path: "/dashboard",
  getParentRoute: () => appLayoutRoute,
  component: Dashboard,
});

appLayoutRoute.addChildren([dashboardRoute]);
