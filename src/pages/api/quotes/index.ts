import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Please sign in to continue" });
  }

  if (!session.user?.id) {
    return res.status(401).json({ error: "Invalid session" });
  }

  if (req.method === "POST") {
    const { origin, destination, moveDate, message, serviceType } = req.body;

    if (!origin || !destination || !moveDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const quote = await prisma.quote.create({
        data: {
          origin,
          destination,
          moveDate: new Date(moveDate),
          message: message || "",
          serviceType: serviceType || "moving",
          user: { connect: { id: session.user.id } },
          status: "PENDING",
        },
      });

      return res.status(201).json(quote);
    } catch (error) {
      console.error("Error creating quote:", error);
      return res
        .status(500)
        .json({ error: "Failed to create quote. Please try again later." });
    }
  } else if (req.method === "GET") {
    try {
      const quotes = await prisma.quote.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return res.status(500).json({ error: "Failed to fetch quotes" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
