import React from 'react';
import './ServerError.css';

export default function ServerError({ message }: { message: string }) {
  return (
    <div className="error__container">
      <h3> Error: {message}</h3>
    </div>
  )
}
