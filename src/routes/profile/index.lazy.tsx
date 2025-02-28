import { createLazyFileRoute } from "@tanstack/react-router";
import { Avatar } from "../../components/catalyst/avatar";
import { useGetUsersMe, useGetUsersTop } from "../../api/endpoints/b8st-api";
import { Button } from "../../components/catalyst/button";
import { useState } from "react";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { BronzeChestCard } from "../../components/LastBoughtCard";
import CollectionCardLayout from "../../components/LastCollectionCardLayout";
import { OneEightyRing } from "react-svg-spinners";

export const Route = createLazyFileRoute("/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useGetUsersMe();
  const {data:ratingdata, isLoading:loadingbruh} = useGetUsersTop()
  const [screen, setScreen] = useState("events");
  if (isLoading)return<div className="w-full h-full flex items-center justify-center"><OneEightyRing width={100} height={100} color="#fff" /> </div>
  return (
    <div className="text-white flex flex-col gap-6 mt-6">
      <div className="flex flex-col gap-4 items-center bg-[#26282C] w-[330px] p-3 rounded-3xl">
        <div className="flex flex-row w-full items-start justify-between gap-4">
          <div className='w-12 h-12'></div>
          <Avatar className="w-[100px] h-[100px]" />
          <Button
            children={<ArrowLeftStartOnRectangleIcon />}
            color="red"
            onClick={() => localStorage.removeItem("token")}
          />
        </div>
        <div className="flex flex-col gap-4 w-full items-center">
          <p className="text-2xl leading-5">
            {data?.surname} {data?.name} {data?.l_surname}
          </p>
          <div className="flex flex-row gap-4 justify-between w-full">
            
            <div className="bg-[#3F3F46] h-16 flex justify-between flex-row gap-1 p-1 rounded-2xl">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-[#f59e0b] rounded-3xl  flex items-center justify-center">
                  <img
                    src="https://dashboard.codeparrot.ai/api/image/Z7-73THFtJnMrSZb/elements.png"
                    alt="star"
                    className="w-[30px] h-9"
                  />
                </div>
                <span className="text-white text-3xl font-medium">
                  {data?.coin}
                </span>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#26282C] flex flex-row flex-1 gap-1 p-1 rounded-2xl">
        <div
          className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "events" ? "bg-[#3F3F46]" : ""}`}
          onClick={() => setScreen("events")}
        >
          <p
            className={`text-sm tracking-[-3%] font-medium  ${screen === "events" ? "text-white" : " text-[#757575]"}`}
          >
            История
          </p>
        </div>
        <div
          className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "rating" ? "bg-[#3F3F46]" : ""}`}
          onClick={() => setScreen("rating")}
        >
          <p
            className={`text-sm tracking-[-3%] font-medium  ${screen === "rating" ? "text-white" : " text-[#757575]"}`}
          >
            Рейтинг
          </p>
        </div>
        <div
          className={` flex-1 items-center justify-center text-center py-[10px] rounded-[12px] ${screen === "shop" ? "bg-[#3F3F46]" : ""}`}
          onClick={() => setScreen("shop")}
        >
          <p
            className={`text-sm tracking-[-3%] font-medium ${screen === "shop" ? "text-white" : " text-[#757575]"}`}
          >
            Покупки
          </p>
        </div>
      </div>
      <div className={`${screen === "shop" ?"grid grid-cols-2 gap-4" :screen === "rating" ?"flex flex-col gap-2" :""}`}>
        {screen === "rating" ? <div className="flex flex-row gap-2 justify-between items-center">
          <p>Место</p>
          <p>Имя</p>
          <p>Количество денег</p>

        </div> : null}
        {(loadingbruh === true)&&(screen==="rating") ?<div className="w-full h-full items-center justify-center flex"> <OneEightyRing width={100} height={100} color="#fff" /></div>:null}
        {
          screen === "shop" ? data?.buys?.map((data,index)=>{
            return (
              
                      <BronzeChestCard
                      //@ts-ignore  
                      data={data}
                        key={index}
                        onBuy={() => {
                      //@ts-ignore  
                          data.CaseTypeID !== null 
                      //@ts-ignore  
                            ? onClick(data.ProductID) 
                      //@ts-ignore  
                            : onBuy(data.ProductID);
                        }}
                      />
                    );
                    {/*@ts-ignore*/}
          }) : screen === "events" ? <CollectionCardLayout upcoming={data.events}/>
          : screen === 'rating'? ratingdata?.wallets?.map((data,index)=>{
            return(
              <div className="flex flex-row gap-2 items-center bg-[#3F3F46] p-2 rounded-2xl justify-between" key={index}>
                <p>{index+1}</p>
                {/*@ts-ignore */}
                <p>{data?.user?.Surname+" "+data?.user?.Name}</p>
                {/*@ts-ignore */}
                <p>{data?.wallet?.Price}</p>
              </div>
            )
          })
          :null
          
        }
      </div>
    </div>
  );
}
