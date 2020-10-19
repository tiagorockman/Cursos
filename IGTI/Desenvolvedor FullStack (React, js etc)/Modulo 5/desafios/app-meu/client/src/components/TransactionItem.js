import React from 'react';
import { formatCurrency } from '../helpers/formatNumbers';

import { TransactItemContainer, TextContent, MoneyStyle } from '../styles';

const TransactionItem = ({
  id,
  day,
  title,
  description,
  value,
  type,
  length,
  deleteButton,
  editButton
}) => {
  return (
    <>
      <TransactItemContainer type={type}>
        <TextContent>
          <span>{day}</span>
          <div>
            <h6>{title}</h6>
            <p>{description}</p>
          </div>
        </TextContent>
        <MoneyStyle>
          <p>{formatCurrency(value)}</p>
          <div>
            <a
              className="btn-small"
              type="submit"
              name="action"
              onClick={() => editButton(id)}
            >              
              <i className="material-icons">edit</i>
            </a>
            <a
              className="btn-small"
              type="submit"
              name="action"
              onClick={() => deleteButton(id)}
            >              
              <i className="material-icons">delete_outline</i>
            </a>
          </div>
        </MoneyStyle>
      </TransactItemContainer>
    </>
  );
};

export default TransactionItem;
