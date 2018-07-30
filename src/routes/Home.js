import React from 'react';
import { Query } from 'react-apollo';
import { ALL_USERS } from '../queries/user';

const Home = () => (
	<Query query={ALL_USERS}>
		{({ data: { allUsers }, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			return allUsers.map(user => <p key={user.id}>{user.username}</p>);
		}}
	</Query>
);

export default Home;
