/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";

import { getMovie, getReservedSeat } from "@/lib/actions/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieHeader from "@/components/movie/movie-header";

async function MoviePage({ params }: { params: { slug: string } }) {
  const movie = await getMovie(params.slug);
  const reservedSeat = await getReservedSeat(params.slug)

  if (!movie) return notFound();
  return (
    <>
      <MovieHeader />
      <MovieContainer movie={movie} reservedSeat={reservedSeat} />
    </>
  );
}

export default MoviePage;
