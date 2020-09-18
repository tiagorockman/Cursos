import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  position: absolute;
  top: 20px;
  right: 0;

  width: 112px;

  p {
    font-family: "Open Sans Condensed";
    font-size: 16px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      color: #f9f9f9;
      width: 28px;
      height: 28px;
      margin: 16px 0 0 16px;
    }
  }
`;
