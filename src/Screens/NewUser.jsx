import React,{useState} from "react";
import logo_dowell from "../assets/logo_dowell.png";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useLocation } from "react-router-dom";

const NewUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletPassword, setWalletPassword] = useState("");
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
        <form className="flex flex-col" >
          {error && <p className="text-red-500 text-base mb-3">{error}</p>}
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
  )
}

export default NewUser