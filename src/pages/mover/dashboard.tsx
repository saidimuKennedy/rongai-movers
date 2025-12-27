import useRequireAuth from "@/hooks/useRequiredAuth";
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

interface Quote {
  id: string;
  origin: string;
  destination: string;
  moveDate: string;
  status: string;
  user: {
    name: string;
    email: string;
    phone?: string;
  };
}

export default function MoverDashboard() {
  useRequireAuth(Role.MOVER);
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("available");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading" || !session) return;
    fetchQuotes();
  }, [session, status, activeTab]);

  const fetchQuotes = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/movers/quotes?type=${activeTab}`);
      if (!res.ok) throw new Error("Failed to fetch quotes");
      const data = await res.json();
      setQuotes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch quotes");
    } finally {
      setIsLoading(false);
    }
  };

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

  const claimQuote = async (id: string) => {
    try {
      const res = await fetch("/api/movers/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId: id }),
      });

      if (!res.ok) throw new Error("Failed to claim quote");

      toast.success("Quote claimed successfully!");
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to claim quote");
    }
  };

  const updateQuoteStatus = async (quoteId: string, status: string) => {
    try {
      const res = await fetch("/api/movers/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteId, status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      toast.success("Status updated successfully!");
      fetchQuotes();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Mover Dashboard
          </h1>
          <div className="flex gap-2 bg-gray-100 p-1 rounded">
            <button
              onClick={() => setActiveTab("available")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "available"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Available Jobs
            </button>
            <button
              onClick={() => setActiveTab("claimed")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "claimed"
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              My Jobs
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded shadow-sm">
            <p className="text-gray-500">
              {activeTab === "available"
                ? "No available jobs at the moment"
                : "You haven't claimed any jobs yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
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

                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <p className="text-sm">
                      {new Date(quote.moveDate).toLocaleDateString()}
                    </p>
                  </div>

                  {quote.user && (
                    <div className="pt-4 border-t">
                      <p className="font-medium">{quote.user.name}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {quote.user.email}
                          </p>
                        </div>
                        {quote.user.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {quote.user.phone}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-end gap-2">
                    {activeTab === "available" ? (
                      <button
                        onClick={() => claimQuote(quote.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Claim Job
                      </button>
                    ) : (
                      <div className="space-x-2">
                        {quote.status !== "COMPLETED" && (
                          <button
                            onClick={() =>
                              updateQuoteStatus(quote.id, "COMPLETED")
                            }
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Complete
                          </button>
                        )}
                        {quote.status !== "CANCELLED" && (
                          <button
                            onClick={() =>
                              updateQuoteStatus(quote.id, "CANCELLED")
                            }
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
