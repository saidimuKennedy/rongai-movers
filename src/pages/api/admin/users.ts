/**
 * @file API Route for Admin User Management
 * @module pages/api/admin/users
 * @description This API route allows an authenticated administrator to retrieve a list of all users
 *              registered in the system. It enforces strict access control, only permitting
 *              requests from users with the 'ADMIN' role. The endpoint handles `GET` requests
 *              and fetches user data from the database using Prisma, selecting only
 *              essential fields for security and performance.
 *              It does not support creating, updating, or deleting users.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

/**
 * Handles API requests for retrieving a list of users.
 *
 * This function processes `GET` requests to fetch user data:
 * 1. **Authentication & Authorization**: Verifies that the request is from an authenticated
 *    user with the 'ADMIN' role. Returns 403 Forbidden if not.
 * 2. **Method Enforcement**: Ensures the request method is `GET`. Returns 405 Method Not Allowed for others.
 * 3. **Database Query**: Fetches all users from the database using Prisma. Only `id`, `email`,
 *    `name`, and `role` fields are selected for each user to maintain security and optimize performance.
 * 4. **Response**: Returns an array of user objects upon success,
 *    or a 500 Internal Server Error if a database operation fails.
 *
 * @param {NextApiRequest} req - The Next.js API request object. Expected to be a GET request.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (200 OK): Returns JSON with an array of `User` objects, each containing `id`, `email`, `name`, and `role`.
 *   - On authorization failure (403 Forbidden): Returns `{ error: "Not authorized" }`.
 *   - On invalid method (405 Method Not Allowed): Returns `{ error: "Method ... Not Allowed" }`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Error fetching users" }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  // 1. Check if the user is authenticated and has the ADMIN role
  if (!session || session.user.role !== Role.ADMIN) {
    return res.status(403).json({ error: "Not authorized" });
  }

  // 2. Handle GET requests
  if (req.method === "GET") {
    try {
      // Fetch all users from the database
      const users = await prisma.user.findMany({
        // Select only the necessary fields for security and performance
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });
      return res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Error fetching users" });
    }
  } else {
    // 3. Handle unsupported methods
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
