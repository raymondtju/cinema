import { User } from "@prisma/client";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

const menu = [
  {
    title: "Movies",
    path: "/",
  },
];

function Navbar({ user }: { user: User | null }) {
  return (
    <nav className="sticky z-10 top-0 flex items-center justify-between bg-white/95 p-4 dark:bg-black lg:px-6">
      {/* <div className="block w-1/3 md:hidden">
        <MobileMenu menu={menu} />
      </div> */}
      <div className="flex justify-self-center md:w-1/3 md:justify-self-start">
        <div className="md:mr-4">
          <Link href="/" aria-label="Go back home">
            <Clapperboard className="transition-transform hover:scale-110 font-bold">
              Cinema
            </Clapperboard>
          </Link>
        </div>
        {menu.length ? (
          <ul className="hidden md:flex md:items-center">
            {menu.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="rounded-lg px-2 py-1 text-gray-800 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {/* <div className="hidden w-1/3 md:block">
        <Search />
      </div> */}

      {/* <div className="flex w-1/3 justify-end">
        <Suspense fallback={<CartIcon className="h-6" />}>
          <Cart />
        </Suspense>
      </div> */}
      <div className="flex w-1/3 justify-end">{user?.username}</div>
    </nav>
  );
}
export default Navbar;
