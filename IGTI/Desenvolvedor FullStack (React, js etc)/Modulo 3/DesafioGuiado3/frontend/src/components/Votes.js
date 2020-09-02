import React from 'react'
import Countup from 'react-countup';

export default function Votes({ value, previous }) {
  return (
    <div>
      <Countup start={previous} 
      end={value} 
      duration={0.6} 
      separator=".">
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </Countup>
    </div>
  )
}