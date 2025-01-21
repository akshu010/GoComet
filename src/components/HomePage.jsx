import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HEADING_DATA,
  HOTEL_PAGE_BG,
  LOREM_DATA,
  SEARCH_API,
} from "../utils/constants";
import ExploreHotel from "./ExploreHotel";

const HomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    searchQuery: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    selectedHotel: null,
  });
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!formData.searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(SEARCH_API);
        const data = await response.json();
        const filtered = data.filter(
          (hotel) =>
            hotel.name
              .toLowerCase()
              .includes(formData.searchQuery.toLowerCase()) ||
            hotel.city
              .toLowerCase()
              .includes(formData.searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
      } catch (error) {
        console.error("Error:", error);
        setSuggestions([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [formData.searchQuery]);

  const handleSearch = () => {
    const { selectedHotel, checkIn, checkOut, guests } = formData;

    if (!selectedHotel || !checkIn || !checkOut || guests < 1) {
      alert("Please fill all fields");
      return;
    }

    navigate(`/hotel/${selectedHotel.id}`);
  };

  return (
    <div className="px-4 sm:px-8">
      <div
        className="relative bg-no-repeat bg-right-bottom rounded-full mr-11 "
        style={{
          backgroundImage: `url(${HOTEL_PAGE_BG})`,
        }}
      >
        <div
          className="relative bg-no-repeat bg-right-bottom rounded-full mr-11 "
          style={{
            backgroundImage: `url(${HOTEL_PAGE_BG})`,
          }}
        ></div>
        <div className="w-full xl:w-[60vw] text-left sm:text-left sm:items-start">
          <h1 className="pl-20 text-4xl pt-10 sm:pt-20 sm:text-4xl">
            {HEADING_DATA}
          </h1>
          <p className="pl-20 pt-10 sm:pt-10 text-sm sm:text-base">
            {LOREM_DATA}
          </p>
        </div>
        <div className="pt-10 xl:ml-20 sm:pt-20 flex flex-col sm:flex-row gap-4 items-center sm:items-center">
          <div className="relative w-full sm:w-auto">
            <i className="absolute top-[8px] left-[10px] ri-map-pin-2-fill text-blue-600" />
            <input
              className="border border-black rounded-sm h-10 w-full sm:w-72 pl-10"
              type="text"
              value={formData.searchQuery}
              onChange={(e) =>
                setFormData({ ...formData, searchQuery: e.target.value })
              }
              onFocus={() => setShowSuggestions(true)}
              placeholder="Type city, place, or hotel name"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-11 w-full sm:w-72 bg-white border shadow-lg rounded-md">
                {suggestions.map((hotel, id) => (
                  <li
                    key={id}
                    className="p-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        searchQuery: `${hotel.name}, ${hotel.city}`,
                        selectedHotel: hotel,
                      });
                      setShowSuggestions(false);
                    }}
                  >
                    {hotel.name}, {hotel.city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="date"
            className="border border-black rounded-sm h-10 w-full sm:w-auto px-4 "
            value={formData.checkIn}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              setFormData({ ...formData, checkIn: e.target.value })
            }
          />
          <input
            type="date"
            className="border border-black rounded-sm h-10 w-full sm:w-auto px-4"
            value={formData.checkOut}
            min={formData.checkIn}
            onChange={(e) =>
              setFormData({ ...formData, checkOut: e.target.value })
            }
          />
          <div className="flex items-center w-full sm:w-auto">
            <i className="ri-user-fill text-xl text-blue-600" />
            <input
              type="number"
              className="border border-black rounded-sm h-10 w-full sm:w-16 text-center ml-2"
              value={formData.guests}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  guests: Math.max(1, e.target.value),
                })
              }
              min={1}
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <ExploreHotel />
    </div>
  );
};

export default HomePage;
