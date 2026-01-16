/**
 * @file Dynamic User Profile Page Component
 * @module pages/user/[username]
 * @description This React component renders a dynamic user profile page,
 *              displaying the username extracted from the URL query parameters.
 *              It serves as a basic placeholder for individual user pages,
 *              which would typically include more extensive user information,
 *              activity, or settings.
 */
import { useRouter } from "next/router";

/**
 * Renders a dynamic user page based on the username in the URL.
 *
 * This component retrieves the `username` from the Next.js router's query parameters
 * and displays a welcome message. It is a foundational component for personal user
 * profiles within the application.
 *
 * @returns {JSX.Element} The user's profile page UI.
 */
export default function Userpage() {
  const router = useRouter();
  const { username } = router.query;

  return <h1>Welcome to {username}'s page</h1>;
}
