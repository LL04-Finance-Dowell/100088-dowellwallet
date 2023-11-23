import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TransactionItem from "../Components/TransactionItem";
import { Circles } from "react-loader-spinner";
import logo_dowell from "../assets/logo_dowell.png";
const DashBoard = () => {
  const navigate = useNavigate();
  const [walletDetails, setWalletDetails] = useState(null);

  const getWalletDeatils = () => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (!storedAccessToken) {
      navigate("/login");
      return;
    }
    const apiUrl =
      "https://100088.pythonanywhere.com/api/wallet/v1/wallet_detail";

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
        setWalletDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  };
  useEffect(() => {
    getWalletDeatils();
  }, [navigate]);
  return (
    <div className="bg-gray-200 h-screen">
      <header>
        <div className="bg-primaryGreen h-32 pr-5 sm:pr-20  flex items-center justify-between">
          <img src={logo_dowell} className="w-52 sm:w-96 h-30" alt="" />
          <Link to={"/profile"} className="sm:w-28 w-24 h-24 sm:h-28  flex justify-center items-center bg-white rounded-full text-xl text-primaryGreen">
            Profile
          </Link>
        </div>
      </header>
      {/* ============================================================================== */}
      {walletDetails ? (
        <>
          <section className="bg-white m-10 p-5 ">
            <div className="text-lg pb-2">
              <b>Wallet Balance</b>
            </div>
            <div>
              <b className="text-green-600 pr-5 text-xl">
                {walletDetails.wallet.balance}
              </b>
              <button className="bg-blue-800 text-white p-1 px-2  rounded-full">
                Top Up
              </button>
            </div>
          </section>
          {/* ============================================================================== */}
          <section className="bg-white m-10 p-5 ">
            <div className="text-lg pb-2">
              <b>Recent Transactions</b>
            </div>
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="sm:text-lg text-sm">Date</th>
                    <th className="sm:text-lg text-sm pr-2 sm:pr-0">
                      Description
                    </th>
                    <th className="sm:text-lg text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {walletDetails.transactions.map((item) => {
                    return <TransactionItem item={item} />;
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
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

export default DashBoard;
