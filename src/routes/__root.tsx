import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/NavBar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className={`mx-auto flex flex-col px-4 bg-[#191B1F] items-center min-h-screen pb-24`}>
        <div className="w-[308px] px-4">

          <Outlet />
        </div>
        <Navbar />
      </div>
    </React.Fragment>
  );
}
