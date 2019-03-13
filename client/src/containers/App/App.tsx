import React, { Component, Fragment } from "react";
import Axios, { AxiosResponse } from "axios";
import GithubCorner from "react-github-corner";
import Title from "../../components/Title/Title";
import Form from "../../components/Form/Form";
import Shortened from "../../components/Shortened/Shortened";
import Error from "../../components/Error/Error";
import "normalize.css";
import "./App.css";

const isDev = process.env.NODE_ENV === "development";
const API_BASE_URL = isDev ? "http://localhost:3005/" : "https://www.api.sh.diogocardoso.me/";

interface IAppState {
  urls: string[];
  error: string;
  numUrls: number;
}

interface INumUrlsResponse {
  numUrls: number;
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { urls: [], error: "", numUrls: 0 };
  }

  public componentDidMount = async () => {
    try {
      const res: AxiosResponse<INumUrlsResponse> = await Axios.get(`${API_BASE_URL}stats`);
      const { numUrls } = res.data;
      this.setState({ ...this.state, numUrls });
    } catch (error) {
      this.setState({ ...this.state, numUrls: -1 });
    }
  };

  private shortenUrl = (url: string) => {
    this.setState({ ...this.state, urls: [url, ...this.state.urls] });
  };

  private errorHandler = (message: string) => {
    this.setState({ ...this.state, error: message });
  };

  public render() {
    return (
      <Fragment>
        <Title numUrls={this.state.numUrls} />
        <Form shortenUrlHandler={this.shortenUrl} errorHandler={this.errorHandler} />
        {this.state.urls.length > 0 &&
          this.state.urls.map((url, i) => <Shortened key={i} elId={`url${i}`} url={url} />)}
        {this.state.error.length > 0 && <Error message={this.state.error} />}
        <GithubCorner href="https://github.com/nip10/url-shortener" />
      </Fragment>
    );
  }
}

export default App;
