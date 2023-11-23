import React, { useState } from "react";
import { Link } from "react-router-dom";
import Screen1 from "../Components/SignupComponents/Screen_1";
import Screen2 from "../Components/SignupComponents/Screen_2";
import ProgressBar from "@ramonak/react-progress-bar";
import logo_dowell from "../assets/logo_dowell.png"
const SignUpScreen = () => {
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState(""); 
  return (
    <div className="px-5 sm:px-16 py-11">
      {/* <p className="font-semibold text-3xl  text-primaryBlue">Payment</p> */}
      <div className="mt-5 flex justify-center">
        <img  src={logo_dowell} className="ml-36" alt="" width={370} height={370}/>
      </div>
      <div className="flex flex-col justify-center items-center mt-16">
        <ProgressBar
          className="w-2/3 lg:w-1/3 h-3 mb-6 sm:mb-12  "
          bgColor="#2f9e44"
          baseBgColor="#b2f2bb"
          isLabelVisible={false}
          completed={page === 0 ? 50 : 100}
        />
        <div className=" p-5 sm:p-20 w-full lg:w-2/6 border-2 border-black   rounded-xl">
          <p className=" text-center text-primaryGreen text-xl sm:text-3xl font-semibold mb-4 sm:mb-8">
            Sign Up
          </p>
          <div >
            {page === 0 && <Screen1 page={page} setPage={setPage} email={email} setEmail={setEmail} />}
            {page === 1 && <Screen2 email={email} />}
            
            <p className="ml-auto mr-auto text-lg sm:text-2xl font-light text-secondaryBlack text-center">
              Already registered?{" "}
              <Link to="/login" className="font-medium ">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
