/**
 * @file API Route for Movers to Claim a Quote
 * @module pages/api/movers/claim
 * @description This API route allows an authenticated user with the 'MOVER' role
 *              to claim a `PENDING` moving quote. It ensures that a quote can only
 *              be claimed if it is currently pending and not already assigned to another mover.
 *              The endpoint handles `POST` requests, validates the `quoteId`,
 *              and updates the quote's status and assigned mover in the database using Prisma.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";


/**
 * Handles the API request for a mover to claim a quote.
 *
 * This function processes `POST` requests:
 * 1. **Authentication & Authorization**: Verifies that the request is from an authenticated
 *    user with the 'MOVER' role. Returns 401 Unauthorized if not.
 * 2. **Method Enforcement**: Ensures the request method is `POST`. Returns 405 Method Not Allowed for others.
 * 3. **Input Validation**: Checks for the presence of `quoteId` in the request body.
 *    Returns 400 Bad Request if `quoteId` is missing.
 * 4. **Claim Logic**: Attempts to update the quote in the database by setting the `moverId`
 *    to the session user's ID and changing the `status` to 'CONFIRMED'.
 *    This update only proceeds if the quote is currently `PENDING` and `moverId` is `null`.
 * 5. **Concurrency Handling**: If no records are updated (meaning the quote was already claimed
 *    or its status changed), it fetches the quote again to provide a more specific error message.
 * 6. **Response**: Returns a success message if the quote is claimed,
 *    or appropriate error messages (e.g., 409 Conflict, 404 Not Found, 500 Internal Server Error)
 *    in case of issues.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 *   Expected `req.method` to be 'POST'.
 *   Expected `req.body` to contain `{ quoteId: string }`.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (200 OK): Returns `{ message: "Quote claimed successfully!" }`.
 *   - On authorization failure (401 Unauthorized): Returns `{ error: "Unauthorized" }`.
 *   - On invalid method (405 Method Not Allowed): Returns `Method ... Not Allowed`.
 *   - On missing fields (400 Bad Request): Returns `{ error: "Quote ID is required." }`.
 *   - On conflict (409 Conflict): Returns `{ error: "Quote has already been claimed or is no longer available." }`.
 *   - On quote not found (404 Not Found): Returns `{ error: "Quote not found or no longer available." }`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Failed to claim quote due to a server error." }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getServerSession(req, res, authOptions)) as Session & {
    user: { role: Role; id: string };
  };

  if (!session || !session.user || session.user.role !== Role.MOVER) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { quoteId } = req.body;

  if (!quoteId) {
    return res.status(400).json({ error: "Quote ID is required." });
  }

  try {
    const updatedQuote = await prisma.quote.updateMany({
      where: {
        id: quoteId,
        moverId: null,
        status: "PENDING", 
      },
      data: {
        moverId: session.user.id,
        status: "CONFIRMED", 
      },
    });

    if (updatedQuote.count === 0) {
      const existingQuote = await prisma.quote.findUnique({
        where: { id: quoteId },
      });

      if (existingQuote?.status !== "PENDING") {
        return res
          .status(409)
          .json({
            error: "Quote has already been claimed or is no longer available.",
          });
      } else {
        return res
          .status(404)
          .json({ error: "Quote not found or no longer available." });
      }
    }

    res.status(200).json({ message: "Quote claimed successfully!" });
  } catch (error) {
    console.error("Error claiming quote:", error);
    res
      .status(500)
      .json({ error: "Failed to claim quote due to a server error." });
  }
}
