import React, { useState } from 'react';
import donation from "../../assets/donation.gif"
function DonationConfirmation({onClose}) {
  

 

  return (
    <div>
      
      
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src={donation} alt="GIF" className="w-40 h-40 mx-auto mb-4" />
            <p className="text-center">Donation Confirmed! Thank you for your contribution.</p>
            <button onClick={onClose} className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default DonationConfirmation;
