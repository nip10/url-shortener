import React, { Component, Fragment } from "react";
import Axios, { AxiosResponse } from "axios";
import GithubCorner from "react-github-corner";
import Title from "../../components/Title/Title";
import Form from "../../components/Form/Form";
import Shortened from "../../components/Shortened/Shortened";
import Error from "../../components/Error/Error";
import "normalize.css";
import "./App.css";
import classNames from "classnames";

const isDev = process.env.NODE_ENV === "development";
const API_BASE_URL = isDev ? "http://localhost:3001/" : "https://www.api.sh.diogocardoso.me/";

interface IAppState {
  urls: IUrls[];
  error: string;
  numUrls: number;
}

interface INumUrlsResponse {
  numUrls: number;
}

interface IUrls {
  shortUrl: string;
  longUrl: string;
}

class App extends Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = { urls: [], error: "", numUrls: 0 };
  }

  private loadUrlsFromLocalStorage = () => {
    try {
      const shortUrls = localStorage.getItem("urls");
      if (shortUrls === null) {
        return null;
      }
      const serializedShortUrls = JSON.parse(shortUrls);
      this.setState({ ...this.state, urls: serializedShortUrls });
    } catch (err) {
      return null;
    }
  };

  private saveUrlsToLocalStorage = () => {
    const serializedShortUrls = JSON.stringify(this.state.urls);
    localStorage.setItem("urls", serializedShortUrls);
  };

  public componentDidMount = async () => {
    // Get shorturls from localstorage
    this.loadUrlsFromLocalStorage();
    // Get stats from the API
    try {
      const res: AxiosResponse<INumUrlsResponse> = await Axios.get(`${API_BASE_URL}stats`);
      const { numUrls } = res.data;
      this.setState({ ...this.state, numUrls });
    } catch (error) {
      this.setState({ ...this.state, numUrls: -1 });
    }
  };

  private shortenUrl = (url: IUrls) => {
    this.setState({ ...this.state, urls: [...this.state.urls, url] });
    // Update shorturls in localstorage
    this.saveUrlsToLocalStorage();
  };

  private errorHandler = (message: string) => {
    this.setState({ ...this.state, error: message });
  };

  public render() {
    const formClassNames = classNames("", {
      "with-error": this.state.error
    });
    return (
      <Fragment>
        <Title numUrls={this.state.numUrls} />
        {this.state.error.length > 0 && <Error message={this.state.error} />}
        <Form
          classNames={formClassNames}
          shortenUrlHandler={this.shortenUrl}
          errorHandler={this.errorHandler}
        />
        {this.state.urls.length > 0 &&
          this.state.urls.map((url, i) => <Shortened key={i} elId={`url${i}`} url={url} />)}
        <GithubCorner href="https://github.com/nip10/url-shortener" />
      </Fragment>
    );
  }
}

export default App;
