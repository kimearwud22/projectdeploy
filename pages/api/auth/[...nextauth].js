import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  session: {
    jwt: true,
    //30 menit
    maxAge: 30 * 60,
  },
  secret: process.env.JWT_SECRET,
});