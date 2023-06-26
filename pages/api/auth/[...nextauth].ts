import { prisma } from "@/lib/prisma";
import NextAuth, { AuthOptions, Awaitable } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
      },
      async authorize(credentials) {
        // try {
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
          return check;
          // throw new Error(
          //   JSON.stringify({
          //     message: "Username has been used.",
          //     status: false,
          //   })
          // );
        }

        const create = await prisma.user.create({
          data: {
            username: credentials?.username as string,
          },
        });
        return create;
        // }
        // catch (error) {
        //   console.log(error);
        //   throw new Error(JSON.stringify({ error: error, status: false }));
        // }
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
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
