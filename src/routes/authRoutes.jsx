import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./rootRoutes";
import LandingPage from "../pages/auth/LandingPage";
import Login from "../pages/auth/Login";
import NotFound from "../pages/auth/NotFound";
import ClinicSetupSuccess from "../pages/auth/RegisterClinic/ClinicSetupSuccess";
import RegisterClinic from "../pages/auth/RegisterClinic/index";
import DoctorDetails from "../pages/auth/RegisterDoctor/DoctorDetails";
import DoctorRegisterSuccess from "../pages/auth/RegisterDoctor/DoctorRegisterSuccess";
import VerifyOtp from "../pages/auth/VerifyOtp";
import PatientDetails from "@/pages/auth/RegisterPatient/PatientDetails";
import PatientRegisterSuccess from "@/pages/auth/RegisterPatient/PatientRegisterSuccess";

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

export const doctorDetailsRoute = createRoute({
  path: "/register-doctor",
  getParentRoute: () => rootRoute,
  component: DoctorDetails,
});

export const doctorRegisterSuccessRoute = createRoute({
  path: "/register-doctor/success",
  getParentRoute: () => rootRoute,
  component: DoctorRegisterSuccess,
});

export const patientDetailsRoute = createRoute({
  path: "/register-patient",
  getParentRoute: () => rootRoute,
  component: PatientDetails,
});

export const patientRegisterSuccessRoute = createRoute({
  path: "/register-patient/success",
  getParentRoute: () => rootRoute,
  component: PatientRegisterSuccess,
});

export const notFoundRoute = createRoute({
  path: "*",
  getParentRoute: () => rootRoute,
  component: NotFound,
});
