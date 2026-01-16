/**
 * @file API Route for Movers to Update Quote Status
 * @module pages/api/movers/update-status
 * @description This API route enables an authenticated user with the 'MOVER' role
 *              to update the status of a specific quote they have been assigned.
 *              It ensures that only the assigned mover can change a quote's status.
 *              The endpoint handles `POST` requests, validates the `quoteId` and new `status`,
 *              and updates the quote in the database using Prisma, including setting
 *              a `completedAt` timestamp if the status is changed to 'completed'.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

/**
 * Handles the API request to update the status of a mover's assigned quote.
 *
 * This function processes `POST` requests:
 * 1. **Method Enforcement**: Ensures the request method is `POST`. Returns 405 Method Not Allowed for others.
 * 2. **Authentication & Authorization**: Verifies that the request is from an authenticated
 *    user with the 'MOVER' role. Returns 403 Forbidden if not.
 * 3. **Input Validation**: Checks for the presence of `quoteId` and `status` in the request body.
 *    Returns 400 Bad Request if missing.
 * 4. **Ownership Verification**: Before updating, it checks if the authenticated mover is
 *    indeed the one assigned to the `quoteId`. Returns 403 Forbidden if not the owner.
 * 5. **Database Update**: Updates the quote's `status` in the database using Prisma.
 *    If the new status is 'completed', it also sets the `completedAt` timestamp to the current date.
 * 6. **Response**: Returns the `updatedQuote` object (including user details) upon success,
 *    or a 500 Internal Server Error if a database operation fails.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 *   Expected `req.method` to be 'POST'.
 *   Expected `req.body` to contain `{ quoteId: string, status: string }`.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (200 OK): Returns JSON with the `updatedQuote` object.
 *   - On invalid method (405 Method Not Allowed): Returns `Method ... Not Allowed`.
 *   - On authorization failure (403 Forbidden): Returns `{ error: "Forbidden" }`
 *     or `{ error: "Not authorized to update this quote" }`.
 *   - On missing fields (400 Bad Request): Returns `{ error: "Quote ID and status are required" }`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Internal server error" }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== Role.MOVER) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { quoteId, status } = req.body;

  if (!quoteId || !status) {
    return res.status(400).json({ error: "Quote ID and status are required" });
  }

  try {
    // First verify that this mover owns this quote
    const quote = await prisma.quote.findFirst({
      where: {
        id: quoteId,
        mover: {
          userId: session.user.id,
        },
      },
    });

    if (!quote) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this quote" });
    }

    // Update the quote status
    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        status,
        ...(status === "completed" ? { completedAt: new Date() } : {}),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.json(updatedQuote);
  } catch (error) {
    console.error("Error updating quote status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
