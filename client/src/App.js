import React, { Component } from 'react';
import Navigation from './components/Navigation';
import Login from './components/Login'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Register from './components/Register';
import axios from 'axios';
import { BASE_API_URL } from './utils/TaskrAPI';
import Index from './components/Index';
import Dashboard from './components/Dashboard';
import TaskCalendar from './components/TaskCalendar';

class App extends Component {

	state = {
		currentUser: null,
		isAuthenticated: false,
		from: '',
		categories: []
	}

	setPreviousLocation = (location) => {
		this.setState({from: location});
	}

	getCurrentUser = () => {
		if (localStorage.getItem('accessToken')) {
			axios.get(`${BASE_API_URL}/api/user/profile`, {headers: {"x-access-token": localStorage.getItem('accessToken')} })
			.then(response => {
				console.log('we got a user')
				console.log(response.data.user);
				this.setState({currentUser: response.data.user, categories: response.data.categories, isAuthenticated: true});
			})
			.catch(error => {
				console.log(error);
			})
		} else {
			this.setState({currentUser: null, isAuthenticated: false})
		}
	}

	componentDidMount() {
		this.getCurrentUser();
	}

	render() {
		const userProps = [this.state]
		return (
			<Router>
				<div>
					<Navigation currentUser={this.state.currentUser} getUser={this.getCurrentUser} />
					<Switch>
						<Route exact path="/" component={Index} />
						<Route exact path="/login" render={() => <Login getUser={this.getCurrentUser} setPrevious={this.setPreviousLocation} />} />
						<Route exact path="/register" render={() => <Register getUser={this.getCurrentUser} setPrevious={this.setPreviousLocation} />} />
						<Route exact path="/dashboard" render={() => <Dashboard {...userProps} getUser={this.getCurrentUser} />} />
						<Route exact path="/calendar" render={() => <TaskCalendar {...userProps} />} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
