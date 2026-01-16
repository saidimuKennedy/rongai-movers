/**
 * @file NextAuth.js Configuration for Authentication
 * @module pages/api/auth/[...nextauth]
 * @description This file configures and initializes NextAuth.js, providing
 *              authentication services for the application. It sets up various
 *              authentication providers (Google and Credentials-based), integrates
 *              with Prisma for database persistence, defines custom pages for
 *              authentication flows, and implements callbacks to manage user
 *              sessions and JWTs, including role propagation.
 *              This is the central point for authentication logic in the application.
 */
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Role } from "@prisma/client";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

/**
 * Configuration options for NextAuth.js.
 *
 * This object defines how authentication works in the application, including:
 * - `adapter`: Integrates with Prisma for database session management.
 * - `providers`: Specifies the authentication strategies available (Google OAuth, Email/Password Credentials).
 * - `pages`: Customizes the URLs for sign-in and error pages.
 * - `callbacks`: Functions to control what happens on specific authentication events,
 *   such as modifying the JWT and session objects to include user roles and IDs.
 * - `session`: Configures the session strategy (JWT) and its maximum age.
 * - `secret`: Used to sign and encrypt session tokens.
 * - `debug`: Enables debugging logs in development.
 *
 * @type {NextAuthOptions}
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * Authorizes a user attempting to sign in with credentials (email and password).
       *
       * This function verifies the provided email and password against the database.
       * It hashes the provided password using `bcrypt` and compares it with the stored hash.
       *
       * @param {Record<"email" | "password", string> | undefined} credentials - The user's email and password.
       * @returns {Promise<User | null>} The authorized user object (with `id`, `email`, `name`, `image`, `role`)
       *   if credentials are valid, otherwise `null`.
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            image: true,
          },
        });

        if (
          !user ||
          !user.password ||
          !bcrypt.compareSync(credentials.password, user.password)
        ) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    /**
     * Modifies the JWT (JSON Web Token) before it's sent to the client.
     *
     * This callback ensures that the user's `role` and `id` are included in the JWT,
     * making them accessible on the client-side without needing to fetch them separately.
     *
     * @param {object} params - Parameters for the JWT callback.
     * @param {JWT} params.token - The current JWT.
     * @param {User} params.user - The user object (only available on sign-in).
     * @param {import("next-auth/core/types").Account} params.account - The account object (only available on sign-in).
     * @param {import("next-auth/core/types").Profile} params.profile - The profile object (only available on sign-in).
     * @returns {Promise<JWT>} The modified JWT.
     */
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    /**
     * Modifies the session object that is exposed to the client.
     *
     * This callback ensures that the user's `role` and `id` from the JWT are
     * propagated to the session object, allowing client-side components to
     * access this information easily.
     *
     * @param {object} params - Parameters for the session callback.
     * @param {Session} params.session - The current session object.
     * @param {JWT} params.token - The JWT from the `jwt` callback.
     * @param {User} params.user - The user object (only when using database sessions).
     * @returns {Promise<Session>} The modified session object.
     */
    async session({ session, token, user }): Promise<Session> {
      if (session.user) {
        session.user.role = token.role as Role;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

/**
 * The NextAuth.js handler for all authentication API routes.
 *
 * This default export processes all authentication-related requests to
 * `/api/auth/*`, orchestrating sign-in, sign-out, session management,
 * and callback handling based on the `authOptions` configuration.
 *
 * @param {NextApiRequest} req - The incoming Next.js API request.
 * @param {NextApiResponse} res - The outgoing Next.js API response.
 * @returns {Promise<void>}
 */
export default NextAuth(authOptions);
