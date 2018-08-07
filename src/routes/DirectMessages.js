import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import { AUTH_USER, AUTH_USER_WITH_DIRECT_MESSAGE } from '../queries/user';
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
	<Query
		query={AUTH_USER_WITH_DIRECT_MESSAGE}
		variables={{ userId }}
		fetchPolicy="network-only"
	>
		{({ data: { getAuthUser, getUserById }, loading }) => {
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
					<Header channelName={getUserById.username} />
					<DirectMessageContainer teamId={team.id} userId={userId} />
					<SendMessage
						placeholder={getUserById.username}
						MUTATION={CREATE_DIRECT_MESSAGE}
						mutationName="createDirectMessage"
						variables={text => ({
							text,
							teamId: team.id,
							receiverId: userId,
						})}
						optimisticResponse={{
							createDirectMessage: {
								__typename: 'Mutation',
								success: true,
								errors: null,
							},
						}}
						update={(store, { data: { createDirectMessage } }) => {
							const { success } = createDirectMessage;

							if (!success) {
								return;
							}

							const data = store.readQuery({ query: AUTH_USER });

							const newData = JSON.parse(JSON.stringify(data));

							newData.getAuthUser.teams.find(t => {
								if (t.id === team.id) {
									!t.directMessageMembers.some(
										member => member.id === userId
									) &&
										t.directMessageMembers.push({
											__typename: 'User',
											id: userId,
											username: getUserById.username,
										});
								}
							});

							store.writeQuery({ query: AUTH_USER, data: newData });
						}}
					/>
				</AppLayout>
			);
		}}
	</Query>
);
