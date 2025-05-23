import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = (await getSession({ req })) as Session & {
    user: { role?: string };
  };
  if (!session || !session.user || !session.user.role)
    return res.status(401).json({ error: "Unauthorized" });

  const isMover = session.user.role === "mover";

  if (!isMover) {
    return res.status(403).json({ error: "Acess Forbidden" });
  }

  try {
    const quotes = await prisma.quote.findMany({
      where: { moverId: { equals: undefined }, status: "pending" },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(quotes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. It's not you it's us!" });
  }
}
