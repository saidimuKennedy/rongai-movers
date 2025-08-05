import { motion, AnimatePresence } from "framer-motion";
import { Container, Star, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  
  const testimonials = [
    {
      quote:
        "Nilihama kutoka Rongai mpaka Westi bila stress. Professional excess!",
      name: "Sarah Kamau",
      location: "Westlands, Nairobi",
      rating: 5,
      avatar: "SK",
      verified: true,
    },
    {
      quote:
        "Walifanya kazi fiti niaje wakihamisha office yangu. Bei yao ni poa na service ni the best.",
      name: "Michael Ouma",
      location: "Kilimani, Nairobi",
      rating: 5,
      avatar: "MO",
      verified: true,
    },
    {
      quote:
        "TV yangu walieeka vizuri na kwa uangalifu. Nitawarekomena kwa marafiki zangu.",
      name: "Alice Wambui",
      location: "Rongai, Kajiado",
      rating: 5,
      avatar: "AW",
      verified: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-orange-50 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl"
            >
              <div className="text-center">
                <div className="flex justify-center mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500 fill-current mx-0.5 sm:mx-1"
                    />
                  ))}
                </div>
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 mb-6 sm:mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3 sm:mr-4">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center">
                      <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      {testimonials[currentTestimonial].verified && (
                        <div className="ml-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-2.5 sm:h-3 rounded-full transition-all ${
                  i === currentTestimonial
                    ? "bg-orange-500 w-6 sm:w-8"
                    : "bg-gray-300 w-2.5 sm:w-3"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
