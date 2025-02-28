import TaskCard from "./LastEventCard";

const CollectionCardLayout = ({upcoming}:any) => {
  const upcomingEvents = upcoming
    ? //@ts-ignore
      upcoming?.filter((data) => data.EventType === "event")
    : [];
  const upcomingTask = upcoming
    ? //@ts-ignore
      upcoming?.filter((data) => data.EventType === "task")
    : [];
//   if (isLoading)return<div className="w-full h-full flex items-center justify-center"><OneEightyRing width={100} height={100} color="#fff" /> </div>
    return (
        <div className="flex flex-col w-full gap-2 p-4">
          {/* @ts-ignore */}
          {upcomingEvents.length > 0 ? <p>События</p> : null}
          {/*@ts-nocheck */}
    
          <div className="flex flex-row w-full gap-2 overflow-x-scroll">
        {/* @ts-ignore */}

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
          {/* @ts-ignore */}
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
