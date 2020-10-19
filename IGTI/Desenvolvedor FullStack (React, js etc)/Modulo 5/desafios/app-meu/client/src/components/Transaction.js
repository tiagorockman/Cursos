import React from 'react'
import TransactionItem from "./TransactionItem";



const Transaction = ({ transactinfo, editAction, deleteAction }) => {
  let retorno =  <h1>Buscando informações...</h1>;

  if (transactinfo) {
    retorno = transactinfo.map(({ _id, description, value, category, type, day }, index) => (
        <TransactionItem
          key={_id}
          id={_id}
          description={description}
          value={value}
          title={category}
          type={type}
          day={day}
          deleteButton={deleteAction}
          editButton={editAction}
        />
      )
    );
  }

  return retorno;
};

export default Transaction;
