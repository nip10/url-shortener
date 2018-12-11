import React from 'react';
import axios from 'axios';
import './Form.css';

interface IFormState {
  value: string
}

export default class Form extends React.Component<{}, IFormState> {
  constructor(props: {}) {
    super(props);
    this.state = { value: '' };
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('A name was submitted: ' + this.state.value);
    const longUrl = this.state.value;
    try {
      const res = await axios.post('/', { longUrl });
      console.log('Response:', res);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex-center flex-row">
        <input className="form-input-url" type="text" value={this.state.value} onChange={this.handleChange} />
        <input className="form-submit-url" type="submit" value="shorten url" placeholder="Your original URL here"/>
      </form>
    );
  }
}
