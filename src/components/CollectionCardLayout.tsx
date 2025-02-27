import TaskCard from "./TaskCard";
import { getGetEventsUpcomingQueryKey, useGetEventsUpcoming, usePostEventsVisit } from "../api/endpoints/b8st-api";
import { useQueryClient } from "@tanstack/react-query";

const CollectionCardLayout = ({ period }: { period: string }) => {
  const { data: upcoming } = useGetEventsUpcoming({ period });
  const {mutate} = usePostEventsVisit()
  const keyFromQuery = getGetEventsUpcomingQueryKey()
  const queryClient = useQueryClient()
  const onClick = (id:any)=>{
    mutate({
      data:{
        eventID:id
      },
    },{onSuccess:()=>{queryClient.invalidateQueries({queryKey:keyFromQuery})}}
  )
  }
  return (
    <div className="flex flex-col w-full gap-2 p-4">
      {/* @ts-ignore */}
      {upcoming?.events?.map((data: any, index: number) => (
        <div className="flex-1" key={index}>
          <TaskCard
            title={data.Title}
            onClick={()=>onClick(data.EventID)}
            description={data.Description}
            date={data.StartDs}
            status="active"
            statusText={data.Status}
            coins={data.Coin}
            is_registered={data.is_registered}
          />
        </div>
      ))}
    </div>
  );
};

export default CollectionCardLayout;
