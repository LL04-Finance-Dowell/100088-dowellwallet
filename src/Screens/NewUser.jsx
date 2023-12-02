import React, { useState } from "react";
import logo_dowell from "../assets/logo_dowell.png";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"

const NewUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [walletPassword, setWalletPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  // const handlePasswordChange = (e) => {
  //   const newPassword = e.target.value;
  //   setWalletPassword(newPassword);
  //   if (newPassword.length !== 4 || !/^\d+$/.test(newPassword)) {
  //     setErrorMessage("Please enter a 4-digit number.");
  //   } else {
  //     setErrorMessage("");
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (walletPassword.length === 4) {
      const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/wallet-password?session_id=${sessionId}`;
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet_password: walletPassword }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
        })
        .then((data) => {
          console.log('API Response:', data);
          if (data.success && data.redirect_url) {
            window.location.href = data.redirect_url;
          } else {
            // Handle unsuccessful response or missing data
            setErrorMessage('Error setting password.');
            console.error('Invalid response from the server');
          }
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Error setting password:', error);
          setErrorMessage('Error setting password.');
          setIsLoading(false)
        });
    } else {
      setErrorMessage('Please enter a 4-digit number.');
      setIsLoading(false)
    }
  };
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
          Wallet Password
        </p>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {errorMessage && <p className="text-red-500 text-base mb-3">{errorMessage}</p>}
          <input
            required
            type="password"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="Enter Password"
            value={walletPassword}
            onChange={(e) => setWalletPassword(e.target.value)}
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
              "Continue"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
