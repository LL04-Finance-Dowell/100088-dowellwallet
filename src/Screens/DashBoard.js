import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import TransactionItem from "../Components/TransactionItem";
import { Circles } from "react-loader-spinner";
import logo_dowell from "../assets/logo_dowell.png";
import { IoCloseCircle } from "react-icons/io5";
const DashBoard = () => {
  const navigate = useNavigate();
  const [walletDetails, setWalletDetails] = useState(null);
  const location = useLocation();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const getWalletDeatils = () => {
    const accessToken=localStorage.getItem("accessToken")
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/wallet_detail/?session_id=${sessionId}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${accessToken}`
      },
    })
      .then((response) => {
        if (response.redirected) {
          // If redirected, update the window location
          window.location.href = response.url;
          return; // Stop further processing as the redirection will change the page
        }

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.wallet && data.wallet.length > 0) {
          console.log(data);
          setWalletDetails(data);
        } else {
          console.error("Empty or unexpected wallet data received");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  };
  const handleTopUp = () => {
    setShowPaymentOptions(true);
  };
  const handlePaymentMethod = (method) => {
    navigate(`/deposit?method=${method}`);
    setShowPaymentOptions(false);
  };
  useEffect(() => {
    getWalletDeatils();
  }, []);
  useEffect(() => {
    if (showPaymentOptions) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showPaymentOptions]);
  return (
    <div className="bg-gray-200 min-h-screen relative ">
      {showPaymentOptions && (
        <div
          className="bg-secondaryGreen py-5 w-4/6 sm:w-1/4"
          style={{
            position: "fixed",
            top: "50%",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: "999",
          }}
        >
          <IoCloseCircle
            size={40}
            className="cursor-pointer"
            onClick={() => setShowPaymentOptions(false)}
          />
          <h2 className="sm:text-xl mb-3">Choose Payment Method</h2>
          <button
            className="text-xl bg-white p-3 rounded-3xl mb-4 sm:w-2/3 "
            onClick={() => handlePaymentMethod("paypal")}
          >
            PayPal
          </button>
          <button
            className="text-xl bg-white p-3 rounded-3xl sm:w-2/3 "
            onClick={() => handlePaymentMethod("stripe")}
          >
            Stripe
          </button>
        </div>
      )}
      <header>
        <div className="bg-primaryGreen h-24 pr-5 sm:pr-20  flex items-center justify-between">
          <img src={logo_dowell} className="w-52 sm:w-96 h-20" alt="" />
          <Link
            to={`/profile`}
            className="w-20 h-20  flex justify-center items-center bg-white rounded-full text-xl text-primaryGreen"
          >
            Profile
          </Link>
        </div>
      </header>
      {/* ============================================================================== */}
      {walletDetails ? (
        <div className="p-10">
          <section className="bg-white mb-10  p-5 rounded-md flex flex-row">
            <div className="pb-2 flex flex-col mr-5">
              <b className=" text-xl">Wallet Balance</b>
              <b className="text-green-600 pr-5 text-xl">
                $ {walletDetails.wallet[0].balance}
              </b>
            </div>
            <button
              onClick={handleTopUp}
              className="bg-blue-800 text-white p-1 px-2 text-lg  rounded-full"
            >
              Top Up
            </button>
          </section>
          {/* ============================================================================== */}
          <section className="bg-white  p-5 rounded-md mb-32">
            <div className="pb-2">
              <b className="text-xl">Recent Transactions</b>
            </div>
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="sm:text-lg text-sm">Date</th>
                    <th className="sm:text-lg text-sm pr-2 sm:pr-0">
                      Description
                    </th>
                    <th className="sm:text-lg text-sm pr-2 sm:pr-0">Amount</th>
                    <th className="sm:text-lg text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {walletDetails.transactions.map((item, index) => {
                    return <TransactionItem item={item} key={index} />;
                  })}
                </tbody>
              </table>
            </div>
          </section>
          <section className="bg-white h-28 rounded-md border-black border-2 flex flex-row items-center justify-between absolute bottom-4 left-10 right-10">
            <div>
              <Link className="text-3xl font-bold text-primaryGreen sm:ml-10 mr-5 sm:mr-10 ">
                Help
              </Link>
              <Link className="text-3xl font-bold text-primaryGreen">
                Security
              </Link>
            </div>
            <Link
              to={`/changePassword`}
              className="w-24 h-24  flex justify-center items-center bg-white rounded-full border-2 border-black text-xl text-primaryGreen mr-5"
            >
              settings
            </Link>
          </section>
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

export default DashBoard;
