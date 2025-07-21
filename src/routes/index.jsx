import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./rootRoutes";

const router = createRouter({ routeTree });

export default router;
