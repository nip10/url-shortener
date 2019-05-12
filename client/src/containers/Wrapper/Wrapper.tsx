import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from "../App/App";
import Redirection from "../../components/Redirection/Redirection";

const Wrapper = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/:shortUrl" component={Redirection} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Wrapper;
