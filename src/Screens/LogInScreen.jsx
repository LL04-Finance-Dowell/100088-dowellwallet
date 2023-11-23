import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import logo_dowell from "../assets/logo_dowell.png"
const LogInScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const requestBody = {
      email,
      password,
    };
    fetch("https://100088.pythonanywhere.com/api/wallet/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("accessToken", data.access_token);
          navigate("/");
        } else {
          setError("Incorrect email or password");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("An error occurred. Please try again."); // Set a generic error message
        console.error("Error logging in:", error);
        setIsLoading(false);
      });
  };
  return (
    <div className="">
      <div className="mt-5 flex justify-center">
        <img  src={logo_dowell} className="ml-36" alt="" width={370} height={370}/>
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
          <input
            required
            type="text"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
            Not registered yet?{" "}
            <Link to="/signup" className="font-medium text-black ">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogInScreen;
