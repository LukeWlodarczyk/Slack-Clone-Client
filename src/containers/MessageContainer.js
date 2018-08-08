import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Comment } from 'semantic-ui-react';

import FileUpload from '../components/FileUpload';
import RenderText from '../components/RenderText';

import {
	CHANNEL_MESSAGES,
	NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
} from '../queries/message';

const Message = ({ message: { url, text, filetype } }) => {
	if (url) {
		if (filetype.startsWith('image/')) {
			return <img src={url} alt="" />;
		} else if (filetype === 'text/plain') {
			return <RenderText url={url} />;
		} else if (filetype.startsWith('audio/')) {
			return (
				<div>
					<audio controls>
						<source src={url} type={filetype} />
					</audio>
				</div>
			);
		}
	}

	return <Comment.Text>{text}</Comment.Text>;
};

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
			variables: { channelId },
		} = this.props;

		if (loading) {
			return 'Loading';
		}
		return (
			<FileUpload
				style={{
					gridColumn: '3',
					gridRow: '2',
					padding: '20px',
					paddingRight: '20px',
					display: 'flex',
					flexDirection: 'column-reverse',
					overflowY: 'auto',
				}}
				channelId={channelId}
				disableClick
			>
				<Comment.Group>
					{channelMessages.map(message => (
						<Comment key={message.id}>
							<Comment.Content>
								<Comment.Author as="a">{message.user.username}</Comment.Author>
								<Comment.Metadata>
									<div>{message.created_at}</div>
								</Comment.Metadata>
								<Message message={message} />
							</Comment.Content>
						</Comment>
					))}
				</Comment.Group>
			</FileUpload>
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
