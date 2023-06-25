import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { prisma } from "../prisma";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.username) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        username: session?.user?.username as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser
  } catch (error: any) {
    return null;
  }
}