import React from 'react';
import Countup from 'react-countup';

export default function Percentage({ value, previous }) {

  
  return (
    <div>
      <Countup
        start={previous || 0 }
        end={value}
        duration={0.6}
        decimals={2}
        decimal=","
        suffix="%"
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </Countup>
    </div>
  )

}
