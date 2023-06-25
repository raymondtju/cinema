import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { movie_id, seat } = await req.json();
  try {
    const check = await prisma.seat.findFirst({
      where: {
        movie_id,
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

      await prisma.seat.update({
        where: {
          id: check.id,
        },
        data: {
          reserved: [...check?.reserved, ...seat],
        },
      });
      return NextResponse.json(
        { message: "Checkout movie successfull" },
        { status: 200 }
      );
    }

    await prisma.seat.create({
      data: {
        reserved: seat,
        Movies: {
          connect: {
            id: movie_id,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Checkout movie successfull" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
