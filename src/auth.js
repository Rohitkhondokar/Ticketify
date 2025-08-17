import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db/prisma";
import authConfig from "./auth.config";
import { getUserById } from "../action/login";

export const authInstance = NextAuth({
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Normalize provider check
        const supportedProviders = ["google", "credentials", "github"];
        if (!supportedProviders.includes(account.provider)) {
          console.warn(`Unsupported provider: ${account.provider}`);
          return false; // Deny unsupported providers
        }

        // Allow Google sign-in
        if (account.provider === "google") {
          return true;
        }
        if (account.provider === "github") {
          return true;
        }
        // For credentials provider, check if user exists
        if (account.provider === "credentials") {
          if (!user.id) {
            console.error("User ID is missing for credentials provider");
            return false;
          }

          const existingUser = await getUserById(user.id);
          if (!existingUser) {
            console.log(`User with ID ${user.id} not found`);
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny sign-in on error
      }
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      // console.log(session);

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  ...authConfig,
});

// Export individual handlers
export const { auth, handlers, signIn, signOut } = authInstance;
