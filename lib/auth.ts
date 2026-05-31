import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkRateLimit } from "@/lib/rate-limit";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) return null;

        const forwarded = req?.headers?.["x-forwarded-for"];
        const ipValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;
        const ip = ipValue?.split(",")[0]?.trim() || "unknown";
        const emailKey = credentials?.email || "unknown";
        const throttle = checkRateLimit({
          key: `admin-login:${ip}:${emailKey}`,
          limit: 8,
          windowMs: 15 * 60 * 1000,
        });
        if (!throttle.allowed) return null;

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: "admin-optimizer360",
            email: adminEmail,
            name: "Optimizer360 Admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = "admin";
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        (session.user as { role?: string }).role = String(token.role);
      }
      return session;
    },
  },
};
