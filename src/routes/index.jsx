import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./rootRoutes";
import NotFound from "@/pages/auth/NotFound";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

export default router;
