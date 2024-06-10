import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';  

const databaseName = 'test'; // Replace 'test' with the name of the database you want to access

import User from '@model/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB(databaseName);//onnection is established

      const sessionUser = await User.findOne({
        email: session.user.email
      });

      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB(databaseName);
        
        const userExists = await User.findOne({
          email: profile.email
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/ /g, "").toLowerCase(),
            image: profile.picture
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
});

export { handler as GET, handler as POST };
