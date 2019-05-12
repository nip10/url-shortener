import React from "react";
import ReactDOM from "react-dom";
import Wrapper from "./containers/Wrapper/Wrapper";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Wrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
