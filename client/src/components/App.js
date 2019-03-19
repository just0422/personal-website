import React, { Component } from 'react';
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
		super(props)

		this.handleLoading = this.handleLoading.bind(this);
		this.resetTime = this.resetTime.bind(this);

		this.state = {
      countDownTo: 0,
			loading: false
		}
	}

	handleLoading(){
		this.setState({ loading: true });

		api.reset().get()
			.then(resp => {
				console.log(resp)
				this.setState({loading: false});
			}).catch(err => {
				console.log(err)
				this.setState({
					loading: false,
					error: err,
				});
			});
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
		}	else if (this.state.loading){
			return <PacmanLoader
				sizeUnit={'px'}
				size={150}
				color={'#a00'}
				loading={this.state.loading} />
		} else {
			return (
				<div className="App">
					<NavigationBar handleLoading={this.handleLoading}/>
					<Main />
        <div className="website-reset-countdown">
          <Button onClick={this.props.handleLoading}>Reset Now</Button> Reseting
          in{' '}
          <Countdown
            date={this.state.countDownTo}
            onComplete={() => this.resetTime()}
            precision={2}
            zeroPadDays={0}
          />
        </div>
				</div>
			);
		}
  }
}

export default App;
