import React, { Component } from 'react';

import NavigationBar from './NavigationBar';
import Main from './Main';

import '../stylesheets/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
				<NavigationBar />
				<Main />
      </div>
    );
  }
}

export default App;