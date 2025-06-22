import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

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
