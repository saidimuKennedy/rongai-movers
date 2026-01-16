/**
 * @file About Section Component
 * @module components/home-page/AboutSection
 * @description This React component displays the "About Us" section of the homepage.
 *              It includes sections for the company's story, mission, and team,
 *              using `framer-motion` for animations and `next/image` for optimized images.
 *              It highlights the company's values and provides key statistics.
 */
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <div id="about" className="text-center pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[80vh]">
        <Image
          src="https://res.cloudinary.com/dq3wkbgts/image/upload/w_1600,f_auto,q_auto/saidimu_mcqsnn.jpg"
          alt="hero"
          fill
          className="object-cover"
        />
      </div>

      {/* Pop-Up Card - UNCHANGED */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
        viewport={{ once: true }}
        className="relative mx-auto -mt-12 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md z-20"
      >
        <h2 className="text-4xl font-bold text-orange-600 mb-4">Who Are We?</h2>
        <p className="text-sm mt-2 text-gray-700">
          Rongai Movers is your go-to local moving partner for fast, affordable,
          reliable moving.
        </p>
      </motion.div>

      {/* Our Story Section - Enhanced with storytelling */}
      <div className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Story</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                It all started in 2018 when our founder, a recent graduate with
                a pickup truck and a dream, helped a neighbor move across
                Rongai. Word spread quickly about the reliable, friendly
                service, and what began as a weekend hustle transformed into
                something bigger.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Today, Rongai Movers is more than just a moving company. We're a
                team of passionate logistics professionals who understand that
                moving isn't just about transporting belongings – it's about
                helping families and businesses transition to new chapters in
                their lives.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With years of hands-on experience and deep community trust,
                we've built our reputation one satisfied customer at a time.
                We're proud to move you forward – safely, quickly, and
                affordably.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src="https://res.cloudinary.com/dq3wkbgts/image/upload/w_600,h_400,c_fill,g_auto,r_20/v1753885300/unsplash-city_aeqmxi.avif"
                alt="Our journey"
                width={600}
                height={400}
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Our Mission Section - Enhanced layout */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-orange-600 mb-12">
            Our Mission
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Excellence
              </h3>
              <p className="text-gray-700">
                We provide an unmatched moving experience that combines
                efficiency, care, and transparency in every service we deliver.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Care</h3>
              <p className="text-gray-700">
                We handle your belongings as if they were our own, ensuring a
                smooth and secure transition to your new space.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Simplicity
              </h3>
              <p className="text-gray-700">
                We are committed to making moving simple, stress-free, and
                accessible for everyone in our community.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Our Team Section - Enhanced with better animations and layout */}
      <div className="py-20 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Meet the Team
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto"
          >
            Behind every successful move is our dedicated team of professionals.
            From our expert movers to our friendly customer support, every
            member is committed to making your experience exceptional.
          </motion.p>

          {/* Team Members Grid - Enhanced with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dq3wkbgts/image/upload/w_250,h_250,c_fill,g_face,f_auto,q_auto/saidimu_mcqsnn.jpg"
                  alt="John Doe - CEO & Founder"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                Esther Njeri
              </h3>
              <p className="text-orange-600 font-semibold text-lg mb-4">
                CEO & Founder
              </p>
              <p className="text-gray-600 leading-relaxed">
                The visionary behind Rongai Movers. With over a decade of
                experience in logistics, John leads our team with unwavering
                commitment to excellence and a customer-first philosophy.
              </p>
            </motion.div>

            {/* Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dq3wkbgts/image/upload/w_250,h_250,c_fill,g_face,f_auto,q_auto/saidimu_mcqsnn.jpg"
                  alt="Esther Mwandi - Head of Operations"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                Esther Mwandi
              </h3>
              <p className="text-orange-600 font-semibold text-lg mb-4">
                Head of Operations
              </p>
              <p className="text-gray-600 leading-relaxed">
                The operational mastermind who ensures every move is executed
                flawlessly. Jane's meticulous planning and precision make even
                the most complex moves look effortless.
              </p>
            </motion.div>

            {/* Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative w-36 h-36 mx-auto mb-6 overflow-hidden rounded-full ring-4 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300">
                <Image
                  src="https://res.cloudinary.com/dq3wkbgts/image/upload/w_250,h_250,c_fill,g_face,f_auto,q_auto/saidimu_mcqsnn.jpg"
                  alt="Brian Wamugunda - Logistics Coordinator"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                Brian Wamugunda
              </h3>
              <p className="text-orange-600 font-semibold text-lg mb-4">
                Logistics Coordinator
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our organizational wizard who orchestrates the perfect symphony
                of logistics. Sam ensures every detail is meticulously planned
                and flawlessly executed.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us Section - New storytelling section */}
      <div className="bg-gray-900 py-20 px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 text-center">
            Why Rongai Chooses Us
          </h2>
          <p className="text-xl text-gray-300 mb-16 text-center max-w-3xl mx-auto">
            Over the years, we've become more than just movers – we're trusted
            neighbors, reliable partners, and the go-to choice for seamless
            relocations.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-orange-400 mb-4">
                500+
              </div>
              <h3 className="text-xl font-semibold mb-2">Happy Families</h3>
              <p className="text-gray-300">
                Successfully moved to their new homes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-orange-400 mb-4">99%</div>
              <h3 className="text-xl font-semibold mb-2">Satisfaction Rate</h3>
              <p className="text-gray-300">Customers who'd recommend us</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-orange-400 mb-4">6</div>
              <h3 className="text-xl font-semibold mb-2">Years Strong</h3>
              <p className="text-gray-300">Building trust in our community</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-orange-400 mb-4">
                24/7
              </div>
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-gray-300">Always here when you need us</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
