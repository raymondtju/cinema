import MoviesContainer from "@/components/movies-container";
import Image from "next/image";

async function getMovies() {
  try {
    const get = await fetch("http://localhost:3000/api/movies", {
      method: "GET",
    });
    return await get.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const movies = await getMovies()
  return (
    <main className="">
      <h1>Cinema</h1>

      <MoviesContainer movies={movies} />
    </main>
  );
}
