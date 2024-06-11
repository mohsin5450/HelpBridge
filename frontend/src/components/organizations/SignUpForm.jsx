import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpPopup from "./OtpPopup";
import axios from "axios";

const SignUpForm = () => {
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (otp !== "") {
      async function sendmail() {
        //e.preventDefault();
        alert(formData.fullname);
        const newErrors = {};
        if (!formData.fullname) {
          newErrors.fullname = "Full Name is required";
        }
        if (!formData.email) {
          newErrors.email = "Email is required";
        }
        if (!formData.password) {
          newErrors.password = "Password is required";
        }
        if (!formData.confirm_password) {
          newErrors.confirm_password = "Confirm Password is required";
        }
        if (formData.password !== formData.confirm_password) {
          newErrors.confirm_password = "Passwords do not match";
        }

        // Check if there are any errors
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        } else {
          const data = { email: formData.email, otp: otp };
          setShowOtpPopup(true);
          const response = await axios.post(
            `${REACT_APP_API_URL}/email/sendmail`,
            data
          );
        }
      }
      setErrors({});

      sendmail();
    }
  }, [otp]);

  const handleRegister = async (e) => {
    // e.preventDefault();
    const systemOtp = Math.floor(Math.random() * 98547) + 34523;

    setOtp(systemOtp.toString());
    // alert(otp);
  };

  const handleCloseOtpPopup = () => {
    setShowOtpPopup(false);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const newErrors = {};
    if (!formData.fullname) {
      newErrors.fullname = "Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.confirm_password) {
      newErrors.confirm_password = "Confirm Password is required";
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(
          `${REACT_APP_API_URL}/auth/SignUpForm`,
          formData
        );
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data.error);
          alert(error.response.data.error);
        } else {
          console.log("Error occurred during signup");
        }
      }
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form>
            {errors.fullname && (
              <p className="text-red-500 text-xs italic">{errors.fullname}</p>
            )}
            <input
              type="text"
              className={`block border ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              } w-full p-3 rounded mb-4`}
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
            <input
              type="text"
              className={`block border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } w-full p-3 rounded mb-4`}
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.password && (
              <p className="text-red-500 text-xs italic">{errors.password}</p>
            )}
            <input
              type="password"
              className={`block border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } w-full p-3 rounded mb-4`}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {errors.confirm_password && (
              <p className="text-red-500 text-xs italic">
                {errors.confirm_password}
              </p>
            )}
            <input
              type="password"
              className={`block border ${
                errors.confirm_password ? "border-red-500" : "border-gray-300"
              } w-full p-3 rounded mb-4`}
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
            />

            <Link
              type="submit"
              onClick={handleRegister}
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
            >
              Create Account
            </Link>

            <div className="text-center text-sm text-gray-700 mt-4">
              By signing up, you agree to the{" "}
              <a className="underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="underline" href="#">
                Privacy Policy
              </a>
              .
            </div>
          </form>
          {showOtpPopup && (
            <OtpPopup
              otp={otp}
              formData={formData}
              onClose={handleCloseOtpPopup}
            />
          )}
          <div className="text-gray-700 mt-6">
            Already have an account?{" "}
            <Link className="underline text-blue-500" to="/">
              Log in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
