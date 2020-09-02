import React from 'react'

export default function Popularity({ value }) {
  const STARS = {
    empty: '☆',
    full: '★',
  };
  const MAX_STARTS = 10;
  const fullStars = STARS.full.repeat(value);
  const emptyStars = STARS.empty.repeat(MAX_STARTS - value);
  return (
    <div style={{ fontSize: '1.5rem', color: '#f9ca24' }}>
      {fullStars}
      {emptyStars}
    </div>
  )
}
