import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/NavBar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="mx-auto flex flex-col px-4 items-center h-screen">
        <div className=" max-w-[390px] min-w-[308px]">

          <Outlet />
        </div>
        <Navbar />
      </div>
    </React.Fragment>
  );
}
