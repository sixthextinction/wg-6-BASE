import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="w-screen h-[80px] flex items-center justify-between bg-black p-6 border-b-2 border-gray-900">
      <div className="container flex min-w-full items-center justify-between pr-4">
        <div className="font-semibold text-xl text-white tracking-tight">
          #workgroup
        </div>

        <div className="flex items-center">
          {session && (
            <>
              <div className="text-teal-200 tracking-tight cursor-pointer mr-4">
                <span className="text-white ">@{session.user?.name}</span>
              </div>
              <div className="cursor-pointer mr-4">
                <img
                  className="rounded-full"
                  src={session.user?.image}
                  height={"40px"}
                  width={"40px"}
                  alt={`Avatar for username ${session.user?.name}`}
                />
              </div>
              <div
                className="text-teal-200 tracking-tight cursor-pointer hover:text-white hover:bg-gray-800"
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
