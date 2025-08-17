import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Heart, Ticket } from "lucide-react";

export default function UserFavoritesPage() {
  const favorites = [
    {
      id: 1,
      title: "Tennis Championship",
      date: "2024-07-10",
      venue: "Wimbledon",
      category: "Tennis",
      price: "From $100",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
    },
    {
      id: 2,
      title: "Basketball Finals",
      date: "2024-08-15",
      venue: "Madison Square Garden",
      category: "Basketball",
      price: "From $80",
      image: "/placeholder.svg?height=200&width=300",
      available: true,
    },
    {
      id: 3,
      title: "Football Championship",
      date: "2024-09-20",
      venue: "Old Trafford",
      category: "Football",
      price: "From $60",
      image: "/placeholder.svg?height=200&width=300",
      available: false,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Favorite Events</h2>
        <p className="text-gray-600">Events you've saved for later</p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-200 relative">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </Button>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <Badge className="bg-[#00453e]">{event.category}</Badge>
              </div>
              <CardDescription className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.venue}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#00453e]">
                  {event.price}
                </span>
                {event.available ? (
                  <Button className="bg-[#00453e] hover:bg-[#003530]">
                    <Ticket className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="bg-transparent">
                    Sold Out
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {favorites.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start exploring events and save your favorites!
            </p>
            <Button className="bg-[#00453e] hover:bg-[#003530]">
              Browse Events
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
