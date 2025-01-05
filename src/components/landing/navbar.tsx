import { useSession } from "@/hooks/useSession";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import Avatar from "./avatar";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IEvent } from "@/types/event";
import Image from "next/image";
import { formatDate } from "@/helpers/formatDate";
import BurgerHandphone from "./burgerHandphone";

const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchVisible, setSearchVisible] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [value, setValue] = useState<string>(searchParams.get("search") || "");
  const [text] = useDebounce(value, 500);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isAuth } = useSession();

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}/events/all?search=${text}`);
      const result = await res.json();

      const sortedEvents = (result.events || [])
        .sort(
          (a: IEvent, b: IEvent) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .slice(0, 5);

      setEvents(sortedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  useEffect(() => {
    if (text) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", text);
      router.push(`${pathname}?${params.toString()}`);
      getData();
      setSearchVisible(true);
    } else {
      setEvents([]);
      setSearchVisible(false);
      router.push(`${pathname}`);
    }
  }, [text, searchParams, pathname, router, getData]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!text) {
      setSearchVisible(false);
    }
  }, [text]);

  useEffect(() => {
    if (pathname === "/events" && text) {
      setSearchVisible(true);
    } else {
      setSearchVisible(false);
      setEvents([]);
    }
  }, [pathname, text]);

  // Reset search value when navigating to homepage
  useEffect(() => {
    if (pathname === "/") {
      setValue("");
      setEvents([]);
      setSearchVisible(false);
    }
  }, [pathname]);

  const handleEventClick = (slug: string) => {
    router.push(`/event/${slug}`);
    setValue("");
    setEvents([]);
    setSearchVisible(false);
  };

  const handleMobileSearchClickOutside = (e: React.MouseEvent) => {
    const searchModal = document.getElementById("search-modal");
    if (searchModal && !searchModal.contains(e.target as Node)) {
      setMobileSearchVisible(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", value);
      router.push(`/events?${params.toString()}`);

      setEvents([]);
      setSearchVisible(false);
    }
  };

  const scrollActive = scroll
    ? "py-4 bg-white shadow text-black"
    : "py-6 bg-white text-black";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const searchBox = document.getElementById("search-container");
      if (searchBox && !searchBox.contains(e.target as Node)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${scrollActive} px-10 md:px-[150px]`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link className="font-extrabold text-xl" href={"/"}>
          EVENEXT
        </Link>

        {/* Search for Desktop */}
        <div
          id="search-container"
          className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 relative"
        >
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Cari Event ..."
            className="bg-transparent outline-none w-[400px] text-sm"
            onFocus={() => value && setSearchVisible(true)}
          />
          <Link
            className="text-teal-800 ml-2"
            href={`/events?search=${value}`}
            onClick={() => {
              setSearchVisible(false);
            }}
          >
            <IoSearch size={20} />
          </Link>

          {searchVisible && events.length > 0 && (
            <div
              className="absolute top-[100%] left-0 right-0 bg-white shadow-lg mt-2 rounded-lg z-50 border border-gray-300"
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="p-4 max-h-[300px] overflow-y-auto">
                {events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event.slug)}
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2"
                  >
                    <div className="relative w-28 h-16">
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        layout="fill"
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{event.title}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6">
          <Link href={"/"} className="text-sm font-medium hover:text-teal-800">
            Biaya
          </Link>
          <Link
            href={"/events"}
            className="text-sm font-medium hover:text-teal-800"
          >
            Events
          </Link>
          <Link href={"/"} className="text-sm font-medium hover:text-teal-800">
            Kontak Kami
          </Link>
          <Link
            href={"/promotor/register"}
            className="text-sm font-medium hover:text-teal-800"
          >
            Buat Event
          </Link>
          {isAuth ? (
            <div className="flex items-center h-[20px] text-sm">
              <Avatar />
            </div>
          ) : (
            <Link
              href={"/user/login"}
              className="flex-none items-center rounded-full bg-black px-3 h-[20px] text-lg text-white shadow-sm hover:bg-teal-800"
            >
              <BiLogInCircle />
            </Link>
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setMobileSearchVisible(true)}
            className="text-teal-800"
          >
            <IoSearch size={20} />
          </button>
          {isAuth ? <Avatar /> : <BurgerHandphone />}
        </div>
      </div>

      {/* Mobile Search Modal */}
      {mobileSearchVisible && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-start pt-4"
          onClick={handleMobileSearchClickOutside}
        >
          <div
            id="search-modal"
            className="bg-white p-4 rounded-2xl w-full max-w-lg mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Cari Event ..."
                className="bg-transparent outline-none px-4 py-2 text-sm w-full"
              />
              <button
                className=" rounded-full px-4 py-2 ml-2"
                onClick={() => setMobileSearchVisible(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
