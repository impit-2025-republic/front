import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EventCard } from "../../components/EventCardSmall";
import { useGetEventsUpcoming } from "../../api/endpoints/b8st-api";

export const Route = createLazyFileRoute("/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [screen, setScreen] = useState("today");
  const {data:upcoming} = useGetEventsUpcoming()
  return (
    <div className="flex flex-col gap-6 w-full flex-1 text-white">
      <p className="text-[32px]">Уведомления</p>
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-[#26282C] flex flex-row flex-1 w-full gap-1 p-1 rounded-2xl">
          <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "today" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("today")}
          >
            <p
              className={`text-sm  ${screen === "today" ? "text-white" : " text-[#757575]"}`}
            >
              Сегодня
            </p>
          </div>
          <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "tomorrow" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("tomorrow")}
          >
            <p
              className={`text-sm  ${screen === "tomorrow" ? "text-white" : " text-[#757575]"}`}
            >
              Завтра
            </p>
          </div>
          <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "week" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("week")}
          >
            <p
              className={`text-sm  ${screen === "week" ? "text-white" : " text-[#757575]"}`}
            >
              Неделя
            </p>
          </div>
          <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "month" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("month")}
          >
            <p
              className={`text-sm  ${screen === "month" ? "text-white" : " text-[#757575]"}`}
            >
              Месяц
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
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
