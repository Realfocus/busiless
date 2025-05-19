import { useState, useEffect } from "react";
import placeholderImage from "../assets/logo.png"

const ProfilePic = () => {
  const [name, setName] = useState("");
  const [pic, setPic] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("loginToken");
    if (accessToken) {
      setName(sessionStorage.getItem("fullName") || "");
      setPic(sessionStorage.getItem("image") || placeholderImage);
    }
  }, []);

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex-shrink-0">
        <img
          src={pic}
          alt={`Profile picture of ${name}`}
          className="rounded-full w-8 h-8 object-cover border border-gray-200"
        />
      </div>
      <p className="font-medium text-sm truncate">{name}</p>
    </div>
  );
};

export default ProfilePic;
