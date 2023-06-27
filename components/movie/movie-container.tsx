"use client";

import { Movies, Seat, User } from "@prisma/client";
import Checkout from "./checkout";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { formatDate, rc } from "@/lib/utils";

interface MovieContainerProps {
  user: User | null;
  movie: Movies;
  reservedSeat: Seat | { reserved: number[] } | null;
}

const MovieContainer = ({ user, movie, reservedSeat }: MovieContainerProps) => {
  return (
    <>
      <div className="grid lg:grid-cols-3 lg:gap-4 grid-cols-1">
        <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg block mx-4 ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={movie.poster as string}
            alt={movie.title as string}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6">
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
            <div className="flex justify-end mb-3">
              <p className="font-medium">Your Balance: IDR {user?.balance}</p>
            </div>
            {user ? (
              <Checkout movie={movie} reservedSeat={reservedSeat} balance={user.balance} />
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
      </div>
    </>
  );
};

export default MovieContainer;
