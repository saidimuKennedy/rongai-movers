import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
export default function Faqs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "How much does a typical move cost?",
      answer:
        "Our pricing depends on distance, volume, and services needed. We offer transparent, upfront pricing with no hidden fees. Contact us for a free, personalized quote.",
    },
    {
      question: "Do you provide packing materials?",
      answer:
        "Yes! We provide all necessary packing materials including boxes, bubble wrap, tape, and protective covers. We can also handle the entire packing process for you.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 1-2 weeks in advance, especially during peak seasons. However, we also accommodate last-minute moves when possible.",
    },
    {
      question: "Do you move on weekends and holidays?",
      answer:
        "Yes, we operate 7 days a week including weekends and most holidays to accommodate your schedule.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We serve Nairobi, Kiambu, Kajiado, and surrounding areas. We also handle long-distance moves across Kenya.",
    },
    {
      question: "Can you disassemble and reassemble furniture?",
      answer:
        "Yes! Our team is trained to safely disassemble and reassemble furniture, including beds, wardrobes, and office furniture.",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Got questions? We've got answers to help make your moving experience
          smooth
        </p>
        <div className="max-w-4xl mx-auto"></div>
      </motion.div>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <motion.button
                whileHover={{ backgroundColor: "#f9fafb" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
