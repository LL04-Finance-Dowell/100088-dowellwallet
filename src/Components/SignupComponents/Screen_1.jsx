import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Screen_1 = ({ page, setPage, email, setEmail }) => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [phone_number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [wallet_password, setWallet_password] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    setIsLoading(true);
    e.preventDefault();
    if (confirmPassword === password) {
      if (passwordRegex.test(password)) {
        setError(null);
        const requestBody = {
          first_name,
          last_name,
          phone_number,
          email,
          password,
          wallet_password
        };
        fetch("https://100088.pythonanywhere.com/api/wallet/v1/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        })
          .then(async (response) => {
            if (response.ok) {
              if (page < 1) {
                setPage((previous) => previous + 1);
              }
            } else {
              const errorData = await response.json();
              const errorMessage = errorData.error;
              if (typeof errorMessage === "object" && errorMessage !== null) {
                setError(errorMessage.username[0]);
              } else {
                setError(errorMessage);
              }
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error("Error during signup:", error);
            setError("An error occurred during signup.");
          });
      }
      else{
        setIsLoading(false);
        setError("The password must contain at least 8 characters, including a number and a special character");
      }
    } else {
      setIsLoading(false);
      setError("password and confrim password aren't the same");
    }
   
  };
  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-base mb-3">{error}</p>}
      {/* <label className="text-secondaryBlack text-base sm:text-xl font-light mb-2">
        Email
      </label> */}
      <input
        type="email"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 border-2 border-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <label className="text-secondaryBlack text-base sm:text-xl font-light mb-2">
        Username
      </label> */}
      <input
        type="text"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 border-2 border-black"
        placeholder="Fisrt Name"
        value={first_name}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 border-2 border-black"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLastname(e.target.value)}
      />
      <input
        type="text"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 border-2 border-black"
        placeholder="Mobile Number"
        value={phone_number}
        onChange={(e) => setMobileNumber(e.target.value)}
      />

      {/* <label className="text-secondaryBlack text-base sm:text-xl font-light mb-2">
        Password
      </label> */}
      <input
        type="password"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 border-2 border-black"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {/* <label className="text-secondaryBlack text-base sm:text-xl font-light mb-2">
        Confirm Password
      </label> */}
      <input
        type="password"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 border-2 border-black"
        value={confirmPassword}
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
        <input
        type="password"
        required
        className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 border-2 border-black"
        value={wallet_password}
        onChange={(e) => setWallet_password(e.target.value)}
        placeholder="Wallet Password"
      />
      <button
        disabled={isLoading}
        type="submit"
        className="rounded-xl  w-full py-3 sm:py-5 flex justify-center items-center mb-4 sm:mb-8 bg-primaryGreen text-black text-lg sm:text-2xl font-medium"
      >
        {isLoading ? (
          <ClipLoader
            color={"white"}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "continue"
        )}
      </button>
    </form>
  );
};

export default Screen_1;
