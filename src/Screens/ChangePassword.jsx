import React,{useState} from "react";
import logo_dowell from "../assets/logo_dowell.png";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPaasword] = useState();
  const [newPassword, setNewPaasword] = useState();
  return (
    <div className="bg-gray-200 h-screen">
      <div className="bg-primaryGreen h-24 pr-5 sm:pr-20  flex items-center justify-between">
        <img
          onClick={() => navigate("/")}
          src={logo_dowell}
          className=" cursor-pointer w-44 sm:w-80 h-20"
          alt=""
        />
      </div>

      <div className="border-black border-2 p-5 sm:p-10 w-4/5 lg:w-2/6 mt-16 ml-auto mr-auto rounded-xl ">
        <p className="text-primaryBlack text-center text-xl sm:text-3xl font-semibold mb-4 sm:mb-8 ">
          Change Password
        </p>
        <form className="flex flex-col">
          {error && <p className="text-red-500 text-base mb-3">{error}</p>}
          <input
            required
            type="text"
            className="rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="Enter Old Paasword"
            value={oldPassword}
            onChange={(e) => setOldPaasword(e.target.value)}
          />
          <input
            required
            type="text"
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
              "Deposit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
