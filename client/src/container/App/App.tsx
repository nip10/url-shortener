import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import ShortUrl from '../ShortUrl/ShortUrl';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/:shortUrl" component={ShortUrl}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
