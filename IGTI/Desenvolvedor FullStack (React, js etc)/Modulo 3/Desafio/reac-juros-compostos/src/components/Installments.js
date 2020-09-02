import React from 'react';
import * as format from './helpers/formatHelpers';

export default function Installments({ children }) {
  const { month, valueMonthly, interestMonthlyValue, monthlyInterest } = children;
  return (
    <div className={"card horizontal z-depth-4"} style={interestMonthlyValue > 0 ? styles.installments : styles.installmentsNegative }>
      <div className="card-stacked">
        <div className="card-content">
          <div className="left-align">
            <h5>Mês {month}</h5>
          </div>
          <p>{format.formatCurrency(valueMonthly)}</p>
          <p>
            {interestMonthlyValue > 0
              ? '+' + format.formatCurrency(interestMonthlyValue)
              : interestMonthlyValue === 0
              ? format.formatCurrency(interestMonthlyValue)
              : format.formatCurrency(interestMonthlyValue)}
          </p>
          <p>{format.formatPercent(monthlyInterest)}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  installments : {
    marginRight: '20px',
    fontWeight: 'bold',
   background: 'rgb(2,0,36)',
    color: 'white',
  },
  installmentsNegative: {
    marginRight: '20px',
    fontWeight: 'bold',
    backgroundColor: 'rgb(222,64,97)',
    color: 'white',
  },
};
