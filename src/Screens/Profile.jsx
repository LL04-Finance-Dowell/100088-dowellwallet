import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import logo_dowell from "../assets/logo_dowell.png";
const Profile = () => {
  const [ProfileDetails, setProfileDetails] = useState(null);
  console.log(ProfileDetails);
  const navigate = useNavigate();
  const getProfileDetails = () => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (!storedAccessToken) {
      navigate("/login");
      return;
    }
    const apiUrl = "https://100088.pythonanywhere.com/api/wallet/v1/profile";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedAccessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/login");
        }
      })
      .then((data) => {
        setProfileDetails(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  };
  useEffect(() => {
    getProfileDetails();
  }, []);
  return (
    <div>
      <div className="bg-primaryGreen h-32 pr-5 sm:pr-20  flex items-center justify-between">
        <img src={logo_dowell} className="w-52 sm:w-96 h-30" alt="" />
      </div>
      {ProfileDetails ? (
        <div className="p-5">
          <img
            src={`https://100088.pythonanywhere.com/${ProfileDetails.profile_picture}`}
            className="w-52 sm:w-96 h-30 mb-5"
            alt=""
          />
          <div className="flex flex-row">
            <div>
              <p className="font-bold mr-14">Name</p>
              <p className="font-bold mr-16">Email</p>
              <p className="font-bold mr-7">Phone no</p>
              <p className="font-bold mr-4">Account no</p>
            </div>
            <div>
              <p>
                {ProfileDetails.firstname} {ProfileDetails.lastname}
              </p>
              <p>{ProfileDetails.email}</p>
              <p>{ProfileDetails.phone_number}</p>
              <p>{ProfileDetails.account_no}</p>
            </div>
          </div>
          <Link
            to="/updateProfile"
            className="rounded-xl mt-5 w-72 py-3 sm:py-5 flex justify-center items-center mb-8 bg-primaryGreen text-primaryWhite text-lg sm:text-2xl font-medium"
          >
            Update Profile
          </Link>
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
