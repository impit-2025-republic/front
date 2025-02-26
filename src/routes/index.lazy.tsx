import { createLazyFileRoute } from "@tanstack/react-router";
import { EventCard } from "../components/EventCardSmall";
import { Badge } from "../components/catalyst/badge";
import money from "/money.png";
import { useState } from "react";
import {  useGetEventsUpcoming, useGetUsersMe } from "../api/endpoints/b8st-api";
// import { initData } from "@telegram-apps/sdk-react";
export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [screen, setScreen] = useState("close")
  const {data} = useGetUsersMe()
  const {data:upcoming} = useGetEventsUpcoming()
  
  return (
    <div className="flex flex-col gap-6 text-white">
      <div className="flex flex-row items-center justify-between">
        <p className="text-[32px] text-white">Главная</p>
        <Badge
          className="!bg-[#3F3F46] px-3 py-1 !rounded-full"
          children={
            <div className="flex flex-row items-center gap-2">
              <img src={money} width={14} height={16} />
              <p className="text-[11px] font-normal">{data?.coin}</p>
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
        <div className="flex flex-col gap-4">
          {
            upcoming?.events?.map((data:any,index:number)=>{
              return(
                <EventCard key={index} data={data}/>
              )
            })
          }
        </div>

      </div>
    </div>
  );
}
