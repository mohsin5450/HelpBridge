import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const OtpPopup = ({ otp,formData, onClose }) => {
  const [userOtp, setUserOtp] = useState('');
  const [isOtpMatched, setIsOtpMatched] = useState(false);

  const handleOtpChange = (e) => {
    setUserOtp(e.target.value);
  };

  const verifyOtp = () => {
    if (userOtp === otp) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async () => {
    var isMatched = verifyOtp();
    alert(formData.fullname);
    if (isMatched) {
      setIsOtpMatched(true);
      try {
        const response = await axios.post('http://localhost:4000/SignUpForm', formData);
        alert("kfdsfkdv");
       
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data.error);
          alert(error.response.data.error);
        } else {
          console.log("Error occurred during signup");
        }
      }
    
    } else {
      alert('Invalid OTP! Please try again.');
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {!isOtpMatched ? (
            <div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Enter OTP
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={userOtp}
                        onChange={handleOtpChange}
                        placeholder="Enter OTP"
                        className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:border-indigo-500 w-64"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Verify
                </button>
                {/* <Link
                  onClick={onClose}
                  
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </Link> */}
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      OTP Verified
                    </h3>
                    <p className="mt-2">
                      Your OTP has been verified successfully!
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Link
                  onClick={onClose}
                  to={"/login"}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
