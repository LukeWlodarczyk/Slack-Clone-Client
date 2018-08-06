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
		modalNewDirectMessage: false,
	};

	toggleModal = name => e => {
		if (e) e.preventDefault();

		this.setState({ [name]: !this.state[name] });
	};

	render() {
		const { teams, team, username } = this.props;

		return (
			<Fragment>
				<Teams teams={teams} />
				<Channels
					teamName={team.name}
					teamId={team.id}
					isOwner={team.admin}
					username={username}
					channels={team.channels}
					users={team.directMessageMembers}
					onAddChannelClick={this.toggleModal('modalAddChannelOpen')}
					onInvitePeopleClick={this.toggleModal('modalInvitePeopleOpen')}
					onNewDirectMessageClick={this.toggleModal('modalNewDirectMessage')}
				/>
				<NewDirectMessageModal
					onClose={this.toggleModal('modalNewDirectMessage')}
					open={this.state.modalNewDirectMessage}
					teamId={team.id}
					history={this.props.history}
				/>
				{team.admin && (
					<Fragment>
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
				)}
			</Fragment>
		);
	}
}

export default Sidebar;
