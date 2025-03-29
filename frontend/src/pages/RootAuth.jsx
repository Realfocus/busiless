import { Link } from "react-router-dom";

export default function RootAuth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to Busiless
        </h1>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link
            to="/login/supervisor" // Changed to supervisor route assuming that was a typo
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow 
              duration-200 px-8 py-4 text-gray-700 hover:text-purple-600 font-medium
              transform hover:scale-105 transition-transform border border-gray-200
              flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 absolute left-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Supervisor Portal
          </Link>

          <Link
            to="/login/student"
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow 
              duration-200 px-8 py-4 text-gray-700 hover:text-blue-600 font-medium
              transform hover:scale-105 transition-transform border border-gray-200
              flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 absolute left-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            Student Portal
          </Link>
        </div>

        <p className="text-gray-500 mt-8 text-sm">
          Select your role to continue
        </p>
      </div>
    </div>
  );
}
