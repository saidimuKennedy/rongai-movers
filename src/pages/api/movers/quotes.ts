import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"; 
import { authOptions } from "../auth/[...nextauth]"; 
import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client"; 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getServerSession(req, res, authOptions)) as Session & {
    user: { role: Role };
  };

  if (!session || !session.user || !session.user.role) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const allowedRoles: Role[] = [Role.MOVER, Role.ADMIN];
  if (!allowedRoles.includes(session.user.role)) {
    return res.status(403).json({ error: "Access Forbidden" });
  }

  if (req.method === "GET") {
    try {
      const quotes = await prisma.quote.findMany({
        where: { moverId: null, status: "pending" },
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(quotes);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Something went wrong. It's not you it's us!" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
