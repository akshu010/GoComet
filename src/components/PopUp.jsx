/* eslint-disable react/prop-types */
const PopUp = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full animate-fade-in">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
              <svg 
                className="h-10 w-10 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Thank you for the booking!
            </h1>
            <h2 className="text-lg text-gray-600 mb-6">
              Your booking is confirmed
            </h2>
            <button
              onClick={onClose}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PopUp;
  