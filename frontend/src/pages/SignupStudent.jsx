import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const URL = import.meta.env.VITE_SERVER;

const SignupStudent = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    faculty: "",
    phone: "",
    userType: "student",
    course: "",
    studentId: "",
    honor: "",
    role: "",
    group: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  //fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(`${URL}/groups`);
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
        const groupsData = await response.json();
        // console.log(groupsData);
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!imageFile) {
      toast.error("Profile image is required");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      // Add image file - the backend expects it in the 'image' field
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await fetch(`${URL}/students/signup`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      // Success notification and navigation
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/login/student");
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-gray-100 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Student Signup - Busiless
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[80%]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name *
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address *
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password *
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Faculty/Program */}
            <div>
              <label
                htmlFor="faculty"
                className="block text-sm font-medium text-gray-700"
              >
                Faculty/Program *
              </label>
              <div className="mt-1">
                <select
                  id="faculty"
                  name="faculty"
                  required
                  value={formData.faculty}
                  onChange={handleChange}
                  className="border w-full rounded p-2"
                >
                  <optgroup label="FACULTY OF ENGINEERING">
                    <option value="BSc. Computer engineering">BSc. Computer engineering</option>
                    <option value="BSc. Telecommunication engineering">BSc. Telecommunication engineering</option>
                    <option value="BSc. Mathematics">BSc. Mathematics</option>
                    <option value="BSc. Electrical electronic engineering">BSc. Electrical electronic engineering</option>
                  </optgroup>

                  <optgroup label="FACULTY OF COMPUTING AND INFORMATION SYSTEMS (FoCIS)">
                    <option value="BSc. Cyber security">BSc. Cyber security</option>
                    <option value="BSc. Computer science">BSc. Computer science</option>
                    <option value="BSc. Networking and system administration">BSc. Networking and system administration</option>
                    <option value="BSc. Information Technology">BSc. Information Technology</option>
                    <option value="BSc. Information systems">BSc. Information systems</option>
                    <option value="BSc. Data Science and analytics">BSc. Data Science and analytics</option>
                    <option value="BSc. Software engineering">BSc. Software engineering</option>
                  </optgroup>

                  <optgroup label="BUSINESS SCHOOL">
                    <option value="BSc. Procurement and Logistics">BSc. Procurement and Logistics</option>
                    <option value="BSc. Business Administration (Accounting option)">BSc. Business Administration (Accounting option)</option>
                    <option value="BSc. Business Administration (Human Resource Management)">BSc. Business Administration (Human Resource Management)</option>
                    <option value="BSc. E-Commerce and Marketing Management">BSc. E-Commerce and Marketing Management</option>
                    <option value="BSc. Business Administration (Banking and Finance)">BSc. Business Administration (Banking and Finance)</option>
                    <option value="BSc. Economics">BSc. Economics</option>
                    <option value="BSc. Marketing/BSc. Accounting with Computing">BSc. Marketing/BSc. Accounting with Computing</option>
                    <option value="Diploma in Accounting, Management, Marketing, Public Relation">Diploma in Accounting, Management, Marketing, Public Relation</option>
                  </optgroup>
                </select>
              </div>
            </div>
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone *
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Course */}
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course *
              </label>
              <div className="mt-1">
                <input
                  id="course"
                  name="course"
                  type="text"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Student ID */}
            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-gray-700"
              >
                Student ID *
              </label>
              <div className="mt-1">
                <input
                  id="studentId"
                  name="studentId"
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role *
              </label>
              <div className="mt-1">
                <input
                  id="role"
                  name="role"
                  type="text"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="honor"
                className="block text-sm font-medium text-gray-700"
              >
                Honor *
              </label>
              <div className="mt-1">
                <select name="honor" id="honor" value={formData.honor} onChange={handleChange} className="border w-full rounded p-2">
                  <option value="bachelors">Bachelors</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                </select>
              </div>
            </div>


            <div>
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700"
              >
                Group *
              </label>
              <div className="mt-1">
                <select name="group" id="group" className="border w-full rounded p-2" value={formData.group} onChange={handleChange}>
                  {groups.map((group) => (

                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>))}
                </select>
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image *
              </label>
              <div className="mt-1 flex items-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Profile preview"
                      className="h-24 w-24 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                )}
                <div className="ml-5">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate("/login/student")}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupStudent;
