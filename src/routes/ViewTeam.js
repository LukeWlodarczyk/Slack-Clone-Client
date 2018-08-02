import React from 'react';
import { Query } from 'react-apollo';

import { ALL_TEAMS } from '../queries/team';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';

export default ({
	match: {
		params: { teamId, channelId },
	},
}) => (
	<Query query={ALL_TEAMS}>
		{({ data: { allTeams }, loading }) => {
			if (loading) return 'Loading';

			const team = teamId
				? allTeams.find(team => team.id === teamId)
				: allTeams[0];

			const channel = channelId
				? team.channels.find(channel => channel.id === channelId)
				: team.channels[0];

			return (
				<AppLayout>
					<Sidebar
						team={team}
						teams={allTeams.map(t => ({
							id: t.id,
							letter: t.name.charAt(0).toUpperCase(),
						}))}
					/>
					<Header channelName={channel.name} />
					<Messages channelId={channel.id}>
						<ul className="message-list">
							<li />
							<li />
						</ul>
					</Messages>
					<SendMessage channelName={channel.name} />
				</AppLayout>
			);
		}}
	</Query>
);
