/**
 * @file Services Section Component
 * @module components/home-page/ServicesSection
 * @description This React component displays an overview of the core services offered by the moving company.
 *              It presents each service as an animated card with an image, title, description, and a promotional ribbon.
 *              The component utilizes `framer-motion` for scroll-triggered animations and manages service data internally.
 */
import React from "react";
import { motion } from "framer-motion";

// Service highlights data
const serviceHighlights = [
  {
    title: "Local Moving",
    desc: "Professional moving services in your area",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
    alt: "Moving truck and professional movers",
    ribbon: "Most Popular",
    ribbonColor: "bg-red-500",
  },
  {
    title: "Packing Services",
    desc: "Expert packing and unpacking assistance",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
    alt: "Hands carefully packing items in boxes",
    ribbon: "Time Saver",
    ribbonColor: "bg-blue-500",
  },
  {
    title: "Office Moving",
    desc: "Quick meticulous office equipment and accessory relocation",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    alt: "Clock showing urgency and speed",
    ribbon: "Fast",
    ribbonColor: "bg-green-500",
  },
];

// Animation variants
interface ServiceRibbonProps {
  text: string;
  color: string;
  position?: "top-right" | "top-left";
}

// Ribbon component
const ServiceRibbon = ({
  text,
  color,
  position = "top-right",
}: ServiceRibbonProps) => (
  <div
    className={`absolute ${
      position === "top-right" ? "-top-2 -right-2" : "-top-2 -left-2"
    } z-10`}
  >
    <div
      className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform ${
        position === "top-right" ? "rotate-12" : "-rotate-12"
      } animate-pulse`}
    >
      {text}
    </div>
    {/* Ribbon tail */}
    <div
      className={`absolute ${
        position === "top-right" ? "-bottom-1 right-2" : "-bottom-1 left-2"
      } w-0 h-0 border-l-4 border-r-4 border-t-4 ${
        color === "bg-red-500"
          ? "border-red-600"
          : color === "bg-blue-500"
          ? "border-blue-600"
          : color === "bg-green-500"
          ? "border-green-600"
          : color === "bg-purple-500"
          ? "border-purple-600"
          : "border-yellow-600"
      } border-l-transparent border-r-transparent`}
    ></div>
  </div>
);

// Service Card component
interface ServiceCardProps {
  service: {
    title: string;
    desc: string;
    image: string;
    alt: string;
    ribbon: string;
    ribbonColor: string;
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{
      scale: 1.05,
      rotateZ: Math.random() * 6 - 3, // Random slight rotation
      transition: { duration: 0.2 },
    }}
    className="relative group"
  >
    {/* Ribbon */}
    <ServiceRibbon
      text={service.ribbon}
      color={service.ribbonColor}
      position={index % 2 === 0 ? "top-right" : "top-left"}
    />

    {/* Card */}
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden h-full">
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={service.image}
          alt={service.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Image overlay  */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-orange-600 transition-colors duration-300">
          {service.title}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
    </div>
  </motion.div>
);

const ServicesSection = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Our Core Services
        </motion.h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          We offer professional, reliable moving and errand services to make
          your life easier.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3  gap-6 sm:gap-8"
      >
        {serviceHighlights.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </motion.div>
    </>
  );
};

export default ServicesSection;
