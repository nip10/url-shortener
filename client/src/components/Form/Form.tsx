import React from 'react';
import Axios from 'axios';
import './Form.css';

interface IFormState {
  url: string
}

interface IFormProps {
  shortenUrlHandler: (url: string) => void,
  setErrorHandler: (hasError: boolean, message: string) => void,
}

export default class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = { url: '' };
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: event.target.value });
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const longUrl = this.state.url;
    try {
      const res: any = await Axios.post('/', { longUrl });
      this.props.shortenUrlHandler(res.data.shortUrl);
      this.props.setErrorHandler(false, '');
    } catch (error) {
      if (error.response.status === 400) {
        this.props.setErrorHandler(true, error.response.data.error);
      } else {
        this.props.setErrorHandler(true, 'Server error');
      }
    }
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="form-input-url" type="text" value={this.state.url} onChange={this.handleChange} placeholder="Your original URL here" required/>
        <button className="form-submit-url" type="submit"> Shorten Url </button>
      </form>
    );
  }
}
