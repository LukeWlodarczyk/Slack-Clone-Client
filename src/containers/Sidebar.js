import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import { ALL_TEAMS } from '../queries/team';

const Sidebar = ({ currentTeamId }) => (
	<Query query={ALL_TEAMS}>
		{({ data: { allTeams }, loading }) => {
			if (loading) return 'Loading';

			const team = allTeams.find(team => Number(team.id) === currentTeamId);

			let username = '';
			try {
				const token = localStorage.getItem('token');
				const { user } = decode(token);
				username = user.username;
			} catch (err) {}

			return (
				<Fragment>
					<Teams
						key="team-sidebar"
						teams={allTeams.map(t => ({
							id: t.id,
							letter: t.name.charAt(0).toUpperCase(),
						}))}
					/>,
					<Channels
						key="channels-sidebar"
						teamName={team.name}
						username={username}
						channels={team.channels}
						users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
					/>,
				</Fragment>
			);
		}}
	</Query>
);

export default Sidebar;
