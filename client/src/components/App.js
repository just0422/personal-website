import React, { Component } from 'react';
import {PacmanLoader} from 'react-spinners';

import NavigationBar from './NavigationBar';
import Main from './Main';
import ErrorModal from 'Error';

import api from 'APIUtils';
import '../stylesheets/App.scss';

class App extends Component {
	constructor(props) {
		super(props)

		this.handleLoading = this.handleLoading.bind(this);

		this.state = {
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
				</div>
			);
		}
  }
}

export default App;
