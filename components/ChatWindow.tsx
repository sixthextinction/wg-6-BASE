import React from "react";
import { useQuery, withWunderGraph } from "../components/generated/nextjs";
import { useSession } from "next-auth/react";

/* fetch inside this component */
// const chatMessages = [
//   {
//     id: 234,
//     message: ` Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
//             dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
//             Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
//             sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.`,
//     userId: 1,
//   },
//   {
//     id: 235,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 2,
//   },
//   {
//     id: 236,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 2,
//   },
//   {
//     id: 237,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 2,
//   },
//   {
//     id: 238,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 4,
//   },
//   {
//     id: 239,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 6,
//   },
//   {
//     id: 240,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 2,
//   },
//   {
//     id: 241,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 3,
//   },
//   {
//     id: 242,

//     message: ` Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
//             orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
//             eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
//             Interdum praesent ut penatibus fames eros ad consectetur sed.`,
//     userId: 1,
//   },
// ];

const ChatWindow = () => {
  const { data: session } = useSession();
  const { data: allMessages } = useQuery({
    operationName: "AllMessages",
    // liveQuery:true
  });
  const { data: currentUserID } = useQuery({
    operationName: "UserByEmail",
    input: {
      emailId: session.user.email
    }
  })

  const [newMessage, setNewMessage] = React.useState<string>("");
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("entered : " + newMessage);
    setNewMessage("");
  };
  return (
    <div className="w-[80%] bg-black">
      <div className="w-full h-[95%] bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black p-4  overflow-y-scroll scrollbar scrollbar-thumb-teal-500  scrollbar-track-black ">
        <pre className="text-white">{currentUserID?.db_userIDByEmail}</pre>
        {/* Chat messages go here */}
        {allMessages?.db_allMessages?.data.map((message) => (
          /* if message by currently logged-in user */
          <div
            className={
              message.user?.email === session.user.email
                ? "flex flex-col my-4 ml-auto mr-2 px-4 py-2 w-fit text-right text-gray-700 bg-zinc-200 rounded-lg"
                : "flex flex-col my-4 mr-auto ml-2 p-4 w-fit text-left text-zinc-200 bg-gray-900 rounded-lg"
            }
          >
            <span className="text-sm underline mb-2">
              {message.user?.name}
            </span>
            <span className=" font-bold ">{message.content}</span>
          </div>
        ))}
      </div>
      {/* Input field for sending messages */}
      <div className="w-[98%] h-[5%] bg-black px-2 py-1">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 relative rounded-md shadow-sm"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Type your message here..."
            className="bg-gray-700 rounded-md p-2 w-5/6"
          />
          <button
            type="submit"
            className="w-1/6 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-r-full"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default withWunderGraph(ChatWindow);
