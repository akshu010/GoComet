/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HOTEL_INFO } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import BookingModal from "./BookingPage";
import { ShimmerHotelPage } from "./ShimmerUIHome";

const RoomCard = ({ room }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) =>
      prev === room.image_urls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.image_urls.length - 1 : prev - 1
    );
  };

  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 sm:h-56 md:h-64">
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg z-10 hover:bg-gray-100"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <img
          src={room.image_urls[currentImageIndex]}
          alt={`${room.name} - View ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-lg z-10 hover:bg-gray-100"
        >
          <svg
            className="w-4 h-4 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {room.image_urls.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full ${
                currentImageIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">{room.name}</h3>
        </div>
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="text-lg sm:text-xl">
            ₹ {room.price}
            <span className="text-xs sm:text-sm text-gray-500">/ night</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 sm:gap-0">
          <button className="px-3 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 w-full text-sm sm:text-base">
            View facilities
          </button>
          <button
            onClick={openBookingModal}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full text-sm sm:text-base"
          >
            Book Now
          </button>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal room={room} onClose={closeBookingModal} />
      )}
    </div>
  );
};

const HotelPage = () => {
  const { hotelId } = useParams();
  const [hotelInfo, setHotelInfo] = useState(null);

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    const data = await fetch(HOTEL_INFO + hotelId);
    const json = await data.json();
    setHotelInfo(json.hotel);
  };

  if (!hotelInfo)
    return (
      <ShimmerHotelPage />
    );

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px]">
        <Link to="/">
          <button className="absolute top-4 left-4 z-10 bg-white rounded-full p-1.5 sm:p-2 shadow-lg hover:bg-gray-100">
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </Link>
        <img
          src={hotelInfo.image_url}
          alt={hotelInfo.name}
          className="w-full h-full object-cover brightness-[30%]"
        />
        <div className="absolute bottom-8 sm:bottom-16 md:bottom-28 left-0 right-0 text-center text-white px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-3 sm:mb-4">
            {hotelInfo.name}
          </h1>
          <div className="flex items-center justify-center space-x-3 text-sm sm:text-base">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {hotelInfo.city}, India
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {hotelInfo.rating}
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {hotelInfo.rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          About {hotelInfo.name}
        </h2>
        <p className="text-gray-600 whitespace-pre-line text-sm sm:text-base">
          {hotelInfo.description}
        </p>
      </div>
    </div>
  );
};

export default HotelPage;
