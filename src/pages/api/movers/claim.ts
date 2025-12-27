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
    user: { role: Role; id: string };
  };

  if (!session || !session.user || session.user.role !== Role.MOVER) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { quoteId } = req.body;

  if (!quoteId) {
    return res.status(400).json({ error: "Quote ID is required." });
  }

  try {
    const updatedQuote = await prisma.quote.updateMany({
      where: {
        id: quoteId,
        moverId: null,
        status: "PENDING", 
      },
      data: {
        moverId: session.user.id,
        status: "CONFIRMED", 
      },
    });

    if (updatedQuote.count === 0) {
      const existingQuote = await prisma.quote.findUnique({
        where: { id: quoteId },
      });

      if (existingQuote?.status !== "PENDING") {
        return res
          .status(409)
          .json({
            error: "Quote has already been claimed or is no longer available.",
          });
      } else {
        return res
          .status(404)
          .json({ error: "Quote not found or no longer available." });
      }
    }

    res.status(200).json({ message: "Quote claimed successfully!" });
  } catch (error) {
    console.error("Error claiming quote:", error);
    res
      .status(500)
      .json({ error: "Failed to claim quote due to a server error." });
  }
}
