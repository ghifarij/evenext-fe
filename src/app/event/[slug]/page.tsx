
import { formatDate, formatTime } from "@/helpers/formatDate";
import { getEvents, getEventSlug } from "@/libs/event";
import { IEvent } from "@/types/event";
import Image from "next/image";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { FaClock, FaMap } from "react-icons/fa6";

export const generateStaticParams = async () => {
  const events: IEvent[] = await getEvents();

  return events.map((item) => ({
    slug: item.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const event: IEvent = await getEventSlug(params.slug);

  return {
    title: event.title,
    thumbnail: event.thumbnail,
    description: event.description,
    terms: event.terms,
    category: event.category,
    location: event.location,
    venue: event.venue,
    date: event.date,
    time: event.time,
    username: event.promotor.username,
    avatar: event.promotor.avatar,
  };
}

export default async function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const event: IEvent = await getEventSlug(params.slug);

  return (
    <div className="flex flex-col mx-auto max-w-[1200px] p-4">
      <div className="flex w-full">
        <div className="relative w-[770px] h-[375px]">
          <Image
            src={event.thumbnail}
            alt={"thumbnail"}
            layout="fill"
            className="rounded-xl object-cover"
          />
        </div>
        <div className="w-[350px] mx-auto rounded-xl shadow">
          <div className="flex justify-center p-4 mt-2">
            <div className="relative w-[50px] h-[50px]">
              <Image
                src={event.promotor.avatar}
                alt={"thumbnail"}
                layout="fill"
                className="object-cover rounded-full"
              />
            </div>
            <div className="w-[60%] p-1 ml-2">
              <p className="text-gray-500 text-sm">Event Creator</p>
              <p className="font-bold mt-1">{event.promotor.username}</p>
            </div>
          </div>
          <div className="ml-10 text-lg font-bold">{event.title}</div>
          <div className="flex ml-10 mt-4">
            <FaCalendarAlt className="text-teal-500 my-1" />
            <p className="ml-2 text-gray-500">{formatDate(event.date)}</p>
          </div>
          <div className="flex ml-10 mt-4">
            <FaClock className="text-teal-500 my-1" />
            <p className="ml-2 text-gray-500">{formatTime(event.time)}</p>
          </div>
          <div className="flex ml-10 mt-4">
            <FaMapMarkerAlt className="text-teal-500 my-1" />
            <p className="ml-2 text-gray-500">{event.location}</p>
          </div>
          <div className="flex ml-10 mt-4">
            <FaMap className="text-teal-500 my-1" />
            <p className="ml-2 text-gray-500">{event.venue}</p>
          </div>
          <div className="border-[1px] mt-4 w-[80%] mx-auto"></div>
        </div>
      </div>
      <div className="flex w-full mt-10">
        <div className="flex-1">
          <p className="text-teal-500 font-bold mb-2">{event.category}</p>
          <h2 className="text-lg font-bold mb-6">Deskripsi</h2>
          <div
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
          <h2 className="text-lg font-bold mb-2">Kebijakan</h2>
          <p className="text-gray-500">{event.terms}</p>
        </div>
        <div className="flex-1">
          <h2 className="text-teal-500 font-bold mb-2 ml-8">Pilih Tiket</h2>
          <div className="border-[1px] w-[90%] mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
