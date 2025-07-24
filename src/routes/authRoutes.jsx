import { createRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { rootRoute } from "./rootRoutes";
import { useSubdomain } from "@/hooks/useSubdomain";
import NotFound from "@/pages/auth/NotFound";
import ClinicSetupSuccess from "@/pages/auth/RegisterClinic/ClinicSetupSuccess";
import RegisterClinic from "@/pages/auth/RegisterClinic/index";
import { Fallback, RouteError } from "@/pages/auth/RouteError";
import VerifyOtp from "@/pages/auth/VerifyOtp";

const LandingPage = lazy(() => import("@/pages/auth/LandingPage"));
const Login = lazy(() => import("@/pages/auth/Login"));

export const landingPageRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  errorComponent: RouteError,
  component: function LandingRouteComponent() {
    const { isMainDomain } = useSubdomain();
    const Component = isMainDomain ? LandingPage : Login;
    return (
      <Suspense fallback={<Fallback />}>
        <Component />
      </Suspense>
    );
  },
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
