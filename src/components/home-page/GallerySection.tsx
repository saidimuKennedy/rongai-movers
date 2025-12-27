import { motion } from "framer-motion";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/dq3wkbgts/image/upload/v1753885300/unsplash-city_aeqmxi.avif",
    alt: "Moving truck in a city",
  },
  {
    src: "https://res.cloudinary.com/dq3wkbgts/image/upload/v1753885300/pexels-kelly-lacy_a4760s.avif",
    alt: "Boxes stacked and ready to move",
  },
  {
    src: "https://res.cloudinary.com/dq3wkbgts/image/upload/v1753885300/pexels-tima-miroshnichenko_h6yvwe.avif",
    alt: "Movers carrying a couch",
  },
  {
    src: "https://res.cloudinary.com/dq3wkbgts/image/upload/v1753885300/pexels-karolina-grabowska_f2z8l6.avif",
    alt: "Movers packing a box",
  },
  {
    src: "https://res.cloudinary.com/dq3wkbgts/image/upload/v1753885300/pexels-kelly-lacy-1_k5h831.avif",
    alt: "A family happily moving in",
  },
];

export default function Gallery() {
  return (
    <div className="text-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Gallery</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          A picture is worth a thousand moves. Take a look at our team in action,
          providing seamless and stress-free moving experiences.
        </p>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent className="-ml-1">
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="flex aspect-video items-center justify-center rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-orange-600 hover:bg-orange-700 text-white" />
          <CarouselNext className="right-4 bg-orange-600 hover:bg-orange-700 text-white" />
        </Carousel>
      </motion.div>
    </div>
  );
}