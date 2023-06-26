import { prisma } from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        age: {
          label: "Age",
          type: "text",
        },
      },

      async authorize(credentials) {
        const username = credentials?.username as string;
        if (username.length < 4) {
          throw new Error(
            JSON.stringify({
              message: "Minimum username 4 letter.",
              status: false,
            })
          );
        }

        const check = await prisma.user.findFirst({
          where: {
            username: credentials?.username as string,
          },
        });
        if (check) {
          return check as any;
        }

        const create = await prisma.user.create({
          data: {
            username: credentials?.username as string,
            age: parseInt(credentials?.age as string),
          },
        });
        return create as any;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = user.username;
        token.age = user.age;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.username = token.username;
        session.user.age = token.age;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
