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
	constructor(props) {
		super(props);
		this.state = {
			hasMore: true,
			fetchMoreLoading: false,
		};

		this.scroller = React.createRef();
	}

	handleScroll = () => {
		const {
			data: { channelMessages },
			variables: { channelId },
			fetchMore,
		} = this.props;
		const { scroller } = this;

		if (
			scroller &&
			scroller.current.scrollTop < 100 &&
			this.state.hasMore &&
			channelMessages.length >= 35 &&
			!this.state.fetchMoreLoading
		) {
			this.setState({ fetchMoreLoading: true });
			fetchMore({
				variables: {
					channelId,
					cursor: channelMessages[channelMessages.length - 1].created_at,
				},
				updateQuery: (prev, { fetchMoreResult }) => {
					if (!fetchMoreResult) return prev;

					this.setState({
						fetchMoreLoading: false,
						...(fetchMoreResult.channelMessages.length < 35
							? { hasMore: false }
							: {}),
					});

					return {
						...prev,
						channelMessages: [
							...prev.channelMessages,
							...fetchMoreResult.channelMessages,
						],
					};
				},
			});
		}
	};

	componentDidMount() {
		this.unsubscribe = this.props.subscribeToNewMessages();
	}

	getSnapshotBeforeUpdate(prevProps, prevState) {
		return {
			...(this.scroller.current
				? {
						prevScrollHeight: this.scroller.current.scrollHeight,
						prevScrollTop: this.scroller.current.scrollTop,
				  }
				: {}),
		};
	}

	componentDidUpdate(
		prevProps,
		prevState,
		{ prevScrollHeight, prevScrollTop }
	) {
		if (this.props.variables.channelId !== prevProps.variables.channelId) {
			if (this.unsubscribe) {
				this.unsubscribe();
			}
			this.unsubscribe = this.props.subscribeToNewMessages();
		}

		if (
			this.scroller.current &&
			prevScrollHeight &&
			this.scroller.current.scrollHeight !== prevScrollHeight &&
			prevScrollTop < 100
		) {
			this.scroller.current.scrollTop =
				this.scroller.current.scrollHeight - prevScrollHeight;
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
			<div
				style={{
					gridColumn: '3',
					gridRow: '2',
					padding: '20px',
					paddingRight: '20px',
					display: 'flex',
					flexDirection: 'column-reverse',
					overflowY: 'auto',
				}}
				onScroll={this.handleScroll}
				ref={this.scroller}
			>
				<FileUpload
					style={{
						display: 'flex',
						flexDirection: 'column-reverse',
					}}
					channelId={channelId}
					disableClick
				>
					<Comment.Group>
						{channelMessages
							.slice()
							.reverse()
							.map(message => (
								<Comment key={message.id}>
									<Comment.Content>
										<Comment.Author as="a">
											{message.user.username}
										</Comment.Author>
										<Comment.Metadata>
											<div>{message.created_at}</div>
										</Comment.Metadata>
										<Message message={message} />
									</Comment.Content>
								</Comment>
							))}
					</Comment.Group>
				</FileUpload>
			</div>
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
									channelMessages: [newMessage, ...prev.channelMessages],
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
