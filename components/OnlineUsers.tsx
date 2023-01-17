import { useQuery } from "../components/generated/nextjs";

const OnlineUsers = () => {
  const { data: onlineUsers } = useQuery({
    operationName: "AllSessions",
  });
  return (
    <div className="scrollbar scrollbar-thumb-black scrollbar-track-gray-100 h-full w-[15%] divide-y overflow-y-scroll bg-gray-900">
      {onlineUsers?.db_allSessions?.data?.map((user) => (
        <div className="flex w-full flex-row items-center p-2">
          <div className="h-[20px] w-[20px] rounded-[50%] bg-green-500"></div>
          <div key={user.userId} className="ml-2 py-2 font-bold text-white ">
            {user.user.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
