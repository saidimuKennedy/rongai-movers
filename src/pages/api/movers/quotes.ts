/**
 * @file API Route for Retrieving Mover-Relevant Quotes
 * @module pages/api/movers/quotes
 * @description This API route allows authenticated users with the 'MOVER' or 'ADMIN' role
 *              to retrieve a list of moving quotes. Specifically, it fetches quotes that
 *              are in a `PENDING` status and have not yet been assigned to any mover (`moverId` is null).
 *              It enforces authentication and role-based authorization, handles only `GET` requests,
 *              and queries the database using Prisma to provide available quotes.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../auth/[...nextauth]"; 
import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client"; 

/**
 * Handles the API request to fetch mover-relevant quotes.
 *
 * This function processes `GET` requests:
 * 1. **Authentication & Authorization**: Verifies that the request is from an authenticated
 *    user with either the 'MOVER' or 'ADMIN' role. Returns 401 Unauthorized or 403 Forbidden if not.
 * 2. **Method Enforcement**: Ensures the request method is `GET`. Returns 405 Method Not Allowed for others.
 * 3. **Database Query**: Fetches quotes from the database using Prisma. It specifically looks for
 *    quotes where `moverId` is `null` and `status` is 'pending', ordered by creation date (descending).
 *    Note: The status value 'pending' is used as found in the original code. If `QuoteStatus` enum in Prisma
 *    uses uppercase (e.g., `PENDING`), this query might not return expected results.
 * 4. **Response**: Returns an array of quote objects upon success,
 *    or a 500 Internal Server Error if a database operation fails.
 *
 * @param {NextApiRequest} req - The Next.js API request object. Expected to be a GET request.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (200 OK): Returns JSON with an array of `Quote` objects.
 *   - On authorization failure (401 Unauthorized): Returns `{ error: "Unauthorized" }`.
 *   - On insufficient role (403 Forbidden): Returns `{ error: "Access Forbidden" }`.
 *   - On invalid method (405 Method Not Allowed): Returns `Method ... Not Allowed`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Something went wrong. It's not you it's us!" }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getServerSession(req, res, authOptions)) as Session & {
    user: { role: Role };
  };

  if (!session || !session.user || !session.user.role) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const allowedRoles: Role[] = [Role.MOVER, Role.ADMIN];
  if (!allowedRoles.includes(session.user.role)) {
    return res.status(403).json({ error: "Access Forbidden" });
  }

  if (req.method === "GET") {
    try {
      const quotes = await prisma.quote.findMany({
        where: { moverId: null, status: "pending" }, 
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(quotes);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Something went wrong. It's not you it's us!" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
