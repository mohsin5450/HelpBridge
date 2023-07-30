import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function LatestCampaigns() {
  // Mock data for campaign posts
  const[posts,setPosts]=useState();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getposts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Latest Campaigns</h2>
        <p className="text-gray-600 mt-2">Check out our latest charity campaign posts.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts&&posts.map((campaign) => (
          <div
            key={campaign.post_id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <img
              src={`http://localhost:4000/images/`+campaign.picture}
              alt="Campaign"
              className="w-full h-40 object-cover mb-4"
            />
            <div className="flex justify-center text-center flex-col">
            <h3 className="text-gray-800 text-lg font-bold mb-2">{campaign.title}</h3>

            </div>
            <p className="text-gray-800 text-lg mb-2">{campaign.description}</p>
            <div className="flex justify-between">
              <p className="text-gray-600">{campaign.date.substring(0, 10)}</p>
              <p className="text-gray-600">
                {campaign.collected_money} / {campaign.target_money}
              </p>
            </div>
            <div className="flex justify-center mt-6">
            <Link
                to={"/Services/" +campaign.post_id}
                        className="  flex bg-blue-800 rounded justify-center text-center w-40 text-white text-1xl p-2 font-bold"
                      >
                        Donate now
                      </Link>
                      </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestCampaigns;
