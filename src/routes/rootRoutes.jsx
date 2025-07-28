import { createRootRoute } from "@tanstack/react-router";

import {
  landingPageRoute,
  loginRoute,
  notFoundRoute,
  registerClinicRoute,
  registerClinicSuccessRoute,
  verifyOtp,
  doctorDetailsRoute,
  doctorRegisterSuccessRoute,
  patientDetailsRoute,
  patientRegisterSuccessRoute,
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
  registerClinicSuccessRoute,
  doctorDetailsRoute,
  doctorRegisterSuccessRoute,
  patientDetailsRoute,
  patientRegisterSuccessRoute,
]);
