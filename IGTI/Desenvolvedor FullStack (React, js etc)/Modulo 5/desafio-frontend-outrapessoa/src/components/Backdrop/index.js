import React from "react";

import { Container } from "./styles";

const Backdrop = ({ show, clicked }) =>
  show ? <Container onClick={clicked} /> : null;
export default Backdrop;
