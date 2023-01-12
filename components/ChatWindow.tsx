import React from "react";
import {
  useQuery,
  useMutation,
  withWunderGraph,
} from "../components/generated/nextjs";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ChatWindow = () => {
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const { data: session } = useSession();
  const { data: allMessages } = useQuery({
    operationName: "AllMessages",
    // liveQuery:true
  });
  const { data: currentUserID } = useQuery({
    operationName: "UserByEmail",
    input: {
      emailId: session.user.email,
    },
  });
  const {
    data: addedMessageID,
    error,
    trigger,
    isMutating
  } = useMutation({
    operationName: "AddMessage",
  });

  const [newMessage, setNewMessage] = React.useState<string>("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //trigger mutation with current message and userid
    trigger({
      content: newMessage,
      userId: currentUserID?.db_userIDByEmail,
    });
    // then reset message and redisable button
    setNewMessage("");
    setSubmitDisabled(true);
  };
  return (
    <div className="w-[80%] ">
      <div className="w-full h-[93%] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black p-4  overflow-y-scroll scrollbar scrollbar-thumb-teal-500  scrollbar-track-black ">
        {/* <pre className="text-white">{currentUserID?.db_userIDByEmail}</pre> */}
        {/* Chat messages go here */}
        {allMessages?.db_allMessages?.data.map((message) => (
          /* if message by currently logged-in user */
          <div
            className={
              message.user?.email === session.user.email
                ? "flex flex-col my-4 ml-auto mr-2 px-4 py-2 w-fit text-right text-gray-700 bg-zinc-200 rounded-lg"
                : "flex flex-col my-4 mr-auto ml-2 p-4 w-fit text-left text-zinc-200 bg-gray-900 rounded-lg  "
            }
          >
            <Link href={`https://www.github.com/${message.user?.name}`}>
              <span className="text-sm underline mb-2 cursor-pointer rounded-lg ">
                {message.user?.name}
              </span>
            </Link>

            <span className=" font-bold ">{message.content}</span>
          </div>
        ))}
      </div>
      {/* Input field for sending messages */}
      <div className="w-[98%] h-[7%] px-2 py-2">
        <form onSubmit={handleSubmit} className="relative rounded-md shadow-sm">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => {
              setNewMessage(event.target.value);
              if (event.target.value.length > 0) {
                setSubmitDisabled(false);
              } else {
                setSubmitDisabled(true);
              }
            }}
            placeholder="Type your message here..."
            className="bg-zinc-200 text-gray-900 rounded-md focus:outline-none border-[1px] p-2 w-5/6 z-10"
          />
          <button
            type="submit"
            className="w-1/6 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-r-full z-20 disabled:bg-teal-200 disabled:text-gray-500"
            disabled={submitDisabled || isMutating}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default withWunderGraph(ChatWindow);
