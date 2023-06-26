import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json(
      { message: "Enter username to checkout" },
      { status: 400 }
    );

  const { movie, seat } = await req.json();
  try {
    const check = await prisma.seat.findFirst({
      where: {
        movie_id: movie.id,
      },
    });
    if (check) {
      const reservedList = check?.reserved;

      for (let x = 0; x < reservedList?.length; x++) {
        if (seat.includes(reservedList[x])) {
          return NextResponse.json(
            { message: "Seat has been reserved" },
            { status: 400 }
          );
        }
      }

      if (movie) {
        await prisma.order.create({
          data: {
            reserved_seat: seat,
            User: {
              connect: {
                id: user.id,
              },
            },
            Movies: {
              connect: {
                id: movie.id,
              },
            },
            total_payment: (movie?.ticket_price as number) * seat.length,
          },
        });
      }

      await prisma.seat.update({
        where: {
          id: check.id,
        },
        data: {
          reserved: [...check?.reserved, ...seat],
        },
      });
      return NextResponse.json(
        { message: "Successful checkout movie." },
        { status: 200 }
      );
    }

    await prisma.seat.create({
      data: {
        reserved: seat,
        Movies: {
          connect: {
            id: movie.id,
          },
        },
      },
    });
    await prisma.order.create({
      data: {
        reserved_seat: seat,
        User: {
          connect: {
            id: user.id,
          },
        },
        Movies: {
          connect: {
            id: movie.id,
          },
        },
        total_payment: (movie?.ticket_price as number) * seat.length,
      },
    });

    return NextResponse.json(
      { message: "Successful checkout movie." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
