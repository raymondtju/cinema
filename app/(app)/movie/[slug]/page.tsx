/* eslint-disable @next/next/no-img-element */

import { notFound } from "next/navigation";

import { getMovie, getRecentOrder, getReservedSeat } from "@/lib/actions/movie";
import MovieContainer from "@/components/movie/movie-container";
import MovieHeader from "@/components/movie/movie-header";
import { getCurrentUser } from "@/lib/actions/user";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const movie = await getMovie(params.slug);
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: movie?.title,
    description: movie?.description,
    openGraph: {
      title: movie?.title as string,
      description: movie?.description as string,
    },
    twitter: {
      card: "summary_large_image",
      title: movie?.title as string,
      description: movie?.description as string,
    },
  };
}

async function MoviePage({ params }: { params: { slug: string } }) {
  const user = await getCurrentUser();
  const movie = await getMovie(params.slug);
  const reservedSeat = await getReservedSeat(params.slug);
  const recent = await getRecentOrder(params.slug);

  if (!movie) return notFound();
  return (
    <>
      <MovieHeader />
      <MovieContainer
        movie={movie}
        reservedSeat={reservedSeat}
        user={user}
        recent={recent}
      />
    </>
  );
}

export default MoviePage;
