import React, { Component, Fragment } from 'react';
import Title from './Title/Title';
import Form from './Form/Form';
import Shortened from './Shortened/Shortened';
import GithubCorner from 'react-github-corner';

interface IAppState {
  urls: string[],
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { urls: [] };
  }

  shortenUrl = (url: string) => {
    this.setState({ urls: [...this.state.urls, url] });
  }

  render() {
    return (
      <Fragment>
        <Title />
        <Form shortenUrlHandler={this.shortenUrl} />
        { this.state.urls.length > 0 &&
          this.state.urls.map((url: string, i) => <Shortened key={i} elId={`url${i}`} url={url}/>)
        }
        <GithubCorner href='https://github.com/nip10/url-shortener' />
      </Fragment>
    );
  }
}

export default App;
