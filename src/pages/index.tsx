/**
 * @file Home Page Component
 * @module pages/index
 * @description This file defines the main Home page of the application.
 *              It serves as the root entry point (`/`) and primarily renders
 *              the `HomePage` component, which encapsulates the majority
 *              of the landing page's content and logic.
 *              This component itself is a thin wrapper to serve the home page.
 */
import HomePage from "@/components/home-page/HomePage";

/**
 * Renders the main Home page of the application.
 *
 * This component acts as the entry point for the application's root route.
 * It delegates the rendering of the actual home page content to the `HomePage`
 * component located in `src/components/home-page/HomePage`.
 *
 * @returns {JSX.Element} The `HomePage` component, representing the application's landing page.
 */
export default function Home() {
  return <HomePage />;
}
