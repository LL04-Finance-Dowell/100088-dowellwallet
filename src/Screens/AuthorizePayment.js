import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import logo_dowell from "../assets/logo_dowell.png";
import { useLocation } from "react-router-dom";
const AuthorizePayment = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initializationId, setinitializationId] = useState("");
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleFormSubmit = async (event) => {
    setShowConfirmation(false)
    setIsLoading(true);
    event.preventDefault();
    console.log({
      email,
      password,
      initialization_id: initializationId,
    });
    try {
      const response = await fetch(
        "https://100088.pythonanywhere.com/api/wallet/v1/verify-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            initialization_id: initializationId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error response
        console.error("Login failed:", errorData.error || "Unknown error");
        setError("Error while trying to authorize payment");
        setIsLoading(false);
        return; // Exit function early if there's an error
      }

      const data = await response.json();
      console.log("Login response:", data);

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        console.error("No callback URL received");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error while trying to authorize payment");
    }
    setIsLoading(false);
  };
  const handleConfirmation=(event)=>{
    event.preventDefault();
    setShowConfirmation(true); 
  }
  useEffect(() => {
    // Extract initiation_id from URL params
    const searchParams = new URLSearchParams(location.search);
    const initializationIdFromParams = searchParams.get("initialization_id");
    const priceFromParams = searchParams.get('price');
    console.log("initialization ID from URL:", initializationIdFromParams);
    console.log("priceFromParams:", priceFromParams);
    if (initializationIdFromParams) {
      setinitializationId(initializationIdFromParams);
      if (priceFromParams) {
        setPrice(parseFloat(priceFromParams)); // Convert to a number if needed
      }
    }
  }, [location.search]);
  return (
    <div className="">
      <div className="mt-5 flex justify-center">
        <img
          src={logo_dowell}
          className="ml-36"
          alt=""
          width={370}
          height={370}
        />
      </div>
      <div className="border-black border-2 p-5 sm:p-10 w-full lg:w-2/6 mt-16 ml-auto mr-auto rounded-xl ">
        <p className="text-primaryBlack text-center text-xl sm:text-3xl font-semibold mb-4 sm:mb-8 ">
          Authorize Your payment
        </p>
        <form className="flex flex-col" onSubmit={handleConfirmation}>
          {error && <p className="text-red-500 text-base mb-3">{error}</p>}
          <input
            required
            type="text"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
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
              "Authorize"
            )}
          </button>
          {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="text-lg mb-4">Confirm payment of ${price}?</p>
            <div className="flex justify-end">
              <button
                onClick={handleFormSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 focus:outline-none"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        </form>
      </div>
    </div>
  );
};

export default AuthorizePayment;
