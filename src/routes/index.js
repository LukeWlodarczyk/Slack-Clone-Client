import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../helpers/PrivateRoute';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';

export default () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/login" component={Login} />
			<PrivateRoute exact path="/create-team" component={CreateTeam} />
		</Switch>
	</Router>
);
