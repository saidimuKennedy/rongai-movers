import { motion } from "framer-motion";
import { Phone, Package, Shield } from "lucide-react";

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

export default function Process() {
  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 lg:mb-20"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          How It Works
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Our streamlined 3-step process makes moving day effortless
        </p>
      </motion.div>
      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-2 bg-orange-200 rounded-xl transform -translate-y-1/2 z-0"></div>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12"
        >
          {[
            {
              title: "Call Nje'",
              desc: "Schedule your move online in minutes with our smart booking system and instant pricing. Njeri ndio system",
              icon: <Phone className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
            },
            {
              title: "We Pack & Move",
              desc: "Our professional team handles packing, loading, and transport with military precision. Tall people, they're from the military ;)",
              icon: <Package className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
            },
            {
              title: "You Relax",
              desc: "Sit back and track your move in real-time while we handle all the heavy lifting.Itisha coke na straw na scorns",
              icon: <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="relative z-10 group sm:col-span-2 lg:col-span-1 last:sm:col-start-1 last:sm:col-end-3 last:lg:col-start-auto last:lg:col-end-auto"
            >
              <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 border border-gray-100">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 flex items-center justify-center rounded-xl bg-white text-orange-500 shadow-lg border-2 border-transparent transition-all duration-300 group-hover:border-orange-500">
                      {step.icon}
                    </div>
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white z-20">
                      {i + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
