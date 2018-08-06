import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from '../helpers/PrivateRoute';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import CreateTeam from './CreateTeam';
import ViewTeam from './ViewTeam';
import DirectMessages from './DirectMessages';

export default () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/register" component={Register} />
			<Route path="/login" component={Login} />
			<PrivateRoute path="/create-team" component={CreateTeam} />
			<PrivateRoute
				path="/view-team/user/:teamId/:userId"
				component={DirectMessages}
			/>
			<PrivateRoute
				path="/view-team/:teamId?/:channelId?"
				component={ViewTeam}
			/>
		</Switch>
	</Router>
);
