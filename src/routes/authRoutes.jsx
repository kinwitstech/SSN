import { createRoute } from "@tanstack/react-router";
import LandingPage from "../pages/auth/LandingPage";
import Login from "../pages/auth/Login";
import RegisterClinic from "../pages/auth/RegisterClinic";
import VerifyOtp from "../pages/auth/VerifyOtp";
import NotFound from "../pages/auth/NotFound";
import { rootRoute } from "./rootRoutes";

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

export const notFoundRoute = createRoute({
  path: "*",
  getParentRoute: () => rootRoute,
  component: NotFound,
});
