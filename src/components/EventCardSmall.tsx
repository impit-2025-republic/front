import { Badge } from "./catalyst/badge";
import { Button } from "./catalyst/button";
import money from "/money.png";

type CardData = {
  data: {
    title: string;
    desc: string;
    achieve: string;
    money: string;
    status: string;
    date: string;
  };
};

export const EventCard = ({ data }: CardData) => {
  return (
    <div className="flex flex-col bg-[#26282C] w-[276px] h-fit p-4 gap-[14px] rounded-[16px]">
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium">{data?.title}</p>
        <p className="text-xs font-normal text-[#71717A]">{data?.desc}</p>
      </div>
      <div className="flex flex-row justify-between mt-auto items-center">
        
        <div className="flex flex-row gap-2">
        <Badge color="green" children={data?.status} />
        <Badge
          className="!bg-[#3F3F46] px-3 py-1 !rounded-full"
          children={
            <div className="flex flex-row items-center">
              <p className="text-[11px] font-normal">{data?.money}</p>
              <img src={money} width={14} height={16} />
            </div>
          }
        />
        </div>
        <p className="text-xs font-normal text-[#71717A]">{data?.date}</p>
      </div>
      <Button children="Записаться" color="pink" />
    </div>
  );
};
