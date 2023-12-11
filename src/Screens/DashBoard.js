import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TransactionItem from "../Components/TransactionItem";
import { Circles } from "react-loader-spinner";
import logo_dowell from "../assets/logo_dowell.png";
import { IoCloseCircle } from "react-icons/io5";
const DashBoard = () => {
  const navigate = useNavigate();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [walletDetails, setWalletDetails] = useState(null);
  const location = useLocation();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [session, setSession] = useState(null);

  const getWalletDeatils = () => {
    const accessToken = localStorage.getItem("accessToken");
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");
    const apiUrl = `https://100088.pythonanywhere.com/api/wallet/v1/wallet_detail/?session_id=${sessionId}`;
    setSession(sessionId);
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
        } else if (data.wallet && data.wallet.length > 0) {
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
    navigate(`/deposit?method=${method}&session_id=${session}`);
    setShowPaymentOptions(false);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil(walletDetails.transactions.length / itemsPerPage)
      )
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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
      <header className="fixed top-0 left-0 right-0">
        <div className="bg-primaryGreen h-24 pr-5 sm:pr-20  flex items-center justify-between sticky top-0">
          <img src={logo_dowell} className="w-52 sm:w-96 h-20" alt="" />
          <Link
            to={`/profile?session_id=${session}`}
            className="w-20 h-20  flex justify-center items-center bg-white rounded-full text-xl text-primaryGreen"
          >
            Profile
          </Link>
        </div>
      </header>
      {/* ============================================================================== */}
      {walletDetails ? (
        <div className="p-10">
          <section className="bg-white  p-5 rounded-md flex flex-row fixed top-28 left-10 right-10 ">
            <div className="pb-2 flex flex-col mr-5">
              <b className="text-lg sm:text-xl">Wallet Balance</b>
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
          <section className="bg-white  p-5 rounded-md mb-32 mt-52">
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
                  {walletDetails.transactions
                    .slice(startIndex, endIndex)
                    .map((item, index) => {
                      return <TransactionItem item={item} key={index} />;
                    })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-row">
              {currentPage !== 1 && (
                <button
                  className="mr-4 bg-secondaryGreen p-4 rounded-lg"
                  onClick={handlePrevPage}
                >
                  Previous
                </button>
              )}
              {currentPage !==
                Math.ceil(walletDetails.transactions.length / itemsPerPage) && (
                <button
                  className="bg-secondaryGreen p-4 rounded-lg"
                  onClick={handleNextPage}
                >
                  Next
                </button>
              )}
            </div>
          </section>
          <section className="bg-white h-16 rounded-md border-black border-2 flex flex-row items-center justify-between fixed bottom-1 left-10 right-10">
            <div>
              <Link className="text-lg sm:text-xl font-bold text-primaryGreen ml-2 sm:ml-10 mr-5 sm:mr-10 ">
                Help
              </Link>
              <Link className="text-lg sm:text-xl  font-bold text-primaryGreen">
                Security
              </Link>
            </div>
            <Link
              to={`/changePassword`}
              className="w-24 h-12  flex justify-center items-center bg-white rounded-full border-2 border-black text-xl text-primaryGreen mr-5"
            >
              settings
            </Link>
          </section>
        </div>
      ) : (
        <div className="w-full flex flex-row justify-center mt-24">
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
