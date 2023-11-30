import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TransactionItem from "../Components/TransactionItem";
import { Circles } from "react-loader-spinner";
import logo_dowell from "../assets/logo_dowell.png";
import { IoCloseCircle } from "react-icons/io5";
import { useLocation } from "react-router-dom";
const DashBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState("");
  const [walletDetails, setWalletDetails] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
 
  const getWalletDeatils = () => {
    console.log("--------called------------")
    // const storedAccessToken = localStorage.getItem("accessToken");

    // if (!storedAccessToken) {
    //   navigate("/login");
    //   return;
    // }

    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams)
    const sessionIdFromParams = searchParams.get("session_id");
    const apiUrl =
      `http://127.0.0.1:8000/api/wallet/v1/wallet_detail/?session_id=${sessionIdFromParams}`;
    
    console.log("apirul",apiUrl)
    fetch(apiUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => {
        console.log('response',response)
        if (response.redirected){
         
          // document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          window.location.href = response['url']
        }
        if (response.ok) {
          return response.json();
        } else {
          // navigate("/login");
        }
      })
      .then((data) => {
        console.log("data",data)
        setWalletDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // navigate("/login");
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
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams)
    const sessionIdFromParams = searchParams.get("session_id");
    console.log("sessionIdFromParams",sessionIdFromParams)
    if (sessionIdFromParams){
      setSessionId(sessionIdFromParams)
      console.log("sessionIdFromParams",sessionIdFromParams)
    }
    if (showPaymentOptions) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    
  }, [showPaymentOptions]);

  
  console.log("walletDetails",walletDetails)
  return (
    <div className="bg-gray-200 min-h-screen">
    <button onClick={()=>getWalletDeatils()}>click</button>
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
        <div className="bg-primaryGreen h-32 pr-5 sm:pr-20  flex items-center justify-between">
          <img src={logo_dowell} className="w-52 sm:w-96 h-30" alt="" />
          <Link
            to={"/profile"}
            className="sm:w-28 w-24 h-24 sm:h-28  flex justify-center items-center bg-white rounded-full text-xl text-primaryGreen"
          >
            Profile
          </Link>
        </div>
      </header>
      {/* ============================================================================== */}
      {walletDetails ? (
        <div className="p-10">
          <section className="bg-white mb-10  p-5 rounded-md">
            <div className="pb-2">
              <b className=" text-xl">Wallet Balance</b>
            </div>
            <div>
              <b className="text-green-600 pr-5 text-xl">
                ${walletDetails.wallet[0].balance}
              </b>
              <button
                onClick={handleTopUp}
                className="bg-blue-800 text-white p-1 px-2 text-lg  rounded-full"
              >
                Top Up
              </button>
            </div>
          </section>
          {/* ============================================================================== */}
          <section className="bg-white  p-5 rounded-md ">
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
                    <th className="sm:text-lg text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {walletDetails.transactions.map((item,index) => {
                    return <TransactionItem item={item} key={index} />;
                  })}
                </tbody>
              </table>
            </div>
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
