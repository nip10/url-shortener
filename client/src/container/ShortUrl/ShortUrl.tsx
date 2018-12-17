import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom'
import Axios from 'axios';

interface IShortUrlProps {
  shortUrl: string
}

interface IShortUrlState {
  url: {
    exists: boolean,
    value: string,
  }
}

export default class ShortUrl extends Component<RouteComponentProps<IShortUrlProps>, IShortUrlState> {
  constructor(props: RouteComponentProps<IShortUrlProps>) {
    super(props);
    this.state = { url: { exists: false, value: '' } };
  }

  longUrl = async () => {
    try {
      const res = await Axios.get(`http://localhost:3005/${this.props.match.params.shortUrl}`);
      console.log('res', res);
      this.setState({ ...this.state, url: { exists: true , value: 'www.google.pt' } })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount = async () => {
    await this.longUrl();
  }

  redirectToHome = () => <Redirect to="/" />;

  redirectToExternal = () => window.location.href = this.state.url.value;

  render() {
    return this.state.url.exists ? this.redirectToExternal() : this.redirectToHome();
  }
};