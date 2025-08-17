import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Ban,
  Mail,
  Calendar,
  Ticket,
  DollarSign,
} from "lucide-react";
import {
  getAdminDashboardStats,
  getAllUsers,
} from "../../../../../action/adminActions";

export default async function AdminUsers() {
  // Fetch users data and dashboard stats from backend
  const [usersResult, dashboardStats] = await Promise.all([
    getAllUsers(),
    getAdminDashboardStats(),
  ]);

  const usersData = usersResult.success
    ? usersResult.data
    : { users: [], total: 0 };

  const stats = dashboardStats.success ? dashboardStats.data : {};

  // Format users from database
  const users = (usersData.users || []).map((user) => ({
    id: user.id,
    name: user.name || "Unknown User",
    email: user.email || "No email",
    joinDate: user.created_at
      ? new Date(user.created_at).toLocaleDateString()
      : "Unknown Date",
    totalTickets: user.total_orders || 0,
    totalSpent: `৳${(parseFloat(user.total_spent) || 0).toFixed(2)}`,
    status: user.status || "active",
    avatar: "/placeholder.svg?height=40&width=40",
    lastLogin: user.last_login
      ? new Date(user.last_login).toLocaleDateString()
      : "Never",
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage all platform users</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {user.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Last login: 13/8/2025
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : user.status === "inactive"
                        ? "secondary"
                        : "destructive"
                    }
                    className={user.status === "active" ? "bg-[#00453e]" : ""}
                  >
                    {user.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {user.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div>
                  <div className="text-lg font-semibold text-gray-900 flex items-center gap-1">
                    <Ticket className="h-4 w-4" />
                    {user.totalTickets}
                  </div>
                  <div className="text-sm text-gray-600">Tickets Purchased</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-[#00453e] flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {user.totalSpent}
                  </div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-green-600">
                    {user.status === "active"
                      ? "Active"
                      : user.status === "inactive"
                      ? "Inactive"
                      : "Suspended"}
                  </div>
                  <div className="text-sm text-gray-600">Account Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total_users || 0}
            </div>
            <p className="text-sm text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {stats.active_users || 0}
            </div>
            <p className="text-sm text-gray-600">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.inactive_users || 0}
            </div>
            <p className="text-sm text-gray-600">Inactive Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {stats.suspended_users || 0}
            </div>
            <p className="text-sm text-gray-600">Suspended Users</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
