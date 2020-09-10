import React, { useState } from "react";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Shortened.css";

const isDev = process.env.NODE_ENV === "development";
const BASE_URL = isDev ? "http://localhost:3000/" : "https://sh.diogocardoso.dev/";

interface IUrls {
  shortUrl: string;
  longUrl: string;
}

interface IShortenedProps {
  url: IUrls;
  elId: string;
}

export default function Shortened({ url, elId }: IShortenedProps) {
  const [displayLongUrl, setDisplayLongUrl] = useState(false);

  const buildFullUrl = (url: string) => `${BASE_URL}${url}`;

  const onCopyClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (document.queryCommandSupported("copy")) {
      const el = document.getElementById(elId);
      if (el) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(el);
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        document.execCommand("copy");
      }
    }
  };

  const onShareFacebookClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const facebookWindow = window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${buildFullUrl(url.shortUrl)}`,
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
      `https://twitter.com/share?url=${encodeURIComponent(buildFullUrl(url.shortUrl))}`,
      "twitter-popup",
      "height=350,width=600"
    );
    if (twitterWindow && twitterWindow.focus) {
      twitterWindow.focus();
    }
  };

  const onInfoClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setDisplayLongUrl(!displayLongUrl);
  };

  const evalUrlToShow = () => {
    return displayLongUrl ? url.longUrl : buildFullUrl(url.shortUrl);
  };

  return (
    <div className="shortened__container">
      <div className="shortened__container-url">
        <a id={elId} target="_blank" rel="nofollow noopener noreferrer" href={evalUrlToShow()}>
          {evalUrlToShow()}
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
        <div onClick={onInfoClickHandler}>
          <FontAwesomeIcon icon={faInfo} />
        </div>
      </div>
    </div>
  );
}
