"use client";

import { Movies, Order, Seat, User } from "@prisma/client";
import Checkout from "./checkout";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { formatDate, rc } from "@/lib/utils";
import { FileHeart, MoveRight } from "lucide-react";

interface MovieContainerProps {
  user: User | null;
  movie: Movies;
  reservedSeat: Seat | { reserved: number[] } | null;
  recent: Order[] | null;
}

const MovieContainer = ({
  user,
  movie,
  reservedSeat,
  recent,
}: MovieContainerProps) => {
  return (
    <>
      <div className="grid lg:grid-cols-4 lg:gap-4 grid-cols-1 mx-4 gap-4">
        <div className="aspect-h-5 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-10 xl:aspect-w-7 h-fit lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={movie.poster as string}
            alt={movie.title as string}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="max-w-2xl px-4 pb-16 sm:px-6 lg:col-span-2">
          <div className="">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {movie.title}
            </h1>
          </div>

          <div className="mt-4 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              IDR {movie.ticket_price}
            </p>

            <div className="flex flex-col gap-0.5 mt-2">
              <p className="sr-only">Minimum {movie.age_rate} year</p>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Minimum {movie.age_rate} year old
              </a>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Aired on {formatDate(movie.aired_at as Date)}
              </a>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-end mb-3 items-center gap-4">
              <p className="font-medium">Your Balance: IDR {user?.balance}</p>
              <Link href="/dashboard" className={rc(buttonVariants(), "h-8")}>
                Deposit
                <MoveRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            {user ? (
              <Checkout
                movie={movie}
                reservedSeat={reservedSeat}
                balance={user.balance}
              />
            ) : (
              <Link
                className={rc(buttonVariants({ variant: "default" }), "w-full")}
                href="/auth/signin"
              >
                Sign in to checkout
              </Link>
            )}
          </div>

          <div className="mt-8">
            <h3 className="font-bold">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{movie.description}</p>
            </div>
          </div>
        </div>

        <div className="max-w-full sm:max-w-xs rounded-lg border p-4 h-fit">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Recent Order
          </h2>

          <ul className="mt-3 space-y-1">
            {recent?.length !== 0 ? (
              recent?.map((item) => {
                return (
                  <li key={item.id}>
                    <p className="flex gap-1.5 items-center font-medium">
                      <FileHeart className="w-4 h-4" />
                      {/* @ts-ignore  */}
                      {item.User.username.slice(
                        0,
                        //  @ts-ignore
                        item.User.username.length - 3
                      ) + "***"}{" "}
                      {item.payment_status != "canceled"
                        ? "booked"
                        : "canceled"}{" "}
                      {item.reserved_seat.length} ticket
                    </p>
                  </li>
                );
              })
            ) : (
              <p>No recent order found</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieContainer;
