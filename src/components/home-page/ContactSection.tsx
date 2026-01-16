/**
 * @file Contact Section Component
 * @module components/home-page/ContactSection
 * @description This React component provides a dedicated section for contact information and a contact form.
 *              It includes a hero section, an embedded Google Map for location, detailed contact information (address, phone, email),
 *              and a form for users to send messages. The component uses `framer-motion` for animations.
 */
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react"; 

export default function Contact() {
  const containerVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="text-center pb-20">
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="relative w-full h-[60vh] bg-gray-900 flex flex-col items-center justify-center"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Background image or pattern for the hero section */}
        </div>
        <motion.h1
          variants={itemVariants}
          className="text-white text-5xl font-bold z-10"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-white text-lg mt-4 z-10 max-w-xl mx-auto"
        >
          We're here to help you with your next move. Find us on the map or send
          us a message directly.
        </motion.p>
      </motion.div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="relative mx-auto -mt-20 px-4 max-w-6xl z-20"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Location</h2>
        <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full h-[500px]">
          <iframe
            title="Rongai Movers Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.835848805986!2d36.72124504107621!3d-1.393437255152504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f04e17e30d663%3A0x1d752f44222f782c!2sRongai%2C%20Kenya!5e0!3m2!1sen!2sus!4v1625078566270!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="rounded-2xl"
          ></iframe>
        </div>
      </motion.div>

      {/* Contact Details Section */}
      <div className="py-20 px-4 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          {/* Address */}
          <motion.div
            variants={itemVariants}
            className="flex items-start bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          >
            <MapPin
              className="text-orange-600 mr-4 mt-1 flex-shrink-0"
              size={24}
            />
            <div>
              <h3 className="font-bold text-xl text-gray-800">Our Office</h3>
              <p className="text-gray-600 mt-2">
                Rongai Town, Main Road, opposite Tuskys Supermarket
              </p>
              <p className="text-gray-600">Kajiado County, Kenya</p>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            variants={itemVariants}
            className="flex items-start bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          >
            <Phone
              className="text-orange-600 mr-4 mt-1 flex-shrink-0"
              size={24}
            />
            <div>
              <h3 className="font-bold text-xl text-gray-800">Call Us</h3>
              <p className="text-gray-600 mt-2">+254 712 345 678</p>
              <p className="text-gray-600">Mon-Fri, 8 AM - 5 PM</p>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            variants={itemVariants}
            className="flex items-start bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
          >
            <Mail
              className="text-orange-600 mr-4 mt-1 flex-shrink-0"
              size={24}
            />
            <div>
              <h3 className="font-bold text-xl text-gray-800">Email Us</h3>
              <p className="text-gray-600 mt-2">info@rongaimovers.com</p>
              <p className="text-gray-600">We respond within 24 hours</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-white"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Send us a Message
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="md:col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition duration-150 ease-in-out"
                placeholder="Your Name"
              />
            </div>
            <div className="md:col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition duration-150 ease-in-out"
                placeholder="you@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition duration-150 ease-in-out"
                placeholder="How can we help you?"
              />
            </div>
            <div className="md:col-span-2 text-right">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
