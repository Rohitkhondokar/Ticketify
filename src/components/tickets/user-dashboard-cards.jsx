import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, Calendar, DollarSign } from "lucide-react";

export function UserDashboardCards() {
  // Dummy data for demonstration
  const eventsAttended = 7;
  const totalTicketsPurchased = 15;
  const totalSpent = 12500; // Example currency

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Events Attended</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{eventsAttended}</div>
          <p className="text-xs text-muted-foreground">
            Your event journey so far
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tickets Purchased
          </CardTitle>
          <Ticket className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTicketsPurchased}</div>
          <p className="text-xs text-muted-foreground">Across all events</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ৳{totalSpent.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            On tickets and services
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
