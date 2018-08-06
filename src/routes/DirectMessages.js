import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { AUTH_USER } from '../queries/user';
import { CREATE_DIRECT_MESSAGE } from '../queries/message';

import Header from '../components/Header';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';
import DirectMessageContainer from '../containers/DirectMessageContainer';

export default ({
	match: {
		params: { teamId, userId },
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

			let team = teamID
				? myAllTeams.find(team => team.id === teamID)
				: myAllTeams[0];

			team = team || myAllTeams[0];

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
					<Header channelName={'Some user name'} />
					<DirectMessageContainer teamId={team.id} userId={userId} />
					<SendMessage
						placeholder={userId}
						MUTATION={CREATE_DIRECT_MESSAGE}
						mutationName="createDirectMessage"
						variables={text => ({
							text,
							teamId: team.id,
							receiverId: userId,
						})}
					/>
				</AppLayout>
			);
		}}
	</Query>
);
