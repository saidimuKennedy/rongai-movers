/**
 * @file API Route for Testimonial Retrieval
 * @module pages/api/testimonials/index
 * @description This API route provides an endpoint for retrieving customer testimonials.
 *              It currently supports only `GET` requests to fetch all available testimonials
 *              from the database. This route does not handle the creation,
 *              updating, or deletion of testimonials, nor does it require authentication.
 */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

/**
 * Handles API requests for testimonials.
 *
 * This function processes `GET` requests to fetch all testimonials:
 * 1. **Method Enforcement**: Ensures the request method is `GET`. Returns 405 Method Not Allowed for others.
 * 2. **Database Query**: Fetches all testimonial records from the database using Prisma.
 * 3. **Response**: Returns an array of testimonial objects upon successful retrieval (200 OK),
 *    or a 500 Internal Server Error if a database operation fails.
 *
 * @param {NextApiRequest} req - The Next.js API request object. Expected to be a GET request.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (200 OK): Returns JSON with an array of `Testimonial` objects.
 *   - On invalid method (405 Method Not Allowed): Returns `{ error: "Method not allowed" }`.
 *   - On database error (500 Internal Server Error): Returns `{ error: "Error fetching testimonials" }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const testimonials = await prisma.testimonial.findMany();
      return res.status(200).json(testimonials);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching testimonials" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
