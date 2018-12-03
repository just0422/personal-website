import React, { Component } from 'react';

import NavigationBar from './NavigationBar';

import '../stylesheets/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
		  <NavigationBar />
      </div>
    );
  }
}

export default App;
