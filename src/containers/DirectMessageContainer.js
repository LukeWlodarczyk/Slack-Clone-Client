import React from 'react';
import { Query } from 'react-apollo';
import { Comment } from 'semantic-ui-react';

import Messages from '../components/Messages';
import {
	DIRECT_MESSAGES,
	NEW_DIRECT_MESSAGE_SUBSCRIPTION,
} from '../queries/message';

import { Component } from 'react';

class DirectMessagesSubscribeWrapper extends Component {
	// componentDidMount() {
	// 	this.unsubscribe = this.props.subscribeToNewMessages();
	// }
	//
	// componentDidUpdate(prevProps) {
	// 	if (this.props.variables.channelId !== prevProps.variables.channelId) {
	// 		if (this.unsubscribe) {
	// 			this.unsubscribe();
	// 		}
	// 		this.unsubscribe = this.props.subscribeToNewMessages();
	// 	}
	// }
	//
	// componentWillUnmount() {
	// 	if (this.unsubscribe) {
	// 		this.unsubscribe();
	// 	}
	// }

	render() {
		const {
			data: { directMessages },
			loading,
		} = this.props;

		if (loading) {
			return 'Loading';
		}
		return (
			<Messages>
				<Comment.Group>
					{directMessages.map(message => (
						<Comment key={message.id}>
							<Comment.Content>
								<Comment.Author as="a">
									{message.sender.username}
								</Comment.Author>
								<Comment.Metadata>
									<div>{message.created_at}</div>
								</Comment.Metadata>
								<Comment.Text>{message.text}</Comment.Text>
							</Comment.Content>
						</Comment>
					))}
				</Comment.Group>
			</Messages>
		);
	}
}

const DirectMessageContainer = ({ teamId, userId }) => (
	<Query
		query={DIRECT_MESSAGES}
		variables={{ teamId, otherUserId: userId }}
		fetchPolicy="network-only"
	>
		{({ subscribeToMore, ...rest }) => {
			return (
				<DirectMessagesSubscribeWrapper
					{...rest}
					subscribeToNewMessages={() =>
						subscribeToMore({
							document: NEW_DIRECT_MESSAGE_SUBSCRIPTION,
							variables: { teamId },
							updateQuery: (prev, { subscriptionData }) => {
								if (!subscriptionData.data) return prev;

								const newMessage = subscriptionData.data.newDirectMessage;

								return {
									...prev,
									directMessages: [...prev.directMessages, newMessage],
								};
							},
						})
					}
				/>
			);
		}}
	</Query>
);

export default DirectMessageContainer;
