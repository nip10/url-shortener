import React from "react";
import "./Error.css";

interface IErrorProps {
  message: string;
}

const Error = ({ message }: IErrorProps) => <h3> {message} </h3>;

export default Error;
