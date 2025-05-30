import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check if the request is a POST request

  if (req.method !== "POST") return res.status(405).end();
  const { email, name, password } = req.body;
  const hashedPassword = await hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: "User already exists" });
  }
}
