import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_SERVER;

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/groups`);
        const data = await response.json();
        //console.log(data)
        setGroups(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <div>Loading groups...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Project Groups</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((group) => (
          <div key={group._id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-3">{group.name}</h2>

            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded">
                <h3 className="font-medium text-blue-800 mb-2">Students ({group.students.length})</h3>
                {group.students.length > 0 ? (
                  group.students.map((student) => (
                    <div key={student._id} className="mb-2 last:mb-0">
                      <p className="font-medium">{student.fullName}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <p className="text-sm">ID: {student.studentId}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No students assigned</p>
                )}
              </div>

              <div className="bg-green-50 p-3 rounded">
                <h3 className="font-medium text-green-800 mb-2">Supervisors ({group.supervisor.length})</h3>
                {group.supervisor.length > 0 ? (
                  group.supervisor.map((supervisor) => (
                    <div key={supervisor._id} className="mb-2 last:mb-0">
                      <p className="font-medium">{supervisor.fullName}</p>
                      <p className="text-sm text-gray-600">{supervisor.email}</p>
                      <p className="text-sm">Specialization: {supervisor.specialisation}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No supervisors assigned</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-5">
      <Link to="/add-group" className="p-2 rounded text-white bg-blue-600">Add-group</Link>
      </div>
    </div>
  )
}

