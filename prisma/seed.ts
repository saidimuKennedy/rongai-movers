// file: prisma/seed.ts (or seed.js)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const testimonials = [
    {
      testimonialText:
        "Nilihama kutoka Rongai mpaka Westi bila stress yoyote. Professional sana!",
      name: "Sarah Kamau",
      location: "Westlands, Nairobi",
      rating: 5,
      verified: true,
      description: "Sarah had a seamless move from Rongai to Westlands, praising the team's professionalism and efficiency.",
      modalImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9413?w=800&auto=format&fit=crop",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      testimonialText:
        "Walifanya kazi fiti sana wakihamisha office yangu. Bei yao ni poa na service ni best.",
      name: "Michael Ouma",
      location: "Kilimani, Nairobi",
      rating: 5,
      verified: true,
      description: "Michael's office relocation in Kilimani was handled perfectly. He appreciated the great service and affordable pricing.",
      modalImage: "https://images.unsplash.com/photo-1510519138101-570d1d74d9a0?w=800&auto=format&fit=crop",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      testimonialText:
        "TV yangu walieeka vizuri haikuvunjika. Nitawarecommend kwa maarif.",
      name: "Alice Wambui",
      location: "Rongai, Kajiado",
      rating: 5,
      verified: true,
      description: "Alice was very happy with how her delicate electronics, like her TV, were handled with care during her move in Rongai.",
      modalImage: "https://images.unsplash.com/photo-1550508092-2b635703080e?w=800&auto=format&fit=crop",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log("Testimonials seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });