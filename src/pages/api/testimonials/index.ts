import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const testimonials = await prisma.testimonial.findMany();
      return res.status(200).json(testimonials);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching testimonials" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
