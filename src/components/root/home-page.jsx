import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { Calendar, Ticket, Users, MapPin } from "lucide-react"; // Added MapPin icon
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { dummyEvents } from "@/lib/dummy-data";
import { TestimonialSlider } from "@/components/tickets/testimonial-slider";
import { PartnershipSlider } from "@/components/tickets/partnership-slider";
import { getPublicEvents } from "../../../action/adminActions";

export default async function HomePage() {
  const events = await getPublicEvents();
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 lg:py-48 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Your Gateway to Unforgettable Events
          </h1>
          <p className="text-base md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Discover and book tickets for concerts, sports, and more. Organize
            your own events with ease.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-6 py-4 text-base sm:px-8 sm:py-6 sm:text-lg"
            >
              <Link href="/tickets/events">Explore Events</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-6 py-4 text-base sm:px-8 sm:py-6 sm:text-lg bg-transparent"
            >
              <Link href="/tickets/organizer">Become an Organizer</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works / Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 flex flex-col items-center text-center">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">
                Discover Events
              </CardTitle>
              <CardDescription>
                Browse a wide range of events from concerts to sports matches.
              </CardDescription>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <Ticket className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">
                Secure Your Tickets
              </CardTitle>
              <CardDescription>
                Easily purchase tickets with various payment options.
              </CardDescription>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <MapPin className="h-12 w-12 text-primary mb-4" />{" "}
              {/* New card with MapPin icon */}
              <CardTitle className="text-xl font-semibold mb-2">
                Find Locations
              </CardTitle>
              <CardDescription>
                Locate event venues easily with integrated map services.
              </CardDescription>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold mb-2">
                Enjoy the Experience
              </CardTitle>
              <CardDescription>
                Receive unique e-tickets and enjoy your chosen event.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Featured Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.data.slice(0, 10).map(
              (
                event // Show a few featured events
              ) => (
                <Card
                  key={event.id}
                  className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${event.image_url}`}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader className="flex-grow">
                    <CardTitle className="text-xl font-semibold">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {event.date} | {event.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {event.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4 ">
                    <Button asChild className="w-full bg-[#00453e]">
                      <Link href={`/event/${event.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="bg-[#00453e]">
              <Link href="/tickets/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Now a Slider */}
      <TestimonialSlider />

      {/* Partnership Slider Section */}
      <PartnershipSlider />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I buy tickets?</AccordionTrigger>
              <AccordionContent>
                Simply browse our events, select the event you wish to attend,
                choose your ticket type, and proceed to checkout. You can pay
                using various methods like bKash, Stripe, or PayPal.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I receive my e-ticket?</AccordionTrigger>
              <AccordionContent>
                After successful payment, your unique e-ticket will be available
                for download in your user dashboard. You'll also receive a
                confirmation email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I register my own event?</AccordionTrigger>
              <AccordionContent>
                Yes! Visit our "Become an Organizer" page to learn about the
                benefits and register your event. We provide tools to manage
                sales and track statistics.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What payment methods are supported?
              </AccordionTrigger>
              <AccordionContent>
                We support popular payment gateways including bKash, Stripe, and
                PayPal for secure transactions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Call to Action for Organizers */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Host Your Next Big Event?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Join our growing community of event organizers and unlock powerful
            tools to manage, promote, and sell tickets for your events.
          </p>
          <Button
            asChild
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg"
          >
            <Link href="/organizer">Start Organizing Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
