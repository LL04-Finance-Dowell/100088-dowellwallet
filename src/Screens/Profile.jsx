import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import logo_dowell from "../assets/logo_dowell.png";
const Profile = () => {
  const [ProfileDetails, setProfileDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [session, setSession] = useState(null);
  const getProfileDetails = () => {
    const accessToken = localStorage.getItem("accessToken");
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    console.log(sessionId);
    setSession(sessionId);
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/profile?session_id=${sessionId}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success === false) {
          window.location.href = data.url;
        } else {
          setProfileDetails(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };
  useEffect(() => {
    getProfileDetails();
  }, []);
  return (
    <div>
      <div className="bg-primaryGreen h-24 pr-5 sm:pr-20  flex items-center justify-between">
        <img
          onClick={() => navigate(`/?session_id=${session}`)}
          src={logo_dowell}
          className=" cursor-pointer w-44 sm:w-80 h-20"
          alt=""
        />
        {/* <button
          className="sm:w-28 w-20 h-20  flex justify-center items-center bg-white rounded-full text-xl text-primaryGreen"
        >
          Log Out
        </button> */}
      </div>
      {ProfileDetails ? (
        <div className="p-5 bg-secondaryGreen mt-10 w-5/6 mx-10 sm:w-96 ml-auto mr-auto flex flex-col justify-center items-center rounded-3xl ">
          <img
            src={`${ProfileDetails.profile_picture}`}
            className="w-96 sm:w-96 h-30 mb-5"
            alt=""
          />
          <div className="flex flex-row w-full">
            <div>
              <p className="font-bold mr-14">Name</p>
              <p className="font-bold mr-16">Email</p>
              <p className="font-bold mr-7">Phone no</p>
              <p className="font-bold mr-4">Account no</p>
            </div>
            <div className="w-full">
              <p className="w-full">
                {ProfileDetails.firstname} {ProfileDetails.lastname}
              </p>
              <p className="w-full">{ProfileDetails.email}</p>
              <p>{ProfileDetails.phone}</p>
              <p>{ProfileDetails.account_no}</p>
            </div>
          </div>
          {/* <Link
            to="/updateProfile"
            className="rounded-xl mt-5 w-72 py-3 sm:py-5 flex justify-center items-center mb-8 bg-primaryGreen text-primaryWhite text-lg sm:text-2xl font-medium"
          >
            Update Profile
          </Link> */}
        </div>
      ) : (
        <div className="w-full flex flex-row justify-center mt-5">
          <Circles
            height="80"
            width="80"
            color="#2D4EFF"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
