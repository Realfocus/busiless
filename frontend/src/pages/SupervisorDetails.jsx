import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const URL = import.meta.env.VITE_SERVER;

const SupervisorDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${URL}/supervisors/${id}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
        setError(null);
      } catch (error) {
        console.error("Fetching error:", error);
        setError(error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto my-4 max-w-2xl">
      <p className="font-bold">Error:</p>
      <p>{error}</p>
    </div>
  );

  if (!user) return (
    <div className="text-center p-8">
      <p className="text-lg text-gray-700">No supervisor data found</p>
    </div>
  );

  // Using the data from the reference image
  const supervisorData = {
    fullName: user.fullName,
    role: user.role,
    faculty: user.faculty,
    specialisation: user.specialisation,
    honor: user.honor,
    email: user.email,
    calendly: user.calendly,
    studentId: user.studentId,
    course: user.course,
    image: user.image
  };

  const handleScheduleMeeting = () => {
    window.open(supervisorData.calendly, "_blank");
  };

  const handleCall = () => {
    // This will be updated when the phone number is provided
    alert("Phone number will be available soon");
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-blue-800 p-8 text-white">
            <div className="flex justify-center">
              <img
                src={supervisorData.image}
                alt={supervisorData.fullName}
                className="h-48 w-48 rounded-full object-cover border-4 border-white"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <h1 className="text-2xl font-bold mt-4 text-center">{supervisorData.fullName}</h1>
            <p className="text-blue-200 text-center">{supervisorData.role}</p>
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-blue-200">Faculty</h3>
                <p>{supervisorData.faculty}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-blue-200">Specialization</h3>
                <p>{supervisorData.specialisation}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-blue-200">Honor</h3>
                <p>{supervisorData.honor}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-blue-200">Contact</h3>
                <p className="truncate">{supervisorData.email}</p>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold border-b pb-2">Supervisor Profile</h2>
              <p className="mt-4 text-gray-600">
                {supervisorData.fullName} is a distinguished supervisor specializing in {supervisorData.specialisation}.
                They are currently associated with the {supervisorData.faculty} department and recognized for their
                contributions in the field.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold">Academic Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm font-medium text-gray-500">ID Number</span>
                  <p>{supervisorData.studentId}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm font-medium text-gray-500">Course</span>
                  <p>{supervisorData.course}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold">Schedule a Meeting</h3>
              <p className="mt-2 text-gray-600">
                You can schedule a consultation with {supervisorData.fullName} using their online calendar
                or contact them directly.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleScheduleMeeting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Schedule Meeting
                </button>
                <button
                  onClick={handleCall}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  Call Now
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold">Office Hours</h3>
              <p className="mt-2 text-gray-600">
                Monday - Friday: 9:00 AM - 4:00 PM<br />
                For urgent matters outside office hours, please use the email provided.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDetails;
