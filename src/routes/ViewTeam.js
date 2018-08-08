import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { AUTH_USER } from '../queries/user';
import { CREATE_MESSAGE } from '../queries/message';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import MessageContainer from '../containers/MessageContainer';

export default ({
	match: {
		params: { teamId, channelId },
	},
	history,
}) => (
	<Query query={AUTH_USER} fetchPolicy="network-only">
		{({ data: { getAuthUser }, loading }) => {
			if (loading) return 'Loading';

			const myAllTeams = getAuthUser.teams;

			if (!myAllTeams.length) {
				return <Redirect to="/create-team" />;
			}

			const teamID = teamId && teamId.replace(/\D/g, '');
			const channelID = channelId && channelId.replace(/\D/g, '');

			if (
				teamId !== undefined &&
				teamId !== '' &&
				(teamId !== teamID && channelId !== channelID)
			) {
				return <Redirect to={`/view-team/${teamID}/${channelID}`} />;
			} else if (teamId !== undefined && teamId !== '' && teamId !== teamID) {
				return <Redirect to={`/view-team/${teamID}/${channelId}`} />;
			} else if (channelId !== undefined && channelId !== channelID) {
				return <Redirect to={`/view-team/${teamId}/${channelID}`} />;
			} else if (teamId !== undefined && teamId === '') {
				return <Redirect to={`/view-team`} />;
			}

			let team = teamID
				? myAllTeams.find(team => team.id === teamID)
				: myAllTeams[0];

			team = team || myAllTeams[0];

			let channel = channelID
				? team.channels.find(channel => channel.id === channelID)
				: team.channels[0];

			channel = channel || team.channels[0];

			return (
				<AppLayout>
					<Sidebar
						team={team}
						teams={myAllTeams.map(t => ({
							id: t.id,
							letter: t.name.charAt(0).toUpperCase(),
						}))}
						username={getAuthUser.username}
						history={history}
					/>
					<Header channelName={channel.name} />
					<MessageContainer channelId={channel.id} />
					<SendMessage
						channelId={channel.id}
						MUTATION={CREATE_MESSAGE}
						mutationName="createMessage"
						placeholder={channel.name}
						variables={text => ({
							text,
							channelId: channel.id,
						})}
					/>
				</AppLayout>
			);
		}}
	</Query>
);
