import React, { Fragment, Component } from 'react';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';

class Sidebar extends Component {
	state = {
		modalAddChannelOpen: false,
		modalInvitePeopleOpen: false,
	};

	toggleModal = name => () => {
		this.setState({ [name]: !this.state[name] });
	};

	render() {
		const { teams, team } = this.props;

		let username = '';
		try {
			const token = localStorage.getItem('token');
			const { user } = decode(token);
			username = user.username;
		} catch (err) {}

		return (
			<Fragment>
				<Teams teams={teams} />
				<Channels
					teamName={team.name}
					teamId={team.id}
					username={username}
					channels={team.channels}
					users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
					onAddChannelClick={this.toggleModal('modalAddChannelOpen')}
					onInvitePeopleClick={this.toggleModal('modalInvitePeopleOpen')}
				/>
				<AddChannelModal
					onClose={this.toggleModal('modalAddChannelOpen')}
					open={this.state.modalAddChannelOpen}
					teamId={team.id}
				/>
				<InvitePeopleModal
					onClose={this.toggleModal('modalInvitePeopleOpen')}
					open={this.state.modalInvitePeopleOpen}
					teamId={team.id}
				/>
			</Fragment>
		);
	}
}

export default Sidebar;
