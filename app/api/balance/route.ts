import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  const searchParams = new URL(req.url).searchParams;
  const action = searchParams.get("action");
  const amount = searchParams.get("amount");

  try {
    switch (action) {
      case "deposit":
        return NextResponse.json(
          await prisma.user.update({
            where: {
              username: user?.username,
            },
            data: {
              balance: (user?.balance as number) + parseInt(amount as string),
            },
          }),
          {
            status: 200,
          }
        );

      case "withdrawal":
        if (parseInt(amount as string) > 500000) {
          return NextResponse.json(
            {
              message: "Max amount to withdrawal is 500000.",
            },
            { status: 400 }
          );
        }
        if ((user?.balance as number) < parseInt(amount as string)) {
          return NextResponse.json(
            {
              message: "Fund not fullfilled to withdrawal.",
            },
            { status: 400 }
          );
        }
        return NextResponse.json(
          await prisma.user.update({
            where: {
              username: user?.username,
            },
            data: {
              balance: (user?.balance as number) - parseInt(amount as string),
            },
          }),
          {
            status: 200,
          }
        );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
