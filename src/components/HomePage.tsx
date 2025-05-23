import React, { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { useModal } from "@/context/ModalContext";
import QuoteForm from "./forms/QuoteForm";

export default function HomePage() {
  const { openModal } = useModal();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleQuoteClick = () => {
    openModal("Get Your Free Quote", <QuoteForm />);
  };

  const contactInfo = {
    phone: "+254 723 084530",
    name: "Rongai errands & movers",
  };

  const services = [
    {
      title: "Household Moving",
      icon: <Home />,
      description: "Complete residential moving services",
    },
    {
      title: "Office Relocation",
      icon: <Building />,
      description: "Professional office moving solutions",
    },
    {
      title: "TV Mounting",
      icon: <Package />,
      description: "Expert TV installation services",
    },
    {
      title: "Long Distance Moving",
      icon: <Truck />,
      description: "Reliable long-distance relocation",
    },
  ];

  const testimonials = [
    {
      quote:
        "Nilihama kutoka Rongai mpaka Westlands bila stress yoyote. Professional sana!",
      name: "Sarah Kamau",
      location: "Westlands, Nairobi",
      rating: 5,
    },
    {
      quote:
        "Walifanya kazi nzuri sana wakihamisha office yangu. Bei yao ni poa na service ni the best.",
      name: "Michael Ouma",
      location: "Kilimani, Nairobi",
      rating: 5,
    },
    {
      quote:
        "TV yangu walitundika vizuri na kwa uangalifu. Nitawarekomena kwa marafiki zangu.",
      name: "Alice Wambui",
      location: "Rongai, Kajiado",
      rating: 5,
    },
  ];

  const benefits = [
    {
      title: "Affordable Rates",
      icon: <Clock className="h-12 w-12 text-orange-500" />,
      description: "Clear pricing with no hidden fees or surprises",
    },
    {
      title: "Expert Crew",
      icon: <Shield className="h-12 w-12 text-orange-500" />,
      description: "Trained professionals with years of experience",
    },
    {
      title: "Nationwide Service",
      icon: <Truck className="h-12 w-12 text-orange-500" />,
      description: "Available in major cities across the country",
    },
  ];

  const CircularDeliveryImage = () => {
    return (
      <div className="relative w-80 h-80 md:w-96 md:h-96 animate-bob">
        {/* Outer glow effect */}
        <div className="absolute -inset-6 rounded-full bg-yellow-400 opacity-30 blur-xl"></div>

        {/* Circular gradient background that matches the hero section */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF8A50] to-[#E65C1C] opacity-80"></div>

        {/* Inner glow effect */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 opacity-50 blur-sm"></div>

        {/* The image itself, masked in a circle */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* This div helps position the image within the circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* The actual image */}
              <img
                src="/images/delivery-guy.png"
                alt="Moving service illustration"
                className="object-contain w-full h-full scale-125 translate-y-5"
                style={{
                  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Speed lines overlay that extends beyond the circle */}
        <div className="absolute inset-0 scale-125 pointer-events-none">
          <div className="absolute top-1/4 -left-10 w-20 h-2 bg-orange-600 opacity-20 rounded-full transform -rotate-12"></div>
          <div className="absolute top-1/3 -left-12 w-24 h-2 bg-orange-600 opacity-20 rounded-full transform -rotate-12"></div>
          <div className="absolute top-2/5 -left-8 w-16 h-2 bg-orange-600 opacity-20 rounded-full transform -rotate-12"></div>

          <div className="absolute top-1/4 -right-10 w-20 h-2 bg-orange-600 opacity-20 rounded-full transform rotate-12"></div>
          <div className="absolute top-1/3 -right-12 w-24 h-2 bg-orange-600 opacity-20 rounded-full transform rotate-12"></div>
          <div className="absolute top-2/5 -right-8 w-16 h-2 bg-orange-600 opacity-20 rounded-full transform rotate-12"></div>
        </div>

        {/* Subtle pulsing glow animation */}
        <div className="absolute -inset-4 rounded-full bg-yellow-500 opacity-0 animate-glow-pulse"></div>
      </div>
    );
  };

  return (
    <div className="font-sans text-gray-800">
      <section className="relative bg-gradient-to-r from-[#E65C1C] to-[#FF8A50] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10 pattern-dots"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Rongai Errands <span className="text-white">&</span> Movers
            </h1>
            <p className="mt-6 text-lg md:text-xl lg:text-2xl max-w-lg mx-auto md:mx-0">
              Professional moving and errand services that simplify your life.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleQuoteClick}
                className="bg-white text-[#E65C1C] font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300"
              >
                Get a Quote
              </button>

              <button className="bg-[#1F2937] text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transform hover:scale-105 transition duration-300">
                Our Services
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <CircularDeliveryImage />
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white transform -translate-y-1/2 rounded-tl-full rounded-tr-full"></div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple 3-step process makes moving day a breeze
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-orange-100 transform -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-3 gap-10">
              {["Book Online", "We Pack & Move", "You Relax"].map((step, i) => (
                <div
                  key={i}
                  className="relative z-10 bg-white rounded-xl shadow-xl p-6 transform transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{step}</h3>
                  <p className="text-gray-600 text-center">
                    {i === 0 &&
                      "Schedule your move online in minutes with our easy booking system."}
                    {i === 1 &&
                      "Our professional team handles packing, loading, and transport with care."}
                    {i === 2 &&
                      "Sit back while we take care of the heavy lifting and logistics."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937]">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#E65C1C]"
              >
                <div className="flex justify-center mb-4">
                  {React.cloneElement(service.icon, {
                    className: "h-8 w-8 text-[#E65C1C]",
                  })}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
                <div className="mt-4 text-center">
                  <a
                    href="#"
                    className="inline-flex items-center text-orange-600 hover:text-orange-800"
                  >
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="italic text-gray-700 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Choose Us */}
      <section id="about" className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The MoveEase difference that sets us apart
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-lg shadow-lg text-center"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#E65C1C] to-[#FF8A50] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">
                Call or WhatsApp
              </h2>
              <p className="mt-4 text-xl">{contactInfo.phone}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-300">
                Book Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transform hover:scale-105 transition duration-300">
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
