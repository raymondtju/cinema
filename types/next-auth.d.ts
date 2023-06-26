import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string;
      age: string;
    };
  }

  interface User {
    username: string;
    age: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    age: string;
  }
}
