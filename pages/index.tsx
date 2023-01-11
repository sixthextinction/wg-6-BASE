import { NextPage } from "next";
import Chat from "../components/Chat";
import { withWunderGraph } from "../components/generated/nextjs";
import { useSession, signIn } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <>
          {/* <span className="text-red-500 font-semibold">
            DEBUG: {JSON.stringify(session, null, 2)}
          </span> */}
          <Chat />
        </>
      ) : (
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black p-4 ">
          <span className="text-white text-8xl font-semibold ">Hi!</span> <br />
          <span className="text-white text-lg">You need to be signed in to access our Workgroup chat.</span> <br />
          <button className=" bg-teal-500 hover:bg-teal-700 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={() => signIn()}>
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default withWunderGraph(Home);
