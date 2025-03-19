import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
 
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
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
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
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
      <p className="text-lg text-gray-700">No student data found</p>
    </div>
  );

  // Using the data from the reference image
  const studentData = {
    fullName: user.fullName || "Anang Kwaku Mitchual",
    role: user.role || "Group Leader",
    faculty: user.faculty || "FOCIS",
    honor: user.honor || "BSc",
    email: user.email || "anangkwaku@gmail.com",
    studentId: user.studentId || "4211220533",
    course: user.course || "Information Technology",
    userType: user.userType || "student",
    image: user.image || "https://res.cloudinary.com/dfiubxsgm/image/upload/v17417021"
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${studentData.email}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Left sidebar with profile information */}
          <div className="md:w-1/3 bg-green-700 p-8 text-white">
            <div className="flex justify-center">
              <img 
                src={studentData.image} 
                alt={studentData.fullName} 
                className="h-48 w-48 rounded-full object-cover border-4 border-white"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <h1 className="text-2xl font-bold mt-4 text-center">{studentData.fullName}</h1>
            <p className="text-green-200 text-center">{studentData.role}</p>
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-green-200">Student ID</h3>
                <p>{studentData.studentId}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-green-200">Program</h3>
                <p>{studentData.course}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-green-200">Faculty</h3>
                <p>{studentData.faculty}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm uppercase tracking-wide font-semibold text-green-200">Contact</h3>
                <button 
                  onClick={handleEmailClick}
                  className="text-left hover:text-green-300 transition duration-300 truncate w-full"
                >
                  {studentData.email}
                </button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="md:w-2/3 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold border-b pb-2">Student Profile</h2>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600 inline-flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  {studentData.userType.charAt(0).toUpperCase() + studentData.userType.slice(1)}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {studentData.honor}
                </span>
              </div>
              <p className="mt-4 text-gray-600">
                {studentData.fullName} is a {studentData.honor} student in {studentData.course} at the {studentData.faculty} faculty. 
                They currently serve as a {studentData.role} and are actively participating in academic and extracurricular activities.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold">Academic Information</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm font-medium text-gray-500">Year of Study</span>
                  <p>3rd Year</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm font-medium text-gray-500">Semester</span>
                  <p>1st Semester</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm font-medium text-gray-500">CGPA</span>
                  <p>3.75/4.0</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <span className="text-sm font-medium text-gray-500">Credits Completed</span>
                  <p>78/120</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold">Current Courses</h3>
              <ul className="mt-2 grid grid-cols-1 gap-2">
                <li className="bg-gray-50 p-3 rounded flex justify-between">
                  <span>Advanced Database Systems</span>
                  <span className="text-green-600 font-medium">CSC 301</span>
                </li>
                <li className="bg-gray-50 p-3 rounded flex justify-between">
                  <span>Web Application Development</span>
                  <span className="text-green-600 font-medium">CSC 305</span>
                </li>
                <li className="bg-gray-50 p-3 rounded flex justify-between">
                  <span>Computer Networks</span>
                  <span className="text-green-600 font-medium">CSC 310</span>
                </li>
                <li className="bg-gray-50 p-3 rounded flex justify-between">
                  <span>Software Engineering</span>
                  <span className="text-green-600 font-medium">CSC 315</span>
                </li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <div className="mt-2 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleEmailClick}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;