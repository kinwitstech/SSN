import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./rootRoutes";
import LandingPage from "../pages/auth/LandingPage";
import Login from "../pages/auth/Login";
import NotFound from "../pages/auth/NotFound";
import ClinicSetupSuccess from "../pages/auth/RegisterClinic/ClinicSetupSuccess";
import RegisterClinic from "../pages/auth/RegisterClinic/index";
import VerifyOtp from "../pages/auth/VerifyOtp";

export const landingPageRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: LandingPage,
});

export const loginRoute = createRoute({
  path: "/login",
  getParentRoute: () => rootRoute,
  component: Login,
});

export const registerClinicRoute = createRoute({
  path: "/registerClinic",
  getParentRoute: () => rootRoute,
  component: RegisterClinic,
});

export const verifyOtp = createRoute({
  path: "/verify-otp",
  getParentRoute: () => rootRoute,
  component: VerifyOtp,
});

export const registerClinicSuccessRoute = createRoute({
  path: "/registerClinic/success",
  getParentRoute: () => rootRoute,
  component: ClinicSetupSuccess,
});

export const notFoundRoute = createRoute({
  path: "*",
  getParentRoute: () => rootRoute,
  component: NotFound,
});
