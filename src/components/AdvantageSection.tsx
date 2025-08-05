import { motion } from "framer-motion";
import {
  Award,
  Truck,
  Shield,
  Headphones,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdvantagesSection() {
  const advantages = [
    {
      title: "Professional Training",
      description:
        "Our team undergoes rigorous training and certification programs to ensure top-notch service.",
      icon: <Award />,
    },
    {
      title: "Modern Equipment",
      description:
        "We use state-of-the-art moving equipment and GPS-tracked vehicles for efficiency.",
      icon: <Truck />,
    },
    {
      title: "Insurance Coverage",
      description:
        "Your valuable belongings are protected with full insurance coverage during transit.",
      icon: <Shield />,
    },
    {
      title: "24/7 Support",
      description:
        "Our customer support team is available round-the-clock to assist you with your needs.",
      icon: <Headphones />,
    },
    {
      title: "Transparent Pricing",
      description:
        "We offer clear, upfront pricing with no hidden fees, so you always know what you're paying.",
      icon: <DollarSign />,
    },
    {
      title: "Proven Track Record",
      description:
        "With a 99.9% customer satisfaction rate, our reputation speaks for itself.",
      icon: <TrendingUp />,
    },
  ];

  // Framer Motion animations
  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section id="advantages" className="py-16  text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent">
            Experience the Difference
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            What sets us apart from other moving companies? Our commitment to
            excellence, modern approach, and customer-first mentality in every
            aspect of our service.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {advantages.map((advantage, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="relative group mt-8"
            >
              {/* Icon Box */}
              <div
                className="absolute -top-6 left-5 z-20 flex items-center justify-center w-12 h-12 rounded transition-all duration-300 hover:bg-orange-400 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  background: "linear-gradient(145deg, #f97316, #ea580c)",
                  boxShadow:
                    "0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                {React.cloneElement(advantage.icon, {
                  className: "h-6 w-6 text-white",
                })}
              </div>

              {/* Card */}
              <Card
                className="bg-gray-900/30 border-2 border-orange-500 rounded-xl group-hover:border-orange-400 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                style={{
                  boxShadow:
                    "0 8px 25px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(249, 115, 22, 0.1)",
                }}
              >
                <CardContent className="p-6 sm:p-8 pt-8">
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white mt-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                      {advantage.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
