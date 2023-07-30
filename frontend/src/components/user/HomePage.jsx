import React from "react";
import videoBackground from "../../assets/video.mp4";
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
const movetologin=()=>{
    navigate("/login");
}
  return (
    <div className="h-screen bg-black">
      <video
        className="h-full w-full object-cover fixed top-0 left-0 z-0"
        autoPlay
        loop
        muted
      >
        <source src={videoBackground} type="video/mp4" />
      </video>
      <div className="flex flex-col justify-center items-center h-full ">
        <h1 className="text-white text-4xl font-bold mb-6 z-50">
          "Your support can transform lives and bring light to the darkest corners."
        </h1>
        <button 
        onClick={movetologin}
        className="bg-white text-indigo-500 hover:bg-indigo-100 text-4xl px-4 py-2 rounded-full z-50">
          Login
        </button>
      </div>
    </div>
  );
}

export default HomePage;
