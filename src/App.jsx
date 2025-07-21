import { RouterProvider } from "@tanstack/react-router";

import router from "./routes";

// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"; uncomment this for debugging routes

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <TanStackRouterDevtools router={router} initialIsOpen={false} /> */}
    </>
  );
}

export default App;
