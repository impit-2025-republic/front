import { createLazyFileRoute } from "@tanstack/react-router";
import { EventCard } from "../components/EventCardSmall";
import { Badge } from "../components/catalyst/badge";
import money from "/money.png";
import { useState } from "react";
import {
  useGetEventsUpcoming,
  useGetUsersMe,
} from "../api/endpoints/b8st-api";
import CollectionCardLayout from "../components/CollectionCardLayout";
// import { initData } from "@telegram-apps/sdk-react";
export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [screen, setScreen] = useState<'today' | 'tomorrow' | 'month' | 'week'>(
    'today'
  );
  const { data } = useGetUsersMe();
  const { data: upcoming } = useGetEventsUpcoming({ period: screen });
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
          <CollectionCardLayout/>
          {upcoming?.events?.map((data: any, index: number) => {
            return <EventCard key={index} data={data} />;
          })}
        </div>
      </div>
    </div>
  );
}
