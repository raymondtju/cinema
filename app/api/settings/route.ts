import { getCurrentUser } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  const { name, age } = await req.json();

  try {
    await prisma.user.update({
      where: {
        username: user?.username as string,
      },
      data: {
        name,
        age: parseInt(age),
      },
    });

    return NextResponse.json(
      {
        message: "Successfully update profile",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 400 }
    );
  }
}
