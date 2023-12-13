import React, { useState, useEffect } from "react";
import logo_dowell from "../assets/logo_dowell.png";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";
const Deposit = () => {
  const location = useLocation();
  const [depositmethod, setDepositMethod] = useState("");
  const [sessionId, setsessionId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");
  const handleConfirmation = (event) => {
    const accessToken = localStorage.getItem("accessToken");
    event.preventDefault();
    setIsLoading(true);
    if (!depositAmount || isNaN(parseFloat(depositAmount))) {
      setError("Please enter a valid amount.");
      setIsLoading(false);
      return;
    }
    const stripeapiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/stripe-payment?session_id=${sessionId}`;
    const paypalapiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/paypal-payment?session_id=${sessionId}`; // Replace with your PayPal API URL

    const apiUrl = depositmethod === "paypal" ? paypalapiUrl : stripeapiUrl;
    fetch(apiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ amount: parseFloat(depositAmount) }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          window.location.href = data.approval_url;
        } else {
          window.location.href = data.url;
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error making a deposit:", error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const method = searchParams.get("method");
    const session = localStorage.getItem("sessionId");

    if (method) {
      setDepositMethod(method);
    }
    if (session) {
      setsessionId(session);
    }
  }, [location.search]);
  return (
    <div className="bg-gray-200 h-screen">
      <header>
        <Link
          to={`/`}
          className="bg-primaryGreen h-24 pr-5 sm:pr-20  flex items-center justify-between"
        >
          <img
            src={logo_dowell}
            className="cursor-pointer w-44 sm:w-80 h-20"
            alt=""
          />
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
