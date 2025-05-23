import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Truck,
} from "lucide-react";
import Link from "next/link";

interface Service {
  title: string;
}

interface FooterProps {
  services: Service[];
}

export default function Footer({ services }: FooterProps) {
  return (
    <footer className="bg-white text-[#1F2937] dark:bg-gray-800 dark:text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <h3 className="text-2xl font-bold text-[#E65C1C]">
                Rongai Errands & Movers
              </h3>
            </div>
            <p className="text-gray-500">
              Professional moving and errand services that simplify your life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, i) => (
                <li key={i} className="text-gray-500">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <p className="flex items-center text-gray-500">
                <Phone className="h-5 w-5 mr-2 text-[#E65C1C]" />
                +254 723 084530
              </p>
              <p className="flex items-center text-gray-500">
                <Mail className="h-5 w-5 mr-2 text-[#E65C1C]" />
                info@rongaimovers.co.ke
              </p>
              <p className="flex items-center text-gray-500">
                <MapPin className="h-5 w-5 mr-2 text-[#E65C1C]" />
                Rongai, Nairobi
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Rongai Errands & Movers. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-[#E65C1C]"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E65C1C]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E65C1C]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
