import React from 'react';
import './Shortened.css';

const isDev = process.env.NODE_ENV === "development";
const BASE_URL = isDev ? "http://localhost:3005/" : "https://sh.diogocardoso.me/";

export default function Shortened({ url }: { url: string }) {
  return (
    <div className="shortened__container">
      <div className="shortened__container-url">
        <a target="_blank" rel="noopener noreferrer" href={`${BASE_URL}${url}`}>
          {`${BASE_URL}${url}`}
        </a>
      </div>
      <div className="shortened__container-share">
        <p>share</p>
        <p>share</p>
        <p>copy to clipboard</p>
      </div>
    </div>
  )
};
