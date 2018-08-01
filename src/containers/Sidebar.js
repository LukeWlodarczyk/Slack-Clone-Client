import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';
import { ALL_TEAMS } from '../queries/team';

class Sidebar extends Component {
	state = {
		modalOpen: false,
	};

	toggleModal = () => {
		this.setState({ modalOpen: !this.state.modalOpen });
	};

	render() {
		const { currentTeamId } = this.props;
		return (
			<Query query={ALL_TEAMS}>
				{({ data: { allTeams }, loading }) => {
					if (loading) return 'Loading';
					const team = currentTeamId
						? allTeams.find(team => team.id === currentTeamId)
						: allTeams[0];

					let username = '';
					try {
						const token = localStorage.getItem('token');
						const { user } = decode(token);
						username = user.username;
					} catch (err) {}

					return (
						<Fragment>
							<Teams
								teams={allTeams.map(t => ({
									id: t.id,
									letter: t.name.charAt(0).toUpperCase(),
								}))}
							/>
							<Channels
								teamName={team.name}
								username={username}
								channels={team.channels}
								users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
								onAddChannelClick={this.toggleModal}
							/>
							<AddChannelModal
								onClose={this.toggleModal}
								open={this.state.modalOpen}
								teamId={team.id}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Sidebar;
