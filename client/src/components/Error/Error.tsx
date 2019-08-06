import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Error.css";

interface IErrorProps {
  message: string;
}

const Error = ({ message }: IErrorProps) => {
  return (
    <div className="error">
      <h3>
        <FontAwesomeIcon icon={faExclamationTriangle} /> Error: {message}
      </h3>
    </div>
  );
};

export default Error;
