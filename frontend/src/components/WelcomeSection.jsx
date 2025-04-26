function WelcomeSection({ fullname, profilepic }) {

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return (
    <div className="bg-purple-500 rounded-lg overflow-hidden shadow-lg">
    <div className="p-8 text-white flex flex-col md:flex-row items-center">
      <div className="flex-1 mb-6 md:mb-0">
        <div className="text-sm mb-4">{getTodayDate()}</div>
        <h1 className="text-4xl font-bold mb-2">Welcome back, {fullname}!</h1>
        <p>Always stay updated in your student portal</p>
      </div>
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img 
            src={profilepic} 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default WelcomeSection

