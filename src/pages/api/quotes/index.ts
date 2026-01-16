/**
 * @file API Route for User Quote Management
 * @module pages/api/quotes/index
 * @description This API route handles the creation and retrieval of moving quotes
 *              for authenticated users. It supports `POST` requests to submit
 *              new quote requests and `GET` requests to fetch all quotes
 *              associated with the current user. Authentication is required
 *              for both operations.
 */
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Handles API requests for creating and retrieving user quotes.
 *
 * This function processes `POST` and `GET` requests:
 * 1. **Authentication**: Verifies that the user is authenticated and has a valid session.
 *    Returns 401 Unauthorized if not.
 * 2. **POST Request (Create Quote)**:
 *    - Validates required fields (`origin`, `destination`, `moveDate`) from the request body.
 *    - Creates a new quote in the database, linking it to the authenticated user.
 *    - Sets default values for `message`, `serviceType`, and `status`.
 *    - Returns the created quote object (201 Created) or a 500 Internal Server Error.
 * 3. **GET Request (Fetch User Quotes)**:
 *    - Retrieves all quotes associated with the authenticated user, ordered by creation date.
 *    - Returns an array of quote objects (200 OK) or a 500 Internal Server Error.
 * 4. **Method Enforcement**: For unsupported methods, returns 405 Method Not Allowed.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 *   - For `POST`: Expected `req.body` to contain `{ origin: string, destination: string, moveDate: string, message?: string, serviceType?: string }`.
 *   - For `GET`: No specific request body.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (`POST` 201 Created): Returns JSON with the `createdQuote` object.
 *   - On success (`GET` 200 OK): Returns JSON with an array of `Quote` objects for the user.
 *   - On authentication failure (401 Unauthorized): Returns `{ error: "Please sign in to continue" }` or `{ error: "Invalid session" }`.
 *   - On missing fields (`POST` 400 Bad Request): Returns `{ error: "Missing required fields" }`.
 *   - On invalid method (405 Method Not Allowed): Returns `{ error: "Method ... Not Allowed" }`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Failed to create quote..." }` or `{ error: "Failed to fetch quotes" }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Please sign in to continue" });
  }

  if (!session.user?.id) {
    return res.status(401).json({ error: "Invalid session" });
  }

  if (req.method === "POST") {
    const { origin, destination, moveDate, message, serviceType } = req.body;

    if (!origin || !destination || !moveDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const quote = await prisma.quote.create({
        data: {
          origin,
          destination,
          moveDate: new Date(moveDate),
          message: message || "",
          serviceType: serviceType || "moving",
          user: { connect: { id: session.user.id } },
          status: "PENDING",
        },
      });

      return res.status(201).json(quote);
    } catch (error) {
      console.error("Error creating quote:", error);
      return res
        .status(500)
        .json({ error: "Failed to create quote. Please try again later." });
    }
  } else if (req.method === "GET") {
    try {
      const quotes = await prisma.quote.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return res.status(500).json({ error: "Failed to fetch quotes" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
