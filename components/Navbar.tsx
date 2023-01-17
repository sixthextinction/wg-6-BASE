import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="flex h-[80px] w-screen items-center justify-between border-b-2 border-gray-900 bg-black p-6">
      <div className="container flex min-w-full items-center justify-between pr-4">
        <div className="text-xl font-semibold tracking-tight text-white">
          #workgroup
        </div>

        <div className="flex items-center">
          {session && (
            <>
              <div className="mr-4 cursor-pointer tracking-tight text-teal-200">
                <span className="text-white ">@{session.user?.name}</span>
              </div>
              <div className="mr-4 cursor-pointer">
                <img
                  className="rounded-full"
                  src={session.user?.image}
                  height={"40px"}
                  width={"40px"}
                  alt={`Avatar for username ${session.user?.name}`}
                />
              </div>
              <div
                className="cursor-pointer tracking-tight text-teal-200 hover:bg-gray-800 hover:text-white"
                onClick={() => signOut()}
              >
                Logout
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
