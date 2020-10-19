import React from "react";

import { Container } from "./backdrop.style";

const Backdrop = ({ show, clicked }) => {
//console.log(`entrou no backdrop show ${show} ${clicked}`)
 return show ? <Container onClick={clicked} /> : null;
}
  
export default Backdrop;
