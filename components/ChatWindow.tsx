import React from "react";
/**
 * wundergraph stuff
 */
import {
  useQuery,
  useMutation,
  withWunderGraph,
} from "../components/generated/nextjs";
/**
 * nextauth stuff
 */
import { useSession } from "next-auth/react";
/**
 * nextjs stuff
 */
import Link from "next/link";
/**
 * my utility funcs
 */
import epochToTimestampString from "../utils/epochToTimestampString";
//--------------------------------------------------------------------------------------------------------------------------------
const ChatWindow = () => {
  /**
   * get current session data with nextauth
   *  */
  const { data: session } = useSession();
  /**
   * queries + mutations with WG
   */
  const { data: allMessages } = useQuery({
    operationName: "AllMessages",
    liveQuery:true
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
    isMutating,
  } = useMutation({
    operationName: "AddMessage",
  });
  /**
   * local state
   */
  const [submitDisabled, setSubmitDisabled] = React.useState<boolean>(true);
  const [newMessage, setNewMessage] = React.useState<string>("");
  const messagesRef = React.useRef(null);
  React.useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [allMessages]); // Only re-run the effect if messages state changes

  /**
   * event handlers
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //trigger mutation with current message, userid, and timestamp
    trigger({
      content: newMessage,
      userId: currentUserID?.db_userIDByEmail,
      timestamp: epochToTimestampString(
        Math.floor(new Date().getTime() / 1000.0)
      ),
    });
    // then reset message and redisable button

    setNewMessage("");
    setSubmitDisabled(true);
  };
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div className="w-[80%] ">
      <div
        ref={messagesRef}
        className="scrollbar scrollbar-thumb-teal-500 scrollbar-track-black h-[93%] w-full overflow-y-scroll bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))]  from-gray-700 via-gray-900 to-black  p-4 "
      >
        {/* Chat messages go here */}
        {allMessages?.db_allMessages?.data.map((message) => (
          /* adjust alignment if current user */
          <div
            className={
              message.user?.email === session.user.email
                ? "my-4 ml-auto mr-2  flex w-fit max-w-md flex-col rounded-lg bg-zinc-200  px-4 py-2 text-gray-700"
                : "my-4 mr-auto ml-2 flex w-fit max-w-md flex-col rounded-lg  bg-gray-900 p-4 text-zinc-200  "
            }
          >
            <Link href={`https://www.github.com/${message.user?.name}`}>
              <span className="mb-2 cursor-pointer rounded-lg text-sm underline ">
                {message.user?.name}
              </span>
            </Link>

            <span className="font-bold ">{message.content}</span>

            <span
              className={`pt-2 text-right text-xs ${
                message.user?.email === session.user.email
                  ? "text-red-700"
                  : "text-teal-500"
              } mb-2 rounded-lg font-bold`}
            >
              {message.timestamp}
            </span>
          </div>
        ))}
      </div>
      {/* Input field for sending messages */}
      <div className="h-[7%] w-[98%] px-2 py-2">
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
            className="z-10 w-5/6 rounded-md border-[1px] bg-zinc-200 p-2 text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="z-20 w-1/6 rounded-r-full bg-teal-500 py-2 px-4 font-bold text-white hover:bg-teal-700 disabled:bg-teal-200 disabled:text-gray-500"
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
