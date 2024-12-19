import { IEvent } from "@/types/event";
import { getEvents } from "@/libs/event";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/helpers/format";
import { ITicket } from "@/types/ticket";
import { getTickets } from "@/libs/ticket";

export default async function ClosestEvent() {
  const data: IEvent[] = await getEvents();
  const dataTicket: ITicket[] = await getTickets();

  return (
    <div className="flex flex-col mx-auto max-w-[1200px] p-4 mt-10">
      <div className="flex justify-between p-2">
        <h2 className="text-2xl font-bold">Event Terdekat</h2>
        <div className="flex flex-wrap text-teal-500 font-bold">
          <Link href={"/events"}>Semua Event</Link>
          <div className="flex flex-wrap text-teal-500 font-bold">
            <Link href={"/events"}>Semua Event</Link>
            <FaChevronRight className="m-1" />
          </div>
        </div>
        <div className="carousel carousel-center rounded-box w-full h-[320px] space-x-5 p-4">
          {data.map((item, idx) => {
            const filteredTickets = dataTicket.filter(
              (ticket) =>
                ticket.eventId === item.id &&
                (ticket.category === "EarlyBird" || ticket.category === "Free")
            );

            return (
              <div
                key={idx}
                className="flex flex-wrap flex-col carousel-item w-[270px] bg-white rounded-xl shadow-md"
              >
                <Link
                  className="relative w-full h-[120px] md:h-[140px]"
                  href={`/event/${item.slug}`}
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title || `Slide ${idx + 1}`}
                    layout="fill"
                    className="rounded-t-xl object-fill"
                  />
                </Link>
                <Link
                  className="p-2 text-lg font-medium line-clamp-1 h-10 mb-2"
                  href={`/event/${item.slug}`}
                >
                  {item.title}
                </Link>
                <div className="text-gray-600 p-1 ml-1 text-sm">
                  {formatDate(item.date)}
                </div>
                <div className="text-gray-600 p-1 ml-1 text-sm">
                  {item.location}
                </div>
                <span className="border-t-2 mt-1 w-[250px] mx-auto"></span>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, idx) => (
                    <div key={idx} className="p-2 text-sm font-bold">
                      {ticket.price
                        ? `${formatCurrency(ticket.price)}`
                        : "Free"}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 p-2 text-sm">
                    No tickets available
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
