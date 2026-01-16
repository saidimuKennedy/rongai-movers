/**
 * @file API Route for Updating User Roles
 * @module pages/api/admin/update-role
 * @description This API route allows an authenticated administrator to update the role
 *              of a specific user in the database. It enforces strict access control,
 *              only permitting requests from users with the 'ADMIN' role.
 *              The endpoint handles `PUT` requests, validates the provided `userId` and `role`,
 *              and uses Prisma to persist the role change.
 *              It does not handle user creation, deletion, or general authentication flows.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

/**
 * Handles the API request to update a user's role.
 *
 * This function processes `PUT` requests to change a user's role:
 * 1. **Authentication & Authorization**: Verifies that the request is from an authenticated
 *    user with the 'ADMIN' role. Returns 403 Forbidden if not.
 * 2. **Method Enforcement**: Ensures the request method is `PUT`. Returns 405 Method Not Allowed for others.
 * 3. **Input Validation**: Checks for the presence of `userId` and `role` in the request body.
 *    Returns 400 Bad Request if missing.
 * 4. **Database Update**: Uses Prisma to find the user by `userId` and update their `role`.
 * 5. **Response**: Returns the updated user object (with selected fields) upon success,
 *    or a 500 Internal Server Error if a database operation fails.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 *   Expected `req.method` to be 'PUT'.
 *   Expected `req.body` to contain `{ userId: string, role: Role }`.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (200 OK): Returns JSON with the `updatedUser` object.
 *   - On authorization failure (403 Forbidden): Returns `{ error: "Not authorized" }`.
 *   - On invalid method (405 Method Not Allowed): Returns `{ error: "Method ... Not Allowed" }`.
 *   - On missing fields (400 Bad Request): Returns `{ error: "Missing required fields" }`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Error updating user role" }`.
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

  // 2. Handle PUT requests
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { userId, role } = req.body;

  // 3. Input validation
  if (!userId || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 4. Update the user role in the database
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: role as Role }, // Prisma automatically validates against the Role enum
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ error: "Error updating user role" });
  }
}
