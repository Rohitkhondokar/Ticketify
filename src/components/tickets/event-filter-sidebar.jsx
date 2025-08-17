"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const allCategories = ["Sports", "Concert"];
const dateRanges = [
  { value: "all", label: "All Dates" },
  { value: "upcoming", label: "Upcoming" },
  { value: "this-month", label: "This Month" },
  { value: "next-month", label: "Next Month" },
];

export function EventFilterSidebar({
  onFilterChange,
  onClose,
  initialFilters,
}) {
  const [selectedCategories, setSelectedCategories] = React.useState(
    initialFilters.categories
  );
  const [selectedDateRange, setSelectedDateRange] = React.useState(
    initialFilters.dateRange
  );

  React.useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      dateRange: selectedDateRange,
    });
  }, [selectedCategories, selectedDateRange, onFilterChange]);

  const handleCategoryChange = (category, checked) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedDateRange("all");
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close filters</span>
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, !!checked)
                }
              />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div>
        <h4 className="font-medium mb-3">Date</h4>
        <RadioGroup
          value={selectedDateRange}
          onValueChange={setSelectedDateRange}
          className="space-y-2"
        >
          {dateRanges.map((range) => (
            <div key={range.value} className="flex items-center space-x-2">
              <RadioGroupItem value={range.value} id={`date-${range.value}`} />
              <Label htmlFor={`date-${range.value}`}>{range.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}
