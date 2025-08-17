import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { LoginSchema } from "../schema";
import { db } from "./db/prisma";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);
        if (!validateFields.success) {
          return null;
        }
        if (validateFields.success) {
          const { email, password } = credentials;
          const user = await db.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user || !user.password) {
            return null;
          }
          const isPasswordValid = bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            return null;
          }

          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
  },
  secret: process.env.JWT_SECRET,
  trustHost: true,
};
