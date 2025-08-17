import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, User } from "lucide-react";
import { dummyPurchasedTickets } from "@/lib/dummy-data";

import { Separator } from "@/components/ui/separator";
import { UserDashboardCards } from "@/components/tickets/user-dashboard-cards";

export default function DashboardPage() {
  // Dummy user name for demonstration
  const userName = "John Doe";

  return (
    <div className="">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Welcome, {userName}!</h1>
        <p className="text-muted-foreground mb-8">
          Here's an overview of your activity.
        </p>

        <UserDashboardCards />

        <Separator className="my-8" />

        <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
        {dummyPurchasedTickets.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>You haven't purchased any tickets yet.</p>
            <Button asChild className="mt-4">
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyPurchasedTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardHeader>
                  <CardTitle>{ticket.eventName}</CardTitle>
                  <CardDescription>{ticket.ticketType} Ticket</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Purchased on: {ticket.purchaseDate}
                  </p>
                  <Button asChild className="bg-[#00453e]">
                    <a
                      href={ticket.pdfUrl}
                      download={`${ticket.eventName}-${ticket.ticketType}-Ticket.pdf`}
                      target="_blank" // Open in new tab to avoid navigation issues
                      rel="noopener noreferrer" // Security best practice for target="_blank"
                      className="flex items-center justify-center gap-2 bg-[#00453e]"
                    >
                      <Download className="h-4 w-4" />
                      Download E-Ticket
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Separator className="my-8" />

        <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
        <Card className="p-6">
          <CardTitle className="text-xl mb-2">
            Your Account Information
          </CardTitle>
          <CardDescription className="mb-4">
            Manage your personal details and preferences.
          </CardDescription>
          <div className="grid gap-2 text-sm">
            <p>
              <span className="font-medium">Name:</span> {userName}
            </p>
            <p>
              <span className="font-medium">Email:</span> john.doe@example.com
            </p>
            <p>
              <span className="font-medium">Member Since:</span> January 2024
            </p>
          </div>
          <Button asChild className="mt-6 bg-[#00453e]">
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" /> Manage Profile
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
