/* eslint-disable react/prop-types */
import {  useState } from "react";

import BookingModal from "./BookingPage";

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
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="relative h-64">
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
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
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
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
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {room.image_urls.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{room.name}</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl">
              ₹ {room.price}
              <span className="text-sm text-gray-500">/ night</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 flex-1">
              View facilities
            </button>
            <button
              onClick={openBookingModal}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1"
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
  
  export default RoomCard;