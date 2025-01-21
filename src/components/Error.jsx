import { Link } from "react-router-dom";
import { ERROR_ONE, ERROR_THREE, ERROR_TWO } from "../utils/constants";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">{ERROR_ONE}</h1>
      <p className="text-lg mb-6">{ERROR_TWO}</p>
      <p className="text-sm text-gray-500 mb-8">{ERROR_THREE}</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
