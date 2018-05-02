import React, {Component} from 'react';
import Header from './Header.js';
import Voting from './Voting.js';

class App extends React.Component {
  
  render () {

    return (
      <div id="content">
        <Header />
        <Voting />
      </div>
    );
  }
}

export default App;