import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
import { BsFillCircleFill } from "react-icons/bs";
import { FiPlus, FiSearch } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import api from "./services/api";

import formatYearMonth from "./helpers/formatYearMonth.js";
import getMonthYear from "./helpers/getYearMonth";
import { formatMoneyValue } from "./helpers/formatBRLValue";

import Signature from "./components/Signature";
import Transaction from "./components/Transaction";

import GlobalStyle from "./styles/global";
import {
  Container,
  Select,
  Balance,
  ButtonAndSearchContainer,
  Search,
  Content,
} from "./styles";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";

export default function App() {
  const [date, setDate] = useState();
  const [values, setValues] = useState();
  const [balance, setBalance] = useState({ income: 0, outcome: 0, total: 0 });
  const [numOfEntries, setNumOfEntries] = useState();
  const [transactionList, setTransactionList] = useState();
  const [transactionToEdit, setTransactionToEdit] = useState();

  const [show, setShow] = useState(false);
  const [action, setAction] = useState("add");
  const [searchParams, setSearchParams] = useState("");

  // onLoad
  useEffect(() => {
    api.get("/periods").then(({ data }) => {
      let periodItems = [];
      data.forEach((periodItem) => {
        const formattedDate = formatYearMonth(periodItem);
        periodItems.push({ currentMonth: periodItem, formattedDate });
      });

      setValues(periodItems);
    });
  }, [date]);

  // onLoad
  useEffect(() => {
    const fullDate = getMonthYear();

    setDate(fullDate);

    api.get(`/?period=${fullDate}`).then((res) => {
      const { balance, quantityOfTransactions, transactions } = res.data;

      setBalance(balance);
      setNumOfEntries(quantityOfTransactions);
      setTransactionList(transactions);
    });
  }, []);

  // onInputChange
  useEffect(() => {
    api.get(`/?period=${date}`).then((res) => {
      const { balance, quantityOfTransactions, transactions } = res.data;

      setBalance(balance);
      setNumOfEntries(quantityOfTransactions);
      setTransactionList(transactions);
    });
  }, [date]);

  const handleSelectNextButton = () => {
    const currentDateIndex = values.findIndex(
      (value) => value.currentMonth === date
    );

    setDate(values[currentDateIndex + 1].currentMonth);
  };

  const handleSelectPreviousButton = () => {
    const currentDateIndex = values.findIndex(
      (value) => value.currentMonth === date
    );

    setDate(values[currentDateIndex - 1].currentMonth);
  };

  const searchEntries = useCallback(() => {
    api.post("/search", { searchParams, date }).then((res) => {
      const { balance, quantityOfTransactions, transactions } = res.data;

      setBalance(balance);
      setNumOfEntries(quantityOfTransactions);
      setTransactionList(transactions);
    });
    setSearchParams("");
  }, [date, searchParams]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchEntries();
    }
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    searchEntries();
  };

  const handleAddOrEditEntry = (transaction) => {
    if (!transaction._id) {
      api
        .post("/", transaction)
        .then((res) => {
          const { balance, quantityOfTransactions, transactions } = res.data;

          setBalance(balance);
          setNumOfEntries(quantityOfTransactions);
          setTransactionList(transactions);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Patch");
      api
        .patch("/", { transaction })
        .then((res) => {
          const { balance, quantityOfTransactions, transactions } = res.data;

          setBalance(balance);
          setNumOfEntries(quantityOfTransactions);
          setTransactionList(transactions);
        })
        .catch((err) => console.log(err));
    }

    handleModalClose();
  };

  const handleEditButtonClick = (id) => {
    setAction("edit");
    api.get(`/id?id=${id}`).then((res) => {
      setTransactionToEdit(res.data[0]);
    });

    setShow(true);
  };

  const handleDeleteButtonClick = (id) => {
    api
      .delete("/", { data: { id } })
      .then((res) => {
        const { balance, quantityOfTransactions, transactions } = res.data;

        setBalance(balance);
        setNumOfEntries(quantityOfTransactions);
        setTransactionList(transactions);
      })
      .catch((err) => console.log(err));
  };

  const handleModalClose = () => {
    const clearTransactions = {
      type: "",
      description: "",
      category: "",
      value: "",
      yearMonthDay: "",
    };

    setTransactionToEdit(clearTransactions);
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        closeModal={handleModalClose}
        submitModalForm={handleAddOrEditEntry}
        transactionToEdit={transactionToEdit}
        action={action}
      />
      <Backdrop show={show} clicked={handleModalClose} />
      <Container>
        <Signature />
        <h1>
          <BsFillCircleFill /> Personal Financial Control <BsFillCircleFill />
        </h1>

        <form>
          <Select>
            <button type='button' onClick={handleSelectPreviousButton}>
              <IoIosArrowBack />
            </button>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              {!values ? (
                <option>-</option>
              ) : (
                values.map((month) => (
                  <option key={month.currentMonth} value={month.currentMonth}>
                    {month.formattedDate}
                  </option>
                ))
              )}
            </select>
            <button type='button' onClick={handleSelectNextButton}>
              <IoIosArrowForward />
            </button>
          </Select>
        </form>

        <Balance>
          <p>
            <strong>Entries: </strong> {numOfEntries}
          </p>
          <p>
            <strong>Income: </strong>{" "}
            {!balance.income ? "-" : `R$ ${formatMoneyValue(balance.income)}`}
          </p>
          <p>
            <strong>Outcome: </strong>{" "}
            {!balance.outcome ? "-" : `R$ ${formatMoneyValue(balance.outcome)}`}
          </p>
          <p>
            <strong>Total: </strong>{" "}
            {!balance.total ? "-" : `R$ ${formatMoneyValue(balance.total)}`}
          </p>
        </Balance>

        <ButtonAndSearchContainer>
          <button
            onClick={() => {
              setShow(true);
              setAction("add");
            }}
          >
            <FiPlus /> <p>new entry</p>
          </button>
          <Search>
            <p>search</p>

            <input
              type='text'
              placeholder='look for entry’s description'
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
              onKeyUp={handleEnter}
            />
            <button type='submit' onClick={handleSearchButton}>
              <FiSearch />
            </button>
          </Search>
        </ButtonAndSearchContainer>

        <Content>
          <h3>Entries for {date && formatYearMonth(date)}</h3>
          <Transaction
            transactionList={transactionList}
            editButton={handleEditButtonClick}
            deleteButton={handleDeleteButtonClick}
          />
        </Content>
      </Container>
      <GlobalStyle />
    </>
  );
}
