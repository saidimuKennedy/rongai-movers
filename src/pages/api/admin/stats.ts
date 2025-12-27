import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { Role, QuoteStatus } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== Role.ADMIN) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const [
      totalQuotes,
      pendingQuotes,
      completedQuotes,
      totalMovers,
      recentActivity,
    ] = await Promise.all([
      // Get total quotes count
      prisma.quote.count(),

      // Get pending quotes count, using the enum
      prisma.quote.count({
        where: {
          status: QuoteStatus.PENDING,
        },
      }),

      // Get completed quotes count, using the enum
      prisma.quote.count({
        where: {
          status: QuoteStatus.COMPLETED,
        },
      }),

      // Get total movers count
      prisma.user.count({
        where: {
          role: Role.MOVER,
        },
      }),

      // Get recent activity
      prisma.quote.findMany({
        take: 5,
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          mover: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
    ]);

    return res.json({
      totalQuotes,
      pendingQuotes,
      completedQuotes,
      totalMovers,
      recentActivity,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
