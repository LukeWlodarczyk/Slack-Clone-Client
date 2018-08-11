import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
	mutation($channelId: ID!, $text: String) {
		createMessage(channelId: $channelId, text: $text) {
			success
			errors {
				path
				message
			}
		}
	}
`;

export const NEW_FILE_MESSAGE = gql`
	mutation($channelId: ID!, $file: Upload!) {
		createMessage(channelId: $channelId, file: $file) {
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
			filetype
			url
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
			filetype
			url
			created_at
		}
	}
`;
