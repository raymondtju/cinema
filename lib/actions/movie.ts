import { prisma } from "../prisma";

export async function getMovie(id: string) {
  try {
    const find = prisma.movies.findFirst({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!find) throw new Error("Movie not found.");
    return find;
  } catch (error) {
    throw new Error("Something went wrong.");
  }
}

export async function getReservedSeat(movie_id: string) {
  try {
    const find = await prisma.seat.findFirst({
      where: {
        movie_id: parseInt(movie_id),
      },
    });

    if (!find)
      return {
        reserved: [] as number[],
      };
    return find;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRecentOrder(movie_id: string) {
  try {
    const find = await prisma.order.findMany({
      where: {
        movie_id: parseInt(movie_id),
      },
      include: {
        Movies: true,
        User: true,
      },
    });

    // if (!find)
    //   return {
    //     reserved: [] as number[],
    //   };
    return find;
  } catch (error) {
    console.log(error);
    return null;
  }
}
