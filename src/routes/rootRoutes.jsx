import { createRootRoute } from "@tanstack/react-router";
import {
  landingPageRoute,
  loginRoute,
  notFoundRoute,
  registerClinicRoute,
  verifyOtp,
} from "./authRoutes";
import { appLayoutRoute } from "./superAdminRoutes";

// Root route: top-level, layout less wrapper
export const rootRoute = createRootRoute({});

export const routeTree = rootRoute.addChildren([
  landingPageRoute,
  loginRoute,
  registerClinicRoute,
  verifyOtp,
  appLayoutRoute,
  notFoundRoute,
]);
