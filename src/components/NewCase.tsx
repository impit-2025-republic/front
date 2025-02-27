import React from "react";

interface BronzeChestCardProps {
  data: {
    Price?: number;
    Image?: string;
    Availability?: number;
    Description?: string;
    Name?: string;
    ProductID?: number;
  };
  onBuy?: () => void;
}

export const BronzeChestCard: React.FC<BronzeChestCardProps> = ({
  data,
  onBuy,
}) => {
  return (
    <div className="adaptive-card relative flex flex-col p-2 bg-gradient-to-b from-[#26282c] to-[#1f2023] rounded-3xl">
      {/* Top decorative image */}
      <div className="absolute -top-7 left-[19px]">
        <img
          src="https://dashboard.codeparrot.ai/api/image/Z7-1NHujdTjvjCCn/group-44.png"
          alt=""
          className="w-[170px] h-[98px]"
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center pt-2 pb-2">
        <div className="w-24 h-24">
          <img src={data.Image} alt={data.Name} className="w-full h-full" />
        </div>
        <h2 className="text-white/90 text-center text-base font-medium tracking-tight mt-2">
          {data.Name}
        </h2>
      </div>

      {/* Multipliers row */}
      <div className="flex flex-row items-center gap-2 mt-2">
        <div className="flex items-center bg-[#3f3f46] rounded-2xl px-2.5 py-2">
          <img
            src="https://dashboard.codeparrot.ai/api/image/Z7-1NHujdTjvjCCn/subtract.png"
            alt=""
            className="w-4 h-4 mr-1"
          />
          <span className="text-white text-sm font-medium">{data.Price}</span>
        </div>
        {/* <div className="flex items-center bg-[#fb5fab] rounded-2xl px-3 py-2">
          <span className="text-white text-sm font-medium">x{pinkMultiplier}</span>
        </div>
        <div className="flex items-center bg-[#3f3f46] rounded-2xl px-3 py-2">
          <span className="text-white text-sm font-medium">x{grayMultiplier}</span>
        </div> */}
      </div>

      {/* Buy button */}
      <button
        onClick={onBuy}
        className="w-full mt-3 py-3 px-2.5 bg-[#3f3f46] rounded-[444px] text-white text-sm font-semibold hover:bg-[#4f4f56] transition-colors"
      >
        Купить
      </button>
    </div>
  );
};
