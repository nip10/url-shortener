import React, { Component, Fragment } from 'react';
import Title from './Title/Title';
import Form from './Form/Form';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Title />
        <Form />
      </Fragment>
    );
  }
}

export default App;
