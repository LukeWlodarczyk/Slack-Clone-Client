import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
	mutation($channelId: ID!, $text: String!) {
		createMessage(channelId: $channelId, text: $text) {
			success
			errors {
				path
				message
			}
		}
	}
`;

export const CREATE_DIRECT_MESSAGE = gql`
	mutation($receiverId: ID!, $teamId: ID!, $text: String!) {
		createDirectMessage(receiverId: $receiverId, teamId: $teamId, text: $text) {
			success
			errors {
				path
				message
			}
		}
	}
`;

export const CHANNEL_MESSAGES = gql`
	query($channelId: ID!) {
		channelMessages(channelId: $channelId) {
			id
			text
			user {
				username
			}
			created_at
		}
	}
`;

export const DIRECT_MESSAGES = gql`
	query($teamId: ID!, $otherUserId: ID!) {
		directMessages(teamId: $teamId, otherUserId: $otherUserId) {
			id
			text
			sender {
				username
			}
			created_at
		}
	}
`;

export const NEW_CHANNEL_MESSAGE_SUBSCRIPTION = gql`
	subscription($channelId: ID!) {
		newChannelMessage(channelId: $channelId) {
			id
			text
			user {
				username
			}
			created_at
		}
	}
`;

export const NEW_DIRECT_MESSAGE_SUBSCRIPTION = gql`
	subscription($channelId: ID!) {
		newDirectMessage(channelId: $channelId) {
			id
			text
			user {
				username
			}
			created_at
		}
	}
`;
