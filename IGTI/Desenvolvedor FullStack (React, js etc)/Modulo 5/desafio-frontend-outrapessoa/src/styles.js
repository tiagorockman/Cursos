import styled from "styled-components";
import { shade } from "polished";

import selectArrow from "./assets/select-arrow.svg";

export const Container = styled.div`
  width: 1100px;
  height: 100vh;
  margin-top: 16px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: "Oswald";
    font-weight: normal;
    font-size: 42px;
    margin-top: 16px;
    margin-bottom: 32px;

    svg {
      width: 10px;
      height: 10px;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
`;

export const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  button {
    background-color: #fc5b00;
    border: 0;
    width: 33px;
    height: 33px;

    border-radius: 10px 0px 0px 10px;

    &:hover {
      background-color: ${shade(0.2, "#fc5b00")};
    }

    svg {
      color: #100936;
      height: 26px;
      width: 26px;
    }
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 33px;
    width: 120px;
    padding: 2px;

    font-family: "Roboto Condensed";
    font-size: 16px;
    color: #fc5b00;

    background: #f9f9f9 url(${selectArrow});
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 12px;
  }

  select + button {
    border-radius: 0px 10px 10px 0px;
  }
`;

export const Balance = styled.div`
  width: 1100px;
  height: 42px;
  padding: 10px 42px;
  background-color: rgba(249, 249, 249, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 32px;

  p {
    strong {
      font-weight: bold;
      margin-right: 10px;
    }
    font-size: 20px;
    line-height: 24px;
  }
`;

export const ButtonAndSearchContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 32px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    height: 33px;
    border: 0;
    color: #f9f9f9;

    background: #fc5b00;
    border-radius: 10px;

    svg {
      color: #f9f9f9;
      margin-right: 8px;
    }

    &:hover {
      background-color: ${shade(0.2, "#fc5b00")};
    }
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 33px;
    background: #fc5b00;
    color: #f9f9f9;
    border-radius: 10px 10px 0 10px;
    font-size: 20px;
    line-height: 23px;
  }

  input {
    width: 300px;
    border: 0;
    background: transparent;
    padding: 8px;
    border-bottom: 2px solid #fc5b00;
    color: #f9f9f9;
    margin-left: 6px;
    margin-bottom: 4px;

    ::placeholder {
      width: 169px;
      height: 19px;
      font-size: 16px;
      line-height: 18px;
      color: rgba(249, 249, 249, 0.3);
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 33px;
    border-radius: 0px 10px 10px 0px;
    margin-left: 6p;

    svg {
      margin: auto;
      width: 22px;
      height: 22px;
    }
  }
`;

export const Content = styled.div`
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  background: #3f395d;
  border-radius: 30px 30px 0px 0px;

  padding: 32px 32px 150px 32px;

  h3 {
    font-size: 24px;
    line-height: 28px;
    border-bottom: 2px solid #fc5b00;
    padding-bottom: 6px;
    margin-bottom: 48px;
  }
`;
