"use client";

import * as React from "react";
import { useState, useEffect } from "react";

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

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EventFilterSidebar } from "@/components/tickets/event-filter-sidebar";
import { getPublicEvents } from "../../../../../action/adminActions";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = React.useState({
    categories: [],
    dateRange: "all",
  });
  const [isFilterSheetOpen, setIsFilterSheetOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const eventsPerPage = 8; // Number of events to display per page

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const result = await getPublicEvents();
      console.log("Events API response:", result); // Debug log
      if (result.success) {
        setEvents(result.data || []);
        console.log("Events loaded:", result.data); // Debug log
      } else {
        console.error("Failed to load events:", result.message);
        setEvents([]);
      }
    } catch (error) {
      console.error("Error loading events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = React.useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  }, []);

  const filterEvents = () => {
    let filtered = events;

    // Filter by category
    if (filters.categories.length > 0) {
      filtered = filtered.filter((event) =>
        filters.categories.includes(event.category)
      );
    }

    // Filter by date range
    const now = new Date();
    filtered = filtered.filter((event) => {
      const eventDate = new Date(event.event_date);
      switch (filters.dateRange) {
        case "upcoming":
          return eventDate > now;
        case "this-month":
          return (
            eventDate.getMonth() === now.getMonth() &&
            eventDate.getFullYear() === now.getFullYear()
          );
        case "next-month":
          const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
          return (
            eventDate.getMonth() === nextMonth.getMonth() &&
            eventDate.getFullYear() === nextMonth.getFullYear()
          );
        case "all":
        default:
          return true;
      }
    });

    return filtered;
  };

  const filteredEvents = filterEvents();

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to create URL-friendly title (keeping for reference but not using)
  const createUrlTitle = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
        {/* Desktop Filter Sidebar (visible on lg and up) */}
        <aside className="hidden lg:block w-64 shrink-0 border-r pr-8">
          <h2 className="text-2xl font-bold mb-6">Filters</h2>{" "}
          {/* Title for desktop sidebar */}
          <EventFilterSidebar
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </aside>

        <main className="flex-1">
          {/* Mobile Header with "All Events" and Filter Button (visible below lg) */}
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <h2 className="text-3xl font-bold">All Events</h2>
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="py-2 px-4 text-base bg-transparent"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Events
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <EventFilterSidebar
                  onFilterChange={handleFilterChange}
                  onClose={() => setIsFilterSheetOpen(false)}
                  initialFilters={filters}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop "All Events" Heading (visible on lg and up) */}
          <h2 className="hidden lg:block text-3xl font-bold mb-8">
            All Events
          </h2>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-lg">No events found matching your filters.</p>
              <Button
                onClick={() =>
                  handleFilterChange({ categories: [], dateRange: "all" })
                }
                className="mt-4"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentEvents.map((event) => (
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
                      {event.event_date
                        ? new Date(event.event_date).toLocaleDateString()
                        : "Date TBD"}{" "}
                      | {event.location || "Location TBD"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {event.description || "No description available"}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button asChild className="w-full">
                      <Link href={`/event/${event.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
