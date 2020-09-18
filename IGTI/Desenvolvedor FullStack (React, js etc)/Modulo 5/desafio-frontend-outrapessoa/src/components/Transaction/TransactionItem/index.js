import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { formatMoneyValue } from "../../../helpers/formatBRLValue";

import { Container, Info, DealingWithIt } from "./styles";

const TransactionItem = ({
  id,
  length,
  description,
  value,
  category,
  type,
  editButton,
  deleteButton,
}) => {
  return (
    <Container>
      <Info typeOfTransaction={type}>
        <span>{length}</span>
        <div>
          <h6>{category}</h6>
          <p>{description}</p>
        </div>
      </Info>

      <DealingWithIt>
        <p>R$ {formatMoneyValue(value)}</p>

        <div>
          <FiEdit onClick={() => editButton(id)} />
          <FiTrash2 onClick={() => deleteButton(id)} />
        </div>
      </DealingWithIt>
    </Container>
  );
};

export default TransactionItem;