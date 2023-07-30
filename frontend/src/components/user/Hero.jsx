import React from "react";
import heroImage from "../../assets/hero-image.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-blue-900 text-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold leading-tight tracking-tight mb-4">
            Support our charity and make a difference today.
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            interdum est vel justo laoreet, quis blandit quam maximus. Integer
            consectetur odio vitae lorem tincidunt tristique. Integer interdum
            malesuada nulla, ac ornare tortor efficitur sit amet.
          </p>
          <Link to={"/compaigns"}  className="bg-white text-blue-900 py-2 px-4 rounded-full font-bold hover:bg-blue-100 transition duration-200">
            Donate Now
          </Link>
        </div>
        <div className="lg:w-1/2 lg:ml-10 mt-10 lg:mt-0">
          <img src={heroImage} alt="Charity" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
