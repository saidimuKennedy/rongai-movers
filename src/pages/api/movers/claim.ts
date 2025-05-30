import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import { Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = (await getServerSession(req, res, authOptions)) as Session & {
    user: { id: string; email: string; role: Role };
  };

  if (!session || !session.user || session.user.role !== Role.MOVER) {
    return res.status(403).json({ error: "Acess Forbidden" });
  }

  const { quoteId } = req.body;

  try {
    if (!quoteId) {
      return res.status(400).json({ error: "Quote ID is required" });
    }

    const currentMoverProfile = await prisma.mover.findUnique({
      where: {
        userId: session.user.id,
      },
      select: { id: true },
    });

    if (!currentMoverProfile) {
      return res
        .status(404)
        .json({
          error:
            "Mover profile not found for this user. Please ensure your MOVER user has an associated Mover profile.",
        });
    }

    const quote = await prisma.quote.update({
      where: { id: quoteId, status: "pending", moverId: null },
      data: {
        mover: {
          connect: { id: currentMoverProfile.id },
        },
        status: "assigned",
      },
    });

    res.status(200).json(quote);
  } catch (error) {
    console.error("Error claiming quote:", error);
    res
      .status(400)
      .json({
        error:
          "Could not claim quote. It might already be claimed or does not exist.",
      });
  }
}
