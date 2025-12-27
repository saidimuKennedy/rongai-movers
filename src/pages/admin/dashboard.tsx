import useRequireAuth from "@/hooks/useRequiredAuth";
import { Role } from "@prisma/client";
import { useState, useEffect } from "react";
import { Loader2, Users, FileText, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

// Interface for a user, based on what the API would return
interface User {
  id: string;
  name: string | null;
  email: string;
  role: Role;
}

// Interface for recent activity
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
  const [users, setUsers] = useState<User[]>([]);
  const [isUpdatingRole, setIsUpdatingRole] = useState<string | null>(null);

  // Fetch all dashboard data (stats and users)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch stats
        const statsRes = await fetch("/api/admin/stats");
        const statsData = await statsRes.json();
        setStats(statsData);

        // Fetch all users
        const usersRes = await fetch("/api/admin/users");
        if (!usersRes.ok) throw new Error("Failed to fetch users");
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to update a user's role via the API
  const updateUserRole = async (userId: string, newRole: Role) => {
    setIsUpdatingRole(userId);
    try {
      const response = await fetch("/api/admin/update-role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user role.");
      }

      const updatedUser = await response.json();
      
      // Update the user list state with the new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, role: updatedUser.role } : user
        )
      );

      toast.success(`Role for ${updatedUser.name || updatedUser.email} updated to ${updatedUser.role.toLowerCase()}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role.");
    } finally {
      setIsUpdatingRole(null);
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

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold mt-2 ${color}`}>
            {value}
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
    <Container>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Admin Dashboard
          </h1>
          {isLoading && (
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
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
              {stats.recentActivity?.length === 0 ? ( 
                <p className="text-gray-500 text-center py-8">No recent activity</p>
              ) : (
                <div className="space-y-4">
                  {stats.recentActivity?.map((activity) => (
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

            {/* User Management Section (NEW) */}
            <div className="bg-white rounded shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                User Management
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              updateUserRole(user.id, e.target.value as Role)
                            }
                            disabled={isUpdatingRole === user.id}
                            className="py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            {Object.values(Role).map((role) => (
                              <option key={role} value={role}>
                                {role.charAt(0) + role.slice(1).toLowerCase()}
                              </option>
                            ))}
                          </select>
                          {isUpdatingRole === user.id && (
                            <Loader2 className="inline-block ml-2 h-4 w-4 animate-spin text-orange-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
