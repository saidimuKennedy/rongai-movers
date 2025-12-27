// file: pages/api/admin/update-role.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  // 1. Check if the user is authenticated and has the ADMIN role
  if (!session || session.user.role !== Role.ADMIN) {
    return res.status(403).json({ error: "Not authorized" });
  }

  // 2. Handle PUT requests
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { userId, role } = req.body;

  // 3. Input validation
  if (!userId || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 4. Update the user role in the database
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: role as Role }, // Prisma automatically validates against the Role enum
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ error: "Error updating user role" });
  }
}
