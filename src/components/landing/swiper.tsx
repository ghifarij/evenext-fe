import { getEvents } from "@/libs/event";
import { IEvent } from "@/types/event";
import Image from "next/image";

export default async function Swiper() {
  const data: IEvent[] = await getEvents();
  return (
    <div className="flex items-center mx-auto max-w-[1200px] p-4">
      <div className="carousel w-full rounded-xl">
        {data.map((item, idx) => {
          return (
            <div
              key={idx}
              id={`slide${idx + 1}`}
              className="carousel-item relative w-full"
            >
              <div className="relative w-full h-[180px] md:h-[360px]">
                <Image
                  src={item.thumbnail}
                  alt={item.title || `Slide ${idx + 1}`}
                  layout="fill"
                  className="rounded-xl object-contain md:object-fill"
                />
              </div>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={`#slide${idx === 0 ? data.length : idx}`}
                  className="btn btn-circle"
                >
                  ❮
                </a>
                <a
                  href={`#slide${idx + 2 > data.length ? 1 : idx + 2}`}
                  className="btn btn-circle"
                >
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
