import React from 'react';
import axios from 'axios';
import './Form.css';

interface IFormState {
  url: string
}

interface IFormProps {
  shortenUrlHandler: (url: string) => void,
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
      const res: any = await axios.post('/', { longUrl });
      this.props.shortenUrlHandler(res.data.shortUrl);
      console.log('Response:', res);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input className="form-input-url" type="text" value={this.state.url} onChange={this.handleChange} placeholder="Your original URL here"/>
        <button className="form-submit-url" type="submit"> Shorten Url </button>
      </form>
    );
  }
}
