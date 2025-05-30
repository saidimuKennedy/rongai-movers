import useRequireAuth from "@/hooks/useRequiredAuth"; // Corrected import path
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MoverDashboard() {
  useRequireAuth(Role.MOVER);
  const { data: session, status } = useSession();

  const [quotes, setQuotes] = useState<
    { id: string; origin: string; destination: string; moveDate: string }[]
  >([]);

  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      fetch("/api/movers/quotes")
        .then((res) => res.json())
        .then(setQuotes)
        .catch((err) => console.error(err));
    }
  }, [session, status]);

  async function claimQuote(id: string) {
    const res = await fetch("/api/movers/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quoteId: id }),
    });

    if (res.ok) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    } else {
      console.error("Failed to claim quote");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id} className="mb-4 border p-4 rounded shadow">
            <p>
              <strong>From:</strong> {quote.origin}
            </p>
            <p>
              <strong>To:</strong> {quote.destination}
            </p>
            <p>
              <strong>Move Date:</strong>{" "}
              {new Date(quote.moveDate).toLocaleDateString()}
            </p>
            <button
              onClick={() => claimQuote(quote.id)}
              className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            >
              Claim Job
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
