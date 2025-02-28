import TaskCard from "./LastEventCard";
import { getGetEventsUpcomingQueryKey, useGetEventsArchived, usePostEventsVisit } from "../api/endpoints/b8st-api";
import { useQueryClient } from "@tanstack/react-query";

const CollectionCardLayout = () => {
  const { data: upcoming } = useGetEventsArchived();
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
  
  const upcomingEvents = upcoming
    ? //@ts-ignore
      upcoming?.events?.filter((data) => data.EventType === "event")
    : [];
  const upcomingTask = upcoming
    ? //@ts-ignore
      upcoming?.events?.filter((data) => data.EventType === "task")
    : [];
    return (
        <div className="flex flex-col w-full gap-2 p-4">
          {/* @ts-ignore */}
          {upcomingEvents.length > 0 ? <p>События</p> : null}
          {/*@ts-nocheck */}
    
          <div className="flex flex-row w-full gap-2 overflow-x-scroll">
          {upcomingEvents?.map((data, index) => {
            return (
                <TaskCard
                  /* @ts-ignore */
                  title={data.Title}
                  //@ts-ignore
    
                  onClick={() => onClick(data.EventID)}
                  //@ts-ignore
    
                  description={data.Description}
                  //@ts-ignore
    
                  date={data.StartDs}
                  status="active"
                  //@ts-ignore
                  statusText={data.Status}
                  //@ts-ignore
                  coins={data.Coin}
                  key={index}
                  
                />
              );
            })}
            </div>
          {/* @ts-ignore */}
    
          {upcomingTask.length > 0 ? <p>События</p> : null}
          {/*@ts-nocheck */}
          {/* @ts-ignore */}
    
          <div className="flex flex-row gap-2 overflow-x-scroll">
          {upcomingTask?.map((data, index) => {
            return (
                <TaskCard
                  /* @ts-ignore */
    
                  title={data.Title}
                  //@ts-ignore
    
                  onClick={() => onClick(data.EventID)}
                  //@ts-ignore
    
                  description={data.Description}
                  //@ts-ignore
    
                  date={data.StartDs}
                  status="active"
                  //@ts-ignore
                  statusText={data.Status}
                  //@ts-ignore
                  coins={data.Coin}
                  key={index}
                />
              );
            })}
            </div>
        </div>
      );
};

export default CollectionCardLayout;
