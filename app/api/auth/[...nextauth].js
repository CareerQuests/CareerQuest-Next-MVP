// app/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import connectDB from "../db";
import User from "./models/User"; // Create User model

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found");
        }
        // Validate password here with bcrypt

        return { email: user.email }; // Return user data
      },
    }),
  ],
  pages: {
    signIn: "/auth", // Custom sign-in page
  },
});
