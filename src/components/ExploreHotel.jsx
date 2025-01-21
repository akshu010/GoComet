/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { HOTEL_API, TITLE } from "../utils/constants";
import { ShimmerUI } from "./ShimmerUIHome";
import { Link } from "react-router-dom";

const ExploreHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    priceRanges: [],
    ratings: [],
    cities: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceSortOrder, setPriceSortOrder] = useState("asc");
  const itemsPerPage = 6;

  useEffect(() => {
    getHotelData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const getHotelData = async () => {
    try {
      const response = await fetch(HOTEL_API);
      const data = await response.json();
      setHotels(data.hotels);
      setFilteredHotels(data.hotels);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...hotels];
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter((hotel) => {
        return filters.priceRanges.some((range) => {
          if (range === "upto1000")
            return hotel.rooms.some((room) => room.price <= 1000);
          if (range === "1001to2000")
            return hotel.rooms.some(
              (room) => room.price > 1000 && room.price <= 2000
            );
          if (range === "2001to5000")
            return hotel.rooms.some(
              (room) => room.price > 2000 && room.price <= 5000
            );
          if (range === "above5000")
            return hotel.rooms.some((room) => room.price > 5000);
          return false;
        });
      });
    }
    if (filters.ratings.length > 0) {
      filtered = filtered.filter((hotel) => {
        return filters.ratings.some((range) => {
          if (range === "0-1") return hotel.rating >= 0 && hotel.rating <= 1;
          if (range === "1-2") return hotel.rating > 1 && hotel.rating <= 2;
          if (range === "2-3") return hotel.rating > 2 && hotel.rating <= 3;
          if (range === "3-4") return hotel.rating > 3 && hotel.rating <= 4;
          if (range === "4-5") return hotel.rating > 4 && hotel.rating <= 5;
          return false;
        });
      });
    }
    if (filters.cities.length > 0) {
      filtered = filtered.filter((hotel) =>
        filters.cities.includes(hotel.city.toLowerCase())
      );
    }
    setFilteredHotels(filtered);
  };

  const getPriceRange = (rooms) => {
    if (!rooms || rooms.length === 0) return "N/A";
    const prices = rooms.map((room) => room.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return `₹${minPrice} - ₹${maxPrice}`;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let visibleHotels = filteredHotels.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < filteredHotels.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const sortHotelsByRating = () => {
    const sortedHotels = [...filteredHotels].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    setFilteredHotels(sortedHotels);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setIsOpen(false);
  };

  const sortHotelsByPrice = () => {
    const sortedHotels = [...filteredHotels].sort((a, b) => {
      const priceA = a.rooms?.[0]?.price || 0;
      const priceB = b.rooms?.[0]?.price || 0;

      if (priceSortOrder === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    setFilteredHotels(sortedHotels);
    setPriceSortOrder(priceSortOrder === "asc" ? "desc" : "asc");
    setIsOpen(false);
  };

  const updateFilters = (type, value, checked) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (checked) {
        newFilters[type].push(value);
      } else {
        newFilters[type] = newFilters[type].filter((item) => item !== value);
      }
      return newFilters;
    });
  };

  return (
    <div className="flex flex-col xl:flex-row mt-[80px]">
      <button
        className="block xl:hidden bg-blue-500 text-white px-4 py-2 mb-4 mx-4 rounded"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? "Close Filters" : "Open Filters"}
      </button>
      <div
        className={`absolute xl:static z-50 xl:z-auto bg-white xl:bg-transparent transform xl:transform-none transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 w-64 xl:w-auto h-full xl:h-auto`}
      >
        <Sidebar onFilterChange={updateFilters} />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl xl:ml-[40%] font-bold mb-16 flex justify-center xl:justify-start items-center">
          {TITLE}
        </h1>
        <div className="relative xl:absolute xl:right-7 xl:top-[75%]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Sort By
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={sortHotelsByRating}
              >
                Rating {sortOrder === "asc" ? "↑" : "↓"}
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={sortHotelsByPrice}
              >
                Price {priceSortOrder === "asc" ? "↑" : "↓"}
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleHotels.length > 0 ? (
            visibleHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{hotel.name}</h2>
                  <p className="text-sm text-gray-600">{hotel.city}</p>
                  <p className="text-sm text-gray-800 mt-2">
                    {getPriceRange(hotel.rooms)}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-yellow-500 font-bold">
                      {hotel.rating} ★
                    </span>
                    <Link key={hotel.id} to={"/hotel/" + hotel.id}>
                      <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <ShimmerUI />
          )}
        </div>
        <div className="flex items-center justify-center mt-6 space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            Prev
          </button>
          <span className="px-4 py-2 border rounded bg-gray-100">
            Page {currentPage}
          </span>
          <button
            onClick={handleNext}
            disabled={endIndex >= filteredHotels.length}
            className={`px-4 py-2 border rounded ${
              endIndex >= filteredHotels.length
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreHotel;
