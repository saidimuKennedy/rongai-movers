import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Package,
  Home,
  Building,
  Clock,
  Shield,
  Phone,
  Star,
  ChevronRight,
  Zap,
  Users,
  Award,
  MapPin,
  ArrowRight,
  Play,
  CheckCircle,
  ChevronDown,
  Plus,
  Minus,
  Globe,
  DollarSign,
  HeadphonesIcon,
  TrendingUp,
  ChevronLeft,
  ChevronUp,
  RefreshCcw,
} from "lucide-react";
import BoxCube from "./animations/cube";
import AdvantageSection from "./AdvantageSection";
import QuoteButton from "./navbar/quote-button";
import ServicesSection from "./ServicesSection";

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Animation variants
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactInfo = {
    phone: "+254 723 084530",
    name: "Rongai errands & movers",
  };

  const testimonials = [
    {
      quote:
        "Nilihama kutoka Rongai mpaka Westi bila stress yoyote. Professional sana!",
      name: "Sarah Kamau",
      location: "Westlands, Nairobi",
      rating: 5,
      avatar: "SK",
      verified: true,
    },
    {
      quote:
        "Walifanya kazi fiti sana wakihamisha office yangu. Bei yao ni poa na service ni the best.",
      name: "Michael Ouma",
      location: "Kilimani, Nairobi",
      rating: 5,
      avatar: "MO",
      verified: true,
    },
    {
      quote:
        "TV yangu walieeka vizuri haikuvunjika. Nitawarecommend kwa marafiki zangu.",
      name: "Alice Wambui",
      location: "Rongai, Kajiado",
      rating: 5,
      avatar: "AW",
      verified: true,
    },
  ];

  const stats = [
    {
      number: "200+",
      label: "Happy Customers",
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: "99.9%",
      label: "Success Rate",
      icon: <Award className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
    {
      number: "15+",
      label: "Areas Covered",
      icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />,
    },
  ];

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const CircularDeliveryImage = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 mx-auto"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 sm:-inset-6 rounded-full bg-yellow-400 opacity-30 blur-2xl"
        ></motion.div>
        <div className="absolute inset-0 rounded-full bg-[#E65C1C] opacity-80"></div>
        <div className="absolute inset-3 sm:inset-4 rounded-full bg-orange-400 opacity-50 blur-sm"></div>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div
                className="object-contain w-full h-full scale-110 sm:scale-125 translate-y-3 sm:translate-y-5 bg-orange-300 rounded-full flex items-center justify-center text-4xl font-bold text-white"
                style={{
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                }}
              >
                <img src="/images/delivery-guy.png" alt="tuko mbio man" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[#E65C1C] text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-white rounded-full blur-2xl sm:blur-3xl"
          ></motion.div>
          <motion.div
            animate={{
              y: [0, 20, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-yellow-400 rounded-full blur-2xl sm:blur-3xl"
          ></motion.div>
        </div>

        <Container>
          <div className="relative flex flex-col lg:flex-row items-center min-h-screen py-16 sm:py-20">
            {/* Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-3 py-2 sm:px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4 sm:mb-6 text-sm"
              >
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-yellow-300" />
                <span className="font-medium">Trusted by 200+ customers</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-4 sm:mb-6"
              >
                Rongai Errands
                <span className="block text-yellow-300">& Movers</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 sm:mt-6 text-lg sm:text-xl lg:text-2xl max-w-lg mx-auto lg:mx-0 text-white/90 leading-relaxed"
              >
                Professional moving and errand services that
                <span className="font-semibold text-yellow-300">
                  {" "}
                  simplify your life.{" "}
                </span>
                Tulia tukupange!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6"
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

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl flex items-center justify-center text-sm sm:text-base"
                  onClick={() => {
                    document
                      .getElementById("interactive-cube")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Explore Sections
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerChildren}
                className="mt-8 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-1 sm:mb-2 text-yellow-300">
                      {stat.icon}
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10">
              <CircularDeliveryImage />
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-white transform -translate-y-1/2 rounded-tl-full rounded-tr-full"></div>
      </section>

      {/* Our Services Section */}
      <ServicesSection />

      {/* Enhanced Interactive Cube Section - Clear Navigation Purpose */}
      <section
        id="interactive-cube"
        className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Explore Our Site in 3D
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Skip boring menus! Use our interactive 3D cube to navigate through
              different sections.
              <strong className="text-gray-800">
                {" "}
                Just hover and click any face.
              </strong>
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content - Enhanced */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:space-y-8"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  What's inside the box? Find out more
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Experience our website like never before! Each face of the
                  cube represents a different section. Move your mouse to
                  explore, then click any face to jump straight to that content.
                </p>

                {/* Call to Action */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-700 text-center font-medium">
                    Try interacting with the cube now!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - Enhanced Cube Component */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px] lg:h-[700px]"
            >
              {/* Attention-grabbing background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl blur-2xl animate-pulse"></div>

              {/* Corner hint */}
              <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium z-10">
                Interactive
              </div>

              <BoxCube />

              {/* Bottom instruction for mobile */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-4 py-2 rounded-lg text-sm lg:hidden">
                Tap any face to navigate
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <Container>
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
                  icon: (
                    <Phone className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  ),
                },
                {
                  title: "We Pack & Move",
                  desc: "Our professional team handles packing, loading, and transport with military precision. Tall people, they're from the military ;)",
                  icon: (
                    <Package className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  ),
                },
                {
                  title: "You Relax",
                  desc: "Sit back and track your move in real-time while we handle all the heavy lifting.Itisha coke na straw na scorns",
                  icon: (
                    <Shield className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  ),
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
        </Container>
      </section>

      {/* Experience the Difference Section */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <Container>
          <AdvantageSection />
        </Container>
      </section>
      {/* Testimonials with Carousel */}
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
              Don't just take our word for it - hear from our satisfied
              customers
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

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <Container>
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
              Got questions? We've got answers to help make your moving
              experience smooth
            </p>
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
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-[#E65C1C] text-white relative overflow-hidden">
        {/* Background animations */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-5 sm:top-10 right-5 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-white rounded-full blur-xl sm:blur-2xl"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 3 }}
            className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-yellow-400 rounded-full blur-2xl sm:blur-3xl"
          ></motion.div>
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Move?
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
        </Container>
      </section>
    </div>
  );
}
