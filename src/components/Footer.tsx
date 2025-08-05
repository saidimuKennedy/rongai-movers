import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Clock,
  Award,
  Users,
  Star,
} from "lucide-react";
import Link from "next/link";
import TikTokIcon from "@/components/ui/TiktokIcon";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-1">
              <h3 className="text-2xl font-bold text-[#E65C1C]">
                Rongai Errands & Movers
              </h3>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Professional moving and errand services that simplify your life.
              We provide reliable, affordable, and efficient solutions for all
              your transportation and delivery needs in Nairobi.
            </p>

            {/* Why Choose Us */}
            <div className="space-y-2">
              <h5 className="font-semibold text-[#E65C1C]">Why Choose Us?</h5>
              <div className="flex items-center text-sm text-gray-500">
                <Award className="h-4 w-4 mr-2 text-[#E65C1C]" />
                Licensed & Insured
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2 text-[#E65C1C]" />
                Experienced Team
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 mr-2 text-[#E65C1C]" />
                5-Star Rated Service
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/house-moving"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  House Moving
                </Link>
              </li>
              <li>
                <Link
                  href="/services/office-relocation"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Office Relocation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/delivery"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Delivery Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/packing"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Packing Services
                </Link>
              </li>
             
              <li>
                <Link
                  href="/services/errands"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Personal Errands
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Get Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-[#E65C1C] transition-colors text-sm"
                >
                  Moving Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <p className="flex items-center text-gray-500 text-sm">
                <Phone className="h-4 w-4 mr-2 text-[#E65C1C] flex-shrink-0" />
                +254 723 084530
              </p>
              <p className="flex items-center text-gray-500 text-sm">
                <Mail className="h-4 w-4 mr-2 text-[#E65C1C] flex-shrink-0" />
                info@rongaimovers.co.ke
              </p>
              <p className="flex items-start text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-2 text-[#E65C1C] flex-shrink-0 mt-0.5" />
                Rongai, Nairobi County, Kenya
              </p>

              {/* Business Hours */}
              <div className="pt-2">
                <h5 className="font-semibold text-[#E65C1C] mb-2 text-sm">
                  Business Hours
                </h5>
                <div className="space-y-1">
                  <p className="flex items-center text-gray-500 text-xs">
                    <Clock className="h-3 w-3 mr-2 text-[#E65C1C]" />
                    Mon - Sat: 7:00 AM - 7:00 PM
                  </p>
                  <p className="flex items-center text-gray-500 text-xs ml-5">
                    Sunday: 8:00 AM - 5:00 PM
                  </p>
                  <p className="text-xs text-[#E65C1C] ml-5">
                    Emergency services available 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold mb-3 text-center">
            Areas We Serve
          </h4>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer">
              Rongai
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer">
              Karen
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer">
              Ngong
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer">
              Westlands
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer">
              Kilimani
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer">
              Lavington
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer">
              Nairobi CBD
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-[#E65C1C] hover:text-white transition-colors cursor-pointer animate-country-wide-glow">
              + country wide
            </span>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center max-w-md mx-auto">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-500 text-sm mb-4">
              Get moving tips and special offers delivered to your inbox
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E65C1C] focus:border-transparent"
              />
              <button className="px-4 py-2 bg-[#E65C1C] text-white text-sm rounded-md hover:bg-[#d54a0f] transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
              <p>
                © {new Date().getFullYear()} Rongai Errands & Movers. All rights
                reserved.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-[#E65C1C] transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-[#E65C1C] transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#E65C1C] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E65C1C] transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E65C1C] transition-colors"
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
