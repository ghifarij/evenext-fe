import { IEvent } from "@/types/event";
import { getEvents } from "@/libs/event";
import Image from "next/image";
import { formatCurrency, formatDate } from "@/helpers/format";
import { ITicket } from "@/types/ticket";
import { getTickets } from "@/libs/ticket";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export default async function AllEvents() {
  const data: IEvent[] = await getEvents();
  const dataTicket: ITicket[] = await getTickets();
  return (
    <div className="flex flex-1 flex-wrap justify-center md:justify-between gap-4">
      {data.map((item, idx) => {
        const filteredTickets = dataTicket.filter(
          (ticket) =>
            ticket.eventId === item.id &&
            (ticket.category === "EarlyBird" || ticket.category === "Free")
        );

        return (
          <div
            key={idx}
            className="flex flex-col flex-wrap w-[270px] h-[310px] bg-white rounded-xl shadow-md"
          >
            <div className="relative w-full h-[120px] md:h-[140px]">
              <Image
                src={item.thumbnail}
                alt={item.title || `Slide ${idx + 1}`}
                layout="fill"
                className="rounded-t-xl object-fill"
              />
            </div>
            <div className="p-2 text-lg font-medium line-clamp-1 ml-1 h-10 mb-2">
              {item.title}
            </div>
            <div className="flex gap-2 text-gray-600 p-1 ml-2 text-sm">
              <FaCalendarAlt className="text-teal-500 my-1" />
              {formatDate(item.date)}
            </div>
            <div className="flex gap-2 text-gray-600 p-1 ml-2 text-sm">
              <FaMapMarkerAlt className="text-teal-500 my-1" />
              {item.location}
            </div>
            <span className="border-t-2 mt-1 w-[250px] mx-auto"></span>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, idx) => (
                <div key={idx} className="p-3 text-base font-bold">
                  {ticket.price ? `${formatCurrency(ticket.price)}` : "Free"}
                </div>
              ))
            ) : (
              <div className="text-gray-500 p-2 text-sm mt-1">
                No tickets available
              </div>
            )}
          </div>
        );
      })}
      <div className="join">
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="1"
          defaultChecked
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="2"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="3"
        />
        <input
          className="join-item btn btn-square"
          type="radio"
          name="options"
          aria-label="4"
        />
      </div>
    </div>
  );
}
