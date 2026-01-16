/**
 * @file API Route for Single Quote Operations
 * @module pages/api/quotes/[id]
 * @description This API route handles operations for a specific moving quote,
 *              identified by its unique ID. Currently, it supports updating
 *              an existing quote via `PUT` requests. Authentication is required
 *              for all operations.
 *              Note: Despite the dynamic `[id]` segment, this route currently
 *              does not implement a `GET` handler to fetch a quote's details.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

/**
 * Handles API requests for a specific quote.
 *
 * This function processes `PUT` requests to update an existing quote:
 * 1. **Authentication**: Verifies that the user is authenticated. Returns 401 Unauthorized if not.
 * 2. **Method Enforcement**: Ensures the request method is `PUT`. Returns 405 Method Not Allowed for others.
 * 3. **Update Logic**: Uses Prisma to find the quote by `id` from the URL query
 *    and updates it with the data provided in the request body.
 * 4. **Response**: Returns the `updatedQuote` object upon successful update,
 *    or a 500 Internal Server Error if the database operation fails.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 *   Expected `req.method` to be 'PUT'.
 *   Expected `req.body` to contain the fields to be updated for the quote.
 *   `req.query.id` is the ID of the quote to be updated.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (200 OK): Returns JSON with the `updatedQuote` object.
 *   - On authentication failure (401 Unauthorized): Returns `{ error: "Unauthorized" }`.
 *   - On invalid method (405 Method Not Allowed): Returns `{ error: "Method not allowed" }`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Failed to update quote" }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const quote = await prisma.quote.update({
        where: { id: String(id) },
        data: req.body,
      });
      return res.status(200).json(quote);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update quote" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
