import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const quote = await prisma.quote.update({
        where: { id: String(id) },
        data: req.body,
      });
      return res.status(200).json(quote);
    } catch (error) {
      return res.status(500).json({ error: "Failed to update quote" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
