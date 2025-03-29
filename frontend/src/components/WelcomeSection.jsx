function WelcomeSection({ fullname, profilepic }) {

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return (
    <div className="bg-purple-500 rounded-lg overflow-hidden relative">
      <div className="p-8 text-white relative z-10 flex">
        <div className="flex-1">
          <div className="text-sm mb-4">{getTodayDate()}</div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {fullname}!</h1>
          <p>Always stay updated in your student portal</p>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <div className="relative h-48 w-full">
            <div className="absolute right-0 bottom-0">
              <img src={profilepic} alt="Profile Image of student" className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeSection

