import React from 'react';

export default function Names({ children }) {
  const { namesStyle } = styles;

  return <div style={namesStyle}>{children}</div>;
}

const styles = {
  namesStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
};
