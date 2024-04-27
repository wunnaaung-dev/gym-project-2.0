import Link from "next/link";
import { SignedOut, UserButton, SignedIn, useSession } from "@clerk/nextjs";
import { checkRole } from "@/utils/roles";
const Navbar = () => {
  const links = [
    { title: "Dashboard", url: "/Admin", role: "admin" },
  ];
  const isAdmin = checkRole("admin");
  return (
    <header className="text-gray-600 body-font bg-blue-200 shadow">
      <div className="container mx-auto flex  p-5 items-center justify-between">
        <div className="font-bold text-lg">
          <Link
            href="/"
            className="flex title-font font-bold items-center text-gray-900"
          >
            New Life Gym
          </Link>
        </div>

        <SignedIn>
          {links.map((link) => (
            <div key={link.title} className="space-x-2">
              {(link.role && isAdmin) || !link.role ? (
                <Link href={link.url} className="font-semibold">
                  {link.title}
                </Link>
              ) : null}
            </div>
          ))}
        </SignedIn>

        <SignedOut>
          <a href="/sign-in">
            <button className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mr-4">
              Login
            </button>
          </a>
          <a href="/sign-up">
            <button className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base">
              Sign Up
            </button>
          </a>
        </SignedOut>
        <SignedIn>
          <div className="ml-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
