import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Transaction } from "../../components/transaction";
import { WalletCard } from "../../components/Waillet";
import { useGetUsersMe } from "../../api/endpoints/b8st-api";
import { Shop } from "../../components/screens/shop";
export const Route = createLazyFileRoute("/wallet/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {data, isLoading} = useGetUsersMe();
  const [screen, setScreen] = useState("history");
  return (
    <div className="text-white flex flex-col gap-6">
      <p className="text-3xl">Кошелек</p>
      <WalletCard balance={isLoading ? 0 :( data?.coin ?  data?.coin :  0)}/>
      <div className="flex flex-col">
        <div className="bg-[#26282C] flex flex-row flex-1 gap-1 p-1 rounded-2xl">
          <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "history" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("history")}
          >
            <p
              className={`text-sm tracking-[-3%] font-medium  ${screen === "history" ? "text-white" : " text-[#757575]"}`}
            >
              История
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
          {/* <div
            className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "cart" ? "bg-[#3F3F46]" : ""}`}
            onClick={() => setScreen("cart")}
          >
            <p
              className={`text-sm tracking-[-3%] font-medium ${screen === "cart" ? "text-white" : " text-[#757575]"}`}
            >
              Корзина
            </p>
          </div> */}
        </div>
        {
          screen === "history" ? <Transaction />:<Shop />
          
        }
      </div>
    </div>
  );
}
