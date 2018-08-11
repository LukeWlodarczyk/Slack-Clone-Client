import gql from 'graphql-tag';

export const CREATE_CHANEL = gql`
	mutation(
		$name: String!
		$teamId: ID!
		$public: Boolean
		$privateMembers: [ID!]
	) {
		createChannel(
			name: $name
			teamId: $teamId
			public: $public
			privateMembers: $privateMembers
		) {
			success
			channel {
				id
				name
				dm
			}
			errors {
				path
				message
			}
		}
	}
`;

export const GET_OR_CREATE_CHANNEL = gql`
	mutation($dmMembers: [ID!]!, $teamId: ID!) {
		getOrCreateChannel(teamId: $teamId, dmMembers: $dmMembers) {
			success
			channel {
				id
				name
				dm
			}
			errors {
				path
				message
			}
		}
	}
`;
