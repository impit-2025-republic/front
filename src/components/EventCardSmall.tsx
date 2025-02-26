import { Badge } from "./catalyst/badge";
import { Button } from "./catalyst/button";
import money from "/money.png";

type CardData = {
  data: {
    EventName: string;
    Description: string;
    achieve: string;
    Coin: string;
    Status: string;
    StartDs: string;
    EndDs:string;
  };
};

export const EventCard = ({ data }: CardData) => {
  return (
    <div className="flex flex-col bg-[#26282C] w-full h-fit p-4 gap-[14px] rounded-[16px]">
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium">{data?.EventName}</p>
        <p className="text-xs font-normal text-[#71717A]">{data?.Description}</p>
      </div>
      <div className="flex flex-row justify-between mt-auto items-center">
        
        <div className="flex flex-row gap-2">
        <Badge color="green" children={data?.Status} />
        <Badge
          className="!bg-[#3F3F46] px-3 py-1 !rounded-full"
          children={
            <div className="flex flex-row items-center gap-2">
              <img src={money} width={14} height={16} />
              <p className="text-[11px] font-normal">{data?.Coin}</p>
            </div>
          }
        />
        </div>
        <p className="text-xs font-normal text-[#71717A]">{new Date(data?.StartDs).toLocaleDateString()}</p>
      </div>
      <Button children="Записаться" color="pink" />
    </div>
  );
};
