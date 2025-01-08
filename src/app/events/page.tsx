"use client";

import AllEvents from "@/components/events/allEvents";
import FilterBar from "@/components/events/filterBar";
import { Suspense, useState } from "react";

export default function EventsPage() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <div className="flex mx-auto max-w-[1200px] p-4">
      <FilterBar
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
      />
      <Suspense>
        <AllEvents category={category} location={location} />
      </Suspense>
    </div>
  );
}
