import { TicketHeader } from "@/components/ticket-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Target, Award, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Multi-Vendor Platform",
      description: "Connect event organizers with sports fans across the globe",
    },
    {
      icon: Target,
      title: "Easy Booking",
      description: "Simple and secure ticket booking process for all events",
    },
    {
      icon: Award,
      title: "Premium Events",
      description:
        "Access to exclusive sports events and premium seating options",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and encrypted payment processing for peace of mind",
    },
  ];

  const stats = [
    { number: "500+", label: "Events Hosted" },
    { number: "50K+", label: "Tickets Sold" },
    { number: "100+", label: "Event Organizers" },
    { number: "25K+", label: "Happy Customers" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TicketHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#00453e] to-[#006b5e] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About E-Ticketing
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            We're revolutionizing the way sports fans connect with their
            favorite events through our comprehensive multi-vendor ticketing
            platform.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              To create the most trusted and comprehensive platform for sports
              event ticketing, connecting passionate fans with unforgettable
              experiences while empowering event organizers to reach their
              audience effectively.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-[#00453e] rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#00453e] text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#00453e]">
                  For Event Organizers
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Easy event creation and management</li>
                  <li>• Multiple ticket types and pricing options</li>
                  <li>• Real-time analytics and reporting</li>
                  <li>• Secure payment processing</li>
                  <li>• Marketing and promotional tools</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#00453e]">
                  For Sports Fans
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Wide variety of sports events</li>
                  <li>• Secure and easy booking process</li>
                  <li>• Digital tickets with QR codes</li>
                  <li>• Mobile-friendly platform</li>
                  <li>• Customer support and assistance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking to attend amazing sports events or organize
            your own, we're here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#00453e] hover:bg-[#003530]"
              asChild
            >
              <Link href="/events">Browse Events</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#00453e] text-[#00453e] hover:bg-[#00453e] hover:text-white bg-transparent"
            >
              Become an Organizer
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">E-Ticketing</h3>
              <p className="text-gray-400">
                Your trusted platform for sports event tickets
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/events" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Organizers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/seller/register" className="hover:text-white">
                    Become a Seller
                  </Link>
                </li>
                <li>
                  <Link href="/seller" className="hover:text-white">
                    Seller Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 E-Ticketing Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
