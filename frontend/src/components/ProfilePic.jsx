import { useState, useEffect } from "react";

const ProfilePic = () => {
  const [name, setName] = useState("");
  const [pic, setPic] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("loginToken");
    if (accessToken) {
      setName(sessionStorage.getItem("fullName") || "");
      setPic(sessionStorage.getItem("image") || "");
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-2">
      <img
        src={pic}
        alt={`Profile picture of ${name}`}
        className="rounded-full w-10"
      />
      <p className="font-medium">{name}</p>
    </div>
  );
};

export default ProfilePic;
