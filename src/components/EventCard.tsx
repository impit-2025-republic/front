import { Badge } from "./catalyst/badge";
import achieve from "/achieve.png";
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
    <div className="flex flex-col bg-[#26282C] w-[204px] h-[224px] p-4 gap-[14px] rounded-[16px]">
      <div className="flex flex-row justify-between items-start">
        <img src={achieve} width={48} height={48} />
        <Badge
          className="!bg-[#3F3F46] px-3 py-1 !rounded-full"
          children={
            <div className="flex flex-row items-center gap-2">
              <img src={money} width={14} height={16} />
              <p className="text-[11px] font-normal">{data?.money}</p>
            </div>
          }
        />
        
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium">{data?.title}</p>
        <p className="text-xs font-normal text-[#71717A]">{data?.desc}</p>
      </div>
      <div className="flex flex-row justify-between mt-auto items-center">
        <Badge color="green" children={data?.status} />
        <p className="text-xs font-normal text-[#71717A]">{data?.date}</p>
      </div>
    </div>
  );
};
