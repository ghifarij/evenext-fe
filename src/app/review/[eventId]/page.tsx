import FormReview from "@/components/form/review/form";
import Star from "@/components/form/review/star";
import { formatDate, formatTime } from "@/helpers/formatDate";
import { getEventDetail } from "@/libs/event";
import { getReviews } from "@/libs/review";
import { IEvent } from "@/types/event";
import { IReview } from "@/types/review";
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";

export default async function ReviewPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { result }: { result: IEvent } = await getEventDetail(+params.eventId);
  const dataReviews: { result: IReview[] } = await getReviews(params.eventId);

  return (
    <div className="flex flex-col md:flex-row mx-auto max-w-[1200px] p-4 mb-10 gap-6">
      <div className="flex flex-col w-[300px] md:w-[500px]">
        <div className="shadow-lg rounded-xl h-[420px]">
          <div className="relative w-[300px] h-[120px]  md:w-[500px] md:h-[270px]">
            <Image
              src={result.thumbnail}
              alt={result.title}
              layout="fill"
              className="object-cover rounded-t-xl"
            />
          </div>
          <div className="flex mt-2 p-4">
            <div className="flex-1">
              <div className="text-lg font-bold">{result.title}</div>
              <div className="flex mt-2 gap-2">
                <FaCalendarAlt className="text-teal-500 my-1" />
                <p className="text-gray-500">{formatDate(result.date)}</p>
              </div>
              <div className="flex mt-2 gap-2">
                <FaClock className="text-teal-500 my-1" />
                <p className="text-gray-500">{formatTime(result.time)}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <h2 className="font-bold text-gray-600">Event Creator</h2>
              <div className="flex gap-1 mt-2">
                <FaUsers className="m-1 text-xl" />
                <p className="text-gray-600">{result.promotor.username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-xl my-4 p-4 mt-10">
          <h1 className="font-semibold text-2xl mb-4">Ceritakan Keseruanmu!</h1>
          <FormReview event_id={params.eventId} />
        </div>
      </div>
      <div className="flex flex-col w-[400px] md:w-[600px]">
        <h1 className="text-lg font-bold p-4">Review Customer</h1>
        {dataReviews.result.length > 0 ? (
          dataReviews.result.map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-teal-100 mx-4 py-2 rounded-xl shadow-lg border-teal-500 mb-2"
              >
                <div className="flex">
                  <div className="w-[800px] flex">
                    <div className="w-12 h-12 relative mx-4">
                      <Image
                        src={item.user.avatar}
                        alt={item.user.username}
                        layout="fill"
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold ">{item.user.username}</p>
                      <p className="text-gray-600">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full justify-end px-6">
                    <Star rate={item.rating} />
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: item.description }}
                  className="mt-2 indent-4"
                />
              </div>
            );
          })
        ) : (
          <div className="p-4">Tidak ada review</div>
        )}
      </div>
    </div>
  );
}
