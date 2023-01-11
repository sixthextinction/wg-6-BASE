import ChatWindow from "./ChatWindow";
import OnlineUsers from "./OnlineUsers";

/*
type Props = {
  onlineUsers: string[]; // list of online users
}
*/



const Chat = () => {
  return (
    <div className="flex w-full h-full">
      {/* Sidebar with list of online users */}
      <OnlineUsers />
      {/* Main chat window */}
      <ChatWindow />
    </div>
  );
};

export default Chat;
