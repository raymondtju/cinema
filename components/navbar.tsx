/* eslint-disable @next/next/no-img-element */
"use client";

import { Clapperboard } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { buttonVariants } from "./ui/button";
import { rc } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

function Navbar({ user }: { user: User | null }) {
  const router = useRouter();

  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      setIntersecting(false);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={rc("relative isolate overflow-hidden z-40")}>
      <header
        className={rc(
          "fixed backdrop-blur-sm inset-x-0 top-0 z-50",
          isIntersecting ? "bg-transparent" : "bg-white/95"
        )}
      >
        <nav
          className="flex items-center justify-between py-4 px-4 lg:px-8 max-w-[1280px] mx-auto"
          aria-label="Global"
        >
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5 items-center flex gap-1.5 font-bold">
              <span className="sr-only">Cinema</span>
              <Clapperboard className="w-7 h-7 inline-block" /> Cinema
            </Link>
          </div>

          <div className="">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>{user?.username}</DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/order-history")}
                  >
                    Order History
                  </DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                className={rc(buttonVariants({ variant: "default" }))}
                href="/auth/signin"
              >
                Signin
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
export default Navbar;
