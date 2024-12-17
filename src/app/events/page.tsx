import AllEvents from "@/components/events/allEvents";
import FilterBar from "@/components/events/filterBar";

export default function EventsPage() {
  return (
    <div className="flex mx-auto max-w-[1200px] p-4">
      <FilterBar />
      <AllEvents />
    </div>
  );
}
