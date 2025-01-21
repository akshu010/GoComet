/* eslint-disable react/prop-types */
import { useState } from "react";
import PopUp from "./PopUp";

const BookingModal = ({ room, onClose }) => {
  const [persons, setPersons] = useState([{ name: "", age: "", gender: "" }]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleAddPerson = () => {
    setPersons([...persons, { name: "", age: "", gender: "" }]);
  };

  const handleRemovePerson = (index) => {
    const updatedPersons = persons.filter((_, i) => i !== index);
    setPersons(updatedPersons);
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPersons = persons.map((person, i) =>
      i === index ? { ...person, [field]: value } : person
    );
    setPersons(updatedPersons);
  };

  const handleSubmit = () => {
    if (new Date(checkIn) >= new Date(checkOut)) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    if (new Date(checkIn) < new Date().setHours(0, 0, 0, 0)) {
      setError("Check-in date cannot be in the past.");
      return;
    }
    const allFieldsFilled = persons.every(
      (person) => person.name && person.age && person.gender
    );
    if (!checkIn || !checkOut || !allFieldsFilled) {
      setError("Please fill all required fields.");
      return;
    }

    setShowSuccessPopup(true);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-40 p-4">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-4 md:p-6 relative flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
          <div className="w-full md:w-1/2 md:pr-4">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl md:text-2xl font-bold mb-4">{room.name}</h2>
            <div className="mb-4">
              <img
                src={room.image_urls[0]}
                alt={room.name}
                className="w-full h-48 md:h-64 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {room.amenities.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
            <div className="mt-4 mb-6 md:mb-0">
              <p className="text-xl font-semibold">
                Price: ₹{room.price}
                <span className="text-sm text-gray-500"> / night</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
            </div>

            {persons.map((person, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-md p-3 md:p-4 mb-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) =>
                        handlePersonChange(index, "name", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      value={person.age}
                      onChange={(e) => {
                        const newAge = Math.min(
                          100,
                          Math.max(1, e.target.value)
                        );
                        handlePersonChange(index, "age", newAge);
                      }}
                      min="1"
                      max="100"
                      className="w-full border border-gray-300 rounded-md p-2"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
                  <button
                    className={`px-4 py-2 border rounded-md w-full ${
                      person.gender === "Male"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => handlePersonChange(index, "gender", "Male")}
                  >
                    Male
                  </button>
                  <button
                    className={`px-4 py-2 border rounded-md w-full ${
                      person.gender === "Female"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() =>
                      handlePersonChange(index, "gender", "Female")
                    }
                  >
                    Female
                  </button>
                  <button
                    onClick={() => handleRemovePerson(index)}
                    className="px-4 py-2 h-10 text-center border border-red-500 text-red-500 rounded-md w-full mt-2 sm:mt-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={handleAddPerson}
              className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-4"
            >
              + Add Person
            </button>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Person: {persons.length}
              </span>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Book
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>

      {showSuccessPopup && <PopUp onClose={handleClosePopup} />}
    </>
  );
};

export default BookingModal;


