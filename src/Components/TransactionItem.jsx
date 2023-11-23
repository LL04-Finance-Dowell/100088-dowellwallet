import React from "react";
import moment from "moment/moment";
const TransactionItem = ({ item }) => {
  return (
    <tr>
      <td className="sm:text-lg text-sm pr-1 sm:pr-0">
        {moment(item.timestamp).format("MMM. DD, YYYY, h:mm a")}
      </td>
      <td className="sm:text-lg text-sm">{item.transaction_type}</td>
      <td className="sm:text-lg text-sm">{item.amount}</td>
    </tr>
  );
};

export default TransactionItem;
