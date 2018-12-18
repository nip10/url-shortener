import React, { Component, Fragment } from 'react';
import GithubCorner from 'react-github-corner';
import Title from './components/Title/Title';
import Form from './components/Form/Form';
import Shortened from './components/Shortened/Shortened';
import Error from './components/Error/Error';

interface IAppState {
  urls: string[],
  error: string,
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { urls: [], error: '' };
  }

  private shortenUrl = (url: string) => {
    this.setState({ ...this.state, urls: [url, ...this.state.urls] });
  }

  private errorHandler = (message: string) => {
    this.setState({ ...this.state, error: message });
  }

  public render() {
    return (
      <Fragment>
        <Title />
        <Form shortenUrlHandler={this.shortenUrl} errorHandler={this.errorHandler}/>
        { this.state.urls.length > 0 &&
          this.state.urls.map((url, i) => <Shortened key={i} elId={`url${i}`} url={url}/>)
        }
        { this.state.error.length > 0 &&
          <Error message={this.state.error}/>
        }
        <GithubCorner href='https://github.com/nip10/url-shortener' />
      </Fragment>
    );
  }
}

export default App;
