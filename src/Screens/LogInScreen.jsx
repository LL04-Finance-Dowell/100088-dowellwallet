import React, { useState } from "react";
import { useNavigate, useLocation, } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import logo_dowell from "../assets/logo_dowell.png";

const LogInScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    console.log(sessionId);
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/wallet-login?session_id=${sessionId}`;
    const requestBody = {
      wallet_password: password,
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
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          navigate(`/?session_id=${sessionId}`);
        } else {
          setError(data.error);
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
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    console.log(sessionId);
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/request-reset-password?session_id=${sessionId}`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.message) {
          navigate(`/changePassword?session_id=${sessionId}`);
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
  return (
    <div className="">
      <div className="mt-5 flex justify-center">
        <img
          src={logo_dowell}
          className=" pl-20"
          alt=""
          width={350}
          height={370}
        />
      </div>
      <div className="border-black border-2 p-5 sm:p-10 w-full lg:w-2/6 mt-16 ml-auto mr-auto rounded-xl ">
        <p className="text-primaryBlack text-center text-xl sm:text-3xl font-semibold mb-4 sm:mb-8 ">
          Log in to Dowell Wallet
        </p>
        <form className="flex flex-col" onSubmit={submitHandler}>
          {error && <p className="text-red-500 text-base mb-3">{error}</p>}
          {/* <label className="text-primaryBlack text-base sm:text-xl font-medium mb-2">
            Username
          </label> */}
          {/* <input
            required
            type="text"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /> */}
          {/* <label className="text-primaryBlack text-base sm:text-xl font-medium mb-2">
            Password
          </label> */}
          <input
            required
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              "Sign in"
            )}
          </button>
          <p className="ml-auto mr-auto text-lg sm:text-2xl font-light text-black">
            <p
              to="/signup"
              className="font-normal text-black cursor-pointer"
              onClick={handleForgetPassword}
            >
              Forget password
            </p>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogInScreen;
