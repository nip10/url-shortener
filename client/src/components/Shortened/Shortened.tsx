import React from "react";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Shortened.css";

const isDev = process.env.NODE_ENV === "development";
const API_BASE_URL = isDev ? "http://localhost:3001/" : "https://api.sh.diogocardoso.me/";

interface IShortenedProps {
  url: string;
  elId: string;
}

const buildFullUrl = (url: string) => `${API_BASE_URL}${url}`;

export default function Shortened({ url, elId }: IShortenedProps) {
  const onCopyClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (document.queryCommandSupported("copy")) {
      const el = document.getElementById(elId);
      if (el) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(el);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
      }
    }
  };

  const onShareFacebookClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const facebookWindow = window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${buildFullUrl(url)}`,
      "facebook-popup",
      "height=350,width=600"
    );
    if (facebookWindow && facebookWindow.focus) {
      facebookWindow.focus();
    }
  };

  const onShareTwitterClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const twitterWindow = window.open(
      `https://twitter.com/share?url=${encodeURIComponent(buildFullUrl(url))}`,
      "twitter-popup",
      "height=350,width=600"
    );
    if (twitterWindow && twitterWindow.focus) {
      twitterWindow.focus();
    }
  };

  return (
    <div className="shortened__container">
      <div className="shortened__container-url">
        <a id={elId} target="_blank" rel="nofollow noopener noreferrer" href={buildFullUrl(url)}>
          {buildFullUrl(url)}
        </a>
      </div>
      <div className="shortened__container-share">
        <div onClick={onShareFacebookClickHandler}>
          <FontAwesomeIcon icon={faFacebookF} />
        </div>
        <div onClick={onShareTwitterClickHandler}>
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <div onClick={onCopyClickHandler}>
          <FontAwesomeIcon icon={faCopy} />
          <span>Copy to clipboard</span>
        </div>
      </div>
    </div>
  );
}
