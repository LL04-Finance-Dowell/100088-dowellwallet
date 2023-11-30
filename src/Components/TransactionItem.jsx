import React from "react";
// import moment from "moment/moment";
const TransactionItem = ({ item }) => {
  return (
    <tr className="">
      <td className="sm:text-2xl text-sm pr-1 sm:pr-0 text-center py-8">
        {item.date}
      </td>
      <td className="sm:text-2xl text-sm text-center">{item.transaction_type}</td>
      <td className="sm:text-2xl text-sm text-center">${item.amount}</td>
    </tr>
  );
};

export default TransactionItem;
