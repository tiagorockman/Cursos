import styled from "styled-components";
//import { shade } from "polished";

//import selectArrow from "./assets/select-arrow.svg";

export const Container = styled.div`

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
  

  a {
    background-color: #b00;


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
    padding-left: 30px;

    font-family: "Roboto Condensed";
    font-size: 16px;
  

   
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: 12px;
  }

  select + button {
    border-radius: 0px 10px 10px 0px;
  }
`;

export const Balanco = styled.div`
  width: 1100px;
  height: 42px;
  padding: 10px 42px;
  background-color: rgba(249, 249, 249, 0.3);
  border-radius: 10px;
  border-style: double;
  border-color: #e74c3c;
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
    border: 10px;
    color: #f9f9f9;
    cursor: pointer;


    background: #b00;
    border-radius: 10px;

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
    background: #b00;
    color: #f9f9f9;
    border-radius: 10px 10px 0 10px;
    font-size: 20px;
    line-height: 23px;
  }

  input {
    width: 800px;
    border: 10px;
    background: transparent;
    padding: 8px;
    border-bottom: 2px solid #b00;
    margin-left: 6px;
    margin-bottom: 4px;
    text-align: center;
    color: #b00;

    ::placeholder {
      width: 169px;
      height: 19px;
      font-size: 16px;
      line-height: 18px;
      color: #b00;
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
  }
`;

export const Content = styled.div`
  width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  border: 10px solid;
  border-color: #3f395d;
  border-radius: 30px 30px 0px 0px;

  padding: 32px 32px 150px 32px;

`;

export const TransactItemContainer = styled.div
`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 16px;
  border: 2px solid #3f395d;
  border-radius: 10px;
  background-color: ${(props) =>
    props.type === "+" ? "#009432" : "#EA2027"};
`;
export const TextContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    width: 38px;
    font-size: 20px;
    margin-right: 16px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    h6 {
      font-size: 20px;
      line-height: 2px;
      color: #ffffff;
      font-weight: bold;

    }
    p {
      font-size: 16px;
      line-height: 19px;
    }
  }
`;

export const MoneyStyle = styled.div`
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 20px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      margin-left: 10px;
      cursor: pointer;
      background-color: transparent;
      color: #3f395d;
      border: 1px solid #3f395d;

      :hover {
        color: #f9f9f9;
        background-color: #57606f;
      }
      
    }
  }
`;