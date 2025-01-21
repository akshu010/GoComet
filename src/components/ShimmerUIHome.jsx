const ShimmerCardHome = () => {
  return (
    <div className="h-[20rem] w-[25rem] border-[1px] border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-[10rem] bg-gray-300"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};
const ShimmerUI = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center w-[76rem]">
      {Array(6)
        .fill("")
        .map((_, index) => (
          <div key={index} className="flex justify-center">
            <ShimmerCardHome />
          </div>
        ))}
    </div>
  );
};

// ShimmerHotelPage Component for Hotel Page
const ShimmerHotelPage = () => {
  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px]">
        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        <div className="absolute bottom-8 sm:bottom-16 md:bottom-28 left-0 right-0 text-center text-white px-4 sm:px-6 md:px-8">
          <div className="w-1/2 h-8 bg-gray-300 animate-pulse mb-3"></div>
          <div className="flex items-center justify-center space-x-3 text-sm sm:text-base">
            <div className="w-1/4 h-5 bg-gray-300 animate-pulse"></div>
            <div className="w-1/4 h-5 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-white shadow-sm"
          >
            <div className="w-full h-[200px] bg-gray-300 animate-pulse"></div>
            <div className="p-4 sm:p-6">
              <div className="w-3/4 h-6 bg-gray-300 animate-pulse mb-4"></div>
              <div className="w-1/2 h-4 bg-gray-300 animate-pulse mb-3"></div>
              <div className="w-1/3 h-4 bg-gray-300 animate-pulse mb-4"></div>
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 sm:gap-0 mt-6">
                <div className="w-1/2 h-10 bg-gray-300 animate-pulse"></div>
                <div className="w-1/2 h-10 bg-gray-300 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 mt-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          <div className="w-3/4 h-6 bg-gray-300 animate-pulse mb-3"></div>
        </h2>
        <div className="w-full h-4 bg-gray-300 animate-pulse mb-3"></div>
        <div className="w-full h-4 bg-gray-300 animate-pulse"></div>
      </div>
    </div>
  );
};

export { ShimmerUI, ShimmerHotelPage };
