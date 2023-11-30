import React, { useState, useEffect } from "react";
import logo_dowell from "../assets/logo_dowell.png";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";
const Deposit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [depositmethod, setDepositMethod] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const handleConfirmation = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!depositAmount || isNaN(parseFloat(depositAmount))) {
      setError("Please enter a valid amount.");
      setIsLoading(false);
      return;
    }
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams)
    const sessionIdFromParams = searchParams.get("session_id");

    const stripeapiUrl =
      `http://127.0.0.1:8000/api/wallet/v1/stripe-payment?session_id=${sessionIdFromParams}`;
    const paypalapiUrl =
      `http://127.0.0.1:8000/api/wallet/v1/paypal-payment?session_id=${sessionIdFromParams}`; // Replace with your PayPal API URL
    // const storedAccessToken = localStorage.getItem("accessToken");

    // if (!storedAccessToken) {
    //   navigate("/login");
    //   return;
    // }
    const apiUrl = depositmethod === "paypal" ? paypalapiUrl : stripeapiUrl;
    console.log("payment",apiUrl)
    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseFloat(depositAmount) }),
    })
      .then((response) => {
        console.log(response)
        if (response.redirected){
          window.location.href = response['url']
        }
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.success) {
          window.location.href = data.approval_url;
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error making a deposit:", error);
        setError("An error occurred. Please try again.");
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const method = searchParams.get("method"); // Extract method from URL params

    if (method) {
      setDepositMethod(method);
    }
  }, [location.search]);
  return (
    <div className="bg-gray-200 h-screen">
      <header>
        <Link
          to={"/"}
          className="bg-primaryGreen h-32 pr-5 sm:pr-20  flex items-center justify-between"
        >
          <img src={logo_dowell} className="w-52 sm:w-96 h-30" alt="" />
        </Link>
      </header>
      <div className="border-black border-2 p-5 sm:p-10 w-4/5 lg:w-2/6 mt-16 ml-auto mr-auto rounded-xl ">
        <p className="text-primaryBlack text-center text-xl sm:text-3xl font-semibold mb-4 sm:mb-8 ">
          Deposit Money via {depositmethod && depositmethod.toUpperCase()}
        </p>
        <form className="flex flex-col" onSubmit={handleConfirmation}>
          {error && <p className="text-red-500 text-base mb-3">{error}</p>}
          <input
            required
            type="text"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="Enter Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
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
              "Deposit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
