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
