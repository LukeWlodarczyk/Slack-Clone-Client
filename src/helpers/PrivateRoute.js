import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	try {
		decode(token);
		decode(refreshToken);
	} catch (e) {
		return false;
	}
	return true;
};

export default ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
		}
	/>
);
