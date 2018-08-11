import React, { Fragment, Component } from 'react';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import InvitePeopleModal from '../components/InvitePeopleModal';
import NewDirectMessageModal from '../components/NewDirectMessageModal';

class Sidebar extends Component {
	state = {
		modalAddChannelOpen: false,
		modalInvitePeopleOpen: false,
		modalNewDirectMessageOpen: false,
	};

	toggleModal = name => e => {
		if (e) e.preventDefault();

		this.setState({ [name]: !this.state[name] });
	};

	render() {
		const { teams, team, username, currentUserId } = this.props;

		const regularChannels = [];
		const dmChannels = [];

		team.channels.forEach(c => {
			if (c.dm) {
				dmChannels.push(c);
			} else {
				regularChannels.push(c);
			}
		});

		return (
			<Fragment>
				<Teams teams={teams} />
				<Channels
					teamName={team.name}
					teamId={team.id}
					isOwner={team.admin}
					username={username}
					channels={regularChannels}
					dmChannels={dmChannels}
					onAddChannelClick={this.toggleModal('modalAddChannelOpen')}
					onInvitePeopleClick={this.toggleModal('modalInvitePeopleOpen')}
					onNewDirectMessageClick={this.toggleModal(
						'modalNewDirectMessageOpen'
					)}
				/>
				<NewDirectMessageModal
					onClose={this.toggleModal('modalNewDirectMessageOpen')}
					open={this.state.modalNewDirectMessageOpen}
					teamId={team.id}
					history={this.props.history}
					currentUserId={currentUserId}
				/>
				{team.admin && (
					<Fragment>
						<AddChannelModal
							onClose={this.toggleModal('modalAddChannelOpen')}
							open={this.state.modalAddChannelOpen}
							teamId={team.id}
							currentUserId={currentUserId}
						/>
						<InvitePeopleModal
							onClose={this.toggleModal('modalInvitePeopleOpen')}
							open={this.state.modalInvitePeopleOpen}
							teamId={team.id}
						/>
					</Fragment>
				)}
			</Fragment>
		);
	}
}

export default Sidebar;
