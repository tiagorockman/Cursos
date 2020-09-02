import React, { useEffect } from "react";
import { compoundInterest } from "../helpers/interest.js";

export default function JuroComposto({
  capitalInicial,
  jurosMensal,
  periodoMeses,
}) {
  useEffect(() => {
    console.log(compoundInterest(capitalInicial, jurosMensal, periodoMeses));
  });
  return (
    <div>
      <label>Montante inicial: </label>
      <input type="value"></input>
    </div>
  );
}
