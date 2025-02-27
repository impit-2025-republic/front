import "./index.css";
// import {
//   retrieveLaunchParams,
// } from "@telegram-apps/sdk-react";
// import {mockTelegramEnv} from "@telegram-apps/bridge"
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import {init} from "./init"
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new router instance
const router = createRouter({ routeTree });

const queryClient = new QueryClient()
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
// mockTelegramEnv({ launchParams: { tgWebAppData: { id: 1 } } });

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  init()
  // const launchParams = retrieveLaunchParams()
  // console.log(launchParams)
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient} >

      <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
