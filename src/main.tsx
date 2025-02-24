import "./index.css";
import {
  init,
} from "@telegram-apps/sdk-react";
// import {mockTelegramEnv} from "@telegram-apps/bridge"
import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
init()
const { initDataRaw, initData } = retrieveLaunchParams();

console.log("data: " + initData, "Raw: " + initDataRaw);

// mockTelegramEnv({ launchParams: { tgWebAppData: { id: 1 } } });

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
