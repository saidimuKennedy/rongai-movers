import useRequireAuth from "@/hooks/useRequiredAuth";
import { Role } from "@prisma/client";
import { useState, useEffect } from "react";
import { Loader2, Users, FileText, CheckCircle, Clock } from "lucide-react";

interface Activity {
  id: string;
  user: { name: string };
  status: string;
  origin: string;
  destination: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  useRequireAuth(Role.ADMIN);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    completedQuotes: 0,
    totalMovers: 0,
    recentActivity: [] as Activity[],
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold mt-2 ${color}`}>
            {isLoading ? "-" : value}
          </p>
        </div>
        <div
          className={`p-3 rounded-full bg-opacity-10 ${color.replace(
            "text",
            "bg"
          )}`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Admin Dashboard
        </h1>
        {isLoading && (
          <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Quotes"
          value={stats.totalQuotes}
          icon={FileText}
          color="text-blue-600"
        />
        <StatCard
          title="Pending Quotes"
          value={stats.pendingQuotes}
          icon={Clock}
          color="text-yellow-600"
        />
        <StatCard
          title="Completed Quotes"
          value={stats.completedQuotes}
          icon={CheckCircle}
          color="text-green-600"
        />
        <StatCard
          title="Active Movers"
          value={stats.totalMovers}
          icon={Users}
          color="text-purple-600"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : stats.recentActivity.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-x-2">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user.name}
                    </p>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        activity.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : activity.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {activity.status.toLowerCase()}
                    </span>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-600">
                      {activity.origin} → {activity.destination}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(activity.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
