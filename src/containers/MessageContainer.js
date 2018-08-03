import React from 'react';
import { Query } from 'react-apollo';
import { Comment } from 'semantic-ui-react';

import Messages from '../components/Messages';
import { CHANNEL_MESSAGES } from '../queries/message';

const MessageContainer = ({ channelId }) => (
	<Query query={CHANNEL_MESSAGES} variables={{ channelId }}>
		{({ data: { channelMessages }, loading, error }) => {
			if (loading) return 'Loading';

			return (
				<Messages>
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
				</Messages>
			);
		}}
	</Query>
);

export default MessageContainer;
