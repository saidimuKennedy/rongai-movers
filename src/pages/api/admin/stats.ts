/**
 * @file API Route for Admin Statistics
 * @module pages/api/admin/stats
 * @description This API route provides administrative statistics for the application.
 *              It retrieves data such as total quotes, pending and completed quotes,
 *              total movers, and recent quote activity directly from the database.
 *              Access to this endpoint is restricted to authenticated users with the 'ADMIN' role.
 *              It uses `next-auth` for session validation and `Prisma` for database queries.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

/**
 * Handles the API request for admin statistics.
 *
 * This function performs the following steps:
 * 1. Authenticates the user session and checks if the user has the 'ADMIN' role.
 *    Returns a 403 Forbidden error if authentication or authorization fails.
 * 2. Fetches various statistics concurrently from the database using Prisma:
 *    - Total number of quotes.
 *    - Count of pending quotes.
 *    - Count of completed quotes.
 *    - Total number of users with the 'MOVER' role.
 *    - A list of the 5 most recent quote activities, including associated user and mover details.
 * 3. Returns the collected statistics as a JSON response.
 * 4. Catches and logs any errors during the process, returning a 500 Internal Server Error.
 *
 * @param {NextApiRequest} req - The Next.js API request object. Expected to be a GET request.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   The JSON response includes:
 *   - `totalQuotes`: Total number of quotes.
 *   - `pendingQuotes`: Number of quotes with 'PENDING' status.
 *   - `completedQuotes`: Number of quotes with 'COMPLETED' status.
 *   - `totalMovers`: Number of users with 'MOVER' role.
 *   - `recentActivity`: An array of recent quote objects (up to 5),
 *     each including `user` and `mover` details.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== Role.ADMIN) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const [
      totalQuotes,
      pendingQuotes,
      completedQuotes,
      totalMovers,
      recentActivity,
    ] = await Promise.all([
      // Get total quotes count
      prisma.quote.count(),

      // Get pending quotes count, using the enum
      prisma.quote.count({
        where: {
          status: "PENDING",
        },
      }),

      // Get completed quotes count, using the enum
      prisma.quote.count({
        where: {
          status: "COMPLETED",
        },
      }),

      // Get total movers count
      prisma.user.count({
        where: {
          role: Role.MOVER,
        },
      }),

      // Get recent activity
      prisma.quote.findMany({
        take: 5,
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          mover: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
    ]);

    return res.json({
      totalQuotes,
      pendingQuotes,
      completedQuotes,
      totalMovers,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
