/**
 * @file User Dashboard Page Component
 * @module pages/dashboard
 * @description This React component serves as the main dashboard for authenticated users.
 *              It automatically redirects users with 'ADMIN' or 'MOVER' roles to their
 *              respective dashboards. For other authenticated users (e.g., 'CLIENT'),
 *              it fetches and displays their submitted moving quotes, offering filtering
 *              options based on quote status. It provides a personalized overview
 *              of a user's quote history.
 */
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Loader2,
  Calendar,
  MapPin,
  Truck,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";

/**
 * Interface representing a moving quote object.
 * @interface Quote
 * @property {string} id - The unique identifier of the quote.
 * @property {string} userId - The ID of the user who submitted the quote.
 * @property {string | null} [moverId] - The ID of the mover assigned to the quote, or null if unclaimed.
 * @property {string} origin - The origin address for the move.
 * @property {string} destination - The destination address for the move.
 * @property {string} moveDate - The requested date for the move (ISO string).
 * @property {string | null} [message] - Optional message from the user.
 * @property {"moving" | "office" | "tv" | "longDistance" | "errand"} serviceType - The type of service requested.
 * @property {"CANCELLED" | "COMPLETED" | "CONFIRMED" | "PENDING"} status - The current status of the quote.
 * @property {string} createdAt - The timestamp when the quote was created (ISO string).
 * @property {string} updatedAt - The timestamp when the quote was last updated (ISO string).
 * @property {{ name: string; email: string; phone?: string; } | undefined} [user] - Optional user details.
 */
interface Quote {
  id: string;
  userId: string;
  moverId?: string | null;
  origin: string;
  destination: string;
  moveDate: string;
  message?: string | null;
  serviceType: "moving" | "office" | "tv" | "longDistance" | "errand";
  status: "CANCELLED" | "COMPLETED" | "CONFIRMED" | "PENDING";
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
}

/**
 * Type alias for the different service types available for a quote.
 * @typedef {Quote["serviceType"]} ServiceType
 */
type ServiceType = Quote["serviceType"];
/**
 * Type alias for the different possible statuses of a quote.
 * @typedef {Quote["status"]} QuoteStatus
 */
type QuoteStatus = Quote["status"];

/**
 * The main Dashboard component for authenticated users.
 *
 * This component handles:
 * - **Authentication & Authorization**: Redirects unauthenticated users to sign-in.
 *   Redirects 'ADMIN' and 'MOVER' roles to their specific dashboards.
 * - **Data Fetching**: Fetches the user's quotes from `/api/quotes`.
 * - **State Management**: Manages loading states, the list of quotes, and the active filter.
 * - **UI Presentation**: Displays quotes in a grid format with status badges and service icons,
 *   and provides a dropdown to filter quotes by status.
 *
 * @returns {JSX.Element} The user's personalized dashboard UI.
 */
export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | QuoteStatus>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") {
        router.push("/admin/dashboard");
        return;
      } else if (session?.user?.role === "MOVER") {
        router.push("/mover/dashboard");
        return;
      }
      fetchQuotes();
    }
  }, [status, router, session]);

  const fetchQuotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/quotes", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch quotes");
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Failed to fetch your quotes");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * A simple container component for consistent padding and max-width.
   *
   * @param {object} props - The component props.
   * @param {React.ReactNode} props.children - The content to be rendered inside the container.
   * @param {string} [props.className=""] - Additional CSS classes to apply to the container.
   * @returns {JSX.Element} A div element acting as a container.
   */
  const Container = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${className}`}
    >
      {children}
    </div>
  );

  /**
   * Returns the appropriate Lucide icon for a given service type.
   *
   * @param {ServiceType} serviceType - The type of service (e.g., "moving", "office").
   * @returns {JSX.Element} The corresponding icon component.
   */
  const getServiceIcon = (serviceType: ServiceType) => {
    const icons = {
      moving: <Truck className="h-5 w-5 text-orange-500" />,
      office: <Package className="h-5 w-5 text-blue-500" />,
      tv: <Package className="h-5 w-5 text-green-500" />,
      longDistance: <Truck className="h-5 w-5 text-purple-500" />,
      errand: <Package className="h-5 w-5 text-gray-500" />,
    };
    return icons[serviceType] || icons.errand;
  };

  /**
   * Returns a styled badge component for a given quote status.
   *
   * @param {QuoteStatus} status - The status of the quote (e.g., "PENDING", "COMPLETED").
   * @returns {JSX.Element} A span element styled as a status badge.
   */
  const getStatusBadge = (status: QuoteStatus) => {
    const badges = {
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      CONFIRMED: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: CheckCircle,
      },
      COMPLETED: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
      },
      CANCELLED: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
    };

    const badge = badges[status];
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}
      >
        <Icon className="h-4 w-4" />
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };

  const filteredQuotes = quotes.filter((quote) => {
    if (filter === "all") return true;
    return quote.status === filter;
  });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <Container>
      <main className="">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              My Quotes
            </h1>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | QuoteStatus)
                }
                className="appearance-none bg-white border border-gray-300 rounded py-2 pl-3 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Quotes</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded shadow-sm">
              <p className="text-gray-500">
                {filter === "all"
                  ? "You haven't submitted any quotes yet"
                  : `No ${filter.toLowerCase()} quotes`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-white rounded shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getServiceIcon(quote.serviceType)}
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {quote.serviceType.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </div>
                      {getStatusBadge(quote.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">From</p>
                          <p className="font-medium">{quote.origin}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-600">To</p>
                          <p className="font-medium">{quote.destination}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {new Date(quote.moveDate).toLocaleDateString(
                          undefined,
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    {quote.message && (
                      <div className="pt-2 border-t">
                        <p className="text-sm text-gray-600">{quote.message}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </Container>
  );
}
