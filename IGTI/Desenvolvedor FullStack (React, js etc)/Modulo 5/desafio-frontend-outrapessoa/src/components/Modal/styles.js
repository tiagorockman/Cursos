import styled from "styled-components";

export const Container = styled.main`
  position: fixed;
  z-index: 50;
  background: #3f395d;
  width: 480px;
  height: 500px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 32px;
  left: 38%;
  top: 25%;
  box-sizing: border-box;
  transition: all 0.2s ease-out;

  /* opacity: 1; */
  opacity: ${(props) => (props.show ? 1 : 0)};
  visibility: ${(props) => (props.show ? "normal" : "hidden")};

  div {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
  }

  div.doubleInputs {
    justify-content: space-between;
  }

  div.buttons {
    justify-content: flex-end;

    button {
      width: 80px;
      height: 33px;
      display: flex;
      align-items: center;
      justify-content: center;

      background: #c53030;
      border-radius: 10px;
      outline: 0;
      border: 0;

      font-family: "Roboto Condensed";
      font-size: 16px;
      color: #f9f9f9;

      & + button {
        margin-left: 20px;
        background: #fc5b00;
      }
    }
  }
`;

export const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: top;
  margin-bottom: 48px;

  p {
    font-family: "Roboto Condensed";
    font-size: 24px;
    line-height: 28px;

    color: #f9f9f9;

    font-size: 24px;
    line-height: 28px;
    border-bottom: 2px solid #fc5b00;
    padding-bottom: 6px;
  }

  span {
    width: 26px;
    height: 26px;
    background-color: #fc5b00;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const RadioButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;

    label {
      font-family: "Roboto Condensed";
      font-size: 18px;
      color: #f9f9f9;
      margin-right: 32px;
    }

    label.income {
      color: ${(props) => (props.colorToShow === "+" ? "#239551" : "#f9f9f9")};
      font-weight: ${(props) =>
        props.colorToShow === "+" ? "bold" : "normal"};
    }

    label.outcome {
      color: ${(props) => (props.colorToShow === "-" ? "#c53030" : "#f9f9f9")};
      font-weight: ${(props) =>
        props.colorToShow === "-" ? "bold" : "normal"};
    }

    input {
      margin-right: 8px;
    }
  }
`;

export const Input = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 102px;
    height: 33px;
    background: #fc5b00;
    color: #f9f9f9;
    border-radius: 10px 10px 0 10px;
    font-size: 20px;
    line-height: 23px;
  }

  p.valueInput {
    width: 56px;
  }

  input {
    width: 305px;
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

  input.valueInput {
    width: 100px;
    margin-right: 32px;
  }
`;

export const DateInput = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 33px;
    background: #fc5b00;
    color: #f9f9f9;
    border-radius: 10px 10px 0 10px;
    font-size: 20px;
    line-height: 23px;
  }

  input {
    margin: 0 0 0 8px;
  }
`;
