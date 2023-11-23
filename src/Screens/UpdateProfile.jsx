import React, { useState } from "react";
import logo_dowell from "../assets/logo_dowell.png";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const storedAccessToken = localStorage.getItem("accessToken");
    if (!storedAccessToken) {
      navigate("/login");
      return;
    }
    const formData = new FormData();
    formData.append("profile_picture", profilePicture);
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("phone_number", phoneNumber);
    try {
      const response = await fetch(
        "https://100088.pythonanywhere.com/api/wallet/v1/profile",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        setError("error while updating profile")
      }else{
        navigate("/")
      }
    } catch (error) {
      setError("error while updating profile")
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="bg-primaryGreen h-32 pr-5 sm:pr-20  flex items-center justify-between">
        <img src={logo_dowell} className="w-52 sm:w-96 h-30" alt="" />
      </div>
      <div className="p-6 ">
        <p className="text-4xl font-bold mb-5">Update Profile</p>
        <form className="flex flex-col" onSubmit={submitHandler}>
        {error && <p className="text-red-500 text-base mb-3">{error}</p>}
          <div>
            <label className="mr-4 text-lg font-semibold">Profile Image</label>
            <input
              required
              className="mb-5"
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setProfilePicture(e.target.files[0]);
              }}
            />
          </div>

          <input
            required
            type="text"
            className="w-full sm:w-2/5 rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            required
            type="text"
            className="w-full sm:w-2/5 rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            required
            type="text"
            className="w-full sm:w-2/5 rounded-xl h-14 px-6 py-4 mb-3 sm:mb-6 bg-secondaryGreen text-thirdBlack"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button
            disabled={isLoading}
            type="submit"
            className="rounded-xl  w-72 py-3 sm:py-5 flex justify-center items-center mb-8 bg-primaryGreen text-primaryWhite text-lg sm:text-2xl font-medium"
          >
            {isLoading ? (
              <ClipLoader
                color={"white"}
                size={35}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
