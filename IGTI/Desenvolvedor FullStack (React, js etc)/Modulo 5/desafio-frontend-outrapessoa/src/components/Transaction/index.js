import React from "react";

import TransactionItem from "./TransactionItem";

const Transaction = ({ transactionList, editButton, deleteButton }) => {
  let listOfTransactionsToRender = <h1>Retrieving transactions...</h1>;

  if (transactionList) {
    listOfTransactionsToRender = transactionList.map(
      ({ _id, description, value, category, type }, index) => (
        <TransactionItem
          key={_id}
          id={_id}
          description={description}
          value={value}
          category={category}
          type={type}
          length={index + 1}
          editButton={editButton}
          deleteButton={deleteButton}
        />
      )
    );
  }

  return listOfTransactionsToRender;
};

export default Transaction;
