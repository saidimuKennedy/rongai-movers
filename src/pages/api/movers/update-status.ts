import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== Role.MOVER) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { quoteId, status } = req.body;

  if (!quoteId || !status) {
    return res.status(400).json({ error: "Quote ID and status are required" });
  }

  try {
    // First verify that this mover owns this quote
    const quote = await prisma.quote.findFirst({
      where: {
        id: quoteId,
        mover: {
          userId: session.user.id,
        },
      },
    });

    if (!quote) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this quote" });
    }

    // Update the quote status
    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        status,
        ...(status === "completed" ? { completedAt: new Date() } : {}),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.json(updatedQuote);
  } catch (error) {
    console.error("Error updating quote status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
