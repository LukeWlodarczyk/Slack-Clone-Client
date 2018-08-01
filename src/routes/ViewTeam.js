import React from 'react';

import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/Sidebar';

export default ({ match: { params } }) => (
	<AppLayout>
		<Sidebar currentTeamId={params.teamId || 0} />
		<Header channelName="general" />
		<Messages>
			<ul className="message-list">
				<li />
				<li />
			</ul>
		</Messages>
		<SendMessage channelName="general" />
	</AppLayout>
);
