// file: pages/api/admin/users.ts
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

  // 2. Handle GET requests
  if (req.method === "GET") {
    try {
      // Fetch all users from the database
      const users = await prisma.user.findMany({
        // Select only the necessary fields for security and performance
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });
      return res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Error fetching users" });
    }
  } else {
    // 3. Handle unsupported methods
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
