import React from "react";
import Hero from "./Hero";
import LatestCampaigns from "./LatestCampaigns";
import Header from "./Header";

function App_user() {
  return (
    <div className="bg-gray-100">
     
      <main>
        <Hero />
        <LatestCampaigns />
      </main>
    </div>
  );
}

export default App_user;
