import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {PacmanLoader} from 'react-spinners';
import Countdown from 'react-countdown-now';

import NavigationBar from './NavigationBar';
import Main from './Main';
import ErrorModal from 'Error';

import api from 'APIUtils';
import '../stylesheets/App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLoading = this.handleLoading.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.resetMessage = this.resetMessage.bind(this);

    this.state = {
      countDownTo: -1,
      loading: false,
      resetText: 'Resetting in ',
      timeToReset: false
    };
  }

  handleLoading() {
    this.setState({loading: true});

    api
      .reset()
      .get()
      .then(resp => {
        this.setState({loading: false});
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err,
        });
      });
  }

  resetMessage() {
    this.setState({
      timeToReset: true,
      resetText: 'Website data is resetting. Please refresh soon!'
    })
  }

  resetTime() {
    const interval = 900000; // 15 min
    let time = Date.now();
    let remainder = time % interval;

    this.setState({
      countDownTo: time + interval - remainder,
    });
  }

  componentDidMount() {
    this.resetTime();
  }

  render() {
    if (this.state.error) {
      return <ErrorModal component="Reset" error={this.state.error} />;
    } else if (this.state.loading) {
      return (
        <div>
          <h1>Website is resetting...</h1>
          <h3>Please hold. This takes about 15 seconds.</h3>

          <PacmanLoader
            sizeUnit={'px'}
            size={150}
            color={'#a00'}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <NavigationBar />
          <Main />
          <div className="website-reset-countdown">
            {!this.state.timeToReset &&
              <Button id="reset-button" onClick={this.handleLoading}>
                Reset Now
              </Button>
            }
            {' ' + this.state.resetText}
            {!this.state.timeToReset &&
              <Countdown
                date={this.state.countDownTo}
                onComplete={this.resetMessage}
                precision={2}
                zeroPadDays={0}
              />
            }
          </div>
        </div>
      );
    }
  }
}

export default App;
