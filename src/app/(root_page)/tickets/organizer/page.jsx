"use client";

import { CardDescription } from "@/components/ui/card";

import { CardTitle } from "@/components/ui/card";

import { Card } from "@/components/ui/card";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CheckCircle,
  Users,
  DollarSign,
  BarChart,
  Megaphone,
} from "lucide-react";
import { OrganizerRegistrationForm } from "@/components/tickets/organizer-registration-form";
import { BecomeOrganizerModal } from "@/components/become-organizer-modal";

export default function OrganizerPage() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <div>
      {/* Hero Section for Organizers */}
      <section className="relative w-full py-24 md:py-32 lg:py-48 bg-gradient-to-r from-purple-700 to-indigo-800 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Empower Your Events with Tickify
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Seamlessly manage, promote, and sell tickets for your events. Reach
            a wider audience and gain valuable insights.
          </p>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-primary-foreground text-purple-700 hover:bg-primary-foreground/90 px-8 py-6 text-lg"
          >
            Register Your Event Today
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Organize with Tickify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">
                Reach More Attendees
              </CardTitle>
              <CardDescription>
                Tap into our extensive user base and fill your events.
              </CardDescription>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">
                Secure Payments
              </CardTitle>
              <CardDescription>
                Offer multiple trusted payment options to your customers.
              </CardDescription>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <BarChart className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">
                Insightful Analytics
              </CardTitle>
              <CardDescription>
                Track ticket sales, attendee demographics, and more with ease.
              </CardDescription>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <Megaphone className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">
                Powerful Promotion
              </CardTitle>
              <CardDescription>
                Utilize our tools to promote your events effectively.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Our Organizer Policies
          </h2>
          <div className="max-w-4xl mx-auto space-y-8 text-gray-700">
            <div>
              <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" /> Event
                Eligibility
              </h3>
              <p>
                Events must comply with all local laws and regulations. Tickify
                reserves the right to review and approve all events before they
                are listed on the platform. Prohibited content includes, but is
                not limited to, illegal activities, hate speech, and
                discriminatory content.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" /> Ticket Sales
                & Payouts
              </h3>
              <p>
                Organizers are responsible for setting ticket prices and
                quantities. Tickify charges a small service fee per ticket sold,
                which will be clearly outlined in your organizer agreement.
                Payouts for ticket sales are processed securely and transferred
                to your designated bank account within 3-5 business days after
                the event concludes.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" /> Event
                Management & Support
              </h3>
              <p>
                Our platform provides a comprehensive dashboard for managing
                your event details, tracking sales, and communicating with
                attendees. Dedicated support is available to assist you with any
                queries or issues you may encounter during your event planning
                and execution.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" /> Cancellation
                & Refunds
              </h3>
              <p>
                Organizers are responsible for their own cancellation and refund
                policies. However, these policies must be clearly communicated
                to attendees at the time of purchase. Tickify will facilitate
                refunds according to the organizer's stated policy.
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => setIsFormOpen(true)} size="lg">
              Join as an Organizer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card text-card-foreground text-center text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Tickify. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>

      <BecomeOrganizerModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        setIsOpen={setIsFormOpen}
      />
    </div>
  );
}
