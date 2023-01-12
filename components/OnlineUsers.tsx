import React from "react";
import { useQuery, withWunderGraph } from "../components/generated/nextjs";

const OnlineUsers = () => {
  const { data: onlineUsers } = useQuery({
    operationName: "AllSessions",
  });
  return (
    <div className="w-[20%] bg-gray-900 h-full divide-y overflow-y-scroll scrollbar scrollbar-thumb-black scrollbar-track-gray-100">
      {/* <pre className="text-white"> {JSON.stringify(onlineUsers)}</pre> */}
      {onlineUsers?.db_allSessions?.data?.map((user) => (
        <div className="w-full flex flex-row items-center p-2">
          <div className="bg-green-500 w-[20px] h-[20px] rounded-[50%]"></div>
          <div key={user.userId} className="text-white font-bold py-2 ml-2 ">
            {user.user.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
