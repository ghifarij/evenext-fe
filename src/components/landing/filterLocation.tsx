"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface FilterLocationProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

export default function FilterLocation({
  selectedLocation,
  setSelectedLocation,
}: FilterLocationProps) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const locations = ["Bandung", "Jakarta", "Surabaya", "Bali"];

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setDropdownOpen(false);
  };

  const filteredLocations = locations.filter(
    (location) => location !== selectedLocation
  );
  return (
    <div className="flex flex-col flex-none mt-4">
      <div className="dropdown dropdown-bottom rounded-lg w-32 py-1">
        <div
          tabIndex={0}
          role="button"
          className="flex justify-between md:ml-6"
          onClick={toggleDropdown}
        >
          <div className="text-sm md:text-base">{selectedLocation}</div>
          <FaChevronDown className="m-1 text-xs md:text-sm mr-7 md:mr-0" />
        </div>
        <div className="border-b-[1px] border-white w-[105px] md:ml-6"></div>
        {dropdownOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-teal-800 z-[1] w-32 p-2"
          >
            {filteredLocations.map((item, index) => (
              <li key={index} onClick={() => handleLocationSelect(item)}>
                <div className="hover:bg-teal-500 text-sm md:text-base">
                  {item}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
