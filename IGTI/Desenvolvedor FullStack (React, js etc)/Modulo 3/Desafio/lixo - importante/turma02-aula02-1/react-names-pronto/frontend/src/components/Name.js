import React from 'react';

export default function Name({ children }) {
  const { nameStyle } = styles;

  return <div style={nameStyle}>{children}</div>;
}

const styles = {
  nameStyle: {
    border: '1px solid lightgray',
    padding: '5px',
    margin: '5px',
    fontFamily: "'JetBrains Mono', Consolas, monospace",
    fontWeight: 'bold',
  },
};
