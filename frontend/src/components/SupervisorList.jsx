import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SupervisorsList = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/users");
        const data = await response.json();
        console.log("data", data);
        const filteredSupervisors = data.users.filter(
          (user) => user.userType === "supervisor",
        );

        setSupervisors(filteredSupervisors);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSupervisors();
  }, []);

  if (loading) return <div>Loading supervisors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Supervisors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {supervisors.map((supervisor) => (
          <div
            key={supervisor._id}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={supervisor.image || "/placeholder.svg"}
                alt={supervisor.fullName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
           
                <Link to={`/supervisors/${supervisor._id}`}>
                <h2 className="text-xl font-semibold">{supervisor.fullName}</h2>
                </Link>
                <p className="text-gray-600">{supervisor.specialisation}</p>
                <p className="text-sm text-gray-500">{supervisor.faculty}</p>
              </div>
              <div className="mt-4">
                <a href={supervisor.phone}></a>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupervisorsList;
