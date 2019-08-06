import React, { Component } from "react";
import Axios from "axios";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface IMatchParamsProps {
  shortUrl: string;
}

class Redirection extends Component<RouteComponentProps<IMatchParamsProps>, {}> {
  componentDidMount = async () => {
    const { shortUrl } = this.props.match.params;
    try {
      const res = await Axios.get(`https://www.api.sh.diogocardoso.me/${shortUrl}`);
      window.location = res.data.longUrl;
    } catch (error) {
      console.log("Error redirecting to url");
      // Redirect home
      this.props.history.push("/");
    }
  };

  render() {
    return <div>Redirecting...</div>;
  }
}

export default withRouter(Redirection);
