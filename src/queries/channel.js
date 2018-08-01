import gql from 'graphql-tag';

export const CREATE_CHANEL = gql`
	mutation($name: String!, $teamId: ID!) {
		createChannel(name: $name, teamId: $teamId) {
			success
			errors {
				path
				message
			}
		}
	}
`;
