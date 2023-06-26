/* eslint-disable @next/next/no-img-element */
"use client";

import { Movies } from "@prisma/client";

interface MoviesContainerProps {
  movies: Movies[];
}

const MoviesContainer = ({ movies }: MoviesContainerProps) => {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 mt-4 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {movies.map((movie) => {
          return (
            <a href={"/movie/" + movie.id} className="group" key={movie.id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-10 xl:aspect-w-7">
                <img
                  src={movie.poster as string}
                  alt={movie.title as string}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{movie.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                IDR {movie.ticket_price}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesContainer;
