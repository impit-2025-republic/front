import { OneEightyRing } from "react-svg-spinners";
import { useGetUsersTransactions } from "../api/endpoints/b8st-api";

export const Transaction = () => {
  const { data: history,isLoading } = useGetUsersTransactions();
  console.log(history);
  if (isLoading)return<div className="w-full h-full flex items-center justify-center"><OneEightyRing width={100} height={100} color="#fff" /> </div>
  return (
      <div>
        
      {/*@ts-ignore*/}
      {history?.transactions?.toReversed().map((data, index) => {
        return(
        <div className="py-4 flex flex-row w-full text-white justify-between">
          {/* <img src={money} width={48} height={48} /> */}
          <div className="flex flex-col gap-1">
            <p className="text-base font-normal">{data?.RefillType === "plus" ? "Зачисление":"Списание"}</p>
            <p className="text-[#B3B3B3] text-xs">
             {data?.Description}
            </p>
          </div>
          <p className={`${data?.RefillType === "plus" ? "text-green-500":"text-red-500"}`}>{data?.Coin}</p>
        </div>
                )
            }
        )
      }
    </div>
  );
};
