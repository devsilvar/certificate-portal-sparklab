import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-xl text-gray-600">Page not found</p>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium text-sm transition-colors duration-200"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
