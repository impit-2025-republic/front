import { createLazyFileRoute } from "@tanstack/react-router";
import money from "/money.png";
import { useState } from "react";
import { Transaction } from "../../components/transaction";
export const Route = createLazyFileRoute("/wallet/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [screen, setScreen] = useState("history");
  return (
    <div className="text-white flex flex-col gap-6">
      <p className="text-3xl">Кошелек</p>
      <div className="bg-[#26282C] flex flex-row gap-2 py-4 items-center justify-center">
        <img src={money} width={40} height={48} />
        <p className="text-5xl font-medium">100</p>
      </div>
      <div className="flex flex-col">
        <div className="bg-[#26282C] flex flex-row flex-1 gap-1 p-1 rounded-2xl">
          <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "history" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("history")}
          >
            <p
              className={`text-sm tracking-[-3%] font-medium  ${screen === "history" ? "text-white" : " text-[#757575]"}`}
            >
              История транзакций
            </p>
          </div>
          <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "shop" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("shop")}
          >
            <p
              className={`text-sm tracking-[-3%] font-medium ${screen === "shop" ? "text-white" : " text-[#757575]"}`}
            >
              Магазин
            </p>
          </div>
        </div>

        <Transaction />
      </div>
    </div>
  );
}
