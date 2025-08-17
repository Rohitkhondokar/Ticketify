import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Concert Goer",
    rating: 5,
    review:
      "Tickify made finding and buying tickets so easy! I love the variety of events and the seamless checkout process.",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Event Organizer",
    rating: 5,
    review:
      "As an organizer, Tickify's platform is intuitive and helps me reach a wider audience. The analytics are incredibly useful!",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Emily White",
    role: "Sports Fan",
    rating: 5,
    review:
      "Seamless experience from browsing to e-ticket download. My go-to for all events now!",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Festival Enthusiast",
    rating: 4,
    review:
      "Great selection of festivals. The mobile ticket feature is super convenient.",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 5,
    name: "Sarah Green",
    role: "Theater Lover",
    rating: 5,
    review:
      "Found tickets for a sold-out show! The platform is reliable and user-friendly.",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 6,
    name: "David Lee",
    role: "Comedy Show Regular",
    rating: 4,
    review:
      "Always find good deals on comedy shows. Wish there were more filtering options, but overall great!",
    avatar: "/placeholder.svg?height=50&width=50",
  },
];

export function TestimonialSlider() {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <p className="text-muted-foreground mt-2">
          Hear from happy attendees and successful organizers.
        </p>
      </div>
      <div className="relative w-full flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex animate-marquee whitespace-nowrap">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex-shrink-0 w-[300px] mx-4 p-6"
            >
              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <CardDescription className="mb-4 italic text-center whitespace-normal">
                "{testimonial.review}"
              </CardDescription>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/woman.jpg"
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
          {/* Duplicate testimonials to create seamless loop */}
          {testimonials.map((testimonial, index) => (
            <Card
              key={`duplicate-${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[300px] mx-4 p-6"
              aria-hidden="true"
            >
              <div className="flex items-center justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <CardDescription className="mb-4 italic text-center whitespace-normal">
                "{testimonial.review}"
              </CardDescription>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src="/man.jpg"
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
