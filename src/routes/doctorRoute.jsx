// src/routes/doctorRoute.jsx
import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./rootRoutes"; //
import DoctorDetails from "../pages/auth/RegisterDoctor/DoctorDetails";

export const doctorDetailsRoute = createRoute({
  path: "/register-doctor",
  getParentRoute: () => rootRoute,
  component: DoctorDetails,
});
