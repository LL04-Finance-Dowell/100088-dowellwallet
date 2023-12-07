import React, { useState } from "react";
import logo_dowell from "../assets/logo_dowell.png";
import { useNavigate, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [OTP, setOTP] = useState();
  const [newPassword, setNewPaasword] = useState();
  const location = useLocation();
  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    console.log(sessionId);
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/setup-new-pass?session_id=${sessionId}`;
    const requestBody = {
      wallet_password: newPassword,
      otp: parseInt(OTP),
    };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          navigate(`/login?session_id=${sessionId}`);
        }
        else{
          setError("An error occurred. Please try again.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
        console.error("Error logging in:", error);
        setIsLoading(false);
      });
  };
  return (
    <div className="bg-gray-200 h-screen">
      <div className="bg-primaryGreen h-24 pr-5 sm:pr-20  flex items-center justify-between">
        <img
          src={logo_dowell}
          className=" cursor-pointer w-44 sm:w-80 h-20"
          alt=""
        />
      </div>

      <div className="border-black border-2 p-5 sm:p-10 w-4/5 lg:w-2/6 mt-16 ml-auto mr-auto rounded-xl ">
        <p className="text-primaryBlack text-center text-xl sm:text-3xl font-semibold mb-4 sm:mb-8 ">
          Change Password
        </p>
        <form className="flex flex-col" onSubmit={submitHandler}>
          {error && <p className="text-red-500 text-base mb-3">{error}</p>}
          <input
            required
            type="text"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="Enter OTP"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
          />
          <input
            required
            type="password"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="Enter New Paasword"
            value={newPassword}
            onChange={(e) => setNewPaasword(e.target.value)}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="rounded-xl  w-full py-3 sm:py-5 flex justify-center items-center mb-8 bg-primaryGreen text-primaryWhite text-lg sm:text-2xl font-medium"
          >
            {isLoading ? (
              <ClipLoader
                color={"white"}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Change"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
