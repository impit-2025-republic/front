import TaskCard from "./TaskCard";
import { useGetEventsUpcoming } from "../api/endpoints/b8st-api";

const CollectionCardLayout = ({ period }: { period: string }) => {
  const { data: upcoming } = useGetEventsUpcoming({ period });
  return (
    <div className="flex overflow-x-auto w-full max-w-[896px] space-x-4 p-4">
      {/* @ts-ignore */}
      {upcoming?.events?.map((data: any, index: number) => (
        <div className="flex-shrink-0" key={index}>
          <TaskCard
            title={data.Title}
            description={data.Description}
            date={data.StartDs}
            status="active"
            statusText={data.Status}
            coins={data.Coin}
          />
        </div>
      ))}
    </div>
  );
};

export default CollectionCardLayout;
