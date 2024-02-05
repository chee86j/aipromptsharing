import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        /*  serverless -> Lambda -> DynamoDB
                every Next.js route is a serverless route which means 
                it's a Lambda function that opens up only when it is 
                called to make a connection to the database */
        await connectToDB();

        // check if user already exists in db
        // ***(remember to create user model in models folder)***
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if user does not exist, create a new user in db
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
// we usually do this all as GET, but with NextAuth we need
// to do it this way based on official NextAuth documentation
