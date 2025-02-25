import { createLazyFileRoute } from "@tanstack/react-router";
import { EventCard } from "../components/EventCard";
import { Badge } from "../components/catalyst/badge";
import money from "/money.png";
import { useState } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useLogin } from "../hooks/hooks";
// import { initData } from "@telegram-apps/sdk-react";
export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [screen, setScreen] = useState("close")
  const {mutate} = useLogin()
  const consts = {
    title: "label",
    desc: "asd7",
    money: "5",
    achieve: "",
    status: "awaiting",
    date: "12.02.2025",
  };
  
  const {initDataRaw} = retrieveLaunchParams()
  console.log(initDataRaw)
  const tma = JSON.stringify(initDataRaw, null, 4)
  console.log(tma)
  const onClick =()=>mutate({
    tma
  })
  return (
    <div className="flex flex-col gap-6 text-white">
      <div className="flex flex-row items-center justify-between">
        <p className="text-[32px] text-white">Главная</p>
        <Badge
        onClick={()=>onClick()}
          className="!bg-[#3F3F46] px-3 py-1 !rounded-full"
          children={
            <div className="flex flex-row items-center">
              <p className="text-[11px] font-normal">{5}</p>
              <img src={money} width={14} height={16} />
            </div>
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-[#26282C] flex flex-row flex-1 gap-1 p-1 rounded-2xl">
          <div className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === 'close' ? "bg-[#3F3F46]":''}`} onClick={()=>setScreen("close")}>
            <p className={`text-sm  ${screen === 'close' ? "text-white":' text-[#757575]'}`}>Ближайшие</p>
          </div>
          <div className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === 'old' ? "bg-[#3F3F46]":''}`} onClick={()=>setScreen("old")}>
            <p className={`text-sm  ${screen === 'old' ? "text-white":' text-[#757575]'}`}>Старые</p>
          </div>
        </div>
        <div className="flex flex-row overflow-scroll gap-4">

      <EventCard data={consts} />
      <EventCard data={consts} />
      <EventCard data={consts} />
        </div>

      </div>
    </div>
  );
}
