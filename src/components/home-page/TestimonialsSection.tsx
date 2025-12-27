/**
 * TestimonialSection Component
 *
 * Displays customer testimonials in a carousel format with modal detail view.
 * Features:
 * - Auto-rotating carousel (6s intervals)
 * - Manual navigation with chevrons and dots
 * - Clickable testimonials that open detailed modal
 * - Fallback avatars with initials when no profile image exists
 * - Error handling with retry functionality
 * - Loading states
 * - Responsive design
 */

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Testimonial {
  id: string;
  testimonialText: string;
  name: string;
  location: string;
  verified: boolean;
  profileImage?: string;
  description?: string;
  avatarColor?: string; // Assigned dynamically
  avatar?: string; // Initials, assigned dynamically
  modalImage?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface AvatarProps {
  testimonial: Testimonial;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  showTooltip?: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const AVATAR_COLORS = [
  "bg-orange-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-red-500",
];

const CAROUSEL_INTERVAL_MS = 6000;

const AVATAR_SIZE_CLASSES = {
  small: "w-14 h-14 sm:w-16 sm:h-16",
  medium: "w-16 h-16 sm:w-20 sm:h-20",
  large: "w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28",
};

const AVATAR_TEXT_SIZE_CLASSES = {
  small: "text-lg sm:text-xl",
  medium: "text-xl sm:text-2xl lg:text-3xl",
  large: "text-2xl sm:text-3xl lg:text-4xl",
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generates initials from a full name
 * @example "John Doe" => "JD"
 */
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

/**
 * Assigns random avatar colors and generates initials for testimonials
 * Ensures no duplicate colors by removing assigned colors from the pool
 */
const assignRandomAssets = (
  fetchedTestimonials: Testimonial[]
): Testimonial[] => {
  const availableColors = [...AVATAR_COLORS];

  return fetchedTestimonials.map((testimonial) => {
    // Pick random color and remove it from pool
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const avatarColor =
      availableColors.length > 0
        ? availableColors.splice(randomIndex, 1)[0]
        : "bg-gray-500"; // Fallback if we run out of colors

    return {
      ...testimonial,
      avatarColor,
      avatar: getInitials(testimonial.name),
    };
  });
};

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

/**
 * Modal overlay component
 * Handles click-outside-to-close and portal-style rendering
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose} // Close on backdrop click
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md lg:max-w-xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
      >
        {children}
      </div>
    </div>
  );
};

/**
 * Avatar component with image fallback to initials
 * Handles image loading errors gracefully using React state
 */
const Avatar: React.FC<AvatarProps> = ({
  testimonial,
  size = "medium",
  onClick,
  showTooltip = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const showInitials = !testimonial.profileImage || imageError;

  const sizeClasses = AVATAR_SIZE_CLASSES[size];
  const textSizeClasses = AVATAR_TEXT_SIZE_CLASSES[size];

  return (
    <div
      className={`relative ${onClick ? "group cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div
        className={`${sizeClasses} rounded-full overflow-hidden ring-4 ring-orange-200 shadow-xl transition-all duration-300 group-hover:ring-orange-400 group-hover:scale-110`}
      >
        {showInitials ? (
          // Fallback: Show initials with colored background
          <div
            className={`w-full h-full ${
              testimonial.avatarColor || "bg-orange-500"
            } flex items-center justify-center text-white font-bold ${textSizeClasses} transition-transform duration-300 group-hover:scale-110`}
          >
            {testimonial.avatar}
          </div>
        ) : (
          // Primary: Show profile image
          <Image
            src={testimonial.profileImage!}
            alt={testimonial.name}
            width={112}
            height={112}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Verified badge */}
      {testimonial.verified && (
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Hover tooltip */}
      {showTooltip && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-orange-600 font-medium whitespace-nowrap">
          Click to view details
        </div>
      )}
    </div>
  );
};

/**
 * Star rating display component
 */
const StarRating: React.FC<{ size?: "small" | "medium" }> = ({
  size = "medium",
}) => {
  const sizeClass = size === "small" ? "h-5 w-5" : "h-6 w-6 sm:h-7 sm:w-7";

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} text-yellow-400 fill-current mx-1 drop-shadow-sm`}
        />
      ))}
    </div>
  );
};

/**
 * Navigation dots for carousel
 */
const CarouselDots: React.FC<{
  total: number;
  current: number;
  onSelect: (index: number) => void;
}> = ({ total, current, onSelect }) => {
  return (
    <div className="flex justify-center space-x-3 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to testimonial ${i + 1}`}
          className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ring-2 ${
            i === current
              ? "bg-orange-500 w-8 shadow-lg ring-orange-300"
              : "bg-gray-300 w-3 hover:bg-gray-400 ring-transparent hover:ring-orange-200"
          }`}
        />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TestimonialSection() {
  // State management
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  /**
   * Fetches testimonials from API on mount
   */
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/testimonials");

        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No testimonials available");
        }

        const testimonialsWithAssets = assignRandomAssets(data);
        setTestimonials(testimonialsWithAssets);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load testimonials"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // ============================================================================
  // AUTO-ROTATION
  // ============================================================================

  /**
   * Auto-advance carousel every 6 seconds
   */
  useEffect(() => {
    if (!isLoading && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, CAROUSEL_INTERVAL_MS);

      return () => clearInterval(interval);
    }
  }, [testimonials, isLoading]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTestimonialClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  // ============================================================================
  // RENDER STATES
  // ============================================================================

  if (isLoading) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <Loader2 className="h-12 w-12 text-orange-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 sm:py-16 lg:py-20">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-2 ring-orange-100">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5" />

            {/* Navigation Chevrons (desktop only) */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10 hidden md:block"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10 hidden md:block"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Testimonial Content */}
            <div
              key={currentIndex}
              className="relative p-8 sm:p-12 lg:p-16 text-center"
            >
              {/* Star Rating */}
              <div className="mb-6 sm:mb-8">
                <StarRating />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto">
                "{currentTestimonial.testimonialText}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Avatar
                  testimonial={currentTestimonial}
                  size="medium"
                  onClick={() => handleTestimonialClick(currentTestimonial)}
                  showTooltip
                />

                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-gray-900 text-xl sm:text-2xl mb-1">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {currentTestimonial.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Dots */}
        <CarouselDots
          total={testimonials.length}
          current={currentIndex}
          onSelect={handleDotClick}
        />
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        {selectedTestimonial && (
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors ring-2 ring-orange-200 hover:ring-orange-400"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Modal Header with Avatar */}
            <div
              className="relative h-80 w-full rounded-t-lg overflow-hidden bg-cover bg-center"
              style={
                {
                  backgroundImage: selectedTestimonial.modalImage
                    ? `url(${selectedTestimonial.modalImage})`
                    : "linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))",
                  "--tw-gradient-from": "rgba(255, 247, 237, 1)",
                  "--tw-gradient-to": "rgba(255, 251, 235, 1)",
                } as React.CSSProperties
              }
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                <Avatar testimonial={selectedTestimonial} size="large" />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 border-2 border-orange-200 border-t-0 rounded-b-lg">
              {/* Name and Location */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {selectedTestimonial.name}
                </h3>
                <p className="text-gray-600">{selectedTestimonial.location}</p>
              </div>

              {/* Star Rating */}
              <div className="mb-4">
                <StarRating size="small" />
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-gray-800 italic mb-4 text-center border-l-4 border-orange-300 pl-4">
                "{selectedTestimonial.testimonialText}"
              </blockquote>

              {/* Additional Description */}
              {selectedTestimonial.description && (
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    About the move
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {selectedTestimonial.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
