// TODO: remove the avatar in modal 
import React, { useState, useEffect } from "react";
import {
  Star,
  CheckCircle,
  AlertCircle,
  Loader2,
  Quote,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Testimonial {
  id: string;
  testimonialText: string;
  name: string;
  location: string;
  verified: boolean;
  profileImage?: string;
  description?: string;
  avatarColor?: string;
  avatar?: string;
  modalImage?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md lg:max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const avatarColors = [
    "bg-orange-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-red-500",
  ];

  const assignRandomAssets = (fetchedTestimonials: Testimonial[]) => {
    const colors = [...avatarColors];
    return fetchedTestimonials.map((testimonial) => {
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const avatarColor =
        colors.length > 0
          ? colors.splice(randomColorIndex, 1)[0]
          : "bg-gray-500";

      const initials = testimonial.name
        ?.split(" ")
        .map((n) => n[0])
        .join("");

      return {
        ...testimonial,
        avatarColor,
        avatar: initials,
      };
    });
  };

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
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load testimonials"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isLoading && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials, isLoading]);

  const handleTestimonialClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleRetry = () => {
    window.location.reload();
  };

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

  const currentTest = testimonials[currentTestimonial];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-2 ring-orange-100">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5"></div>

            {/* Chevrons for navigation */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10 hidden md:block"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10 hidden md:block"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            <div
              key={currentTestimonial}
              className="relative p-8 sm:p-12 lg:p-16 text-center"
            >
              <div className="flex justify-center mb-6 sm:mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400 fill-current mx-1 drop-shadow-sm"
                  />
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto">
                "{currentTest.testimonialText}"
              </blockquote>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div
                  className="relative group cursor-pointer"
                  onClick={() => handleTestimonialClick(currentTest)}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden ring-4 ring-orange-200 shadow-xl transition-all duration-300 group-hover:ring-orange-400 group-hover:scale-110 group-focus:scale-110 group-focus:ring-orange-500">
                    {currentTest.profileImage ? (
                      <img
                        src={currentTest.profileImage}
                        alt={currentTest.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(
                          e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling!.style.display =
                            "flex";
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-full h-full ${
                        currentTest.avatarColor || "bg-orange-500"
                      } flex items-center justify-center text-white font-bold text-xl sm:text-2xl lg:text-3xl transition-transform duration-300 group-hover:scale-110 ${
                        currentTest.profileImage ? "hidden" : "flex"
                      }`}
                      style={{
                        display: currentTest.profileImage ? "none" : "flex",
                      }}
                    >
                      {currentTest.avatar}
                    </div>
                  </div>
                  {currentTest.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-orange-600 font-medium whitespace-nowrap">
                    Click to view details
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h4 className="font-bold text-gray-900 text-xl sm:text-2xl mb-1">
                    {currentTest.name}
                  </h4>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {currentTest.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-3 mb-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTestimonial(i)}
              className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ring-2 ${
                i === currentTestimonial
                  ? "bg-orange-500 w-8 shadow-lg ring-orange-300"
                  : "bg-gray-300 w-3 hover:bg-gray-400 ring-transparent hover:ring-orange-200"
              }`}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedTestimonial && (
          <div className="relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors ring-2 ring-orange-200 hover:ring-orange-400"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Restored avatar and info on top of the modal background image */}
            <div
              className="relative h-80 w-full rounded-t-lg overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: selectedTestimonial.modalImage
                  ? `url(${selectedTestimonial.modalImage})`
                  : "linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))",
                "--tw-gradient-from": "rgba(255, 247, 237, 1)",
                "--tw-gradient-to": "rgba(255, 251, 235, 1)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-orange-300 shadow-xl bg-white">
                  {selectedTestimonial.profileImage ? (
                    <img
                      src={selectedTestimonial.profileImage}
                      alt={selectedTestimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling!.style.display =
                          "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full ${
                      selectedTestimonial.avatarColor || "bg-orange-500"
                    } flex items-center justify-center text-white font-bold text-2xl ${
                      selectedTestimonial.profileImage ? "hidden" : "flex"
                    }`}
                    style={{
                      display: selectedTestimonial.profileImage
                        ? "none"
                        : "flex",
                    }}
                  >
                    {selectedTestimonial.avatar}
                  </div>
                </div>
                {selectedTestimonial.verified && (
                  <div className="absolute mt-[6rem] ml-[6rem] w-8 h-8 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-2 border-orange-200 border-t-0 rounded-b-lg">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {selectedTestimonial.name}
                </h3>
                <p className="text-gray-600">{selectedTestimonial.location}</p>
              </div>

              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current mx-0.5"
                  />
                ))}
              </div>

              <blockquote className="text-gray-800 italic mb-4 text-center border-l-4 border-orange-300 pl-4">
                "{selectedTestimonial.testimonialText}"
              </blockquote>

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
