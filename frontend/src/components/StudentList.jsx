import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const URL=import.meta.env.VITE_SERVER;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await fetch(URL);
        const data = await response.json();
        console.log("data", data);
        const filteredStudents = data.users.filter(
          (user) => user.userType === "student",
        );

        setStudents(filteredStudents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student._id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-4">
              <img
                src={student.image || "/placeholder.svg"}
                alt={student.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <Link to={`/students/${student._id}`}>
                <h2 className="text-xl font-semibold">{student.fullName}</h2>
                </Link>
                <p>{student.role}</p>
              </div>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
