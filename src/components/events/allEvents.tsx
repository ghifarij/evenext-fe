"use client";

import { IEvent } from "@/types/event";
import { getAllEvents } from "@/libs/event";
import Image from "next/image";

import { ITicket } from "@/types/ticket";
import { getTickets } from "@/libs/ticket";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/helpers/formatDate";

export default function AllEvents({
  category,
  location,
}: {
  category?: string;
  location?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [events, setEvents] = useState<IEvent[]>([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPage =
        Number(new URLSearchParams(window.location.search).get("page")) || 1;
      setPage(currentPage);
    }
  }, []);

  const fetchData = async (
    currentPage: number,
    category?: string,
    location?: string,
    search?: string
  ) => {
    try {
      setLoading(true);
      const eventsData = await getAllEvents(
        currentPage,
        category,
        location,
        search
      );

      setEvents(eventsData.events || []);
      setTotalPages(eventsData.totalPage || 0);
    } catch (err) {
      console.error("Error fetching events: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = searchParams.get("search") || "";
    fetchData(page, category, location, search);
  }, [page, searchParams, category, location]);

  useEffect(() => {
    const fetchTickets = async () => {
      const tickets = await getTickets();
      setTickets(tickets);
    };

    fetchTickets();
  }, []);

  const handleNavigation = (newPage: number) => {
    setPage(newPage);
    router.push(`/events?page=${newPage}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 flex-wrap justify-center md:justify-normal gap-4">
      {events.map((item, idx) => {
        const filteredTickets = tickets.filter(
          (ticket) =>
            ticket.eventId === item.id &&
            (ticket.category === "EarlyBird" || ticket.category === "Free")
        );

        return (
          <div
            key={idx}
            className="flex flex-col flex-wrap w-[270px] h-[305px] bg-white rounded-xl shadow-md"
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
              className="p-2 text-lg font-medium line-clamp-1 ml-1 h-10 mb-2"
              href={`/event/${item.slug}`}
            >
              {item.title}
            </Link>
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
      <div className="flex w-full justify-center my-2">
        {page > 1 && (
          <button
            onClick={() => handleNavigation(page - 1)}
            className="flex items-center justify-center w-20 px-3 h-8 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-teal-500 hover:text-white"
          >
            Previous
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => handleNavigation(page + 1)}
            className="flex items-center justify-center w-20 px-3 h-8 ms-3 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-teal-500 hover:text-white"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
