// src/pages/api/movers/claim.ts
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  // use the getSession function to get the user's session from request
  // this will return the session object if the user is authenticated
  // use as Session, casting the session to the Session type to make typescript know that the session extends the default session
  const session = (await getSession({ req })) as Session;

  if (!session || !session.user || session.user.role !== "mover") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { quoteId } = req.body;

  try {
    const quote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        mover: {
          connect: { id: session.user.id },
        },
        status: "assigned",
      },
    });

    res.status(200).json(quote);
  } catch (error) {
    res.status(400).json({ error: "Could not claim quote" });
  }
}
