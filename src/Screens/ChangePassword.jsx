import React, { useState, useEffect } from "react";
import logo_dowell from "../assets/logo_dowell.png";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [transactionState, setTransactionState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [OTP, setOTP] = useState();
  const [newPassword, setNewPaasword] = useState();
  const [session_id, setsession_id] = useState(null);
  const [email, setEmail] = useState(null);
  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/setup-new-pass?session_id=${session_id}`;
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
          navigate(`/login?session_id=${session_id}`);
        } else {
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
  const handleForgetPassword = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/request-reset-password?session_id=${session_id}`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.message) {
          // navigate(`/changePassword?session_id=${session_id}`);
        } else {
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

  const getEmail = () => {
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/get-user?session_id=${session_id}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setEmail(data.email);
        } else {
          setError("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
        console.error("Error logging in:", error);
      });
  };

  const printEmail = () => {
    const first = email.slice(0, 4);
    const last = email.slice(-4);
    return `${first} ${"*".repeat(email.length - 8)} ${last}`;
  };
  const getTransactionHistory = () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    const apiUrl = `http://100088.pythonanywhere.com/api/wallet/v1/transactions-history/?session_id=${session_id}`;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTransactionState(data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors

        setTransactionState("Error getting transaction history");
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setsession_id(localStorage.getItem("sessionId"));
  }, []);

  useEffect(() => {
    if (session_id) getEmail();
  }, [session_id]);
  return (
    <div className="bg-white h-screen">
      <div className="bg-primaryGreen h-24 pr-5 sm:pr-20  flex items-center justify-between">
        <img
          onClick={() => {
            console.log(localStorage.getItem("accessToken"));
            if (localStorage.getItem("accessToken")) {
              navigate("/");
            }
          }}
          src={logo_dowell}
          className=" cursor-pointer w-44 sm:w-80 h-20"
          alt=""
        />
      </div>
      {localStorage.getItem("accessToken") && (
        <div className="w-4/5 lg:w-2/6 ml-auto mr-auto">
          <button
            disabled={isLoading}
            onClick={getTransactionHistory}
            className="rounded-xl  w-full py-3 sm:py-5 flex justify-center items-center mt-8  bg-primaryGreen text-primaryWhite text-lg sm:text-2xl font-medium"
          >
            {isLoading ? (
              <ClipLoader
                color={"white"}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Get Transaction History"
            )}
          </button>
          <p className="text-center mt-2">{transactionState}</p>
        </div>
      )}

      <div className="border-black border-2 p-5 sm:p-10 w-4/5 lg:w-2/6 mt-12 ml-auto mr-auto rounded-xl ">
        <p className="text-primaryBlack text-center text-xl sm:text-3xl font-semibold mb-4 sm:mb-8 ">
          Change Password
        </p>
        <p className=" mb-2 text-base sm:text-lg font-semibold inline">
          <span
            className="text-primaryGreen cursor-pointer text-xl"
            onClick={handleForgetPassword}
          >
            send
          </span>
          {` otp to this email : `}
        </p>
        <p className=" mb-3 text-base sm:text-lg font-medium sm:inline">
          {`${email ? printEmail() : ""} `}
        </p>
        <form className="flex flex-col" onSubmit={submitHandler}>
          {error && <p className="text-red-500 text-base mb-3">{error}</p>}
          <input
            required
            type="text"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack sm:mt-6"
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
