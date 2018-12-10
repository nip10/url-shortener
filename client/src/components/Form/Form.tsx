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
    alert('A name was submitted: ' + this.state.value);
    const longUrl = this.state.value;
    try {
      const res = await axios.post('localhost:3000/', { longUrl });
      console.log('Response:', res);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="longurl"> Long URL: </label>
        <input id="longurl" type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
