import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';

const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	const refreshToken = localStorage.getItem('refreshToken');
	try {
		decode(token);
		const { exp } = decode(refreshToken);
		if (Date.now() / 1000 > exp) {
			return false;
		}
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
