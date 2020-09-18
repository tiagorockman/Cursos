import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid #fc5b00;
`;

export const Info = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    width: 38px;
    font-size: 20px;
    background-color: ${(props) =>
      props.typeOfTransaction === "+" ? "#239551" : "#c53030"};
    border-radius: 50%;
    margin-right: 16px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    h6 {
      font-size: 20px;
      line-height: 23px;
    }
    p {
      font-size: 16px;
      line-height: 19px;
    }
  }
`;

export const DealingWithIt = styled.div`
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
    svg {
      margin-left: 40px;
      cursor: pointer;
    }
    & + svg {
      margin-left: 0px;
    }
  }
`;