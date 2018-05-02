import React, {Component} from 'react';
import Header from './Header.js';
import Voting from './Votes.js';

class App extends React.Component {
  
  render () {

    return (
      <div className="content">
        <Header />
        <Voting />
      </div>
    );
  }
}

export default App;
