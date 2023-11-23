import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import ClipLoader from "react-spinners/ClipLoader";
const Screen_2 = ({ email }) => {
  const navigate = useNavigate();
  const [otpKey, setOTPKey] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    let timerInterval;

    // If the "Resend OTP" link is disabled, start a timer to enable it after 1 minute
    if (isResendDisabled) {
      timerInterval = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(remainingTime - 1);
        } else {
          clearInterval(timerInterval);
          setIsResendDisabled(false);
        }
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isResendDisabled, remainingTime]);
  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const requestBody = {
      otp_key: otpKey,
      email, // Use the email received from the context
    };

    // Make a POST request to verify the OTP
    fetch("https://100088.pythonanywhere.com/api/wallet/v1/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (response.ok) {
          setError(null); // Clear the error message
          navigate("/login"); // Redirect to the login page
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.message;
          setError(errorMessage);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error during OTP verification:", error);
        setError("An error occurred during OTP verification.");
        setIsLoading(false);
      });
    
  };
  const handleResendOTP = (e) => {
    e.preventDefault();
    if (isResendDisabled) {
      return;
    }

    // Construct the request body
    const requestBody = {
      email, // Use the email received from the context
    };

    // Make a POST request to resend the OTP
    fetch("https://100088.pythonanywhere.com/api/wallet/v1/resend-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setIsResendDisabled(true); // Disable the "Resend OTP" link
          setRemainingTime(60); // Reset the timer
        } else {
          setError("Failed to resend OTP");
        }
      })
      .catch((error) => {
        console.error("Error during OTP resend:", error);
        setError("An error occurred while resending OTP.");
      });
  };
  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      {error && <p className="text-red-500 text-base mb-3">{error}</p>}
      <label className="text-secondaryBlack text-base sm:text-xl font-light mb-2">
        You will receive a code by email
      </label>
      <input
        type="text"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6"
        value={otpKey}
        onChange={(e) => setOTPKey(e.target.value)}
      />
      <button
        className="flex flex-row mb-4 sm:mb-8 items-center"
        disabled={isResendDisabled}
        onClick={handleResendOTP}
      >
        <FiRefreshCcw size={23} color="#2D4EFF" />
        <p className="text-primaryBlue ml-2 text-sm sm:text-2xl font-medium ">
          {isResendDisabled ? `${remainingTime}s` : "Send code again"}
        </p>
      </button>

      <button
        disabled={isLoading}
        type="submit"
        className="rounded-xl  w-full py-3 sm:py-5 flex justify-center items-center mb-4 sm:mb-8 bg-primaryBlue text-primaryWhite text-lg sm:text-2xl font-medium"
      >
        {isLoading ? (
          <ClipLoader
            color={"white"}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "finish"
        )}
      </button>
    </form>
  );
};

export default Screen_2;
