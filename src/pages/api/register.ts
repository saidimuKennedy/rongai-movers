/**
 * @file API Route for User Registration
 * @module pages/api/register
 * @description This API route handles the registration of new users.
 *              It accepts `POST` requests containing user credentials (email, name, password),
 *              hashes the password for security, checks for existing users with the same email,
 *              and creates a new user record in the database with a default 'CLIENT' role.
 *              This endpoint is intended for new account creation.
 */
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

/**
 * Handles user registration API requests.
 *
 * This function processes `POST` requests to register a new user:
 * 1. **Method Enforcement**: Ensures the request method is `POST`. Returns 405 Method Not Allowed for others.
 * 2. **Password Hashing**: Hashes the provided plain-text password using `bcryptjs`.
 * 3. **Existing User Check**: Queries the database to check if a user with the provided email already exists.
 *    Returns 400 Bad Request if an existing user is found.
 * 4. **User Creation**: Creates a new user record in the database with the hashed password
 *    and assigns the default `Role.CLIENT`.
 * 5. **Response**: Returns a success message and selected user details (id, email, name, role)
 *    upon successful registration (201 Created), or a 500 Internal Server Error if a database
 *    operation or hashing fails.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 *   Expected `req.method` to be 'POST'.
 *   Expected `req.body` to contain `{ email: string, name: string, password: string }`.
 * @param {NextApiResponse} res - The Next.js API response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 *   - On success (201 Created): Returns `{ message: "User created successfully", user: { id: string, email: string, name: string, role: Role } }`.
 *   - On invalid method (405 Method Not Allowed): Ends the response.
 *   - On existing email (400 Bad Request): Returns `{ error: "Email already exists" }`.
 *   - On database or hashing error (500 Internal Server Error): Returns `{ error: "Error creating user" }`.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check if the request is a POST request

  if (req.method !== "POST") return res.status(405).end();
  const { email, name, password } = req.body;
  const hashedPassword = await hash(password, 10);

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: Role.CLIENT, // Default role for new signups
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Error creating user" });
  }
}
