import TaskCard from "./TaskCard";
import {
  getGetEventsUpcomingQueryKey,
  useGetEventsUpcoming,
  usePostEventsVisit,
} from "../api/endpoints/b8st-api";
import { useQueryClient } from "@tanstack/react-query";
import { OneEightyRing } from "react-svg-spinners";

const CollectionCardLayout = ({ period }: { period: string }) => {
  const { data: upcoming, isLoading } = useGetEventsUpcoming({ period });
  const { mutate } = usePostEventsVisit();
  const keyFromQuery = getGetEventsUpcomingQueryKey();
  const queryClient = useQueryClient();
  const onClick = (id: any) => {
    mutate(
      {
        data: {
          eventID: id,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: keyFromQuery });
        },
      }
    );
  };
  const upcomingEvents = upcoming
    ? //@ts-ignore
      upcoming?.events?.filter((data) => data.EventType === "event")
    : [];
  const upcomingTask = upcoming
    ? //@ts-ignore
      upcoming?.events?.filter((data) => data.EventType === "task")
    : [];
    if (isLoading)return<div className="w-full h-full flex items-center justify-center"><OneEightyRing width={100} height={100} color="#fff" /> </div>
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
              is_registered={data.is_registered}
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
              is_registered={data.is_registered}
            />
          );
        })}
        </div>
    </div>
  );
};

export default CollectionCardLayout;
