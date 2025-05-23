import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    if (!session.user || !session.user.id)
      return res.status(401).json({ error: "Unauthorized" });

    const { origin, destination, moveDate } = req.body;

    try {
      const quote = await prisma.quote.create({
        data: {
          origin,
          destination,
          moveDate: new Date(moveDate),
          user: { connect: { id: session.user.id } },
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Something went wrong. It's not you it's us!" });
    }
  } else if (req.method === "GET") {
    try {
      const quotes = await prisma.quote.findMany({
        where: {
          userId: session.user?.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(quotes);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch quotes" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
