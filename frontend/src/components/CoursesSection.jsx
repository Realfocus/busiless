
function CoursesSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Enrolled Courses</h2>
        <a href="#" className="text-purple-500 hover:underline">
          See all
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CourseCard
          title="Information Technology Communication"
          icon={
            <div className="bg-purple-200 p-3 rounded-lg">
              <svg
                className="h-8 w-8 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 17H15M9 13H15M9 9H10M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          }
          highlight={true}
        />
        <CourseCard
          title="Fundamentals of database systems"
          icon={
            <div className="bg-purple-200 p-3 rounded-lg">
              <svg
                className="h-8 w-8 text-purple-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M5 12C3.89543 12 3 11.1046 3 10V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V10C21 11.1046 20.1046 12 19 12M5 12C3.89543 12 3 12.8954 3 14V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V14C21 12.8954 20.1046 12 19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          }
        />
      </div>
    </div>
  )
}

function CourseCard({ title, icon, highlight = false }) {
  return (
    <div className={`bg-purple-100 p-6 rounded-lg ${highlight ? "ring-2 ring-purple-400" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">{icon}</div>
        <button className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm hover:bg-purple-600 transition-colors">
          view
        </button>
      </div>
      <h3 className="font-medium">{title}</h3>
    </div>
  )
}

export default CoursesSection;

