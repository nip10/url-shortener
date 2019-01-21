import React from 'react';
import Axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import './Form.css';

const isDev = process.env.NODE_ENV === "development";
const API_BASE_URL = isDev ? "http://localhost:3005/" : "https://www.api.sh.diogocardoso.me/";

interface IFormState {
  url: string,
  lastUrl: string,
  validationError: boolean,
}

interface IFormProps {
  shortenUrlHandler: (url: string) => void,
  errorHandler: (message: string) => void,
}

interface IShortUrlResponse {
  shortUrl: string,
}

export default class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = { url: '', lastUrl: '', validationError: false };
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: event.target.value });
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const longUrl = this.state.url;
    const lastUrl = this.state.lastUrl;
    if (longUrl === lastUrl) {
      this.props.errorHandler('You already submitted this URL.');
      return;
    }
    try {
      const res: AxiosResponse<IShortUrlResponse> = await Axios.post(API_BASE_URL, { longUrl });
      this.props.shortenUrlHandler(res.data.shortUrl);
      this.props.errorHandler('');
      this.setState({ ...this.state, validationError: false });
    } catch (error) {
      if (error.response.status === 400) {
        this.props.errorHandler('Invalid URL.');
        this.setState({ ...this.state, validationError: true });
      } else {
        this.props.errorHandler('Server error. Please try again.');
        this.setState({ ...this.state, validationError: false });
      }
    }
  }

  public render() {
    const inputClass = classNames('form-input-url', {
      'form-input-url-invalid': this.state.validationError,
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <input className={inputClass} type="text" value={this.state.url} onChange={this.handleChange} placeholder="Your original URL here" required/>
        <button className="form-submit-url" type="submit"> Shorten Url </button>
      </form>
    );
  }
}
