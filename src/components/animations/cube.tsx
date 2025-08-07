import About from "@/components/AboutSection";
import Contact from "@/components/ContactSection";
// import TrackingSection from "@/components/TrackingSection";
import Gallery from "@/components/GallerySection";
//import  Offers from "@/components/OffersSection"
//import  Careers from "@/components/CareersSection"
//import  Portfolio from "@/components/PortfolioSection"
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  RefreshCcw,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Testimonials from "../testimonials";

const faceComponents = {
  About: About,
  Contact: Contact,
  Gallery: Gallery,
  //Portfolio: Portfolio,
  Testimonials: Testimonials,
};

export default function BoxCube(): JSX.Element {
  const [rotation, setRotation] = useState({ x: -15, y: -25 });
  const [mouseRotation, setMouseRotation] = useState({ x: 0, y: 0 });
  const [activeFace, setActiveFace] = useState<number | null>(null);
  const [focusedFace, setFocusedFace] = useState(0);
  const [isMouseTracking, setIsMouseTracking] = useState(true);
  const containerRef = useRef(null);

  // Uniform cardboard box styling for all faces
  const cardboardColor = "#fb923c"; // orange-400 (vibrant, warm)
  const cardboardEdgeColor = "#f97316"; // orange-500 for face edges
  const cardboardTopColor = "#ea580c"; // orange-600 for subtle 3D shading
  const cardboardShadow = "0 20px 40px rgba(249, 115, 22, 0.3)"; // soft orange glow
  const cardboardInset =
    "inset -4px -4px 6px rgba(0,0,0,0.15), inset 4px 4px 6px rgba(255,255,255,0.05)";

  const faces = [
    { id: 1, name: "Careers" },
    { id: 2, name: "Contact" },
    { id: 3, name: "Gallery" },
    { id: 4, name: "Testimonials" },
    { id: 5, name: "About" },
    { id: 6, name: "Portfolio" },
  ];

  const rotate = (axis: "x" | "y", value: number) => {
    if (activeFace !== null) return; // Disable rotation when face is active
    setIsMouseTracking(false); // Disable mouse tracking when manually rotating
    setRotation((prev) => ({ ...prev, [axis]: prev[axis] + value }));

    // Re-enable mouse tracking after a delay
    setTimeout(() => setIsMouseTracking(true), 1000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseTracking || activeFace !== null || !containerRef.current)
      return;

    const container = containerRef.current as HTMLDivElement;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Convert mouse position to rotation angles
    // Limit the rotation range for better UX
    const maxRotation = 30;
    const rotationY = (mouseX / (rect.width / 2)) * maxRotation;
    const rotationX = -(mouseY / (rect.height / 2)) * maxRotation;

    setMouseRotation({
      x: Math.max(-maxRotation, Math.min(maxRotation, rotationX)),
      y: Math.max(-maxRotation, Math.min(maxRotation, rotationY)),
    });
  };

  const handleMouseLeave = () => {
    if (!isMouseTracking || activeFace !== null) return;
    setMouseRotation({ x: 0, y: 0 });
  };

  const handleFaceClick = (faceIndex: number) => {
    if (activeFace === faceIndex) {
      setActiveFace(null);
    } else {
      setActiveFace(faceIndex);
    }
  };

  const resetView = () => {
    setRotation({ x: -15, y: -25 });
    setMouseRotation({ x: 0, y: 0 });
    setIsMouseTracking(true);
  };

  const toggleMouseTracking = () => {
    setIsMouseTracking(!isMouseTracking);
    if (!isMouseTracking) {
      setMouseRotation({ x: 0, y: 0 });
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (activeFace !== null) {
      if (e.key === "Escape") {
        setActiveFace(null);
      }
      return;
    }

    switch (e.key) {
      case "ArrowLeft":
        rotate("y", -90);
        break;
      case "ArrowRight":
        rotate("y", 90);
        break;
      case "ArrowUp":
        rotate("x", -90);
        break;
      case "ArrowDown":
        rotate("x", 90);
        break;
      case "Tab":
        e.preventDefault();
        setFocusedFace((prev) => (prev + 1) % faces.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleFaceClick(focusedFace);
        break;
      case "r":
      case "R":
        resetView();
        break;
      case "m":
      case "M":
        toggleMouseTracking();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFace, focusedFace]);

  // Combined rotation values
  const finalRotation = {
    x: rotation.x + mouseRotation.x,
    y: rotation.y + mouseRotation.y,
  };

  const activeFaceName = activeFace !== null ? faces[activeFace].name : null;
  const ComponentToRender: React.ElementType | null = activeFaceName && activeFaceName in faceComponents
    ? faceComponents[activeFaceName as keyof typeof faceComponents]
    : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 gap-8 overflow-hidden relative">
      {/* Fullscreen Face Overlay */}
      {activeFace !== null && (
        <div
          className="fixed inset-0 z-50 cursor-pointer"
          style={{
            background: cardboardColor,
            animation: "telescopeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onClick={() => setActiveFace(null)}
          onTouchEnd={() => setActiveFace(null)}
        >
          {/* Inner Content Container */}
          <div
            className="relative bg-white text-black shadow-2xl w-full h-full overflow-y-scroll"
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing
          >
            <button
              onClick={() => setActiveFace(null)}
              className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg z-50"
              aria-label="Back to cube"
            >
              <ChevronLeft size={24} />
            </button>
             {/* 3. Render the component dynamically */}
            {ComponentToRender ? (
              <ComponentToRender /> // This line is causing the error
            ) : (
              <div className="text-center py-10">
                <h1 className="text-4xl font-bold">{activeFaceName}</h1>
                <p className="mt-4 text-gray-600">
                  This section is coming soon. Tap anywhere to exit.
                </p>
              </div>
            )}
          </div>


          {/* Animated background elements */}
          {/* <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 100 + 20 + "px",
                  height: Math.random() * 100 + 20 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animation: `float ${
                    3 + Math.random() * 4
                  }s ease-in-out infinite`,
                  animationDelay: Math.random() * 2 + "s",
                }}
              />
            ))}
          </div> */}
        </div>
      )}

      <style jsx>{`
        @keyframes telescopeIn {
          0% {
            transform: scale(0.1) rotate(180deg);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .face-interactive {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .face-interactive:hover:not(.face-focused) {
          box-shadow: 0 0 30px rgba(210, 180, 140, 0.6) !important;
        }

        .mouse-tracking-indicator {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 8px 12px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 6px;
          font-size: 12px;
          z-index: 10;
        }
      `}</style>

      {/* Mouse Tracking Indicator */}
      <div className="mouse-tracking-indicator">
        <span
          className={`inline-block w-2 h-2 rounded-full mr-2 ${
            isMouseTracking ? "bg-orange-400" : "bg-red-400"
          }`}
        ></span>
        Mouse Tracking: {isMouseTracking ? "ON" : "OFF"}
      </div>

      {/* 3D Scene Container */}
      <div
        ref={containerRef}
        className="relative w-full h-96 flex justify-end items-end pr-20 pb-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floor */}
        <div
          className="absolute bottom-0 right-0 w-[800px] h-[600px] opacity-40"
          style={{
            background:
              "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)",
            transform: "perspective(1200px) rotateX(85deg) translateZ(-200px)",
            transformOrigin: "bottom center",
            borderRadius: "20px",
            boxShadow: "inset 0 0 100px rgba(0,0,0,0.1)",
          }}
        />

        {/* Main Scene */}
        <div
          className="relative"
          style={{
            width: "200px",
            height: "200px",
            perspective: "1500px",
            perspectiveOrigin: "50% 30%",
          }}
        >
          {/* Floor Shadow */}
          <div
            className="absolute"
            style={{
              width: "300px",
              height: "200px",
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)",
              bottom: "-50px",
              left: "50%",
              transform:
                "translateX(-50%) perspective(800px) rotateX(90deg) translateZ(-100px)",
              borderRadius: "50%",
              filter: "blur(8px)",
            }}
          />

          {/* Cube Container */}
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${finalRotation.x}deg) rotateY(${finalRotation.y}deg) translateZ(50px)`,
              transition: isMouseTracking
                ? "transform 0.15s ease-out"
                : "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Cube Faces */}
            <div
              className={`absolute w-48 h-48 flex items-center justify-center text-lg font-bold text-orange-900 border-2 border-amber-700 face-interactive ${
                focusedFace === 0 ? "face-focused" : ""
              }`}
              style={{
                background: cardboardColor,
                transform: "rotateY(0deg) translateZ(96px)",
                boxShadow: cardboardShadow + ", " + cardboardInset,
                backfaceVisibility: "hidden",
              }}
              onClick={() => handleFaceClick(0)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFaceClick(0);
              }}
            >
              {faces[0].name}
            </div>

            <div
              className={`absolute w-48 h-48 flex items-center justify-center text-lg font-bold text-amber-900 border-2 border-amber-700 face-interactive ${
                focusedFace === 1 ? "face-focused" : ""
              }`}
              style={{
                background: cardboardColor,
                transform: "rotateY(180deg) translateZ(96px)",
                boxShadow: cardboardShadow + ", " + cardboardInset,
                backfaceVisibility: "hidden",
              }}
              onClick={() => handleFaceClick(1)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFaceClick(1);
              }}
            >
              {faces[1].name}
            </div>

            <div
              className={`absolute w-48 h-48 flex items-center justify-center text-lg font-bold text-amber-900 border-2 border-amber-700 face-interactive ${
                focusedFace === 2 ? "face-focused" : ""
              }`}
              style={{
                background: cardboardColor,
                transform: "rotateY(90deg) translateZ(96px)",
                boxShadow: cardboardShadow + ", " + cardboardInset,
                backfaceVisibility: "hidden",
              }}
              onClick={() => handleFaceClick(2)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFaceClick(2);
              }}
            >
              {faces[2].name}
            </div>

            <div
              className={`absolute w-48 h-48 flex items-center justify-center text-lg font-bold text-amber-900 border-2 border-amber-700 face-interactive ${
                focusedFace === 3 ? "face-focused" : ""
              }`}
              style={{
                background: cardboardColor,
                transform: "rotateY(-90deg) translateZ(96px)",
                boxShadow: cardboardShadow + ", " + cardboardInset,
                backfaceVisibility: "hidden",
              }}
              onClick={() => handleFaceClick(3)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFaceClick(3);
              }}
            >
              {faces[3].name}
            </div>

            <div
              className={`absolute w-48 h-48 flex items-center justify-center text-lg font-bold text-amber-900 border-2 border-amber-700 face-interactive ${
                focusedFace === 4 ? "face-focused" : ""
              }`}
              style={{
                background: cardboardColor,
                transform: "rotateX(90deg) translateZ(96px)",
                boxShadow: cardboardShadow + ", " + cardboardInset,
                backfaceVisibility: "hidden",
              }}
              onClick={() => handleFaceClick(4)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFaceClick(4);
              }}
            >
              {faces[4].name}
            </div>

            <div
              className={`absolute w-48 h-48 flex items-center justify-center text-lg font-bold text-amber-900 border-2 border-amber-700 face-interactive ${
                focusedFace === 5 ? "face-focused" : ""
              }`}
              style={{
                background: cardboardColor,
                transform: "rotateX(-90deg) translateZ(96px)",
                boxShadow: cardboardShadow + ", " + cardboardInset,
                backfaceVisibility: "hidden",
              }}
              onClick={() => handleFaceClick(5)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleFaceClick(5);
              }}
            >
              {faces[5].name}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {activeFace === null && (
        <div className="flex gap-2 flex-wrap justify-center">
          {/* Rotate Left */}
          <button
            onClick={() => rotate("y", -90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Rotate Right */}
          <button
            onClick={() => rotate("y", 90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronRight size={20} />
          </button>

          {/* Rotate Up */}
          <button
            onClick={() => rotate("x", -90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronUp size={20} />
          </button>

          {/* Rotate Down */}
          <button
            onClick={() => rotate("x", 90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronDown size={20} />
          </button>

          {/* Reset View */}
          <button
            onClick={resetView}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <RefreshCcw size={20} />
          </button>

          {/* Toggle Mouse Tracking */}
          <button
            onClick={toggleMouseTracking}
            className={`p-2 rounded-md shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              isMouseTracking
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            <span className="text-xs font-bold">M</span>
          </button>
        </div>
      )}

      {/* Instructions */}
      {activeFace === null && (
        <div className="flex gap-2 flex-wrap justify-center">
          {/* Rotate Left */}
          <button
            onClick={() => rotate("y", -90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Rotate Right */}
          <button
            onClick={() => rotate("y", 90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronRight size={20} />
          </button>

          {/* Rotate Up */}
          <button
            onClick={() => rotate("x", -90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronDown size={20} />
          </button>

          {/* Rotate Down */}
          <button
            onClick={() => rotate("x", 90)}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <ChevronUp size={20} />
          </button>

          {/* Reset View */}
          <button
            onClick={resetView}
            className="p-2 bg-zinc-800 text-zinc-100 rounded-md shadow-lg transition-all duration-300 hover:bg-zinc-700 hover:shadow-orange-glow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <RefreshCcw size={20} />
          </button>

          {/* Toggle Mouse Tracking */}
          <button
            onClick={toggleMouseTracking}
            className={`p-2 rounded-md shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              isMouseTracking
                ? "bg-green-600 text-white hover:bg-green-500"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            <span className="text-xs font-bold">W</span>
          </button>
        </div>
      )}

      {activeFace === null && (
        <div className="text-center text-slate-600 text-sm max-w-lg">
          <p className="mb-2">
            <strong>Move Mouse</strong> to track cube •{" "}
            <strong>Click/Tap</strong> any face to expand •{" "}
            <strong>Arrow Keys</strong> to rotate • <strong>Tab</strong> to
            navigate • <strong>Enter/Space</strong> to select •{" "}
            <strong>R</strong> to reset • <strong>M</strong> to toggle mouse
            tracking
          </p>
        </div>
      )}
    </div>
  );
}
