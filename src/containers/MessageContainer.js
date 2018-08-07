import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Comment } from 'semantic-ui-react';

import Messages from '../components/Messages';
import FileUpload from '../components/FileUpload';
import {
	CHANNEL_MESSAGES,
	NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
} from '../queries/message';

class MessagesSubscribeWrapper extends Component {
	componentDidMount() {
		this.unsubscribe = this.props.subscribeToNewMessages();
	}

	componentDidUpdate(prevProps) {
		if (this.props.variables.channelId !== prevProps.variables.channelId) {
			if (this.unsubscribe) {
				this.unsubscribe();
			}
			this.unsubscribe = this.props.subscribeToNewMessages();
		}
	}

	componentWillUnmount() {
		if (this.unsubscribe) {
			this.unsubscribe();
		}
	}

	render() {
		const {
			data: { channelMessages },
			loading,
		} = this.props;

		if (loading) {
			return 'Loading';
		}
		return (
			<Messages>
				<FileUpload disableClick>
					<Comment.Group>
						{channelMessages.map(message => (
							<Comment key={message.id}>
								<Comment.Content>
									<Comment.Author as="a">
										{message.user.username}
									</Comment.Author>
									<Comment.Metadata>
										<div>{message.created_at}</div>
									</Comment.Metadata>
									<Comment.Text>{message.text}</Comment.Text>
								</Comment.Content>
							</Comment>
						))}
					</Comment.Group>
				</FileUpload>
			</Messages>
		);
	}
}

const MessageContainer = ({ channelId }) => (
	<Query
		query={CHANNEL_MESSAGES}
		variables={{ channelId }}
		fetchPolicy="network-only"
	>
		{({ subscribeToMore, ...rest }) => {
			return (
				<MessagesSubscribeWrapper
					{...rest}
					subscribeToNewMessages={() =>
						subscribeToMore({
							document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
							variables: { channelId },
							updateQuery: (prev, { subscriptionData }) => {
								if (!subscriptionData.data) return prev;

								const newMessage = subscriptionData.data.newChannelMessage;

								return {
									...prev,
									channelMessages: [...prev.channelMessages, newMessage],
								};
							},
						})
					}
				/>
			);
		}}
	</Query>
);

export default MessageContainer;
