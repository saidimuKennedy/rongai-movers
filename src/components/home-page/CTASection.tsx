import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import QuoteButton from "../navbar/quote-button";

export default function CTASection() {
  const contactInfo = {
    phone: "+254 723 084530",
    name: "Rongai errands & movers",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative text-center"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
        Usisleki! Make That Move Today
      </h2>
      <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto">
        Get your free quote today and experience stress-free moving
      </p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 flex items-center justify-center"
      >
        <Phone className="h-6 w-6 sm:h-8 sm:w-8 mr-3 sm:mr-4" />
        <span className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl">
          {contactInfo.phone}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6"
      >
        <QuoteButton
          className="group bg-white text-[#E65C1C] font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-2xl flex items-center justify-center text-sm sm:text-base"
          motionProps={{
            whileHover: { scale: 1.05, y: -2 },
            whileTap: { scale: 0.95 },
          }}
        >
          Get Free Quote
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
        </QuoteButton>

        <motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={`tel:${contactInfo.phone}`}
          className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 rounded-xl flex items-center justify-center text-sm sm:text-base"
        >
          <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Call Now
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
