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
			}
			errors {
				path
				message
			}
		}
	}
`;
