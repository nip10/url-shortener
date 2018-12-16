import React, { Component, Fragment } from 'react';
import GithubCorner from 'react-github-corner';
import Title from './Title/Title';
import Form from './Form/Form';
import Shortened from './Shortened/Shortened';
import ServerError from './ServerError/ServerError';

interface IAppState {
  urls: string[],
  error: {
    hasError: boolean,
    message: string,
  }
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { urls: [], error: { hasError: false, message: '' } };
  }

  shortenUrl = (url: string) => {
    this.setState({ ...this.state, urls: [url, ...this.state.urls] });
  }

  setError = (hasError: boolean, message: string) => {
    this.setState({ ...this.state, error: { hasError, message } });
  }

  render() {
    return (
      <Fragment>
        <Title />
        <Form shortenUrlHandler={this.shortenUrl} setErrorHandler={this.setError}/>
        { this.state.urls.length > 0 &&
          this.state.urls.map((url: string, i) => <Shortened key={i} elId={`url${i}`} url={url}/>)
        }
        { this.state.error.hasError &&
          <ServerError message={this.state.error.message}/>
        }
        <GithubCorner href='https://github.com/nip10/url-shortener' />
      </Fragment>
    );
  }
}

export default App;
