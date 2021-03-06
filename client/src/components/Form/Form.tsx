import React from "react";
import Axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import { isURL } from "validator";
import "./Form.css";

const isDev = process.env.NODE_ENV === "development";
const API_BASE_URL = isDev ? "http://localhost:3001/" : "https://www.api.sh.diogocardoso.dev/";

interface IFormState {
  url: string;
  lastUrl: string;
  validationError: boolean;
}

interface IUrls {
  shortUrl: string;
  longUrl: string;
}

interface IFormProps {
  shortenUrlHandler: (url: IUrls) => void;
  errorHandler: (message: string) => void;
  classNames: string;
}

interface IShortUrlResponse {
  shortUrl: string;
}

export default class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = { url: "", lastUrl: "", validationError: false };
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: event.target.value });
  };

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.errorHandler("");
    let longUrl = this.state.url;
    if (!isURL(longUrl, { require_protocol: true })) {
      // This means that the url is valid but doesn't have the protocol (http/https)
      // We assume that the url has https enabled, since its 2019
      longUrl = `https://${longUrl}`;
    }
    const lastUrl = this.state.lastUrl;
    if (longUrl === lastUrl) {
      this.props.errorHandler("You already submitted this URL.");
      return;
    }
    try {
      const res: AxiosResponse<IShortUrlResponse> = await Axios.post(API_BASE_URL, { longUrl });
      this.props.shortenUrlHandler({ shortUrl: res.data.shortUrl, longUrl });
      this.setState({ ...this.state, validationError: false, lastUrl: longUrl });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.props.errorHandler("Invalid URL.");
        this.setState({ ...this.state, validationError: true });
      } else {
        this.props.errorHandler("Server error. Please try again later.");
        this.setState({ ...this.state, validationError: false });
      }
    }
  };

  public render() {
    const inputClass = classNames("form-input-url", {
      "form-input-url-invalid": this.state.validationError
    });
    return (
      <form className={this.props.classNames} onSubmit={this.handleSubmit}>
        <input
          className={inputClass}
          type="text"
          value={this.state.url}
          onChange={this.handleChange}
          placeholder="Your original URL here"
          required
        />
        <button className="form-submit-url" type="submit">
          Shorten Url
        </button>
      </form>
    );
  }
}
