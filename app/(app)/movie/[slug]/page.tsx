/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";

import { getMovie, getReservedSeat } from "@/lib/actions/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieHeader from "@/components/movie/movie-header";
import { getCurrentUser } from "@/lib/actions/user";

async function MoviePage({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();
  const movie = await getMovie(params.slug);
  const reservedSeat = await getReservedSeat(params.slug);

  if (!movie) return notFound();
  return (
    <>
      <MovieHeader />
      <MovieContainer movie={movie} reservedSeat={reservedSeat} user={user} />
    </>
  );
}

export default MoviePage;
