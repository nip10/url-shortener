import React from "react";
import "./Title.css";

interface ITitleProps {
  numUrls: number;
}

export default function Title({ numUrls }: ITitleProps) {
  return (
    <div className="title">
      <h1>URL Shortener</h1>
      <h3>
        Simplify your links. {numUrls > 0 ? `${numUrls} short urls have been generated.` : null}
      </h3>
    </div>
  );
}
