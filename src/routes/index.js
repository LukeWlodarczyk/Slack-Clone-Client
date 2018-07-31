import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../helpers/PrivateRoute';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';

export default () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<PrivateRoute path="/create-team" component={CreateTeam} />
			<PrivateRoute path="/view-team" component={ViewTeam} />
		</Switch>
	</Router>
);
