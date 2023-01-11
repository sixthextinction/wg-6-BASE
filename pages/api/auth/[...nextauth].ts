import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { Client as FaunaClient } from "faunadb"
import { FaunaAdapter } from "@next-auth/fauna-adapter"


const client = new FaunaClient({
  secret: process.env.FAUNA_SECRET,
  scheme: "https",
  domain: "db.fauna.com",
})

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: FaunaAdapter(client)
};
export default NextAuth(authOptions);

/*
   secret: 'your_key_here',
    domain: 'db.fauna.com',
    scheme: 'https',
    */
