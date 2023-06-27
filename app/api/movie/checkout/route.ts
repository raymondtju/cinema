import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { Movies } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { movie, seat }: { movie: Movies; seat: number[] } = await req.json();
  if (seat.length === 0) {
    return NextResponse.json({ message: "Select movie" }, { status: 400 });
  }

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { message: "Signin to checkout" },
      { status: 400 }
    );
  }

  if ((user.age as number) < (movie.age_rate as number)) {
    return NextResponse.json(
      { message: "Your age not meet the requirement to watch this movie" },
      { status: 400 }
    );
  }
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

export async function PATCH(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const order_id = searchParams.get("order_id");

  try {
    const getOrder = await prisma.order.findFirst({
      where: {
        id: parseInt(order_id as string),
      },
    });

    const seat = await prisma.seat.findFirst({
      where: {
        movie_id: getOrder?.movie_id,
      },
    });
    await prisma.seat.update({
      where: {
        id: seat?.id as number,
      },
      data: {
        reserved: seat?.reserved.filter(
          (seat) => !getOrder?.reserved_seat.includes(seat)
        ),
      },
    });
    await prisma.order.update({
      where: {
        id: parseInt(order_id as string),
      },
      data: {
        payment_status: "canceled",
      },
    });

    return NextResponse.json({ message: "Order cancelled" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Somthing went wrong" },
      { status: 400 }
    );
  }
}
