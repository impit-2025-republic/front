import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "../components/NavBar";
import { Button } from "../components/catalyst/button";
import { initData } from "@telegram-apps/sdk-react";
import { useLogin } from "../hooks/hooks";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { mutate } = useLogin();
  const initDataRaw = initData.raw();
  // console.log(initDataRaw)
  const onClick = () => mutate(initDataRaw);

  if (localStorage.getItem("token") === null) {
    return (
      <div>
        <Button children="Войти" onClick={() => onClick()} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        className={`mx-auto flex flex-col px-4 bg-[#191B1F] items-center min-h-screen pb-24`}
      >
        <div className="max-w-[390px] px-4">
          <Outlet />
        </div>
        <Navbar />
      </div>
    </React.Fragment>
  );
}
